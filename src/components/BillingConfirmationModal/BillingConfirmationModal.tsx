import { Button, Form, Modal, Radio, notification } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateTicketsMutation } from "store/services/flights";
import styles from "./BillingConfirmationModal.module.scss";
interface BillingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  passengers: any;
  selectedOutbound: any;
  selectedReturn: any;
  cabinType: any;
}

const BillingConfirmationModal: FC<BillingConfirmationModalProps> = ({
  isOpen,
  onClose,
  selectedOutbound,
  selectedReturn,
  passengers,
  cabinType,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createTickets, { isLoading }] = useCreateTicketsMutation();
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  const price =
    (selectedOutbound?.Price || 0 + selectedReturn?.Price || 0) *
    passengers.length;

  const createDataForTicket = () => {
    const returnFlights =
      selectedReturn?.FlightNumbers[0].map((item: any) => ({
        flightNumber: +item,
        date: selectedReturn.Date,
      })) || [];
    const outboundFlights =
      selectedOutbound?.FlightNumbers[0].map((item: any) => ({
        flightNumber: +item,
        date: selectedOutbound.Date,
      })) || [];
    console.log(outboundFlights);
    return {
      passengers,
      email: user.email,
      flights: [...returnFlights, ...outboundFlights],
      cabinType,
    };
  };

  const onFinish = async () => {
    try {
      await createTickets(createDataForTicket());
      notification.success({ message: "Билеты успешно оформлены" });
      navigate("/flights");
    } catch (e) {
      console.log(e);
      notification.error({ message: "Ошибка" });
    }
  };

  return (
    <Modal
      footer={null}
      title="Billing Confirmation"
      open={isOpen}
      onCancel={onClose}
    >
      <div>Total amount: {price}$</div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Paid using" name="paidUsing">
          <Radio.Group>
            <Radio value="creditCard">Credit Card</Radio>
            <Radio value="cash">Cash</Radio>
            <Radio value="vaucher">Vaucher</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={styles.buttons}>
          <Button htmlType="submit" loading={isLoading}>
            Issue tickets
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BillingConfirmationModal;
