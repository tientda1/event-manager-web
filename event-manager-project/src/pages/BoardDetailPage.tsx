import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Input, 
  Tag
} from 'antd';
import AddListModal from '../components/AddListModal';
import BoardIcon from '../components/BoardIcon';
import { 
  ArrowLeftOutlined,
  PlusOutlined, 
  StarOutlined, 
  StarFilled, 
  AppstoreOutlined,
  TableOutlined,
  FilterOutlined
} from '@ant-design/icons';

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

  // Mock data - sẽ được thay thế bằng Redux store
  const board = {
    id: parseInt(boardId || '101'),
    title: "Tổ chức sự kiện Year-end party !",
    description: "Quản lý tiến độ dự án website công ty",
    backdrop: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
    is_starred: true,
    created_at: "2025-02-28T12:30:00Z"
  };

  const lists: List[] = [
    {
      id: 201,
      title: "Việc cần làm",
      tasks: [
        {
          id: 301,
          title: "Thiết kế giao diện",
          description: "Tạo wireframe cho trang chủ và các trang con",
          status: "pending",
          due_date: "2025-03-05T23:59:59Z",
          tags: [
            { id: 401, content: "Urgent", color: "#ff4d4f" },
            { id: 402, content: "Design", color: "#52c41a" }
          ]
        },
        {
          id: 302,
          title: "Setup database",
          description: "Cài đặt và cấu hình database cho dự án",
          status: "pending",
          due_date: "2025-03-03T23:59:59Z",
          tags: [
            { id: 403, content: "Backend", color: "#1890ff" }
          ]
        }
      ]
    },
    {
      id: 202,
      title: "Đang thực hiện",
      tasks: [
        {
          id: 303,
          title: "Code frontend",
          description: "Phát triển giao diện người dùng với React",
          status: "in_progress",
          due_date: "2025-03-10T23:59:59Z",
          tags: [
            { id: 404, content: "Frontend", color: "#722ed1" },
            { id: 405, content: "In Progress", color: "#fa8c16" }
          ]
        }
      ]
    },
    {
      id: 203,
      title: "Hoàn thành",
      tasks: [
        {
          id: 304,
          title: "Tạo logo",
          description: "Thiết kế logo cho website",
          status: "completed",
          due_date: "2025-02-25T23:59:59Z",
          tags: [
            { id: 406, content: "Completed", color: "#52c41a" }
          ]
        }
      ]
    }
  ];

  const handleAddListModal = (listName: string) => {
    // TODO: Implement add list logic
    console.log('Add new list via modal:', listName);
    setIsAddListModalVisible(false);
  };

  const handleOpenAddListModal = () => {
    setIsAddListModalVisible(true);
  };

  const handleCloseAddListModal = () => {
    setIsAddListModalVisible(false);
  };

  const handleStarClick = () => {
    // TODO: Implement star/unstar logic
    console.log('Toggle star for board:', board.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#52c41a';
      case 'in_progress': return '#fa8c16';
      default: return '#d9d9d9';
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Back Button */}
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/dashboard')}
          style={{ color: '#666', borderColor: '#d9d9d9' }}
        >
          Quay lại
        </Button>
      </div>

      {/* Board Header - Matching Original Design */}
      <div style={{ 
        backgroundColor: '#f5f5f5',
        padding: '16px 24px',
        borderRadius: 8,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '64px'
      }}>
        {/* Left Section - Title and Star */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Title level={3} style={{ 
            margin: 0, 
            color: '#0079bf', 
            fontSize: 20,
            fontWeight: 600
          }}>
            {board.title}
          </Title>
          <Button
            type="text"
            icon={board.is_starred ? <StarFilled /> : <StarOutlined />}
            style={{ 
              color: board.is_starred ? '#faad14' : '#666',
              padding: '4px 8px',
              border: 'none',
              background: 'transparent'
            }}
            onClick={handleStarClick}
          />
        </div>

        {/* Middle Section - View Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            style={{ 
              backgroundColor: '#0079bf',
              borderColor: '#0079bf',
              color: 'white',
              borderRadius: '4px',
              height: '32px',
              padding: '0 12px',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Board
          </Button>
          <Button
            style={{ 
              backgroundColor: '#f5f5f5',
              borderColor: '#0079bf',
              color: '#0079bf',
              borderRadius: '4px',
              height: '32px',
              padding: '0 12px',
              fontSize: '14px',
              fontWeight: 500
            }}
            icon={<TableOutlined />}
          >
            Table
          </Button>
          <Button
            style={{ 
              backgroundColor: '#f5f5f5',
              borderColor: '#0079bf',
              color: '#0079bf',
              borderRadius: '4px',
              height: '32px',
              padding: '0 12px',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div 
              style={{ 
                width: '16px', 
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#0079bf'
              }}
            >
              ✕
            </div>
            Close this board
          </Button>
        </div>

        {/* Right Section - Filters */}
        <div>
          <Button
            style={{ 
              backgroundColor: '#f5f5f5',
              borderColor: '#0079bf',
              color: '#0079bf',
              borderRadius: '4px',
              height: '32px',
              padding: '0 12px',
              fontSize: '14px',
              fontWeight: 500
            }}
            icon={<FilterOutlined />}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Lists */}
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
        {lists.map((list) => (
          <Card
            key={list.id}
            title={list.title}
            style={{ 
              minWidth: 300, 
              maxWidth: 300,
              height: 'fit-content'
            }}
            bodyStyle={{ padding: 12 }}
            headStyle={{ padding: '0 12px' }}
            extra={
              <Button 
                type="text" 
                icon={<PlusOutlined />} 
                size="small"
                onClick={() => console.log('Add task to list:', list.id)}
              />
            }
          >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {list.tasks.map((task) => (
                <Card
                  key={task.id}
                  size="small"
                  hoverable
                  style={{ 
                    cursor: 'pointer',
                    borderLeft: `4px solid ${getStatusColor(task.status)}`
                  }}
                  onClick={() => console.log('Open task:', task.id)}
                >
                  <div>
                    <Text strong style={{ fontSize: 14 }}>
                      {task.title}
                    </Text>
                    {task.description && (
                      <Text 
                        type="secondary" 
                        style={{ 
                          display: 'block', 
                          fontSize: 12, 
                          marginTop: 4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {task.description}
                      </Text>
                    )}
                    <div style={{ marginTop: 8 }}>
                      <Space size="small" wrap>
                        {task.tags.map((tag) => (
                          <Tag 
                            key={tag.id} 
                            color={tag.color}
                            style={{ fontSize: 10, margin: 0 }}
                          >
                            {tag.content}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button 
                type="dashed" 
                block 
                icon={<PlusOutlined />}
                onClick={() => console.log('Add task to list:', list.id)}
              >
                Thêm task
              </Button>
            </Space>
          </Card>
        ))}

        {/* Add new list */}
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleOpenAddListModal}
          style={{ 
            minWidth: 300, 
            height: 60,
            borderStyle: 'dashed',
            borderColor: '#d9d9d9'
          }}
        >
          Thêm danh sách khác
        </Button>
      </div>

      {/* Add List Modal */}
      <AddListModal
        visible={isAddListModalVisible}
        onClose={handleCloseAddListModal}
        onAddList={handleAddListModal}
      />
    </div>
  );
};

export default BoardDetailPage;
