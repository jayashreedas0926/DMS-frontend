import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    console.log("Login values:", values);
    onLogin();
    message.success("Login successful ✅");
    navigate("/");
  };

  const handleGoogleLogin = () => {
    console.log("Google Login clicked");
    onLogin();
    message.success("Logged in with Google ✅");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white border border-amber-200 rounded-xl shadow-md p-8">
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-2xl">
              R
            </div>
          </div>
          <h1 className="text-2xl font-bold text-amber-700">Ruchi Soya ERP</h1>
          <p className="text-amber-600 text-sm">Oil Distribution System</p>
        </div>

        {/* Welcome */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-amber-700">Welcome Back</h2>
          <p className="text-amber-500 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="Enter your email"
              className="border border-amber-300 focus:border-amber-500"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="border border-amber-300 focus:border-amber-500"
            />
          </Form.Item>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-amber-700">Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-amber-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign in */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-10 font-semibold bg-amber-500 hover:bg-amber-600 text-white border border-amber-500"
              style={{ boxShadow: "none" }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-amber-200"></div>
          <span className="px-2 text-sm text-amber-500">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-amber-200"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full h-10 font-medium flex items-center justify-center border border-amber-300 hover:bg-amber-100 text-amber-700"
          style={{ boxShadow: "none" }}
        >
          {/* Google Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.47 2.58 30.1 0 24 0 14.63 0 6.51 5.38 2.55 13.22l7.98 6.2C12.66 13.39 17.91 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.6c0-1.6-.14-3.11-.39-4.6H24v9.05h12.55c-.55 2.96-2.17 5.46-4.65 7.14l7.44 5.78C43.88 37.58 46.1 31.55 46.1 24.6z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.58c-1.25-2.96-1.25-6.2 0-9.16l-7.98-6.2c-3.4 6.74-3.4 14.82 0 21.56l7.98-6.2z"
            />
            <path
              fill="#EA4335"
              d="M24 47c6.1 0 11.47-2.01 15.29-5.5l-7.44-5.78c-2.07 1.4-4.72 2.23-7.85 2.23-6.09 0-11.34-3.89-13.47-9.52l-7.98 6.2C6.51 42.62 14.63 47 24 47z"
            />
          </svg>
          Sign in with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-amber-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="font-medium text-amber-700 hover:underline">
            Contact administrator
          </a>
        </p>
      </div>
    </div>
  );
}
