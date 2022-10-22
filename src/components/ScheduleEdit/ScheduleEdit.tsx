import React, { useEffect } from "react";
import styles from "./ScheduleEdit.module.scss";
import { FC } from "react";
import { Modal, Form, Button, Input, DatePicker } from "antd";
import Card from "components/Card/Card";
import moment from "moment";
import { useUpdateFlightMutation } from "store/services/schedules";
import { convertDate } from "utils";

interface ScheduleEditProps {
  flightData: any;
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleEdit: FC<ScheduleEditProps> = ({
  flightData,
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [updateFlight] = useUpdateFlightMutation();

  useEffect(() => {
    form.setFieldsValue({
      date: moment(flightData?.Date),
      time: flightData?.Time,
      price: flightData?.EconomyPrice,
    });
  }, [flightData]);

  const onFinish = (values: any) => {
    updateFlight({
      ...values,
      id: flightData?.ID,
      date: convertDate(values.date),
    });
  };

  return (
    <Modal footer={null} title="Schedule edit" open={isOpen} onCancel={onClose}>
      <Card label="Flight route">
        <div className={styles.flightInfo}>
          <div className={styles.flightInfoItem}>
            From: <span>{flightData?.from}</span>
          </div>
          <div className={styles.flightInfoItem}>
            To: <span>{flightData?.to}</span>
          </div>
          <div className={styles.flightInfoItem}>
            Aircraft: <span>{flightData?.aircraft}</span>
          </div>
        </div>
      </Card>
      <Form
        form={form}
        id="form"
        name="control-hooks"
        onFinish={onFinish}
        className={styles.form}
        labelCol={{ span: 6 }}
        layout="horizontal"
      >
        <Form.Item label="Date" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Time" name="time">
          <Input />
        </Form.Item>
        <Form.Item label="Economy price" name="price">
          <Input />
        </Form.Item>

        <div className={styles.buttons}>
          <Form.Item>
            <Button htmlType="submit" loading={false}>
              Update
            </Button>
          </Form.Item>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ScheduleEdit;
