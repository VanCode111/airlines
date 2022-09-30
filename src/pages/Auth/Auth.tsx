import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./Auth.module.scss";

const Auth = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
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
    </div>
  );
};

export default Auth;
