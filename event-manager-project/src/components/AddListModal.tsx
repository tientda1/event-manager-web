import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface AddListModalProps {
  visible: boolean;
  onClose: () => void;
  onAddList: (listName: string) => void;
  loading?: boolean;
}

const AddListModal: React.FC<AddListModalProps> = ({
  visible,
  onClose,
  onAddList,
  loading = false
}) => {
  const [listName, setListName] = useState('');

  // Reset input when modal opens/closes
  useEffect(() => {
    if (visible) {
      setListName('');
    }
  }, [visible]);

  const handleAddList = () => {
    if (listName.trim()) {
      onAddList(listName.trim());
      setListName('');
    }
  };

  const handleCancel = () => {
    setListName('');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && listName.trim()) {
      handleAddList();
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
      styles={{
        body: {
          padding: '24px',
          backgroundColor: '#f4f5f7'
        }
      }}
      closeIcon={null}
      maskClosable={false}
    >
      {/* Input Field */}
      <div style={{ marginBottom: '16px' }}>
        <Input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter list name..."
          autoFocus
          style={{
            height: '40px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #dfe1e6',
            backgroundColor: 'white'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Button
          type="primary"
          onClick={handleAddList}
          loading={loading}
          disabled={!listName.trim()}
          style={{
            backgroundColor: '#0079bf',
            borderColor: '#0079bf',
            borderRadius: '6px',
            color: 'white',
            height: '36px',
            padding: '0 16px',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Add list
        </Button>
        
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleCancel}
          style={{
            color: '#42526e',
            padding: '8px',
            minWidth: 'auto',
            height: 'auto',
            fontSize: '16px'
          }}
        />
      </div>
    </Modal>
  );
};

export default AddListModal;
