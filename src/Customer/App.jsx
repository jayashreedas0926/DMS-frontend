import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import SaleContract from "./SaleContract";
import SaleOrder from "./SaleOrder";
import SaleReturn from "./SaleReturn";
import DeliverydStatus from "./DeliverydStatus";
import Reports from "./Reports";
import Transactions from "./Transaction";
import ProfileSettings from "./ProfileSettings";
import Login from "./Login";

const SIDEBAR_WIDTH = 250;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isAuthenticated ? (
          <Route
            path="/*"
            element={
              <div className="flex">
                <div className="fixed top-0 left-0 h-screen">
                  <Sidebar onLogout={handleLogout} />
                </div>
                <div
                  style={{
                    marginLeft: SIDEBAR_WIDTH,
                    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                    minHeight: "100vh",
                    background: "#f5f6fa",
                    padding: "20px",
                    overflowY: "auto",
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sale-contract" element={<SaleContract />} />
                    <Route path="/sale-order" element={<SaleOrder />} />
                    <Route path="/sale-return" element={<SaleReturn />} />
                    <Route path="/delivered-status" element={<DeliverydStatus />} />
                    <Route path="/profile" element={<ProfileSettings />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/transactions" element={<Transactions />} />
                  </Routes>
                </div>
              </div>
            }
          />
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}
