import { Modal, Typography, Button } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CloseConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

const CloseConfirmationModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  title = "Are you sure?",
  message = "You won't be able to revert this!",
  loading = false
}: CloseConfirmationModalProps) => {
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
          padding: '32px 24px',
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
            color: '#faad14',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>

      {/* Main Question */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 600, 
          color: '#262626',
          display: 'block'
        }}>
          {title}
        </Text>
      </div>

      {/* Warning Message */}
      <div style={{ marginBottom: 32 }}>
        <Text style={{ 
          fontSize: 14, 
          color: '#8c8c8c',
          display: 'block'
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
          onClick={handleCancel}
          size="middle"
          style={{
            backgroundColor: '#ff4d4f',
            borderColor: '#ff4d4f',
            color: 'white',
            fontWeight: 500,
            borderRadius: 6,
            height: 36,
            padding: '0 20px'
          }}
        >
          Cancel
        </Button>
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
            height: 36,
            padding: '0 20px'
          }}
        >
          Yes, close it!
        </Button>
      </div>
    </Modal>
  );
};

export default CloseConfirmationModal;

