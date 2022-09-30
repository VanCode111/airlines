import React from "react";
import { Table } from "antd";
import styles from "./MainAdministrator.module.scss";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "User Role",
    dataIndex: "userrole",
  },
  {
    title: "Email Address",
    dataIndex: "email",
  },
  {
    title: "Office",
    dataIndex: "office",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    m: true,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const MainAdministrator = () => {
  return (
    <div>
      <Table
        rowClassName={(record, index) => (record.m ? styles.red : "")}
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default MainAdministrator;
