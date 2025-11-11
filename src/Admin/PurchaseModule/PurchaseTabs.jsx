import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { FaBoxOpen, FaFileInvoice, FaTruck, FaUndo, FaTachometerAlt , FaPaperPlane} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import PurchaseSouda from "./PurchaseSouda";
import PurchaseIndent from "./PurchaseIndent";
import DeliveryStatus from "./DeliveryStatus";
import PurchaseInvoice from "./PurchaseInvoice";
import PurchaseReturn from "./PurchaseReturn";
import LoadingAdvice from "./LoadingAdvice";
import PurchaseDashboard from "./PurchaseDashboard";

export default function PurchaseModule() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabKeyToPath = {
    "0": "",         
    "1": "souda",
    "2": "indent",
    "3": "invoice",
    "4": "loading",
    "5": "return",
    "6":"status"
  };

  const pathToTabKey = {
    "": "0",          
    "souda": "1",
    "indent": "2",
    "invoice": "3",
    "loading": "4",
    "return": "5",
    "status":"6"
  };

  const pathParts = location.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];

  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (pathToTabKey[lastPart]) {
      setActiveKey(pathToTabKey[lastPart]);
    } else {
      setActiveKey("0"); 
    }
  }, [lastPart]);

  const handleChange = (key) => {
    setActiveKey(key);
    navigate(`/admin/purchase/${tabKeyToPath[key]}`);
  };

  const tabItems = [
    { key: "0", label: <><FaTachometerAlt className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Dashboard</span></>, children: <PurchaseDashboard /> },
    { key: "1", label: <><FaBoxOpen className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Purchase Souda</span></>, children: <PurchaseSouda /> },
    { key: "2", label: <><FaFileInvoice className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Purchase Indent</span></>, children: <PurchaseIndent /> },   
    { key: "3", label: <><FaFileInvoice className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Purchase Invoice</span></>, children: <PurchaseInvoice /> }, 
    {key:"6", label:<><FaPaperPlane className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Loading Advice</span></>, children: <LoadingAdvice />},
    { key: "4", label: <><FaTruck className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Deliver Status</span></>, children: <DeliveryStatus /> },
    { key: "5", label: <><FaUndo className="inline mr-2 text-amber-500" /> <span className="text-amber-500">Purchase Return</span></>, children: <PurchaseReturn /> },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl text-amber-800 font-bold mb-1">Purchase Module</h1>
      <p className="text-amber-700 mb-4">
        Manage purchase contracts, indents, transit, invoices and returns
      </p>

      <div className="mb-6">
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
