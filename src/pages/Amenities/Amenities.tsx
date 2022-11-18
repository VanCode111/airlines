import { Button, Form, Input, Select } from "antd";
import React from "react";
import styles from "./Amenities.module.scss";
import Card from "components/Card/Card";
import { Checkbox } from "antd";
import {
  useLazyGetAmetitesForTicketQuery,
  useGetTicketsByReferenceQuery,
  useEditAmentitesToTicketMutation,
} from "store/services/amenities";
import { useState } from "react";
import Item from "antd/lib/list/Item";

const Amenities = () => {
  const [form] = Form.useForm();

  const amentities = Form.useWatch("amentities", form);
  const ticketID = Form.useWatch("ticketID", form);
  const [reference, setReference] = useState(null);

  const { data } = useGetTicketsByReferenceQuery({ reference });
  const [trigger, result] = useLazyGetAmetitesForTicketQuery();
  const [editAmentities] = useEditAmentitesToTicketMutation();

  console.log(amentities);

  const onFinish = (values: any) => {
    setReference(values.reference);
  };

  const loadAmentities = (data: any) => {
    trigger({ id: data.ticketID });
  };

  const prepareAmentities = () => {
    return result.data?.amentite.map((item: any) => ({
      name: item.price,
      buy: amentities.includes(item.price),
    }));
  };

  const saveAndConfirm = () => {
    editAmentities({ id: ticketID, amentites: prepareAmentities() });
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
      {data && (
        <Card label="Flight list">
          <div className={styles.flightList}>
            <Form form={form} onFinish={loadAmentities}>
              <Form.Item
                label="Choose your flights"
                className={styles.flightsSelect}
                name="ticketID"
              >
                <Select>
                  {data?.flights.map((item: any) => (
                    <Select.Option
                      value={item.ticketID}
                    >{`${item.flightNUmber}, ${item.date}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Button htmlType="submit">Show Amenities</Button>
            </Form>
          </div>
        </Card>
      )}

      {data && (
        <div className={styles.info}>
          <p>Full name: {data?.FullName}</p>
          <p>Passport number: {data?.Passport}</p>
          <p>Your cabin class is: {data?.CabinType}</p>
        </div>
      )}

      {result?.data?.amentite && (
        <Card label="AMONIC Airlines Amenities">
          <Form
            form={form}
            initialValues={{
              amentities: [
                ...result?.data?.amentite
                  .filter((item: any) => item.buy)
                  .map((item: any) => item.price),
                ...result?.data?.free.map((item: any) => item.name),
              ],
            }}
          >
            <Form.Item name="amentities">
              <Checkbox.Group>
                {result?.data?.free.map((item: any, index: number) => (
                  <Checkbox
                    value={item.name}
                    key={index}
                    disabled
                    checked
                  >{`${item.name} (${item.price})`}</Checkbox>
                ))}
                {result?.data?.amentite.map((item: any, index: number) => (
                  <Checkbox
                    value={item.price}
                    key={index}
                  >{`${item.price} (${item.name})`}</Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Card>
      )}

      {result?.data?.amentite && amentities && (
        <div className={styles.info}>
          <p>Items selected: {amentities.length}</p>
          <p>
            Total payable:{" "}
            {result?.data?.amentite
              .filter((item: any) => amentities.includes(item.price))
              .reduce((acc: any, curr: any) => acc + +curr.name, 0)}
          </p>
        </div>
      )}

      <Button onClick={saveAndConfirm}>Save and confirm</Button>
    </div>
  );
};

export default Amenities;
