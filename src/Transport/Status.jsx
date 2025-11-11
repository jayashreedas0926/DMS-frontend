// InvoiceStatus.jsx
import React, { useState } from "react";
import { Table, Tag, Modal, Card } from "antd";
import {
  EyeOutlined,
  TruckOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

export default function InvoiceStatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    {
      id: "INV-2024-001",
      client: "ABC Manufacturing",
      truck: "TRK-001",
      driver: "John Smith",
      driverPhone: "+1-555-0123",
      routeFrom: "Mumbai Warehouse",
      routeTo: "Delhi Factory",
      status: "Out for Delivery",
      eta: "2024-09-25",
      value: "₹45,000",
      frequency: "Weekly",
      assignmentStatus: "Assigned",
    },
    {
      id: "INV-2024-002",
      client: "XYZ Logistics",
      truck: "TRK-002",
      driver: "Mike Johnson",
      driverPhone: "+1-555-0124",
      routeFrom: "Chennai Port",
      routeTo: "Bangalore Hub",
      status: "In-Factory",
      eta: "2024-09-24",
      value: "₹32,000",
      frequency: "Weekly",
      assignmentStatus: "Assigned",
    },
    {
      id: "INV-2024-004",
      client: "LMN Enterprises",
      truck: "TRK-003",
      driver: "Sarah Wilson",
      driverPhone: "+1-555-0125",
      routeFrom: "Pune Facility",
      routeTo: "Hyderabad Center",
      status: "Delivered",
      eta: "2024-09-26",
      value: "₹55,000",
      frequency: "Weekly",
      assignmentStatus: "Assigned",
    },
  ];

  const columns = [
    {
      title: <span className="text-amber-800 font-semibold">Invoice #</span>,
      dataIndex: "id",
      render: (text) => (
        <a className="text-amber-600 font-medium hover:underline">{text}</a>
      ),
    },
    {
      title: <span className="text-amber-800 font-semibold">Client</span>,
      dataIndex: "client",
      render: (text) => <span className="text-amber-700">{text}</span>,
    },
    {
      title: <span className="text-amber-800 font-semibold">Assigned Truck</span>,
      dataIndex: "truck",
      render: (text) => (
        <span className="text-amber-700">
          <TruckOutlined className="mr-2 text-amber-500" />
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-amber-800 font-semibold">Driver</span>,
      dataIndex: "driver",
      render: (text) => <span className="text-amber-700">{text}</span>,
    },
    {
      title: <span className="text-amber-800 font-semibold">Route</span>,
      render: (_, record) => (
        <span className="text-amber-700">
          {record.routeFrom}
          <br />
          <span className="text-amber-500 text-sm">→ {record.routeTo}</span>
        </span>
      ),
    },
    {
      title: <span className="text-amber-800 font-semibold">Status</span>,
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "Delivered"
            ? "green"
            : status === "In-Factory"
            ? "blue"
            : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: <span className="text-amber-800 font-semibold">ETA</span>,
      dataIndex: "eta",
      render: (text) => <span className="text-amber-700">{text}</span>,
    },
    {
      title: <span className="text-amber-800 font-semibold">Value</span>,
      dataIndex: "value",
      render: (val) => <span className="text-green-600 font-semibold">{val}</span>,
    },
    {
      title: <span className="text-amber-800 font-semibold">Actions</span>,
      render: (_, record) => (
        <button
          className="text-amber-500  ml-5"
          onClick={() => {
            setSelectedInvoice(record);
            setIsModalOpen(true);
          }}
        >
          <EyeOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-amber-800">Status Overview</h2>
      <Card >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-700">
          <TruckOutlined /> Invoice Status & Truck Details
        </h3>
        <Table
          columns={columns}
          dataSource={invoices}
          pagination={false}
          rowKey="id"
          bordered
        />
      </Card>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1000}
        className="rounded-xl"
        bodyStyle={{ padding: "20px" }}
      >
        {selectedInvoice && (
          <div className="grid grid-cols-2 gap-6 text-amber-800">
            {/* Left: Invoice Info */}
            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-amber-700">
                Invoice Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-amber-500">Invoice Number</p>
                  <p className="font-medium text-amber-700">{selectedInvoice.id}</p>
                </div>
                <div>
                  <p className="text-amber-500">Client Name</p>
                  <p className="font-medium text-amber-700">{selectedInvoice.client}</p>
                </div>
                <div>
                  <p className="text-amber-500">Total Value</p>
                  <p className="font-medium text-green-600">
                    <DollarOutlined /> {selectedInvoice.value}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Frequency</p>
                  <Tag color="amber">{selectedInvoice.frequency}</Tag>
                </div>
              </div>
            </Card>

            {/* Right: Assignment Details */}
            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-amber-700">
                Assignment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-amber-500">Assigned Truck</p>
                  <p>
                    <TruckOutlined className="mr-2 text-amber-600" />
                    {selectedInvoice.truck}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Pickup Location</p>
                  <p>
                    <EnvironmentOutlined className="mr-2 text-green-600" />
                    {selectedInvoice.routeFrom}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Driver Name</p>
                  <p>
                    <UserOutlined className="mr-2 text-amber-600" />
                    {selectedInvoice.driver}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Destination</p>
                  <p>
                    <EnvironmentOutlined className="mr-2 text-red-600" />
                    {selectedInvoice.routeTo}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Driver Contact</p>
                  <p>
                    <PhoneOutlined className="mr-2 text-amber-600" />
                    {selectedInvoice.driverPhone}
                  </p>
                </div>
                <div>
                  <p className="text-amber-500">Estimated Delivery</p>
                  <p>
                    <CalendarOutlined className="mr-2 text-amber-600" />
                    {selectedInvoice.eta}
                  </p>
                </div>
              </div>
            </Card>

            {/* Left: Current Status */}
            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-amber-700">
                Current Status
              </h3>
              <div className="flex justify-between">
                <div>
                  <p className="text-amber-500">Delivery Status</p>
                  <Tag color="orange">{selectedInvoice.status}</Tag>
                </div>
                <div>
                  <p className="text-amber-500">Assignment Status</p>
                  <Tag color="green">{selectedInvoice.assignmentStatus}</Tag>
                </div>
              </div>
            </Card>

            {/* Right: Route Info */}
            <Card className="shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-amber-700">
                Route Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex flex-col items-center w-1/2">
                  <span className="text-green-500 text-lg">●</span>
                  <p className="text-amber-500 text-sm">From</p>
                  <p className="font-medium text-green-500">{selectedInvoice.routeFrom}</p>
                </div>

                <div className="flex items-center justify-center w-1/3 relative">
                  <span className="absolute left-0 top-1/2 w-full border-t border-gray-300"></span>
                  <TruckOutlined className="relative bg-white px-2 text-blue-500 text-xl" />
                </div>

                <div className="flex flex-col items-center w-1/3">
                  <span className="text-red-500 text-lg">●</span>
                  <p className="text-amber-500 text-sm">To</p>
                  <p className="font-medium text-red-500">{selectedInvoice.routeTo}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}
