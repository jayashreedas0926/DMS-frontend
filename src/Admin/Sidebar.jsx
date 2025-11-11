// Sidebar.js
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  TagOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Logo from "./Logo.png";

// ===== Header =====
const SidebarHeader = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `font-semibold no-underline flex items-center px-1 py-1 rounded-md ${
      location.pathname.startsWith(path)
        ? "bg-amber-100 text-amber-800"
        : "text-amber-800 hover:bg-amber-100"
    }`;

  return (
    <div className="flex flex-col items-start p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 flex-nowrap">
        <img src={Logo} className="h-12 w-34 ml-10 object-contain" alt="Logo" />
      </div>
      <div className="flex gap-2 mt-4">
        <NavLink to="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
          <DashboardOutlined className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/organisation" className={linkClasses("/admin/organisation")}>
          <ApartmentOutlined className="mr-2" />
          Organisation
        </NavLink>
      </div>
    </div>
  );
};

// ===== Menu Items =====
const menuItems = [
  {
    key: "purchase",
    label: "Purchase Module",
    path: "/admin/purchase",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "sales",
    label: "Sales Module",
    path: "/admin/sales",
    icon: <BarChartOutlined />,
  },
  {
    key: "reports",
    label: "Reports & Analytics",
    path: "/admin/reports",
    icon: <FileTextOutlined />,
  },
  {
    isSection: true,
    label: "Master Module",
  },
  {
    key: "master-product",
    label: "Product Master",
    path: "/admin/master/product",
    icon: <TagOutlined />,
  },
  {
    key: "master-business-partner",
    label: "Business Partner Master",
    path: "/admin/master/business-partner",
    icon: <TeamOutlined />,
  },
  {
    key: "master-reason",
    label: "Reason Master",
    path: "/admin/master/reason",
    icon: <QuestionCircleOutlined />,
  },
];

const SidebarMenu = () => {
  const location = useLocation();

  const getActiveKey = (pathname) => {
    if (pathname.startsWith("/admin/purchase")) return "purchase";
    if (pathname.startsWith("/admin/sales")) return "sales";
    if (pathname.startsWith("/admin/reports")) return "reports";
    if (pathname.startsWith("/admin/master/product")) return "master-product";
    if (pathname.startsWith("/admin/master/business-partner"))
      return "master-business-partner";
    if (pathname.startsWith("/admin/master/reason")) return "master-reason";
    return "";
  };

  const activeKey = getActiveKey(location.pathname);

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      style={{ background: "white", border: "none" }}
      className="
        [&_.ant-menu-item]:text-amber-800
        [&_.ant-menu-item]:font-semibold
        [&_.ant-menu-item:hover]:!bg-amber-100
        [&_.ant-menu-item-active]:!bg-amber-100
        [&_.ant-menu-item-selected]:!bg-amber-100
        [&_.ant-menu-item-selected]:!text-amber-800
        [&_.ant-menu-item .anticon]:!text-amber-800
      "
    >
      {menuItems.map((item) =>
        item.isSection ? (
          <div
            key={item.label}
            className="px-4 py-2 text-amber-800 font-semibold text-sm"
          >
            {item.label}
          </div>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.path} className="no-underline font-semibold text-amber-800">
              {item.label}
            </NavLink>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const Sidebar = () => (
  <div className="h-screen bg-white shadow-md w-72 fixed left-0 top-0 flex flex-col">
    <SidebarHeader />
    <div className="flex-1 mt-2 overflow-y-auto">
      <SidebarMenu />
    </div>
  </div>
);

export default Sidebar;
