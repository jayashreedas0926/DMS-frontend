// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-72 flex-1">
        <Navbar />
        <div className="pt-20 px-6">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
