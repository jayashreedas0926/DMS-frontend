import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined, TruckOutlined } from "@ant-design/icons";

export default function Login({ onLogin }) {
  const onFinish = (values) => {
    console.log("Login Success:", values);
    onLogin(); // ✅ call parent to set logged in
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <div className="bg-amber-500 text-white rounded-full p-3">
            <TruckOutlined className="text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-amber-700">Transport Portal</h2>
        <p className="text-amber-600 mb-6">
          Sign in to your transport management account
        </p>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined className="text-amber-500" />}
              placeholder="Enter your email"
              className="border-amber-300 focus:border-amber-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-amber-500" />}
              placeholder="Enter your password"
              className="border-amber-300 focus:border-amber-500"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-amber-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
