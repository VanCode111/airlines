import React from "react";
import styles from "./Filters.module.scss";
import { Button, Form, Radio } from "antd";
import { Select, DatePicker } from "antd";
import { useGetAirportsCodesQuery } from "store/services/flights";
import { useGetCabinTypesQuery } from "store/services/flights";
import { FormInstance } from "antd/es/form/Form";
import Card from "components/Card/Card";

const Filters = ({
  applyFilters,
  form,
  isReturn,
  changeIsReturn,
}: {
  applyFilters: any;
  form: FormInstance;
  isReturn: boolean;
  changeIsReturn: any;
}) => {
  const { data: codes = [], isLoading: codesIsLoading } =
    useGetAirportsCodesQuery(null);
  const { data: cabinTypes = [], isLoading: cabinIsLoading } =
    useGetCabinTypesQuery(null);

  const onFinish = (data: any) => {
    console.log(data);
    applyFilters(data);
  };

  return (
    <div className={styles.filtersWrapper}>
      <Card label="Filters">
        <Form
          onFinish={onFinish}
          form={form}
          name="control-hooks"
          className={styles.filters}
        >
          <Form.Item label="From" name="from">
            <Select className={styles.select}>
              {codes.map((code: any) => (
                <Select.Option value={code}>{code}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="To" name="to">
            <Select className={styles.select}>
              {codes.map((code: any) => (
                <Select.Option value={code}>{code}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cabin Type" name="cabinType">
            <Select className={styles.select}>
              {cabinTypes.map((cabinType: any) => (
                <Select.Option value={cabinType}>{cabinType}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Radio.Group onChange={changeIsReturn} value={isReturn}>
            <Radio value={true}>Return</Radio>
            <Radio value={false}>One way</Radio>
          </Radio.Group>
          <Form.Item label="Outbound" name="outbound">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Return" name="returnDate">
            <DatePicker />
          </Form.Item>

          <Button color="primary" className={styles.apply} htmlType="submit">
            Apply
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Filters;
