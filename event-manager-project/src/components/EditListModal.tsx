import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Space } from 'antd';

interface EditListModalProps {
  visible: boolean;
  currentTitle: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}

const EditListModal: React.FC<EditListModalProps> = ({
  visible,
  currentTitle,
  onClose,
  onSave
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  useEffect(() => {
    if (visible) {
      setNewTitle(currentTitle);
    }
  }, [visible, currentTitle]);

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle.trim());
      onClose();
    }
  };

  const handleCancel = () => {
    setNewTitle(currentTitle);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Modal
      title="Edit List"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter list title..."
          autoFocus
          style={{ marginBottom: 16 }}
        />
        <Space>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default EditListModal;
