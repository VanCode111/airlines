import { FC, useEffect } from "react";
import React from "react";
import { Button, Form, Modal, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useHandleCrashMutation } from "store/services/auth";
import { useLoginMutation } from "store/services/auth";
import { setCredentials } from "store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
interface CrashWindowProps {
  onClose: () => void;
  isOpen: boolean;
  email: string;
  password: string;
  lastLoginDate: string;
  crashReasons: string[];
}

const CrashWindow: FC<CrashWindowProps> = ({
  onClose,
  isOpen,
  email,
  password,
  lastLoginDate,
  crashReasons,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [handleCrash, { isLoading: errorLoading }] = useHandleCrashMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await handleCrash({ email, ...values });
      const data = await login({ email, password: +password });
      console.log(data);
      if ("data" in data) {
        dispatch(setCredentials(data.data));
      }
      navigate("/main");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      footer={null}
      title="No logout detected"
      open={isOpen}
      onCancel={onClose}
      closable={!(errorLoading || loginLoading)}
    >
      <p>No logout detected for your last login on {lastLoginDate}</p>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="reason">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="crashReason"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            {crashReasons.map((item) => (
              <Radio value={item}> {item}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button loading={errorLoading || loginLoading} htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CrashWindow;
