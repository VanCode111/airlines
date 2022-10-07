import React from "react";
import { Button, Form, Input, Modal } from "antd";
import styles from "./Auth.module.scss";
import CrashWindow from "components/CrashWindow.tsx/CrashWindow";
import { useState } from "react";
import { useLoginMutation } from "store/services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "store/authSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [crashWindowOpen, setCrashWindowOpen] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleError = (error: any) => {
    const { status } = error;
    switch (status) {
      case 403:
        setCrashWindowOpen(true);
        break;
    }
  };

  const onFinish = async (values: any) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setCredentials(data));
      navigate("/main");
    } catch (e) {
      handleError(e);
    }
  };

  const closeCrashWindow = () => {
    setCrashWindowOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="email"
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
          <Button loading={isLoading} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <CrashWindow
        isOpen={crashWindowOpen}
        onClose={closeCrashWindow}
        email={email}
        password={password}
      />
    </div>
  );
};

export default Auth;
