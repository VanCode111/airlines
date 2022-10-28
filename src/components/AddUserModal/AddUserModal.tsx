import React, { FC } from "react";
import styles from "./AddUserModal.module.scss";
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import { useGetOfficesQuery, useAddUserMutation } from "store/services/office";
import { convertDate } from "utils";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { data: officesData } = useGetOfficesQuery(null);
  const [addUser, { isLoading }] = useAddUserMutation();

  const onFinish = async (values: any) => {
    addUser({ ...values, Birthdate: convertDate(values.Birthdate) });
  };

  return (
    <Modal footer={null} title="Add user" open={isOpen} onCancel={onClose}>
      <Form
        form={form}
        id="form"
        name="control-hooks"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        layout="horizontal"
      >
        <Form.Item
          name="Email"
          label="Email address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="FirstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="LastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="OfficeID"
          label="Office"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {officesData?.map((item: any) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Birthdate"
          label="Birthday"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType="submit" loading={isLoading}>
              Save
            </Button>
          </Form.Item>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
