import { useState } from 'react';
import { Typography, Button, Row, Col, Card, Space, Dropdown } from 'antd';
import { 
  CalendarOutlined, 
  DownOutlined,
  EditOutlined
} from '@ant-design/icons';
import boardImg1 from '../assets/images/board-img-1.jpg';
import CreateBoardModal from '../components/CreateBoardModal';
import UpdateBoardModal from '../components/UpdateBoardModal';

const { Title, Text } = Typography;

const WorkspacePage = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);

  // Mock data cho boards
  const boards = [
    {
      id: 101,
      title: "123123213",
      description: "Manage project tasks and deadlines",
      backgroundImage: boardImg1
    },
    {
      id: 102,
      title: "42314",
      description: "Team workspace for collaboration",
      backgroundImage: boardImg1
    },
    {
      id: 103,
      title: "My Trello board",
      description: "Personal task management",
      backgroundImage: boardImg1
    },
    {
      id: 104,
      title: "Tổ chức sự kiện Year-end party!",
      description: "Kế hoạch tổ chức tiệc cuối năm",
      backgroundImage: boardImg1
    }
  ];

  // Mock data cho starred boards
  const starredBoards = [
    {
      id: 105,
      title: "Important Board 01",
      description: "Critical project board",
      backgroundImage: boardImg1
    },
    {
      id: 106,
      title: "Important Board 02",
      description: "High priority tasks",
      backgroundImage: boardImg1
    }
  ];

  const handleCreateBoard = (boardData: { title: string; background: string; type: 'image' | 'color' }) => {
    console.log('Creating board:', boardData);
    // TODO: Implement actual board creation logic
  };

  const handleUpdateBoard = (boardData: { title: string; background: string; type: 'image' | 'color' }) => {
    console.log('Updating board:', boardData);
    // TODO: Implement actual board update logic
  };

  const handleEditBoard = (board: any) => {
    setSelectedBoard(board);
    setIsUpdateModalVisible(true);
  };

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
          {boards.map((board) => (
            <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
              <div
                className="board-card"
                style={{
                  height: 160,
                  backgroundImage: `url(${board.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  borderRadius: 8,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Board Content */}
                <div style={{
                  padding: 16,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
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
                  
                  {/* Edit Button - Only visible on hover */}
                  <div className="edit-button-container">
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBoard(board);
                      }}
                      style={{ 
                        width: '80%',
                        backgroundColor: '#2C3E5D',
                        borderColor: '#2C3E5D'
                      }}
                    >
                      Edit this board
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}

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
          {starredBoards.map((board) => (
            <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
              <Card
                hoverable
                style={{
                  height: 160,
                  backgroundImage: `url(${board.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
                bodyStyle={{ 
                  padding: 16,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white'
                }}
              >
                <div>
                  <Title level={4} style={{ margin: '0 0 8px 0', fontSize: 16, color: 'white' }}>
                    {board.title}
                  </Title>
                  <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                    {board.description}
                  </Text>
                </div>
                
                <div style={{ marginTop: 'auto' }}>
                  <Button 
                    type="primary" 
                    size="small"
                    icon={<EditOutlined />}
                    style={{ 
                      width: '80%',
                      backgroundColor: '#2C3E5D',
                      borderColor: '#2C3E5D'
                    }}
                  >
                    Edit this board
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

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
          background: selectedBoard.backgroundImage,
          type: 'image'
        } : undefined}
      />
    </div>
  );
};

export default WorkspacePage;
