import React, { useEffect, useState } from "react";
import { Table, Select, DatePicker, Input } from "antd";


const { Option } = Select;

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
];

const Classes = () => {
  const [ownerFilter, setOwnerFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchOwner, setSearchOwner] = useState('');

  useEffect(() => {
    // dispatch(getUsers());
  }, []);
  // ...

  const handleOwnerFilter = (value) => {
    setOwnerFilter(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value === "all" ? null : value); // Check if 'all' is selected
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
  const staticData = [
    {
      key: 1,
      name: 'John Doe',
      date: '2023-12-25',
      owner: 'Owner A',
      status: 'active',
    },
    {
      key: 2,
      name: 'Jane Smith',
      date: '2023-11-15',
      owner: 'Owner B',
      status: 'inactive',
    },
    {
      key: 3,
      name: 'Alice Johnson',
      date: '2023-10-20',
      owner: 'Owner C',
      status: 'active',
    },
    {
      key: 4,
      name: 'Bob Brown',
      date: '2023-09-05',
      owner: 'Owner D',
      status: 'inactive',
    },
    {
      key: 5,
      name: 'Eva Williams',
      date: '2023-08-12',
      owner: 'Owner E',
      status: 'active',
    },
    {
      key: 6,
      name: 'Michael Clark',
      date: '2023-07-18',
      owner: 'Owner F',
      status: 'inactive',
    },
    {
      key: 7,
      name: 'Olivia Garcia',
      date: '2023-06-30',
      owner: 'Owner G',
      status: 'active',
    },
    {
      key: 8,
      name: 'Sophia Martinez',
      date: '2023-05-22',
      owner: 'Owner H',
      status: 'inactive',
    },
    {
      key: 9,
      name: 'William Lee',
      date: '2023-04-11',
      owner: 'Owner I',
      status: 'active',
    },
    {
      key: 10,
      name: 'David Nguyen',
      date: '2023-03-07',
      owner: 'Owner J',
      status: 'inactive',
    },
  ];


  // Filtered data based on applied filters
  let filteredData = staticData;

  if (ownerFilter) {
    filteredData = filteredData.filter((item) => item.owner === ownerFilter);
  }

  if (statusFilter !== null) { // Check if status filter is applied or not
    filteredData = filteredData.filter((item) =>
      item.status === statusFilter
    );
  }

  if (fromDate && toDate) {
    filteredData = filteredData.filter(
      (item) =>
        new Date(item.date) >= fromDate && new Date(item.date) <= toDate
    );
  }

  if (searchOwner) {
    filteredData = filteredData.filter((item) =>
      item.owner.toLowerCase().includes(searchOwner.toLowerCase())
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
        <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default Classes;
