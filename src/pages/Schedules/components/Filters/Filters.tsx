import React, { FC } from "react";
import styles from "./Filters.module.scss";
import { Button, Form, Input } from "antd";
import { Select, DatePicker } from "antd";
import { useGetAirportsCodesQuery } from "store/services/flights";

interface FiltersProps {
  applyFilters: (values: any) => void;
}

const Filters: FC<FiltersProps> = ({ applyFilters }) => {
  const { data: airportsData } = useGetAirportsCodesQuery(null);
  const [form] = Form.useForm();
  return (
    <div className={styles.filtersWrapper}>
      <Form
        form={form}
        name="control-hooks"
        className={styles.filters}
        onFinish={applyFilters}
      >
        <Form.Item label="From" name="from">
          <Select className={styles.select}>
            {airportsData?.map((item: any) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="To" name="to">
          <Select className={styles.select}>
            {airportsData?.map((item: any) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sort By" name="sort">
          <Select className={styles.select}>
            <Select.Option value="Confirmed ">Confirmed </Select.Option>
            <Select.Option value="EconomyPrice">EconomyPrice </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Outbound" name="outbound">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Flight Number" name="flight">
          <Input />
        </Form.Item>

        <Button color="primary" className={styles.apply} htmlType="submit">
          Apply
        </Button>
      </Form>
    </div>
  );
};

export default Filters;
