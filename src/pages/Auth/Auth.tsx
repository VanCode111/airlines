import React from "react";
import { Button, Form, Input, Modal } from "antd";
import styles from "./Auth.module.scss";
import { login } from "http/auth";
import CrashWindow from "components/CrashWindow.tsx/CrashWindow";
import { useState } from "react";

const Auth = () => {
  const [form] = Form.useForm();
  const [crashWindowOpen, setCrashWindowOpen] = useState(true);

  const onFinish = async (values: any) => {
    const data = await login(values);
    console.log(data);
    console.log(values);
  };

  const closeCrashWindow = () => {
    setCrashWindowOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <CrashWindow isOpen={crashWindowOpen} onClose={closeCrashWindow} />
    </div>
  );
};

export default Auth;
