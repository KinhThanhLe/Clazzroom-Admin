import React, { useEffect, useState } from "react";
import { Table, Select, DatePicker, Input, Button } from "antd";
import axios from "axios";
import moment from 'moment';

const { Option } = Select;



const Classes = () => {
  const [ownerFilter, setOwnerFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchOwner, setSearchOwner] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Created at",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      filters: [], // Filters will be applied here
      onFilter: (value, record) => record.owner === value,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span>
          {record.status === "active" ? (
            <Button onClick={() => {
              handleSetInactive(record.key);
              updateInactive(record.id)
            }}>SetInactive</Button>
          ) : (
            <Button onClick={() => {
              handleSetActive(record.key);
              updateActive(record.id)
            }}>SetActive</Button>
          )}
        </span>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get("http://localhost:3001/api/classes/admin/allClass", axiosConfig)
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          key: index + 1,
          name: item.class_name,
          date: moment(item.createdAt).format('DD-MM-YYYY'),
          owner: item.owner.full_name,
          status: item.status,
          id: item._id
        }));
        setFilteredData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  }, []);
  // ...

  const handleOwnerFilter = (value) => {
    setOwnerFilter(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value === "all" ? null : value);
  };

  const updateInactive = (id) => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Fetch data from API
    axios.patch(`http://localhost:3001/api/classes/${id}/inactive`, null, axiosConfig)
      .then((res) => {
        // Xử lý dữ liệu trả về nếu cần
      })
      .catch((error) => {
        // Xử lý lỗi
      });
  };

  const updateActive = (id) => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Fetch data from API
    axios.patch(`http://localhost:3001/api/classes/${id}/active`, null, axiosConfig)
      .then((res) => {
        // Xử lý dữ liệu trả về nếu cần
      })
      .catch((error) => {
        // Xử lý lỗi
      });
  };

  const handleSetActive = (key) => {

    const updatedData = filteredData.map((item) =>
      item.key === key ? { ...item, status: "active" } : item
    );
    setFilteredData(updatedData);
  };

  const handleSetInactive = (key) => {

    const updatedData = filteredData.map((item) =>
      item.key === key ? { ...item, status: "inactive" } : item
    );
    setFilteredData(updatedData);
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setFromDate(dates[0]);
      setToDate(dates[1]);
    } else {
      setFromDate(null);
      setToDate(null);
    }
  };
  const handleSearchOwner = (e) => {
    setSearchOwner(e.target.value);
  };

  let dataToDisplay = filteredData;

  if (ownerFilter) {
    dataToDisplay = dataToDisplay.filter((item) => item.owner === ownerFilter);
  }

  if (statusFilter !== null) {
    dataToDisplay = dataToDisplay.filter((item) =>
      item.status === statusFilter
    );
  }

  if (fromDate && toDate) {
    dataToDisplay = dataToDisplay.filter(
      (item) =>
        new Date(item.date) >= fromDate && new Date(item.date) <= toDate
    );
  }

  if (searchOwner) {
    dataToDisplay = dataToDisplay.filter((item) =>
      item.owner?.toLowerCase().includes(searchOwner.toLowerCase())
    );
  }
  return (
    <div>
      <h3 className="mb-4 title">Classes</h3>
      <div style={{ marginBottom: 16 }}>
        <Input
          style={{ width: 200, marginRight: 8 }}
          placeholder="Search Owner"
          onChange={handleSearchOwner}
        />

        <Select
          style={{ width: 120, marginRight: 8 }}
          placeholder="Select Status"
          onChange={handleStatusFilter}
          allowClear  // Add allowClear to enable clearing the select
        >
          <Option value="all">All</Option> {/* Add an option for 'All' */}
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>

        <DatePicker.RangePicker onChange={handleDateChange} />
      </div>
      <div>
        <Table columns={columns} dataSource={dataToDisplay} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default Classes;
