import { Modal, Typography, Input, Button, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

interface UpdateBoardModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (boardData: { title: string; background: string; type: 'image' | 'color' }) => void;
  initialData?: {
    title: string;
    background: string;
    type: 'image' | 'color';
  };
}

const UpdateBoardModal = ({ visible, onClose, onUpdate, initialData }: UpdateBoardModalProps) => {
  const backgroundImages = [
    '/src/assets/images/Background.png',
    '/src/assets/images/Background_1.png',
    '/src/assets/images/Background_2.png',
    '/src/assets/images/Background_3.png'
  ];

  const colors = [
    '#ff9500', '#8e44ad', '#27ae60', '#00bcd4', '#f39c12', '#e91e63'
  ];

  const [boardTitle, setBoardTitle] = useState('');
  const [selectedBackground, setSelectedBackground] = useState<string | null>(backgroundImages[0]); // Default to first background
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (initialData && visible) {
      setBoardTitle(initialData.title);
      if (initialData.type === 'image') {
        setSelectedBackground(initialData.background);
        setSelectedColor(null);
      } else {
        setSelectedColor(initialData.background);
        setSelectedBackground(null);
      }
      setTitleError('');
    }
  }, [initialData, visible]);

  const handleUpdate = () => {
    if (!boardTitle.trim()) {
      setTitleError('Vui lòng nhập tiêu đề board.');
      return;
    }

    const background = selectedBackground || selectedColor || '#0079bf';
    const type = selectedBackground ? 'image' : 'color';
    
    onUpdate({
      title: boardTitle,
      background,
      type
    });

    // Reset form
    setBoardTitle('');
    setSelectedBackground(null);
    setSelectedColor(null);
    setTitleError('');
    onClose();
  };

  const handleClose = () => {
    setBoardTitle('');
    setSelectedBackground(null);
    setSelectedColor(null);
    setTitleError('');
    onClose();
  };

  return (
    <Modal
      title="Update board"
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={480}
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px'
        },
        body: {
          padding: '24px'
        }
      }}
      closeIcon={<CloseOutlined />}
    >
      {/* Background Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>
          Background
        </Title>
        <Row gutter={[8, 8]}>
          {backgroundImages.map((image, index) => (
            <Col key={index} span={6}>
              <div
                style={{
                  width: '100%',
                  height: 60,
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  border: selectedBackground === image ? '3px solid #0079bf' : '1px solid #d9d9d9'
                }}
                onClick={() => {
                  setSelectedBackground(image);
                  setSelectedColor(null);
                }}
              >
                {selectedBackground === image && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 121, 191, 0.3)',
                    borderRadius: 4
                  }} />
                )}
                {selectedBackground === image && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 20,
                    height: 20,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Color Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>
          Color
        </Title>
        <Row gutter={[8, 8]}>
          {colors.map((color, index) => (
            <Col key={index} span={4}>
              <div
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  border: selectedColor === color ? '3px solid #0079bf' : '1px solid #d9d9d9'
                }}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedBackground(null);
                }}
              >
                {selectedColor === color && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 121, 191, 0.3)',
                    borderRadius: 4
                  }} />
                )}
                {selectedColor === color && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 20,
                    height: 20,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Board Title Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: 600 }}>
          Board title *
        </Title>
        <Input
          placeholder="E.g. Shopping list for birthday..."
          value={boardTitle}
          onChange={(e) => {
            setBoardTitle(e.target.value);
            if (titleError) setTitleError('');
          }}
          style={{ marginBottom: 8 }}
        />
        {titleError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚠️</span>
            <Text style={{ color: '#ff4d4f', fontSize: 12 }}>
              {titleError}
            </Text>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button
          onClick={handleClose}
          style={{
            color: '#ff4d4f',
            borderColor: '#ff4d4f',
            backgroundColor: 'white'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          style={{
            backgroundColor: 'white',
            borderColor: '#0079bf',
            color: '#0079bf'
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateBoardModal;

