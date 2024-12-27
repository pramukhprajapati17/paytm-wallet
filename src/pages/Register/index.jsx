import React from 'react';
import { Row, Col, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // Check if password and confirm password are the same
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    // Prepare data for the API request
    const userData = {
      f_name: values.firstName,
      l_name: values.lastName,
      email: values.email,
      mobile: values.mobileNumber,
      password: values.password,
      identity: values.identificationType,
      id_number: values.identificationNo,
      address: values.address,
    };

    try {
      // Send a POST request to the server to register the user
      const response = await axios.post('http://localhost:5000/api/register', userData);
      
      if (response.status === 201) {
        message.success('Signup successful!');
        setTimeout(() => {
          navigate('/login'); // Navigate to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        // Handle errors returned by the server (e.g., email already in use)
        message.error(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        // Handle errors not returned by the server
        message.error('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className='m-5'>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">SHEYWALLET - REGISTER</h1>
        <h1
          className='text-sm underline'
          onClick={() => navigate('/login')}
        >
          Already a member? Login
        </h1>
      </div>
      <hr />
      <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item 
              label="First Name" 
              name="firstName" 
              rules={[{ required: true, message: 'Please input your first name!' }]} >
              <Input type="text" placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Last Name" 
              name="lastName" 
              rules={[{ required: true, message: 'Please input your last name!' }]} >
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[ 
                { required: true, message: 'Please input a valid email address!' }, 
                { type: 'email', message: 'Please enter a valid email!' } 
              ]}>
              <Input type="email" placeholder="example@example.com" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Mobile" 
              name="mobileNumber" 
              rules={[ 
                { required: true, message: 'Please input your mobile number!' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
              ]}>
              <Input type="text" placeholder="1234567890" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Identification Type" 
              name="identificationType" 
              rules={[{ required: true, message: 'Please select an identification type!' }]}>
              <Select>
                <Select.Option value="nationalId">National ID</Select.Option>
                <Select.Option value="passport">Passport</Select.Option>
                <Select.Option value="drivingLicense">Driving License</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Identification No." 
              name="identificationNo" 
              rules={[ 
                { required: true, message: 'Please input your identification number!' },
                { pattern: /^[A-Za-z0-9]+$/, message: 'Identification number should be alphanumeric' }
              ]}>
              <Input type="text" placeholder="123456789" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item 
              label="Address" 
              name="address" 
              rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input.TextArea placeholder="Enter your address" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Password" 
              name="password" 
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters long' },
                { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                { pattern: /[0-9]/, message: 'Password must contain at least one number' }
              ]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Confirm Password" 
              name="confirmPassword" 
              rules={[ 
                { required: true, message: 'Please confirm your password!' },
                { min: 6, message: 'Password must be at least 6 characters long' }
              ]}>
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </Col>
        </Row>
        <div className='flex justify-end'>
          <button className='primary-contained-btn' type='submit'>Register</button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
