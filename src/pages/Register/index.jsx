import React from 'react'
import { Row, Col, Form, Input,Select } from 'antd'
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Recieved values of form",values);
  };
  return (
      <div className='m-5'>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">SHEYWALLET - REGISTER</h1>

          <h1 className='text-sm underline'
          onClick={()=>navigate('/login')}>Already member, login</h1>
        </div>  
          <hr/>
          <Form layout='vertical' onFinish={onFinish}>
              <Row gutter={16}>
                  <Col span={6}>
                      <Form.Item label="First Name" name="firstName">
                          <Input type="text" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="Last Name" name="lastName">
                          <Input type="text" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="Email" name="email">
                          <Input type="text" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="Mobile" name="mobileNumber">
                          <Input type="text" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="Password" name="password">
                          <select type="password">
                            <option value="nationalId">National Id</option>
                            <option value="passport">Passport</option>
                            <option value="drivingLisance">Driving Lisance</option>
                          </select>

                      </Form.Item>
                      
                  </Col>
                  <Col span={6}>
                      <Form.Item label="Identification No." name="identification">
                          <Input type="text" />
                      </Form.Item>
                  </Col>
                  <Col span={24}>
                      <Form.Item label="Address" name="address">
                          <textarea type="textarea" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="password" name="password">
                          <Input type="password" />
                      </Form.Item>
                  </Col>
                  <Col span={6}>
                      <Form.Item label="confirm password" name="confirm password">
                          <Input type="password" />
                      </Form.Item>
                  </Col>
              </Row>
              <div className='flex justify-end'>
                  <button className='primary-contained-btn' type='submit'>Register</button>
              </div>
          </Form>
      </div>
  )
  }
export default Register