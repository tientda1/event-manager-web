import { Form, Input, Button, Typography, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

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
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được bỏ trống!' }
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
