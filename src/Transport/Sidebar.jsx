import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  EyeOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  return (
    <div className="h-screen w-64 bg-white  flex flex-col justify-between">
      {/* Logo / Title */}
      <div>
        <div className="p-4 font-bold text-3xl text-amber-700 flex items-center gap-2">
          <TruckOutlined className="text-amber-700 text-3xl" /> Transport
        </div>

        {/* Menu */}
        <Menu
          mode="inline"
          defaultSelectedKeys={["/"]}
          className="border-none bg-white"
          style={{ borderRight: "none" }}
          items={[
            {
              key: "/",
              icon: <DashboardOutlined className="text-amber-700" />,
              label: <NavLink to="/" className="no-underline text-amber-900 hover:text-amber-600">Dashboard</NavLink>
            },
            {
              key: "/status",
              icon: <BarChartOutlined className="text-amber-700" />,
              label: <NavLink to="/status" className="no-underline text-amber-900 hover:text-amber-600">Status</NavLink>
            },
            {
              key: "/raised",
              icon: <DollarOutlined className="text-amber-700" />,
              label: <NavLink to="/raised" className="no-underline text-amber-900 hover:text-amber-600">Invoices Raised</NavLink>
            },
            {
              key: "/followed-up",
              icon: <EyeOutlined className="text-amber-700" />,
              label: <NavLink to="/followed-up" className="no-underline text-amber-900 hover:text-amber-600">Followed Up Invoices</NavLink>
            },
            {
              key: "/cleared",
              icon: <CheckCircleOutlined className="text-amber-700" />,
              label: <NavLink to="/cleared" className="no-underline text-amber-900 hover:text-amber-600">Cleared Invoice</NavLink>
            },
            {
              key: "/pending",
              icon: <ClockCircleOutlined className="text-amber-700" />,
              label: <NavLink to="/pending" className="no-underline text-amber-900 hover:text-amber-600">Pending Invoice</NavLink>
            },
            {
              key: "/profile",
              icon: <SettingOutlined className="text-amber-700" />,
              label: <NavLink to="/profile" className="no-underline text-amber-900 hover:text-amber-600">Profile Settings</NavLink>
            }
          ]}
        />
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-amber-200">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 font-medium hover:text-red-200"
        >
          <LogoutOutlined /> Sign Out
        </button>
      </div>
    </div>
  );
}
