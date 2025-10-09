import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Tag,
  Spin,
  Alert
} from 'antd';
import AddListModal from '../components/AddListModal';
import { BoardDataManager } from '../components/BoardDataManager';
import { 
  ArrowLeftOutlined,
  PlusOutlined, 
  StarOutlined, 
  StarFilled, 
  AppstoreOutlined,
  TableOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import type { Board, List as ApiList, Task as ApiTask, Tag as ApiTag } from '../api/boardsApi';

const { Title, Text } = Typography;

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string;
  tags: Array<{
    id: number;
    content: string;
    color: string;
  }>;
}

interface List {
  id: number;
  title: string;
  tasks: Task[];
}

const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);

  // Component để render khi có dữ liệu
  const renderBoardContent = ({ board, lists, tasks, tags, loading, error, refetch }: {
    board: Board | null;
    lists: ApiList[];
    tasks: { [listId: number]: ApiTask[] };
    tags: { [taskId: number]: ApiTag[] };
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => {
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
            <Button size="small" icon={<ReloadOutlined />} onClick={refetch}>
              Thử lại
            </Button>
          }
          showIcon
        />
      );
    }

    if (!board) {
      return (
        <Alert
          message="Không tìm thấy board"
          description="Board này không tồn tại hoặc đã bị xóa."
          type="warning"
          showIcon
        />
      );
    }

    // Chuyển đổi dữ liệu từ API sang format của component List
    const listsWithTasks: List[] = lists.map(list => ({
      id: list.id!,
      title: list.title,
      tasks: (tasks[list.id!] || []).map(task => ({
        id: task.id!,
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date || '',
        tags: (tags[task.id!] || []).map(tag => ({
          id: tag.id!,
          content: tag.content,
          color: tag.color
        }))
      }))
    }));

    return (
      <div>
        {/* Header */}
        <div style={{ 
          backgroundImage: `url(${board.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '8px',
          position: 'relative',
          minHeight: '200px'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Space style={{ marginBottom: '16px' }}>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/dashboard')}
                style={{ color: 'white', borderColor: 'white' }}
              >
                Quay lại
              </Button>
              <Button 
                icon={board.is_starred ? <StarFilled /> : <StarOutlined />}
                style={{ color: board.is_starred ? '#faad14' : 'white', borderColor: 'white' }}
              >
                {board.is_starred ? 'Đã yêu thích' : 'Yêu thích'}
              </Button>
            </Space>

            <Title level={1} style={{ color: 'white', margin: 0 }}>
              {board.title}
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
              {board.description}
            </Text>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          padding: '0 8px'
        }}>
          <Space>
            <Button icon={<AppstoreOutlined />}>Board</Button>
            <Button icon={<TableOutlined />}>Table</Button>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>

          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsAddListModalVisible(true)}
            >
              Thêm danh sách
            </Button>
          </Space>
        </div>

        {/* Lists Container */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto',
          paddingBottom: '20px'
        }}>
          {listsWithTasks.map((list) => (
            <Card
              key={list.id}
              title={list.title}
              style={{ 
                minWidth: '300px', 
                flexShrink: 0,
                height: 'fit-content'
              }}
              bodyStyle={{ padding: '12px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {list.tasks.map((task) => (
                  <Card
                    key={task.id}
                    size="small"
                    hoverable
                    style={{ marginBottom: '8px' }}
                  >
                    <div>
                      <Text strong>{task.title}</Text>
                      {task.description && (
                        <div style={{ marginTop: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {task.description}
                          </Text>
                        </div>
                      )}
                      {task.due_date && (
                        <div style={{ marginTop: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Due: {new Date(task.due_date).toLocaleDateString('vi-VN')}
                          </Text>
                        </div>
                      )}
                      {task.tags.length > 0 && (
                        <div style={{ marginTop: '8px' }}>
                          <Space size={[0, 4]} wrap>
                            {task.tags.map((tag) => (
                              <Tag key={tag.id} color={tag.color} style={{ margin: 0 }}>
                                {tag.content}
                              </Tag>
                            ))}
                          </Space>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Add List Modal */}
        <AddListModal
          visible={isAddListModalVisible}
          onCancel={() => setIsAddListModalVisible(false)}
          onSubmit={(listData) => {
            console.log('Creating list:', listData);
            // TODO: Implement create list API call
            setIsAddListModalVisible(false);
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <BoardDataManager boardId={parseInt(boardId || '101')}>
        {renderBoardContent}
      </BoardDataManager>
    </div>
  );
};

export default BoardDetailPage;