import React, { useState } from "react";
import { Row, Col, Table, Input, Button, Modal, Form, Select, DatePicker } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import moment from "moment";

const initialUserData = [
  {
    key: 1,
    userName: "ADMIN",
    password: "******",
    userType: "Administrator",
    fullName: "KOUSHAL",
    designation: "ADMIN",
    privilegeUser: "ADMIN",
    privilegeType: "Permanent",
    startDate: null,
    endDate: null,
    moduleName: ["Assets"],
    subModule: { Assets: ["Master"] },
  },
  {
    key: 2,
    userName: "AJIT",
    password: "******",
    userType: "User",
    fullName: "AJIT KU DAS",
    designation: "USER",
    privilegeUser: "AJIT",
    privilegeType: "Temporary",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    moduleName: ["Payroll"],
    subModule: { Payroll: ["Report"] },
  },
];

export default function UserCreationMaster() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [viewForm] = Form.useForm();
  const [data, setData] = useState(initialUserData);
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedSubModules, setSelectedSubModules] = useState({});
   const [privilegeType, setPrivilegeType] = useState("Permanent");

// Inside renderFormFields
  const moduleOptions = {
    Admin: ["Organisation", "Profile Setting", "User & Role"],
    Purchase: [
      "Purchase Souda",
      "Purchase Indent",
      "Purchase Transit",
      "Purchase Invoice",
      "Purchase Return",
    ],
    Sale: ["Sale Souda", "Sale Indent", "Sale Transit", "Sale Invoice", "Sale Return"],
    Assets: ["Reports & Analytics"],
    Master: ["Product Master", "Business Partner Master", "Reason Master"],
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      typeof val === "string"
        ? val.toLowerCase().includes(searchText.toLowerCase())
        : Array.isArray(val)
        ? val.join(" ").toLowerCase().includes(searchText.toLowerCase())
        : typeof val === "object"
        ? Object.values(val)
            .flat()
            .join(" ")
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : false
    )
  );

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">User Name</span>,
      dataIndex: "userName",
      width: 100,
      render: (text, record) => (
        <span className="text-amber-800">
          {text} {record.privilegeType === "Temporary" ? "(T)" : "(P)"}
        </span>
      ),
    },
 
    {
      title: <span className="text-amber-700 font-semibold">Validity</span>,
      dataIndex: "startDate",
      width: 100,
      render: (start, record) =>
    record.privilegeType === "Temporary" ? (
      <span className="text-amber-700">
        {record.startDate} - {record.endDate}
      </span>
    ) : (
      <span className="text-amber-700">-</span>
    ),
    },
    {
      title: <span className="text-amber-700 font-semibold">User Type</span>,
      dataIndex: "userType",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Full Name</span>,
      dataIndex: "fullName",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Designation</span>,
      dataIndex: "designation",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Privilege User</span>,
      dataIndex: "privilegeUser",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Module</span>,
      dataIndex: "moduleName",
      width: 100,
      render: (modules) => <span className="text-amber-800">{modules.join(", ")}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Sub-Module</span>,
      dataIndex: "subModule",
      width: 100,
      render: (subModule) => (
        <span className="text-amber-800">
          {Object.entries(subModule || {})
            .map(([mod, subs]) => ` ${subs.join(", ")}`)
            .join("; ")}
        </span>
      ),
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
       width: 80,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue({
                ...record,
                startDate: record.startDate ? moment(record.startDate) : null,
                endDate: record.endDate ? moment(record.endDate) : null,
              });
              setSelectedModules(record.moduleName);
              setSelectedSubModules(record.subModule);
              setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              form.setFieldsValue({
                ...record,
                startDate: record.startDate ? moment(record.startDate) : null,
                endDate: record.endDate ? moment(record.endDate) : null,
              });
              setSelectedModules(record.moduleName);
              setSelectedSubModules(record.subModule);
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleFormSubmit = (values) => {
    const formattedData = {
      ...values,
      moduleName: selectedModules,
      subModule: selectedSubModules,
      startDate:
        values.privilegeType === "Temporary" && values.startDate
          ? values.startDate.format("YYYY-MM-DD")
          : null,
      endDate:
        values.privilegeType === "Temporary" && values.endDate
          ? values.endDate.format("YYYY-MM-DD")
          : null,
    };
    if (isEditModalOpen) {
      setData((prev) =>
        prev.map((item) =>
          item.key === selectedRecord.key
            ? { ...formattedData, key: item.key }
            : item
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        { ...formattedData, key: prev.length + 1 },
      ]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const renderFormFields = (disabled = false) => (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter User Name" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter Password" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="User Type"
            name="userType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select User Type" disabled={disabled}>
              <Select.Option value="Administrator">Administrator</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Full Name" name="fullName">
            <Input placeholder="Enter Full Name" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Designation" name="designation">
            <Input placeholder="Enter Designation" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Privilege User"
            name="privilegeUser"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Privilege User" disabled={disabled}>
              <Select.Option value="HR">HR</Select.Option>
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

 <Row gutter={16}>
  <Col span={12}>
    <Form.Item
      label="Privilege Type"
      name="privilegeType"
      rules={[{ required: true }]}
    >
      <Select
        placeholder="Select Privilege Type"
        disabled={disabled}
        value={privilegeType}
        onChange={(value) => {
          setPrivilegeType(value);
          if (value === "Permanent") {
            form.setFieldsValue({ startDate: null, endDate: null });
          }
        }}
      >
        <Select.Option value="Permanent">Permanent</Select.Option>
        <Select.Option value="Temporary">Temporary</Select.Option>
      </Select>
    </Form.Item>
  </Col>

  <Col span={6}>
    <Form.Item
      label="Start Date"
      name="startDate"
      rules={[
        {
          required: privilegeType === "Temporary" && !disabled,
          message: "Select Start Date",
        },
      ]}
    >
      <DatePicker
        style={{ width: "100%" }}
        disabled={disabled || privilegeType !== "Temporary"}
      />
    </Form.Item>
  </Col>

  <Col span={6}>
    <Form.Item
      label="End Date"
      name="endDate"
      rules={[
        {
          required: privilegeType === "Temporary" && !disabled,
          message: "Select End Date",
        },
      ]}
    >
      <DatePicker
        style={{ width: "100%" }}
        disabled={disabled || privilegeType !== "Temporary"}
      />
    </Form.Item>
  </Col>
</Row>


      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Module Name"
            name="moduleName"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              placeholder="Select Modules"
              disabled={disabled}
              value={selectedModules}
              onChange={(modules) => {
                setSelectedModules(modules);
                const updatedSubModules = { ...selectedSubModules };
                Object.keys(updatedSubModules).forEach((mod) => {
                  if (!modules.includes(mod)) delete updatedSubModules[mod];
                });
                setSelectedSubModules(updatedSubModules);
              }}
            >
              {Object.keys(moduleOptions).map((mod) => (
                <Select.Option key={mod} value={mod}>
                  {mod}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {selectedModules.map((mod) => (
        <Row gutter={16} key={mod}>
          <Col span={24}>
            <Form.Item
              label={`Sub-Module for ${mod}`}
              name={["subModule", mod]}
              rules={[
                {
                  required: true,
                  message: `Select at least one sub-module for ${mod}`,
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={`Select Sub-Modules for ${mod}`}
                disabled={disabled}
                value={selectedSubModules[mod] || []}
                onChange={(subs) => {
                  setSelectedSubModules((prev) => ({
                    ...prev,
                    [mod]: subs,
                  }));
                }}
              >
                {(moduleOptions[mod] || []).map((sub) => (
                  <Select.Option key={sub} value={sub}>
                    {sub}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ))}
    </>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className="w-64 text-amber-700 placeholder-amber-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            icon={<FilterOutlined />}
            className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200"
            onClick={() => setSearchText("")}
          >
            Reset
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<DownloadOutlined />}
            className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200"
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-amber-500 border-amber-500 hover:bg-amber-600"
            onClick={() => {
              form.resetFields();
              setSelectedModules([]);
              setSelectedSubModules({});
              setIsAddModalOpen(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-0 text-amber-700">
          User Creation Records
        </h2>
        <p className="text-amber-600 mb-3">Manage your system users</p>
        <Table columns={columns}
         dataSource={filteredData} 
        pagination={false}
          scroll={{ y: 200 }}
          className="custom-scroll-table mb-0" />
      </div>
      <Modal
        title={
          <span className="text-amber-700 font-semibold">
            {isEditModalOpen ? "Edit User" : "Add New User"}
          </span>
        }
        open={isAddModalOpen || isEditModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
        }}
        footer={null}
        width={700}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          {renderFormFields(false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
              }}
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 border-amber-500 hover:bg-amber-600"
            >
              {isEditModalOpen ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        title={<span className="text-amber-700 font-semibold">View User</span>}
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={700}
      >
        <Form layout="vertical" form={viewForm}>
          {renderFormFields(true)}
        </Form>
      </Modal>
    </div>
  );
}
