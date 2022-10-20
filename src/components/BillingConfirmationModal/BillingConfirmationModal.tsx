import { Button, Form, Modal, Radio } from "antd";
import React, { FC } from "react";
import styles from "./BillingConfirmationModal.module.scss";

interface BillingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillingConfirmationModal: FC<BillingConfirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      footer={null}
      title="Billing Confirmation"
      open={isOpen}
      onCancel={onClose}
    >
      <div>Total amount: 1000$</div>
      <Form form={form}>
        <Form.Item label="Paid using" name="paidUsing">
          <Radio.Group>
            <Radio value="creditCard">Credit Card</Radio>
            <Radio value="cash">Cash</Radio>
            <Radio value="vaucher">Vaucher</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={styles.buttons}>
          <Button>Issue tickets</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BillingConfirmationModal;
