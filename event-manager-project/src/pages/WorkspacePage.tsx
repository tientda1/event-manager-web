import { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Card, Space, Dropdown, Spin, Alert } from 'antd';
import { 
  CalendarOutlined, 
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CreateBoardModal from '../components/CreateBoardModal';
import UpdateBoardModal from '../components/UpdateBoardModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { getBoardsByUserId, createBoard, updateBoard, deleteBoard, Board } from '../api/boardsApi';
import { getCurrentUser } from '../utils/authUtils';

const { Title, Text } = Typography;

const WorkspacePage = () => {
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Load boards data
  const loadBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = getCurrentUser();
      if (!user) {
        navigate('/login');
        return;
      }
      const boardsData = await getBoardsByUserId(user.id);
      setBoards(boardsData);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách boards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  // Filter boards by type
  const starredBoards = boards.filter(board => board.is_starred);
  const closedBoards = boards.filter(board => 
    board.title.toLowerCase().includes('closed') || 
    board.title.toLowerCase().includes('archived') ||
    board.title.toLowerCase().includes('done')
  );

  const handleCreateBoard = async (boardData: { title: string; background: string; type: 'image' | 'color' }) => {
    try {
      setActionLoading(true);
      const user = getCurrentUser();
      if (!user) {
        navigate('/login');
        return;
      }
      
      await createBoard({
        user_id: user.id,
        title: boardData.title,
        description: '',
        backdrop: boardData.background,
        is_starred: false
      });
      
      await loadBoards(); // Reload boards after creation
    } catch (err: any) {
      console.error('Error creating board:', err);
      // TODO: Show error toast
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateBoard = async (boardData: { title: string; background: string; type: 'image' | 'color' }) => {
    if (!selectedBoard?.id) return;
    
    try {
      setActionLoading(true);
      
      await updateBoard(selectedBoard.id, {
        title: boardData.title,
        backdrop: boardData.background
      });
      
      await loadBoards(); // Reload boards after update
    } catch (err: any) {
      console.error('Error updating board:', err);
      // TODO: Show error toast
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBoard = async () => {
    if (!selectedBoard?.id) return;
    
    try {
      setActionLoading(true);
      
      await deleteBoard(selectedBoard.id);
      
      await loadBoards(); // Reload boards after deletion
      setIsDeleteModalVisible(false);
      setSelectedBoard(null);
    } catch (err: any) {
      console.error('Error deleting board:', err);
      // TODO: Show error toast
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditBoard = (board: Board) => {
    setSelectedBoard(board);
    setIsUpdateModalVisible(true);
  };

  const handleDeleteBoardClick = (board: Board) => {
    setSelectedBoard(board);
    setIsDeleteModalVisible(true);
  };

  const handleStarBoard = async (board: Board) => {
    try {
      setActionLoading(true);
      
      await updateBoard(board.id!, {
        is_starred: !board.is_starred
      });
      
      await loadBoards(); // Reload boards after star toggle
    } catch (err: any) {
      console.error('Error toggling star:', err);
      // TODO: Show error toast
    } finally {
      setActionLoading(false);
    }
  };

  const handleBoardClick = (board: Board) => {
    navigate(`/dashboard/boards/${board.id}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description={error}
        type="error"
        action={
          <Button size="small" icon={<ReloadOutlined />} onClick={loadBoards}>
            Thử lại
          </Button>
        }
        showIcon
      />
    );
  }

  const renderBoardCard = (board: Board) => (
    <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
      <div
        className="board-card"
        style={{
          height: 160,
          backgroundColor: board.backdrop.startsWith('#') ? board.backdrop : '#0079bf', // Fallback color
          backgroundImage: board.backdrop.startsWith('#') ? 'none' : `url(${board.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: 8,
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'transform 0.2s ease',
          border: '1px solid #e1e4e8'
        }}
        onClick={() => handleBoardClick(board)}
      >
        {/* Board Content */}
        <div style={{
          padding: 16,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'transparent',
          color: 'white'
        }}>
          <div>
            <Title level={4} style={{ margin: '0 0 8px 0', fontSize: 16, color: 'white' }}>
              {board.title}
            </Title>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              {board.description}
            </Text>
          </div>
          
          {/* Action Buttons - Only visible on hover */}
          <div className="edit-button-container" style={{ display: 'flex', gap: '8px' }}>
            <Button 
              type="primary" 
              size="small"
              icon={board.is_starred ? <StarFilled /> : <StarOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleStarBoard(board);
              }}
              loading={actionLoading}
              style={{ 
                flex: 1,
                backgroundColor: board.is_starred ? '#faad14' : '#2C3E5D',
                borderColor: board.is_starred ? '#faad14' : '#2C3E5D'
              }}
            >
              {board.is_starred ? 'Starred' : 'Star'}
            </Button>
            <Button 
              type="primary" 
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleEditBoard(board);
              }}
              style={{ 
                flex: 1,
                backgroundColor: '#2C3E5D',
                borderColor: '#2C3E5D'
              }}
            >
              Edit
            </Button>
            <Button 
              type="primary" 
              size="small"
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBoardClick(board);
              }}
              style={{ 
                flex: 1,
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f'
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Col>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ 
        marginBottom: 24,
        backgroundColor: '#ffffff',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #f0f0f0'
      }}>
        <Title level={3} style={{ margin: 0, color: '#262626', fontSize: 18 }}>
          Your Workspaces
        </Title>
        <Space>
          <Button 
            type="text" 
            style={{ 
              color: '#666666', 
              border: '1px solid #d9d9d9',
              backgroundColor: 'transparent'
            }}
          >
            Share
          </Button>
          <Button 
            type="text" 
            style={{ 
              color: '#666666', 
              border: '1px solid #d9d9d9',
              backgroundColor: 'transparent'
            }}
          >
            Export
          </Button>
          <Dropdown
            menu={{ items: [
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This week' },
              { key: 'month', label: 'This month' },
            ] }}
            placement="bottomRight"
            arrow
          >
            <Button 
              type="text" 
              icon={<CalendarOutlined />}
              style={{ 
                color: '#666666', 
                border: '1px solid #d9d9d9',
                backgroundColor: 'transparent'
              }}
            >
              This week <DownOutlined style={{ marginLeft: 4 }} />
            </Button>
          </Dropdown>
        </Space>
      </div>

      {/* Your Workspaces Section */}
      <div style={{ padding: '0 16px' }}>
        <Row gutter={[16, 16]}>
          {/* Board Cards */}
          {boards.map(renderBoardCard)}

          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
                cursor: 'pointer'
              }}
              bodyStyle={{ 
                padding: 0, 
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
              onClick={() => setIsCreateModalVisible(true)}
            >
              <Button
                style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: 'white',
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  color: '#666666',
                  fontSize: 14,
                  fontWeight: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreateModalVisible(true);
                }}
              >
                Create new board
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Starred Boards Header */}
      <div style={{ 
        marginBottom: 24,
        backgroundColor: '#ffffff',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Title level={3} style={{ margin: 0, color: '#262626', fontSize: 18 }}>
          Starred Boards
        </Title>
      </div>

      {/* Starred Boards Section */}
      <div style={{ padding: '0 16px' }}>
        <Row gutter={[16, 16]}>
          {starredBoards.map(renderBoardCard)}
        </Row>
      </div>

      {/* Closed Boards Section - Only show if there are closed boards */}
      {closedBoards.length > 0 && (
        <>
          <div style={{ 
            marginBottom: 24,
            backgroundColor: '#ffffff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: 18 }}>
              Closed Boards
            </Title>
          </div>

          <div style={{ padding: '0 16px' }}>
            <Row gutter={[16, 16]}>
              {closedBoards.map(renderBoardCard)}
            </Row>
          </div>
        </>
      )}

      {/* Create Board Modal */}
      <CreateBoardModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreateBoard}
      />

      {/* Update Board Modal */}
      <UpdateBoardModal
        visible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        onUpdate={handleUpdateBoard}
        initialData={selectedBoard ? {
          title: selectedBoard.title,
          background: selectedBoard.backdrop,
          type: 'image'
        } : undefined}
      />

      {/* Delete Board Modal */}
      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteBoard}
        title="Xóa Board?"
        message="Bạn có chắc chắn muốn xóa board này không? Hành động này không thể hoàn tác!"
        itemName={selectedBoard?.title}
        loading={actionLoading}
        confirmText="Xóa Board"
      />
    </div>
  );
};

export default WorkspacePage;
