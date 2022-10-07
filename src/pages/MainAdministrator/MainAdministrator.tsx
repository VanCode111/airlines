import React, { useState } from "react";
import { Button, Form, Select, Table } from "antd";
import styles from "./MainAdministrator.module.scss";
import AddUserModal from "components/AddUserModal/AddUserModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "User Role",
    dataIndex: "userRole",
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
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headActions}>
          <Button onClick={openAddUserModal}>Add User</Button>

          <Button>Exit</Button>
        </div>

        <Form.Item label="Select">
          <Select className={styles.select}>
            <Select.Option value="demo">All offices</Select.Option>
          </Select>
        </Form.Item>
        <Table
          rowClassName={(record, index) => (record.m ? styles.red : "")}
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />

        <div className={styles.actions}>
          <Button>Change Role</Button>
          <Button>Enable/Disable Login</Button>
        </div>
      </div>

      <AddUserModal isOpen={isAddUserModalOpen} onClose={closeAddUserModal} />
    </div>
  );
};

export default MainAdministrator;
