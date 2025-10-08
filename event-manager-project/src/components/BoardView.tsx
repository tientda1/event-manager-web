import React, { useState } from 'react';
import { Typography, Button, Space, Dropdown } from 'antd';
import { useParams } from 'react-router-dom';
import { 
  StarOutlined, 
  StarFilled,
  AppstoreOutlined,
  TableOutlined,
  CloseOutlined,
  FilterOutlined,
  MoreOutlined,
  CheckOutlined,
  PlusOutlined,
  ArchiveOutlined
} from '@ant-design/icons';
import List from './List';
import Card from './Card';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddListModal from './AddListModal';
import TaskDetailModal from './TaskDetailModal';
import closeIcon from '../assets/images/close_icon.png';
import boardIcon from '../assets/images/board_icon.png';
import tableIcon from '../assets/images/table_icon.png';
import filterIcon from '../assets/images/Img - Filter cards.png';

const { Title } = Typography;

interface BoardViewProps {
  boardTitle?: string;
  isStarred?: boolean;
  onStarToggle?: () => void;
}

const BoardView: React.FC<BoardViewProps> = ({ 
  boardTitle = "Tổ chức sự kiện Year-end party!",
  isStarred = false,
  onStarToggle
}) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [activeView, setActiveView] = useState<'board' | 'table'>('board');
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  const [isTaskDetailModalVisible, setIsTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Mock data cho boards
  const boardsData = {
    "101": {
      title: "123123213",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "Task 1",
              isCompleted: false
            },
            {
              id: 2,
              title: "Task 2",
              isCompleted: true
            }
          ]
        },
        {
          id: 2,
          title: "In-progress",
          cards: []
        }
      ]
    },
    "102": {
      title: "42314",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "Task A",
              isCompleted: false
            }
          ]
        }
      ]
    },
    "103": {
      title: "My Trello board",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "My Task",
              isCompleted: true
            }
          ]
        }
      ]
    },
    "104": {
      title: "Tổ chức sự kiện Year-end party!",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "Thuê DJ",
              isCompleted: true
            },
            {
              id: 2,
              title: "Lên kịch bản chương trình",
              isCompleted: true
            },
            {
              id: 3,
              title: "Chuẩn bị kịch",
              isCompleted: false
            },
            {
              id: 4,
              title: "Kịch bản",
              isCompleted: true
            },
            {
              id: 5,
              title: "Thuê MC",
              isCompleted: false
            }
          ]
        },
        {
          id: 2,
          title: "In-progress",
          cards: []
        }
      ]
    },
    "105": {
      title: "Important Board 01",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "Important Task 1",
              isCompleted: false
            }
          ]
        }
      ]
    },
    "106": {
      title: "Important Board 02",
      lists: [
        {
          id: 1,
          title: "Todo",
          cards: [
            {
              id: 1,
              title: "High Priority Task",
              isCompleted: true
            }
          ]
        }
      ]
    }
  };

  // Lấy dữ liệu board dựa trên boardId
  const currentBoard = boardId ? boardsData[boardId as keyof typeof boardsData] : boardsData["104"]; // Default to board 104
  const lists = currentBoard?.lists || [];
  const displayTitle = currentBoard?.title || boardTitle;

  const handleAddCard = (listId: number) => {
    console.log('Add card to list:', listId);
    // TODO: Implement add card logic
  };

  const handleAddList = () => {
    setIsAddListModalVisible(true);
  };

  const handleAddListConfirm = (listName: string) => {
    console.log('Adding new list:', listName);
    setIsAddListModalVisible(false);
    // TODO: Implement actual add list logic here
  };

  const handleDeleteList = (listId: number) => {
    console.log('Deleting list with ID:', listId);
    // TODO: Implement actual delete list logic here
  };

  const handleEditList = (listId: number, newTitle: string) => {
    console.log('Editing list with ID:', listId, 'New title:', newTitle);
    // TODO: Implement actual edit list logic here
  };

  const handleDeleteCard = (cardId: number) => {
    console.log('Deleting card with ID:', cardId);
    // TODO: Implement actual delete card logic here
  };

  const handleAddListCancel = () => {
    setIsAddListModalVisible(false);
  };

  const handleCloseBoard = () => {
    setIsCloseModalVisible(true);
  };

  const handleCloseConfirm = () => {
    console.log('Board closed!');
    setIsCloseModalVisible(false);
    // TODO: Implement actual close board logic here
  };

  const handleCloseCancel = () => {
    setIsCloseModalVisible(false);
  };

  const handleCardClick = (card: any) => {
    setSelectedTask({
      ...card,
      listName: currentBoard?.lists?.find(list => 
        list.cards.some(c => c.id === card.id)
      )?.title || 'Unknown List'
    });
    setIsTaskDetailModalVisible(true);
  };

  const handleTaskSave = (taskData: any) => {
    console.log('Saving task:', taskData);
    // TODO: Implement actual save logic here
  };

  const handleTaskDelete = () => {
    console.log('Deleting task:', selectedTask);
    setIsTaskDetailModalVisible(false);
    setSelectedTask(null);
    // TODO: Implement actual delete logic here
  };

  const handleTaskModalClose = () => {
    setIsTaskDetailModalVisible(false);
    setSelectedTask(null);
  };

  const viewMenuItems = [
    {
      key: 'board',
      icon: <AppstoreOutlined />,
      label: 'Board',
      onClick: () => setActiveView('board')
    },
    {
      key: 'table',
      icon: <TableOutlined />,
      label: 'Table',
      onClick: () => setActiveView('table')
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f4f5f7',
      padding: '16px'
    }}>
      {/* Board Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '32px',
        marginBottom: '16px',
        padding: '0 8px'
      }}>
        {/* Title and Star */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Title level={3} style={{ 
            margin: 0, 
            fontSize: '18px',
            fontWeight: 600,
            color: '#172b4d'
          }}>
            {displayTitle}
          </Title>
          <Button
            type="text"
            icon={isStarred ? <StarFilled /> : <StarOutlined />}
            onClick={onStarToggle}
            style={{
              color: isStarred ? '#f2d600' : '#42526e',
              fontSize: '16px',
              padding: '4px'
            }}
          />
        </div>

        {/* View buttons - Board, Table, Close this board */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View buttons */}
          <Space size="small">
            <Button
              type={activeView === 'board' ? 'primary' : 'default'}
              onClick={() => setActiveView('board')}
              size="small"
              style={{
                backgroundColor: activeView === 'board' ? '#666666' : 'transparent',
                borderColor: activeView === 'board' ? '#666666' : '#d1d5db',
                color: activeView === 'board' ? 'white' : '#42526e',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <img 
                src={boardIcon} 
                alt="Board" 
                style={{ 
                  width: '16px', 
                  height: '16px',
                  filter: activeView === 'board' ? 'brightness(0) invert(1)' : 'none'
                }} 
              />
              Board
            </Button>
            <Button
              type="text"
              onClick={() => setActiveView('table')}
              size="small"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#42526e',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <img 
                src={tableIcon} 
                alt="Table" 
                style={{ 
                  width: '16px', 
                  height: '16px'
                }} 
              />
              Table
            </Button>
            <Button
              type="text"
              onClick={handleCloseBoard}
              size="small"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#42526e',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <img 
                src={closeIcon} 
                alt="Close" 
                style={{ 
                  width: '16px', 
                  height: '16px'
                }} 
              />
              Close this board
            </Button>
          </Space>
        </div>

        {/* Filters - Right side */}
        <div style={{ marginLeft: 'auto' }}>
          <Button
            type="text"
            size="small"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#42526e',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              fontSize: '14px',
              fontWeight: 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <img 
              src={filterIcon} 
              alt="Filters" 
              style={{ 
                width: '16px', 
                height: '16px'
              }} 
            />
            Filters
          </Button>
        </div>
      </div>

      {/* Board Content */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {/* Lists */}
        {lists.map((list) => (
          <List
            key={list.id}
            title={list.title}
            cards={list.cards}
            onAddCard={() => handleAddCard(list.id)}
            onDeleteList={() => handleDeleteList(list.id)}
            onDeleteCard={handleDeleteCard}
            onEditList={(newTitle) => handleEditList(list.id, newTitle)}
            onCardClick={handleCardClick}
          />
        ))}

        {/* Add another list button */}
        <div style={{
          minWidth: '272px',
          backgroundColor: '#ebecf0',
          borderRadius: '8px',
          padding: '8px',
          height: 'fit-content'
        }}>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={handleAddList}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              color: '#42526e',
              fontSize: '14px',
              fontWeight: 400,
              height: '32px'
            }}
          >
            Add another list
          </Button>
        </div>
      </div>

      {/* Close Board Confirmation Modal */}
      <DeleteConfirmationModal
        visible={isCloseModalVisible}
        onClose={handleCloseCancel}
        onConfirm={handleCloseConfirm}
        title="Are you sure?"
        message="You won't be able to revert this!"
        confirmText="Yes, close it!"
      />

      {/* Add List Modal */}
      <AddListModal
        visible={isAddListModalVisible}
        onClose={handleAddListCancel}
        onAddList={handleAddListConfirm}
      />

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          visible={isTaskDetailModalVisible}
          task={selectedTask}
          onClose={handleTaskModalClose}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
};

export default BoardView;
