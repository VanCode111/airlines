import React, { useEffect } from "react";
import styles from "./EditRoleModal.module.scss";
import { FC } from "react";
import { Button, Form, Input, Modal, Radio, Select, notification } from "antd";
import { useChangeUserRoleMutation } from "store/services/office";
interface EditRoleModalProps {
  userData: any;
  isOpen: boolean;
  onClose: () => void;
}

const EditRoleModal: FC<EditRoleModalProps> = ({
  userData,
  isOpen,
  onClose,
}) => {
  const [changeUserRole] = useChangeUserRoleMutation();
  const [form] = Form.useForm();

  console.log(userData);
  const onFinish = async (values: any) => {
    console.log(values);

    try {
      await changeUserRole({ ...values, email: userData?.email });
      notification.success({ message: "Роль изменена" });
      onClose();
    } catch (e: any) {
      notification.error({ message: e.message });
    }
  };

  useEffect(() => {
    form.setFieldsValue({ role: userData?.role });
  }, [userData, isOpen]);

  return (
    <Modal footer={null} title="Edit Role" open={isOpen} onCancel={onClose}>
      <Form
        form={form}
        id="form"
        name="control-hooks"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        layout="horizontal"
      >
        <Form.Item label="Email address">
          <Input disabled={true} value={userData?.email} />
        </Form.Item>
        <Form.Item label="First Name">
          <Input disabled={true} value={userData?.name} />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input disabled={true} value={userData?.lastName} />
        </Form.Item>
        <Form.Item label="Office">
          <Select disabled={true} value={userData?.office}></Select>
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Radio.Group>
            <Radio value="User">User</Radio>
            <Radio value="Administrator">Administrator</Radio>
          </Radio.Group>
        </Form.Item>

        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType="submit" loading={false}>
              Apply
            </Button>
          </Form.Item>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditRoleModal;
