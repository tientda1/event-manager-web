import React from 'react';

const BoardIcon: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'end', 
      gap: '2px',
      height: '14px'
    }}>
      <div style={{ 
        width: '3px', 
        height: '8px', 
        backgroundColor: 'white', 
        borderRadius: '1px' 
      }}></div>
      <div style={{ 
        width: '3px', 
        height: '10px', 
        backgroundColor: 'white', 
        borderRadius: '1px' 
      }}></div>
      <div style={{ 
        width: '3px', 
        height: '12px', 
        backgroundColor: 'white', 
        borderRadius: '1px' 
      }}></div>
    </div>
  );
};

export default BoardIcon;
