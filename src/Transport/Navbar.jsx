import React from "react";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";

export default function Navbar() {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-amber-50 ">
      {/* Left Heading */}
      <h1 className="text-xl font-semibold text-amber-700">
        TransportCorp Portal
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 border border-amber-300 rounded px-3 py-1 w-80 bg-amber-100">
          <SearchOutlined className="text-amber-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="outline-none w-full bg-transparent text-amber-900 placeholder-amber-500"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <BellOutlined className="text-xl cursor-pointer text-amber-700" />
          <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="font-semibold leading-tight m-0 text-amber-900">John Administrator</p>
            <p className="text-xs m-0 text-amber-600">Operations Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-semibold">
            JA
          </div>
        </div>
      </div>
    </div>
  );
}
