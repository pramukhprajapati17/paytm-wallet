import React from 'react';
import { Col, Form, Row, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
      message.success(response.data.message); // Success message from response

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/Dashboard'); // Redirect on success
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.message || 'Invalid email or password!');
      } else {
        message.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="bg flex items-center justify-center h-login">
      <div className="card w-400 p-2">
        <h1 className="text-2xl">WALLET - LOGIN</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <button className="primary-contained-btn w-30" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;