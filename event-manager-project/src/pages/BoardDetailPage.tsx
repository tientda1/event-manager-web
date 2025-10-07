import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Button, 
  Space, 
  Input, 
  Tag, 
  Avatar,
  Dropdown,
  Menu
} from 'antd';
import { 
  ArrowLeftOutlined,
  PlusOutlined, 
  StarOutlined, 
  StarFilled, 
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

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
  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  // Mock data - sẽ được thay thế bằng Redux store
  const board = {
    id: parseInt(boardId || '101'),
    title: "Dự án Website",
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

  const handleAddList = () => {
    if (newListTitle.trim()) {
      // TODO: Implement add list logic
      console.log('Add new list:', newListTitle);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  const handleStarClick = () => {
    // TODO: Implement star/unstar logic
    console.log('Toggle star for board:', board.id);
  };

  const boardMenuItems = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Chỉnh sửa board',
    },
    {
      key: 'share',
      icon: <ShareAltOutlined />,
      label: 'Chia sẻ',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Xóa board',
      danger: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#52c41a';
      case 'in_progress': return '#fa8c16';
      default: return '#d9d9d9';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        marginBottom: 24, 
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${board.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 8,
        padding: 24,
        color: 'white'
      }}>
        <Space style={{ marginBottom: 16 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/dashboard')}
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Quay lại
          </Button>
          <Button
            type="text"
            icon={board.is_starred ? <StarFilled /> : <StarOutlined />}
            style={{ color: board.is_starred ? '#faad14' : 'white' }}
            onClick={handleStarClick}
          />
          <Dropdown
            menu={{ items: boardMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              style={{ color: 'white' }}
            />
          </Dropdown>
        </Space>

        <Title level={2} style={{ color: 'white', margin: 0 }}>
          {board.title}
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
          {board.description}
        </Text>
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
        {isAddingList ? (
          <Card style={{ minWidth: 300, maxWidth: 300 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                placeholder="Nhập tên danh sách..."
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                onPressEnter={handleAddList}
                autoFocus
              />
              <Space>
                <Button type="primary" size="small" onClick={handleAddList}>
                  Thêm
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListTitle('');
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </Space>
          </Card>
        ) : (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setIsAddingList(true)}
            style={{ 
              minWidth: 300, 
              height: 60,
              borderStyle: 'dashed',
              borderColor: '#d9d9d9'
            }}
          >
            Thêm danh sách khác
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardDetailPage;
