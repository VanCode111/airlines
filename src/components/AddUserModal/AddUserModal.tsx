import React, { FC } from "react";
import styles from "./AddUserModal.module.scss";
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
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
          name="email"
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
          name="firstName"
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
          name="lastName"
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
          name="office"
          label="Office"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="office">Offices</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
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
          name="password"
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
            <Button htmlType="submit">Save</Button>
          </Form.Item>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
