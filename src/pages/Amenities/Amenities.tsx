import { Button, Form, Input, Select } from "antd";
import React from "react";
import styles from "./Amenities.module.scss";
import Card from "components/Card/Card";
import { Checkbox } from "antd";
import { useGetTicketsByReferenceQuery } from "store/services/amenities";
import { useState } from "react";

const Amenities = () => {
  const [form] = Form.useForm();
  const [reference, setReference] = useState(null);

  const { data } = useGetTicketsByReferenceQuery({ reference });

  console.log(data);

  const onFinish = (values: any) => {
    setReference(values.reference);
  };

  return (
    <div className={styles.amenities}>
      <div className={styles.reference}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="reference" label="Booking reference">
            <Input />
          </Form.Item>
          <Button htmlType="submit">OK</Button>
        </Form>
      </div>
      <Card label="Flight list">
        <div className={styles.flightList}>
          <Form.Item
            label="Choose your flights"
            className={styles.flightsSelect}
            name="flights"
          >
            <Select>
              {data?.flights.map((item: any) => (
                <Select.Option value="flights">{`${item.flightNUmber}, ${item.date}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button>Show Amenities</Button>
        </div>
      </Card>

      <div className={styles.info}>
        <p>Full name: {data?.FullName}</p>
        <p>Passport number: {data?.Passport}</p>
        <p>Your cabin class is: {data?.CabinType}</p>
      </div>

      <Card label="AMONIC Airlines Amenities">
        <Checkbox.Group>
          <Checkbox>Soft</Checkbox>
        </Checkbox.Group>
      </Card>
    </div>
  );
};

export default Amenities;
