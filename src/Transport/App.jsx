import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Status from "./Status";
import Raised from "./Raised";
import FollowedUp from "./FollowedUp";
import Cleared from "./Cleared";
import Pending from "./Pending";
import Profile from "./Profile";
import Login from "./Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar onLogout={() => setIsLoggedIn(false)} />

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/status" element={<Status />} />
                <Route path="/raised" element={<Raised />} />
                <Route path="/followed-up" element={<FollowedUp />} />
                <Route path="/cleared" element={<Cleared />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}
