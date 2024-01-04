import React, { useEffect, useState } from "react";
import { Table, Select, Button, Upload, message } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
const { Option } = Select;

const Productlist = () => {
  const [showStudentID, setShowStudentID] = useState(true); // State to toggle StudentID column

  const columns = [
    {
      title: "ANo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    showStudentID && {
      title: "StudentID",
      dataIndex: "studentid",
      sorter: (a, b) => a.studentid.length - b.studentid.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Banned", value: "banned" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Verified",
      dataIndex: "verified",
      filters: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      onFilter: (value, record) => record.verified === value,
      render: (text) => <span>{text ? "True" : "False"}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          {record.status === "active" ? (
            <Button onClick={() => handleBan(record.key)}>Ban</Button>
          ) : (
            <Button onClick={() => handleUnban(record.key)}>Unban</Button>
          )}
        </span>
      ),
    },
  ].filter(Boolean); // Remove undefined columns from the array

  useEffect(() => {
    // Fetch data or any other initial setup if needed
    // For now, let's create some static dummy data
    const staticData = [
      {
        key: 1,
        name: "John Doe",
        email: "kinhthanh@gmail.com",
        studentid: "STU123",
        status: "active",
        verified: true,
      },
      {
        key: 2,
        name: "Jane Smith",
        email: "vanthat@gmail.com",
        studentid: "STU456",
        status: "banned",
        verified: false,
      },
      // Add more similar data items as needed
      // {
      //   key: 3,
      //   name: "Alice Johnson",
      //   studentid: "STU789",
      //   status: "verified",
      //   verified: true,
      // },
      // More items...
    ];

    setFilteredData(staticData); // Set the initial data
  }, []);

  const [filteredData, setFilteredData] = useState([]);

  const handleBan = (key) => {
    const updatedData = filteredData.map((item) =>
      item.key === key ? { ...item, status: "banned" } : item
    );
    setFilteredData(updatedData);
  };

  const handleUnban = (key) => {
    const updatedData = filteredData.map((item) =>
      item.key === key ? { ...item, status: "active" } : item
    );
    setFilteredData(updatedData);
  };

  const [statusFilter, setStatusFilter] = useState(null);
  const handleStatusFilter = (value) => {
    setStatusFilter(value === "all" ? null : value); // Check if 'all' is selected
  };

  const [verifiedFilter, setVerifiedFilter] = useState(null);
  const handleVerifiedFilter = (value) => {
    setVerifiedFilter(value === "all" ? null : value); // Check if 'all' is selected
  };

  let dataToDisplay = filteredData;

  if (statusFilter !== null) {
    dataToDisplay = dataToDisplay.filter((item) => item.status === statusFilter);
  }

  if (verifiedFilter !== null) {
    dataToDisplay = dataToDisplay.filter((item) => item.verified === verifiedFilter);
  }
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assume you want to read the first sheet

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedData = jsonData.map((row, index) => ({
        key: index + 1,
        name: row[1] || "Unknown",
        email: row[2] || "Unknown",
        studentid: row[3] || "N/A",
        status: row[4] || "N/A",
        verified: row[5] || false
      }));

      // Cập nhật state mới với dữ liệu từ file Excel
      setFilteredData(formattedData);
      // Cập nhật state mới với dữ liệu từ file Excel
      message.success('File uploaded successfully!');
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadProps = {
    accept: ".xlsx",
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Accounts</h3>
      <div style={{ marginBottom: 16 }}>
        <Upload {...uploadProps} >
          <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>Upload Excel</Button>
        </Upload>
        <Select
          style={{ width: 120, marginRight: 8 }}
          placeholder="Select Status"
          onChange={handleStatusFilter}
          allowClear
        >
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="banned">Banned</Option>
        </Select>
        <Select
          style={{ width: 120, marginRight: 8 }}
          placeholder="Select Verified"
          onChange={handleVerifiedFilter}
          allowClear
        >
          <Option value="all">All</Option>
          <Option value={true}>True</Option>
          <Option value={false}>False</Option>
        </Select>
        <Button onClick={() => setShowStudentID(!showStudentID)}>
          {showStudentID ? "Hide StudentID" : "Show StudentID"}
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={dataToDisplay} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default Productlist;
