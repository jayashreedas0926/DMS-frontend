// Sidebar.js
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  ReloadOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const menuItems = [
    { key: "/", label: "Dashboard", icon: <DashboardOutlined /> },
    { key: "/sale-contract", label: "Sale Contract", icon: <FileTextOutlined /> },
    { key: "/sale-order", label: "Sale Order", icon: <ShoppingCartOutlined /> },
    { key: "/sale-return", label: "Sale Return", icon: <ReloadOutlined /> },
    { key: "/delivered-status", label: "Delivered Status", icon: <FileTextOutlined /> },
    { key: "/profile", label: "Profile Settings", icon: <UserOutlined /> },
    { key: "/reports", label: "Reports", icon: <BarChartOutlined /> },
    { key: "/transactions", label: "Transactions", icon: <FileTextOutlined /> },
  ];

  return (
    <Sider
      width={250}
      className="bg-white  "
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-amber-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white text-lg font-bold">
            R
          </div>
          <div>
            <h2 className="text-base m-0 font-semibold text-amber-800">
              Ruchi Soya ERP
            </h2>
            <p className="text-xs m-0 text-amber-600">Oil Distribution</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="text-amber-800"
       
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.key} className="no-underline text-amber-800 w-full">
              {item.label}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-amber-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
            <UserOutlined className="text-amber-600 text-lg" />
          </div>
          <div>
            <p className="text-sm m-1 font-medium leading-none text-amber-800">
              Rajesh Kumar
            </p>
            <p className="text-xs m-0 text-amber-600">Administrator</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-4 ml-2 flex items-center space-x-2 text-red-500 text-sm font-medium hover:underline"
        >
          <LogoutOutlined />
          <span>Sign Out</span>
        </button>
      </div>
    </Sider>
  );
}
