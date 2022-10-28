import { Button, Form, Modal, Radio } from "antd";
import React, { FC } from "react";
import { useCreateTicketsMutation } from "store/services/flights";
import styles from "./BillingConfirmationModal.module.scss";

interface BillingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  passengers: any;
  selectedOutbound: any;
  selectedReturn: any;
}

const BillingConfirmationModal: FC<BillingConfirmationModalProps> = ({
  isOpen,
  onClose,
  selectedOutbound,
  selectedReturn,
  passengers,
}) => {
  const [form] = Form.useForm();

  const [createTickets, { isLoading }] = useCreateTicketsMutation();

  const createDataForTicket = () => {
    const returnFlights =
      selectedReturn?.FlightNumbers.map((item: any) => ({
        flightNumber: item,
        date: selectedReturn.Date,
      })) || [];
    const outboundFlights =
      selectedOutbound?.FlightNumbers.map((item: any) => ({
        flightNumber: item,
        date: selectedOutbound.Date,
      })) || [];
    return { passengers, flights: [...returnFlights, ...outboundFlights] };
  };

  const onFinish = () => {
    createTickets(createDataForTicket());
  };

  return (
    <Modal
      footer={null}
      title="Billing Confirmation"
      open={isOpen}
      onCancel={onClose}
    >
      <div>Total amount: 1000$</div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Paid using" name="paidUsing">
          <Radio.Group>
            <Radio value="creditCard">Credit Card</Radio>
            <Radio value="cash">Cash</Radio>
            <Radio value="vaucher">Vaucher</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={styles.buttons}>
          <Button htmlType="submit">Issue tickets</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BillingConfirmationModal;
