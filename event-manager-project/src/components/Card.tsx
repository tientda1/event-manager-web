import React from 'react';
import { Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CardProps {
  id: number;
  title: string;
  isCompleted: boolean;
  listName: string;
  onToggleComplete?: () => void;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  id,
  title, 
  isCompleted, 
  listName,
  onToggleComplete,
  onClick
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on checkbox
    if ((e.target as HTMLElement).closest('.checkbox-container')) {
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        boxShadow: '0 1px 0 rgba(9, 30, 66, 0.25)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        position: 'relative'
      }}
      onClick={handleCardClick}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
      }}>
        {/* Checkbox - Custom circular green checkbox */}
        <div className="checkbox-container" style={{ marginTop: '2px' }}>
          <div
            onClick={onToggleComplete}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: isCompleted ? 'none' : '2px solid #dfe1e6',
              backgroundColor: isCompleted ? '#5aac44' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isCompleted && (
              <CheckOutlined style={{
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }} />
            )}
          </div>
        </div>

        {/* Card Content */}
        <div style={{ flex: 1 }}>
          <Text style={{
            fontSize: '14px',
            color: isCompleted ? '#5aac44' : '#172b4d',
            lineHeight: '20px',
            display: 'block'
          }}>
            {title}
          </Text>
        </div>
      </div>


    </div>
  );
};

export default Card;
