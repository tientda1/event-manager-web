import React from 'react';
import { Result, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Result
        status="404"
        title="404"
        subTitle={
          <Text type="secondary" style={{ fontSize: 16 }}>
            Xin lỗi, trang bạn truy cập không tồn tại.
          </Text>
        }
        extra={[
          <Button 
            type="primary" 
            icon={<HomeOutlined />}
            onClick={() => navigate('/dashboard')}
            key="home"
            style={{ marginRight: 8 }}
          >
            Về trang chủ
          </Button>,
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            key="back"
          >
            Quay lại
          </Button>
        ]}
        style={{
          background: 'white',
          borderRadius: 8,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default NotFoundPage;
