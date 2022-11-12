import React, { FC } from "react";
import styles from "./PassengerDetail.module.scss";
import Card from "components/Card/Card";
import { Button, DatePicker, Form, Input, Select } from "antd";

interface PassengerDetailProps {
  addPassenger: (passenger: any) => void;
}

const PassengerDetail: FC<PassengerDetailProps> = ({ addPassenger }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addPassenger(values);
    console.log(values);
    form.resetFields();
  };

  return (
    <Card label="Passenger Detail">
      <div className={styles.passengerDetail}>
        <Form
          onFinish={onFinish}
          form={form}
          name="control-hooks"
          className={styles.filters}
        >
          <div className={styles.formItems}>
            <Form.Item label="First Name" name="firstName">
              <Input />
            </Form.Item>
            <Form.Item label="LastName" name="lastName">
              <Input />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Passport" name="passport">
              <Input />
            </Form.Item>
            <Form.Item label="Passport country" name="country">
              <Select className={styles.select}>
                <Select.Option value={"Albania"}>{"Albania"}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </div>

          <Button color="primary" className={styles.add} htmlType="submit">
            Add passenger
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default PassengerDetail;
