import React from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white border border-amber-200 rounded-xl shadow p-8">
        {/* Circle logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-amber-700">
          Aum Agro Associates Admin Portal
        </h2>
        <p className="text-center text-amber-600 mb-6 text-sm">
          Enter your credentials to access the admin dashboard
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <label className="block text-sm font-medium mb-1 text-amber-700">
            Email / Username
          </label>
          <Input
            placeholder="Enter your email or username"
            className="mb-4 border border-amber-300 focus:border-amber-500"
          />

          <label className="block text-sm font-medium mb-1 text-amber-700">
            Password
          </label>
          <Input.Password
            placeholder="Enter your password"
            className="mb-2 border border-amber-300 focus:border-amber-500"
          />

          <div className="text-right mb-4">
            <a href="#" className="text-sm text-amber-600 hover:underline">
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
