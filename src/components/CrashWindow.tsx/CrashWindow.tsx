import { FC } from "react";
import React from "react";
import { Button, Form, Modal, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";

interface CrashWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

const CrashWindow: FC<CrashWindowProps> = ({ onClose, isOpen }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      footer={null}
      title="No logout detected"
      open={isOpen}
      onCancel={onClose}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="reason">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group>
            <Radio value="software"> Software crash </Radio>
            <Radio value="system"> System crash </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Confirm</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CrashWindow;
