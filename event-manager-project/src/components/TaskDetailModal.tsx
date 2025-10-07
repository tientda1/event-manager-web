import React, { useState } from 'react';
import { Modal, Input, Button, Space, Tag, Typography, Divider } from 'antd';
import { 
  BoldOutlined, 
  ItalicOutlined, 
  LinkOutlined, 
  PaperClipOutlined,
  DeleteOutlined,
  CalendarOutlined,
  TagOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface TaskDetailModalProps {
  visible: boolean;
  task: {
    id: number;
    title: string;
    description?: string;
    listName: string;
    isCompleted: boolean;
  };
  onClose: () => void;
  onSave: (taskData: any) => void;
  onDelete: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  task,
  onClose,
  onSave,
  onDelete
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      isCompleted
    });
    onClose();
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsCompleted(task.isCompleted);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      style={{ top: 20 }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ 
        display: 'flex', 
        minHeight: '600px',
        backgroundColor: '#f4f5f7'
      }}>
        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: 'white',
          margin: '16px',
          borderRadius: '8px'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div
                onClick={() => setIsCompleted(!isCompleted)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: isCompleted ? 'none' : '2px solid #dfe1e6',
                  backgroundColor: isCompleted ? '#5aac44' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}
              >
                {isCompleted && (
                  <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                )}
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: 'none',
                  padding: 0,
                  backgroundColor: 'transparent'
                }}
                placeholder="Task title..."
              />
            </div>
            <div style={{ marginLeft: '36px' }}>
              <Text type="secondary">
                in list 
                <Tag 
                  color="default" 
                  style={{ marginLeft: '8px', marginRight: '4px' }}
                >
                  {task.listName}
                </Tag>
                <span style={{ color: '#42526e' }}>▼</span>
              </Text>
            </div>
          </div>

          {/* Description Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <span style={{ marginRight: '8px' }}>☰</span>
              <Title level={5} style={{ margin: 0 }}>Description</Title>
            </div>
            
            {/* Rich Text Editor Toolbar */}
            <div style={{ 
              border: '1px solid #d9d9d9', 
              borderRadius: '6px',
              backgroundColor: 'white'
            }}>
              {/* Toolbar */}
              <div style={{ 
                padding: '8px 12px', 
                borderBottom: '1px solid #d9d9d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Button type="text" size="small" style={{ fontSize: '12px' }}>
                    Aa ▼
                  </Button>
                  <Button type="text" size="small">
                    <BoldOutlined />
                  </Button>
                  <Button type="text" size="small">
                    <ItalicOutlined />
                  </Button>
                  <Button type="text" size="small">⋯</Button>
                  <Button type="text" size="small">☰ ▼</Button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Button type="text" size="small">
                    <LinkOutlined />
                  </Button>
                  <Button type="text" size="small">📷</Button>
                  <Button type="text" size="small">+ ▼</Button>
                  <Button type="text" size="small">✨</Button>
                  <Button type="text" size="small">
                    <PaperClipOutlined />
                  </Button>
                  <Button type="text" size="small">↕</Button>
                  <Button type="text" size="small">?</Button>
                </div>
              </div>
              
              {/* Text Area */}
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a more detailed description..."
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  minHeight: '200px',
                  resize: 'none'
                }}
                autoSize={{ minRows: 8, maxRows: 20 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '24px' }}>
            <Space>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ 
          width: '200px', 
          padding: '16px',
          backgroundColor: '#f4f5f7'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              backgroundColor: '#ebecf0',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}>
              <TagOutlined style={{ marginRight: '8px' }} />
              <Text strong>Labels</Text>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              backgroundColor: '#ebecf0',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}>
              <CalendarOutlined style={{ marginRight: '8px' }} />
              <Text strong>Dates</Text>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Button 
              danger 
              type="primary"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              style={{ width: '100%' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
