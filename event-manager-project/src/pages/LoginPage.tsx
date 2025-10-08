import { Form, Input, Button, Typography, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../components/CustomToast';
import { authenticateUser } from '../utils/authUtils';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormData) => {
    console.log('Login values:', values);
    
    // Check for empty fields first
    const errors: string[] = [];
    if (!values.email) {
      errors.push('Email không được để trống');
    }
    if (!values.password) {
      errors.push('Mật khẩu không được để trống');
    }
    
    if (errors.length > 0) {
      showErrorToast(errors);
      return;
    }
    
    // Authenticate user against registered users
    const authenticatedUser = authenticateUser(values.email, values.password);
    
    if (!authenticatedUser) {
      showErrorToast(['Email hoặc mật khẩu không tồn tại!']);
      return;
    }
    
    // Store user info in localStorage for session management
    localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
    
    showSuccessToast('Đăng nhập thành công!');
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
            Please sign in
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          initialValues={{ remember: true }}
          className="auth-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email không được để trống!' }
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
              { required: true, message: 'Mật khẩu không được để trống!' }
            ]}
            className="auth-form-item"
          >
            <Input.Password 
              className="auth-input"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="auth-form-item-remember">
            <div className="auth-remember-container">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="auth-checkbox">
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item className="auth-form-item">
            <Button 
              className="auth-button"
              type="primary" 
              htmlType="submit" 
              block
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="auth-footer">
          <Text className="auth-footer-text">
            Don't have an account, <Link className="auth-link" to="/register">click here!</Link>
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

export default LoginPage;
