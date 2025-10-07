import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: RegisterFormData) => {
    console.log('Register values:', values);
    // TODO: Implement register logic
    navigate('/dashboard');
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
            name="email"
            rules={[
              { required: true, message: 'Email không được bỏ trống!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
            className="auth-form-item"
          >
            <Input 
              className="auth-input"
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Username không được bỏ trống!' },
              { min: 3, message: 'Username phải có ít nhất 3 ký tự!' }
            ]}
            className="auth-form-item"
          >
            <Input 
              className="auth-input"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được bỏ trống!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
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
