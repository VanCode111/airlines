import React from "react";
import styles from "./Filters.module.scss";
import { Button, Form } from "antd";
import { Select, DatePicker } from "antd";

const Filters = () => {
  const [form] = Form.useForm();
  return (
    <div className={styles.filtersWrapper}>
      <Form form={form} name="control-hooks" className={styles.filters}>
        <Form.Item label="From">
          <Select className={styles.select}>
            <Select.Option value="demo">All offices</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="To">
          <Select className={styles.select}>
            <Select.Option value="demo">All offices</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sort By">
          <Select className={styles.select}>
            <Select.Option value="demo">All offices</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Outbound">
          <DatePicker />
        </Form.Item>

        <Button color="primary" className={styles.apply}>
          Apply
        </Button>
      </Form>
    </div>
  );
};

export default Filters;
