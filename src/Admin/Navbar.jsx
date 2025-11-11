// Navbar.js
import { BellOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { Badge, Avatar, Dropdown, Menu } from "antd";

const Navbar = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="h-20 bg-white shadow-sm px-6 flex items-center justify-between fixed top-0 left-72 right-0 z-20">
      <div className="flex flex-col">
        <h2 className="font-semibold text-lg mt-2 text-amber-800 leading-tight">Admin Dashboard</h2>
        <p className="text-amber-800 text-sm -mt-1">Welcome back, Rajesh 👋</p>
      </div>

      <div className="flex items-center space-x-6">
        <Badge count={3}>
          <BellOutlined className="text-xl text-amber-800 cursor-pointer" />
        </Badge>

        <Dropdown overlay={menu} placement="bottomRight">
          <div className="flex items-center cursor-pointer space-x-1">
            <Avatar size="small" icon={<UserOutlined />} className="bg-amber-100 text-amber-800" />
            <span className="font-medium text-amber-800 pl-1">Rajesh Kumar</span>
            <DownOutlined className="text-amber-800 text-sm" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
