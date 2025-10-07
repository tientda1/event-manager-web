import { Modal, Typography, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  loading?: boolean;
  confirmText?: string;
}

const DeleteConfirmationModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  title = "Are you sure?",
  message = "You won't be able to revert this!",
  itemName,
  loading = false,
  confirmText = "Yes, delete it!"
}: DeleteConfirmationModalProps) => {
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
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
          padding: '40px 32px',
          textAlign: 'center'
        }
      }}
      closeIcon={null}
      maskClosable={false}
    >
      {/* Warning Icon */}
      <div style={{ marginBottom: 24 }}>
        <ExclamationCircleOutlined 
          style={{ 
            fontSize: 48, 
            color: '#ff9500',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>

      {/* Main Question */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 600, 
          color: '#333333',
          display: 'block'
        }}>
          {title}
        </Text>
      </div>

      {/* Warning Message */}
      <div style={{ marginBottom: 32 }}>
        <Text style={{ 
          fontSize: 14, 
          color: '#666666',
          display: 'block',
          lineHeight: 1.5
        }}>
          {message}
        </Text>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 12 
      }}>
        <Button
          type="primary"
          onClick={handleConfirm}
          loading={loading}
          size="middle"
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            fontWeight: 500,
            borderRadius: 6,
            height: 40,
            padding: '0 24px',
            fontSize: 14
          }}
        >
          {confirmText}
        </Button>
        <Button
          onClick={handleCancel}
          size="middle"
          style={{
            backgroundColor: '#ff4d4f',
            borderColor: '#ff4d4f',
            color: 'white',
            fontWeight: 500,
            borderRadius: 6,
            height: 40,
            padding: '0 24px',
            fontSize: 14
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

