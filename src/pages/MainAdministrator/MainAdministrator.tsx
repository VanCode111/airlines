import React, { useState } from "react";
import { Button, Form, Select, Table } from "antd";
import styles from "./MainAdministrator.module.scss";
import AddUserModal from "components/AddUserModal/AddUserModal";
import useLogout from "hooks/useLogout";
import classNames from "classnames";
import {
  useGetOfficesQuery,
  useGetUsersByOfficeQuery,
} from "store/services/office";
import { useChangeBlockUserMutation } from "store/services/office";
import EditRoleModal from "components/EditRoleModal/EditRoleModal";

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
    dataIndex: "role",
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

const MainAdministrator = () => {
  const [form] = Form.useForm();

  const offices = Form.useWatch("offices", form);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { isFetching, data } = useGetUsersByOfficeQuery({ offices });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);

  const closeEditRoleModal = () => {
    setIsEditRoleModalOpen(false);
  };

  const [changeBlock, { isLoading: isChangeBlockLoading }] =
    useChangeBlockUserMutation();

  const { data: officesData } = useGetOfficesQuery(null);
  const logout = useLogout();

  const openEditRoleModal = () => {
    setIsEditRoleModalOpen(true);
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const changeEnabled = () => {
    changeBlock({ email: selectedUser?.email });
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headActions}>
          <Button onClick={openAddUserModal}>Add User</Button>

          <Button onClick={logout}>Exit</Button>
        </div>
        <Form form={form} initialValues={{ offices: "all" }}>
          <Form.Item label="Offices" name="offices">
            <Select className={styles.select}>
              <Select.Option value="all">all</Select.Option>
              {officesData?.map((item: string) => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>

        <Table
          rowClassName={(record, index) =>
            classNames({
              [styles.red]: record.active !== 1,
              [styles.green]: record.role === "Administrator",
              [styles.selected]: record.email === selectedUser?.email,
            })
          }
          columns={columns}
          dataSource={data}
          bordered
          loading={isFetching}
          pagination={false}
          onRow={(record) => {
            return { onClick: () => setSelectedUser(record) };
          }}
        />

        <div className={styles.actions}>
          <Button onClick={openEditRoleModal} disabled={!selectedUser}>
            Change Role
          </Button>
          <Button
            disabled={!selectedUser?.email}
            onClick={changeEnabled}
            loading={isChangeBlockLoading}
          >
            Enable/Disable Login
          </Button>
        </div>
      </div>

      <AddUserModal isOpen={isAddUserModalOpen} onClose={closeAddUserModal} />
      <EditRoleModal
        isOpen={isEditRoleModalOpen}
        onClose={closeEditRoleModal}
        userData={selectedUser}
      />
    </div>
  );
};

export default MainAdministrator;
