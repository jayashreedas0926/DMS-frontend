import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function Login({ setIsAuth }) {
  const onFinish = () => setIsAuth(true);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email Address" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/" className="text-blue-500">Forgot password?</a>
          </div>

          <Button type="primary" htmlType="submit" block>Sign In</Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <Button icon={<GoogleOutlined />} block>Sign up with Google</Button>

        <p className="text-center mt-4 text-gray-500">
          Don’t have an account? <a href="/" className="text-blue-500">Contact administrator</a>
        </p>
      </div>
    </div>
  );
}
