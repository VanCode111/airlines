import React from "react";
import styles from "./PassengerDetail.module.scss";
import Card from "components/Card/Card";
import { Button, DatePicker, Form, Input, Select } from "antd";

const PassengerDetail = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("finish");
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
            <Form.Item label="From" name="from">
              <Input />
            </Form.Item>
            <Form.Item label="From" name="from">
              <Input />
            </Form.Item>
            <Form.Item label="Return" name="returnDate">
              <DatePicker />
            </Form.Item>
            <Form.Item label="From" name="from">
              <Input />
            </Form.Item>
            <Form.Item label="From" name="from">
              <Select className={styles.select}>
                <Select.Option value={1}>{1}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Phone" name="from">
              <Input />
            </Form.Item>
          </div>

          <Button color="primary" className={styles.apply} htmlType="submit">
            Add passenger
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default PassengerDetail;
