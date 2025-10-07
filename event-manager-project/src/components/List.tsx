import React, { useState } from 'react';
import { Typography, Button, Input } from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import Card from './Card';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import revertIcon from '../assets/images/revert_icon.png';

const { Text } = Typography;

interface CardData {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface ListProps {
  title: string;
  cards: CardData[];
  onAddCard: () => void;
  onDeleteList?: () => void;
  onDeleteCard?: (cardId: number) => void;
  onEditList?: (newTitle: string) => void;
  onCardClick?: (card: CardData) => void;
}

const List: React.FC<ListProps> = ({ title, cards, onAddCard, onDeleteList, onDeleteCard, onEditList, onCardClick }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditTitle(title);
  };

  const handleEditSave = () => {
    if (editTitle.trim() && onEditList) {
      onEditList(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting list:', title);
    setIsDeleteModalVisible(false);
    if (onDeleteList) {
      onDeleteList();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  return (
    <div style={{
      minWidth: '272px',
      backgroundColor: '#ebecf0',
      borderRadius: '8px',
      padding: '8px',
      height: 'fit-content',
      maxHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* List Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 4px',
        marginBottom: '8px'
      }}>
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEditSave}
            onKeyPress={handleKeyPress}
            autoFocus
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#172b4d',
              flex: 1,
              border: '2px solid #0079bf',
              borderRadius: '3px'
            }}
          />
        ) : (
          <Text 
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#172b4d',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={handleTitleClick}
          >
            {title}
          </Text>
        )}
        <Button
          type="text"
          icon={<MoreOutlined />}
          style={{
            color: '#42526e',
            padding: '4px',
            minWidth: 'auto',
            height: 'auto',
            cursor: 'default'
          }}
        />
      </div>

      {/* Cards Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '8px'
      }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            isCompleted={card.isCompleted}
            listName={title}
            onClick={() => onCardClick && onCardClick(card)}
          />
        ))}
      </div>

      {/* Add Card Button */}
      <Button
        type="text"
        icon={<PlusOutlined />}
        onClick={onAddCard}
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          color: '#42526e',
          fontSize: '14px',
          fontWeight: 400,
          height: '32px',
          padding: '8px 4px',
          border: 'none',
          backgroundColor: 'transparent'
        }}
      >
        Add a card
      </Button>

      {/* Delete List Icon - Bottom right corner */}
      <Button
        type="text"
        onClick={handleDeleteClick}
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          color: '#42526e',
          padding: '4px',
          minWidth: 'auto',
          height: 'auto',
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '4px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
        <img 
          src={revertIcon} 
          alt="Delete" 
          style={{ 
            width: '12px', 
            height: '12px',
            filter: 'invert(0.3)' // Make it darker to match the design
          }} 
        />
      </Button>

      {/* Delete List Confirmation Modal */}
      <DeleteConfirmationModal
        visible={isDeleteModalVisible}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it!"
      />

    </div>
  );
};

export default List;
