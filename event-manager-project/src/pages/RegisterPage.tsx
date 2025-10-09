import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../components/CustomToast';
import { saveUser, userExists } from '../utils/authUtils';

const { Title, Text } = Typography;

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormData) => {
    console.log('Register values:', values);
    
    try {
      // Check if user already exists using API
      const exists = await userExists(values.email);
      if (exists) {
        showErrorToast(['Email này đã được sử dụng!']);
        return;
      }
      
      // Save user using API
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password
      };
      
      const success = await saveUser(userData);
      if (success) {
        showSuccessToast('Đăng ký thành công!');
        navigate('/login');
      } else {
        showErrorToast(['Có lỗi xảy ra khi đăng ký!']);
      }
    } catch (error: any) {
      showErrorToast([error.message || 'Có lỗi xảy ra khi đăng ký!']);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Title level={1} className="auth-title">
            Trello
          </Title>
          <Text className="auth-subtitle">
            Please sign up
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="auth-form"
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: 'Họ và tên không được để trống!' }
            ]}
            className="auth-form-item"
          >
            <Input 
              className="auth-input"
              placeholder="Họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email không được để trống!' },
              { type: 'email', message: 'Email phải đúng định dạng!' }
            ]}
            className="auth-form-item"
          >
            <Input 
              className="auth-input"
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được để trống!' },
              { min: 8, message: 'Mật khẩu tối thiểu 8 ký tự!' }
            ]}
            className="auth-form-item"
          >
            <Input.Password 
              className="auth-input"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
            className="auth-form-item"
          >
            <Input.Password 
              className="auth-input"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item className="auth-form-item">
            <Button 
              className="auth-button"
              type="primary" 
              htmlType="submit" 
              block
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="auth-footer">
          <Text className="auth-footer-text">
            Already have an account, <Link className="auth-link" to="/login">click here!</Link>
          </Text>
        </div>

        <div className="auth-copyright">
          <Text className="auth-copyright-text">
            © 2025 - Rikkei Education
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
