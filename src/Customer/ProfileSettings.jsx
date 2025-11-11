// ProfileSettings.jsx (Amber Themed)
import React, { useState } from "react";
import { Tabs, Form, Input, Button, Upload, Switch } from "antd";
import {
  UserOutlined,
  BellOutlined,
  SafetyOutlined,
  ApartmentOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

// =================== JSON DATA ===================
const profileData = {
  personalInfo: {
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@ruchisoya.com",
    phone: "+91 9876543210",
    position: "System Administrator",
    department: "IT Department",
    bio: "Experienced system administrator with 5+ years in ERP systems management for edible oil distribution.",
    avatarInitials: "RK",
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    reports: true,
  },
  security: {
    twoFactor: true,
    loginAlerts: false,
    sessionTimeout: 30,
  },
  company: {
    name: "Ruchi Soya Industries Ltd.",
    address: "Plot No. 15, Industrial Estate, Bhubaneswar, Odisha 751010",
  },
};

// =================== COMPONENT ===================
export default function ProfileSettings() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(profileData);

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold text-amber-700">Profile Settings</h1>
      <p className="text-amber-600">
        Manage your account settings and preferences
      </p>

      {/* Tabs */}
      <div className="mt-2 bg-white p-3 rounded-lg shadow-sm">
        <Tabs defaultActiveKey="1" tabBarGutter={40}>
          {/* Profile Tab */}
          <TabPane
            tab={
              <span className="text-amber-700">
                <UserOutlined /> Profile
              </span>
            }
            key="1"
           >
            <div className="p-2">
              <h2 className="font-semibold text-lg mb-0 text-amber-700">
                Personal Information
              </h2>
              <p className="text-amber-600 mb-4">
                Update your personal details and profile information
              </p>

              {/* Avatar */}
              <div className="flex items-start mb-3 space-x-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-lg font-medium text-amber-700">
                  {profile.personalInfo.avatarInitials}
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-3">
                    <Upload>
                      <Button
                        type="default"
                        className="border-amber-500 text-amber-700"
                      >
                        Change Photo
                      </Button>
                    </Upload>

                    <Button type="default" danger>
                      Remove
                    </Button>
                  </div>
                  <p className="text-amber-500 text-sm">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Form */}
             <Form
  layout="vertical"
  form={form}
  initialValues={profile.personalInfo}
>
  <div className="grid grid-cols-3 gap-4">
    <Form.Item
      label={<span className="text-amber-700">First Name</span>}
      name="firstName"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={<span className="text-amber-700">Last Name</span>}
      name="lastName"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={<span className="text-amber-700">Email Address</span>}
      name="email"
    >
      <Input />
    </Form.Item>
  </div>

  {/* Second Row: Phone, Position, Department */}
  <div className="grid grid-cols-3 gap-4">
    <Form.Item
      label={<span className="text-amber-700">Phone Number</span>}
      name="phone"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={<span className="text-amber-700">Position</span>}
      name="position"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={<span className="text-amber-700">Department</span>}
      name="department"
    >
      <Input />
    </Form.Item>
  </div>

  {/* Bio row (full width) */}
  <Form.Item
    label={<span className="text-amber-700">Bio</span>}
    name="bio"
  >
    <Input.TextArea rows={3} />
  </Form.Item>

  <Button
    type="primary"
    icon={<UploadOutlined />}
    style={{ backgroundColor: "#d97706", borderColor: "#d97706" }}
  >
    Save Changes
  </Button>
</Form>

            </div>
          </TabPane>

          {/* Notifications Tab */}
          <TabPane
            tab={
              <span className="text-amber-700">
                <BellOutlined /> Notifications
              </span>
            }
            key="2"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-1 text-amber-700">
                Notification Preferences
              </h2>
              <p className="text-amber-600 mb-4">
                Choose how you want to receive notifications
              </p>

              <div className="space-y-5">
                {[
                  { label: "Email Notifications", desc: "Get important updates directly to your email", value: profile.notifications.email },
                  { label: "Push Notifications", desc: "Receive alerts on your device instantly", value: profile.notifications.push },
                  { label: "SMS Notifications", desc: "Get notified via text messages", value: profile.notifications.sms },
                  { label: "Report Notifications", desc: "Stay updated with weekly and monthly reports", value: profile.notifications.reports },
                ].map((notif, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <span className="block font-semibold text-amber-700">{notif.label}</span>
                      <p className="text-amber-600 text-sm">{notif.desc}</p>
                    </div>
                    <Switch defaultChecked={notif.value} />
                  </div>
                ))}
              </div>

              <Button
                type="primary"
                className="mt-5"
                icon={<UploadOutlined />}
                style={{ backgroundColor: "#d97706", borderColor: "#d97706" }}
              >
                Save Preferences
              </Button>
            </div>
          </TabPane>

          {/* Security Tab */}
          <TabPane
            tab={
              <span className="text-amber-700">
                <SafetyOutlined /> Security
              </span>
            }
            key="3"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-1 text-amber-700">
                Security Settings
              </h2>
              <p className="text-amber-600 mb-4">
                Manage your account security and privacy
              </p>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block font-semibold text-amber-700">
                      Two-Factor Authentication
                    </span>
                    <p className="text-amber-600 text-sm">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch defaultChecked={profile.security.twoFactor} />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="block font-semibold text-amber-700">
                      Login Alerts
                    </span>
                    <p className="text-amber-600 text-sm">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <Switch defaultChecked={profile.security.loginAlerts} />
                </div>

                <Form layout="vertical" className="mt-2">
                  <Form.Item
                    label={<span className="text-amber-700">Session Timeout (minutes)</span>}
                    name="sessionTimeout"
                  >
                    <Input
                      type="number"
                      defaultValue={profile.security.sessionTimeout}
                      className="w-32"
                    />
                  </Form.Item>
                </Form>
              </div>

              <div className="flex space-x-2 mt-2">
                <Button>Change Password</Button>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  style={{ backgroundColor: "#d97706", borderColor: "#d97706" }}
                >
                  Save Security Settings
                </Button>
              </div>
            </div>
          </TabPane>

          {/* Company Tab */}
          <TabPane
            tab={
              <span className="text-amber-700">
                <ApartmentOutlined /> Company
              </span>
            }
            key="4"
          >
            <div className="p-3">
              <h2 className="font-semibold text-lg mb-1 text-amber-700">
                Company Information
              </h2>
              <p className="text-amber-600 mb-4">
                Manage your company details and settings
              </p>

              <Form
                layout="vertical"
                initialValues={{
                  name: profile.company.name,
                  address: profile.company.address,
                }}
              >
                <Form.Item
                  label={<span className="text-amber-700">Company Name</span>}
                  name="name"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span className="text-amber-700">Company Address</span>}
                  name="address"
                >
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  style={{ backgroundColor: "#d97706", borderColor: "#d97706" }}
                >
                  Save Company Info
                </Button>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
