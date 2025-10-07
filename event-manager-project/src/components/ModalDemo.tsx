import { useState } from 'react';
import { Button, Space } from 'antd';
import CloseConfirmationModal from './CloseConfirmationModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

/**
 * Demo component to showcase the CloseConfirmationModal and DeleteConfirmationModal
 * This component can be used for testing the modal functionality
 */
const ModalDemo = () => {
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseModalConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCloseModalVisible(false);
      console.log('Modal closed');
    }, 1000);
  };

  const handleDeleteModalConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setDeleteModalVisible(false);
      console.log('Item deleted');
    }, 1000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Modal Demo</h2>
      <p>Click the buttons below to test the confirmation modals:</p>
      
      <Space>
        <Button 
          type="primary" 
          onClick={() => setCloseModalVisible(true)}
          style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
        >
          Test Close Modal
        </Button>
        
        <Button 
          type="primary" 
          onClick={() => setDeleteModalVisible(true)}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Test Delete Modal
        </Button>
      </Space>

      <CloseConfirmationModal
        visible={closeModalVisible}
        onClose={() => setCloseModalVisible(false)}
        onConfirm={handleCloseModalConfirm}
        loading={loading}
        title="Are you sure?"
        message="You won't be able to revert this!"
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteModalConfirm}
        loading={loading}
        itemName="Sample Board"
        title="Delete Board"
        message="This action cannot be undone."
      />
    </div>
  );
};

export default ModalDemo;

