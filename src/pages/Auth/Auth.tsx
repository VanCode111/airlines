import React, { useEffect } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import styles from "./Auth.module.scss";
import CrashWindow from "components/CrashWindow.tsx/CrashWindow";
import { useState } from "react";
import { useLoginMutation } from "store/services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "assets/logo.png";
import { blockedMsDelay } from "../../constants";

const Auth = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const [crashData, setCrashData] = useState({ date: "", crashReasons: [] });

  const [blockedMs, setBlockedMs] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [crashWindowOpen, setCrashWindowOpen] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const blockAuth = (ms: number) => {
    setBlockedMs(ms);

    const interval = setInterval(() => {
      ms -= 1000;
      if (ms <= 0) {
        clearInterval(interval);
      }
      setBlockedMs(ms);
    }, 1000);
  };

  const handleWrongCredentials = () => {
    console.log(111111);
    notification.error({ message: "Неверный логин или пароль" });
    const countWrongTry = localStorage.getItem("countWrongTry") || 0;
    if (+countWrongTry >= 3) {
      localStorage.setItem("countWrongTry", "0");
      localStorage.setItem("blockedAuthDate", `${Date.now() + blockedMsDelay}`);
      console.log("aaaaa");
      blockAuth(blockedMsDelay);
    } else {
      localStorage.setItem("countWrongTry", `${+countWrongTry + 1}`);
    }
  };

  const handleError = (error: any) => {
    const { originalStatus, status, data } = error;
    switch (originalStatus || status) {
      case 403:
        setCrashData(data);
        setCrashWindowOpen(true);
        break;
      case 404:
        handleWrongCredentials();
        break;
      case 423:
        notification.error({ message: "Аккаунт заблокирован" });
    }
  };

  const onFinish = async (values: any) => {
    try {
      const data: any = await login({
        ...values,
        password: +values.password,
      }).unwrap();
      dispatch(setCredentials(data));
      navigate("/main");
    } catch (e: any) {
      console.log(e);

      handleError(e);
    }
  };

  const closeCrashWindow = () => {
    setCrashWindowOpen(false);
  };

  useEffect(() => {
    const blockedMs = localStorage.getItem("blockedAuthDate") || 0;
    console.log(+blockedMs - Date.now(), "asgasg");
    blockAuth(+blockedMs - Date.now());
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo" className={styles.logo} />
      {blockedMs > 0 && (
        <h2 style={{ color: "red" }}>{Math.ceil(blockedMs / 1000)}</h2>
      )}
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
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            disabled={blockedMs > 0}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <CrashWindow
        lastLoginDate={crashData.date}
        crashReasons={crashData.crashReasons}
        isOpen={crashWindowOpen}
        onClose={closeCrashWindow}
        email={email}
        password={password}
      />
    </div>
  );
};

export default Auth;
