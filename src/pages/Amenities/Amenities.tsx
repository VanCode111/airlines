import { Button, Form, Input, Select } from "antd";
import React, { useMemo } from "react";
import styles from "./Amenities.module.scss";
import Card from "components/Card/Card";
import { Checkbox, notification } from "antd";
import {
  useLazyGetAmetitesForTicketQuery,
  useGetTicketsByReferenceQuery,
  useEditAmentitesToTicketMutation,
} from "store/services/amenities";
import { useState } from "react";
import Item from "antd/lib/list/Item";
import AmentitiesReport from "components/AmentitiesReport/AmentitiesReport";

const Amenities = () => {
  const [form] = Form.useForm();
  const [isReportOpen, setReportOpen] = useState(false);

  const amentities = Form.useWatch("amentities", form);
  const ticketID = Form.useWatch("ticketID", form);
  const [reference, setReference] = useState(null);

  const { data, isLoading } = useGetTicketsByReferenceQuery({ reference });
  const [trigger, result] = useLazyGetAmetitesForTicketQuery();
  const [editAmentities, resEdit] = useEditAmentitesToTicketMutation();

  const selectedItems: any = useMemo(
    () =>
      amentities?.filter(
        (item: any) =>
          !result?.data?.amentite.some(
            (amenitie: any) => amenitie.price === item && amenitie.buy
          )
      ) || [],
    [amentities, result?.data]
  );

  console.log(amentities);

  const onFinish = (values: any) => {
    setReference(values.reference);
  };

  const loadAmentities = async (data: any) => {
    try {
      await trigger({ id: data.ticketID }).unwrap();
    } catch (e: any) {
      console.log(e.data);
      notification.error({ message: e.data });
    }
  };

  const prepareAmentities = () => {
    return result.data?.amentite
      .filter(
        (item: any) =>
          !result?.data?.free.some(
            (amenitie: any) => amenitie.name === item.price
          )
      )
      .map((item: any) => ({
        name: item.price,
        buy: amentities.includes(item.price),
      }));
  };

  const saveAndConfirm = async () => {
    try {
      await editAmentities({ id: ticketID, amentites: prepareAmentities() });
      notification.success({ message: "Изменения применены" });
    } catch (e) {}
  };

  return (
    <div className={styles.amenities}>
      <Button
        onClick={() => setReportOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Get Amentites Report
      </Button>
      <div className={styles.reference}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{ display: "flex", gap: "20px" }}
        >
          <Form.Item name="reference" label="Booking reference">
            <Input />
          </Form.Item>
          <Button htmlType="submit" loading={isLoading}>
            OK
          </Button>
        </Form>
      </div>
      {data && (
        <Card label="Flight list">
          <div className={styles.flightList}>
            <Form
              form={form}
              onFinish={loadAmentities}
              style={{ display: "flex", gap: "20px" }}
            >
              <Form.Item
                label="Choose your flights"
                className={styles.flightsSelect}
                name="ticketID"
              >
                <Select style={{ minWidth: "200px" }}>
                  {data?.flights.map((item: any) => (
                    <Select.Option
                      value={item.ticketID}
                    >{`${item.flightNUmber}, ${item.date}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Button htmlType="submit" loading={result.isLoading}>
                Show Amenities
              </Button>
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
                  .filter(
                    (item: any) =>
                      !result?.data?.free.some(
                        (free: any) => free.name === item.price
                      )
                  )
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
                {result?.data?.amentite
                  .filter(
                    (item: any) =>
                      !result?.data?.free.some(
                        (free: any) => free.name === item.price
                      )
                  )
                  .map((item: any, index: number) => (
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
          <p>Items selected: {selectedItems.length}</p>
          <p>
            Total payable:{" "}
            {result?.data?.amentite
              .filter((item: any) => selectedItems.includes(item.price))
              .reduce((acc: any, curr: any) => acc + +curr.name, 0)}
          </p>
        </div>
      )}
      {result?.data?.amentite && (
        <Button onClick={saveAndConfirm} loading={resEdit.isLoading}>
          Save and confirm
        </Button>
      )}
      <AmentitiesReport
        isOpen={isReportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
};

export default Amenities;
