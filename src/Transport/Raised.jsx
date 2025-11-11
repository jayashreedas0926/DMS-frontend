import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, Select, DatePicker, Tag } from "antd";
import { TruckOutlined, UserOutlined, EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

export default function Raised() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("assign");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const initialInvoices = [
    {
      id: "INV-2024-001",
      client: "ABC Manufacturing",
      value: 45000,
      frequency: "Weekly",
      status: "Out for Delivery",
      driver: "John Smith",
      truck: "TRK-001",
      contact: "+1-555-1234",
      location: "Mumbai Warehouse",
      destination: "Delhi Factory",
      eta: "2024-09-25",
    },
    {
      id: "INV-2024-002",
      client: "XYZ Logistics",
      value: 32000,
      frequency: "Monthly",
      status: "In-Factory",
      driver: "Mike Johnson",
      truck: "TRK-002",
      contact: "+1-555-0124",
      location: "Chennai Port",
      destination: "Bangalore Hub",
      eta: "2024-09-24",
    },
    {
      id: "INV-2024-003",
      client: "PQR Industries",
      value: 28000,
      frequency: "Weekly",
      status: "Unassigned",
    },
  ];

  const [invoices, setInvoices] = useState(initialInvoices);

  const openModal = (type, invoice) => {
    setModalType(type);
    setSelectedInvoice(invoice);
    setIsModalOpen(true);

    if (type === "edit") {
      form.setFieldsValue({
        truck: invoice.truck || undefined,
        driver: invoice.driver || undefined,
        contact: invoice.contact || "",
        location: invoice.location || "",
        destination: invoice.destination || "",
        eta: invoice.eta ? dayjs(invoice.eta) : null,
        status: invoice.status || undefined,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const onFinish = (values) => {
    const updatedInvoice = {
      ...selectedInvoice,
      ...values,
      eta: values.eta ? values.eta.format("YYYY-MM-DD") : undefined,
    };

    setInvoices((prev) =>
      prev.map((inv) => (inv.id === selectedInvoice.id ? updatedInvoice : inv))
    );

    handleCancel();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Out for Delivery":
        return "orange";
      case "Delivered":
        return "green";
      case "Pending":
        return "red";
      case "Unassigned":
        return "default";
      default:
        return "blue";
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-900">Invoices Raised</h2>
        <Button type="link" className="text-amber-700">{invoices.length} Invoices</Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="rounded-xl shadow-sm border border-amber-200">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-amber-900">{invoice.id}</h3>
              <Tag color={getStatusColor(invoice.status)}>
                {invoice.status || "Unassigned"}
              </Tag>
            </div>

            <p className="text-amber-700">{invoice.client}</p>

            <div className="mt-3">
              <p>
                <span className="text-amber-500">Total Value: </span>
                <span className="text-amber-700 font-medium">₹{(invoice.value || 0).toLocaleString()}</span>
              </p>
              <p>
                <span className="text-amber-500">Frequency: </span>
                <Tag className="bg-amber-100 text-amber-700">{invoice.frequency}</Tag>
              </p>
            </div>

            {invoice.status !== "Unassigned" && (
              <div className="mt-3 space-y-1 text-amber-800">
                <p className="flex items-center gap-2"><TruckOutlined className="text-amber-500" /> {invoice.truck}</p>
                <p className="flex items-center gap-2"><UserOutlined className="text-amber-500" /> {invoice.driver}</p>
                <p className="flex items-center gap-2"><EnvironmentOutlined className="text-amber-500" /> {invoice.location} → {invoice.destination}</p>
                <p className="flex items-center gap-2"><CalendarOutlined className="text-amber-500" /> ETA: {invoice.eta}</p>
              </div>
            )}

            <div className="mt-4">
              <Button
                type="default"
                block
                className={
                  invoice.status === "Unassigned"
                    ? "border border-amber-500 text-amber-700 hover:bg-amber-100"
                    : "bg-amber-500 hover:bg-amber-600 text-white"
                }
                onClick={() => openModal(invoice.status === "Unassigned" ? "assign" : "edit", invoice)}
              >
                {invoice.status === "Unassigned" ? "Assign" : "Edit Assignment"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={<span className="text-amber-900">{modalType === "assign" ? "Assign Invoice" : "Edit Assignment"}</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={false}
      >
        {selectedInvoice && (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="bg-amber-100 p-3 rounded-md mb-4 text-amber-900">
              <p><strong>Invoice Number:</strong> {selectedInvoice.id}</p>
              <p><strong>Client:</strong> {selectedInvoice.client}</p>
              <p><strong>Total Value:</strong> ₹{(selectedInvoice.value || 0).toLocaleString()}</p>
              <p><strong>Frequency:</strong> {selectedInvoice.frequency}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item label={<span className="text-amber-800">Truck Details</span>} name="truck">
                <Select placeholder="Select truck" className="text-amber-900">
                  <Option value="TRK-001">TRK-001</Option>
                  <Option value="TRK-002">TRK-002</Option>
                  <Option value="TRK-003">TRK-003</Option>
                </Select>
              </Form.Item>

              <Form.Item label={<span className="text-amber-800">Driver Name</span>} name="driver">
                <Select placeholder="Select driver" className="text-amber-900">
                  <Option value="John Smith">John Smith</Option>
                  <Option value="Mike Johnson">Mike Johnson</Option>
                  <Option value="Sarah Wilson">Sarah Wilson</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item label={<span className="text-amber-800">Driver Contact</span>} name="contact">
              <Input placeholder="Driver contact number"/>
            </Form.Item>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item label={<span className="text-amber-800">Location</span>} name="location">
                <Input placeholder="Pickup location" />
              </Form.Item>

              <Form.Item label={<span className="text-amber-800">Destination</span>} name="destination">
                <Input placeholder="Delivery destination" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item label={<span className="text-amber-800">Estimated Delivery Date</span>} name="eta">
                <DatePicker className="w-full text-amber-900" />
              </Form.Item>

              <Form.Item label={<span className="text-amber-800">Status</span>} name="status">
                <Select placeholder="Select status" className="text-amber-900">
                  <Option value="In-Factory">In-Factory</Option>
                  <Option value="Out for Delivery">Out for Delivery</Option>
                  <Option value="Delivered">Delivered</Option>
                  <Option value="Purchase Transit">Purchase Transit</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={handleCancel} className="text-amber-900 border border-amber-400 hover:bg-amber-100">Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
                {modalType === "assign" ? "Assign" : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
}
