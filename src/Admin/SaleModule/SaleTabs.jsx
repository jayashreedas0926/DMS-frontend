import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { FaBoxOpen, FaFileInvoice, FaTruck, FaUndo, FaTachometerAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SaleSouda from "./SaleSouda";
import SaleOrders from "./SaleOrdersInvoice";
import SaleReturn from "./SaleReturn";
import DeliveryStatus from "./DeliveryStatus";
import SaleDashboard from "./SaleDashboard"; 

export default function SaleTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabKeyToPath = {
    "0": "",         
    "1": "souda",
    "2": "orders",
    "3": "status",
    "4": "return",
  };

  const pathToTabKey = {
    "": "0",         
    "souda": "1",
    "orders": "2",
    "status": "3",
    "return": "4",
  };

  const currentPath = location.pathname.split("/").pop();
  const [activeKey, setActiveKey] = useState(pathToTabKey[currentPath] || "0");

  useEffect(() => {
    if (pathToTabKey[currentPath]) {
      setActiveKey(pathToTabKey[currentPath]);
    } else {
      setActiveKey("0");
      navigate("/admin/sales", { replace: true });
    }
  }, [currentPath, navigate]);

  const handleChange = (key) => {
    setActiveKey(key);
    navigate(`/admin/sales/${tabKeyToPath[key]}`);
  };

  const tabItems = [
    { key: "0", label: <><FaTachometerAlt className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Dashboard</span></>, children: <SaleDashboard /> },
    { key: "1", label: <><FaBoxOpen className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Sale Souda</span></>, children: <SaleSouda /> },
    { key: "2", label: <><FaFileInvoice className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Sale Orders & Invoice</span></>, children: <SaleOrders /> },
    { key: "3", label: <><FaTruck className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Delivery Status</span></>, children: <DeliveryStatus /> },
    { key: "4", label: <><FaUndo className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Sale Return</span></>, children: <SaleReturn /> },
  ];

  return (
    <div className="p-2 mt-4 h-[625px] w-full overflow-auto rounded">
      <h1 className="text-2xl font-bold text-amber-800 mb-0">Sales Module</h1>
      <p className="text-amber-700 mb-3">Manage your sales data</p>
      <div className="overflow-auto">
        <Tabs 
          activeKey={activeKey} 
          onChange={handleChange} 
          items={tabItems} 
          destroyInactiveTabPane={false} 
        />
      </div>
    </div>
  );
}
