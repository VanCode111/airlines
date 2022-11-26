import React, { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Radio,
  notification,
  Input,
  DatePicker,
} from "antd";
import apiInstance from "api/index";
import { useMutation } from "react-query";
import ModalInner from "./components/Modal/Modal";

import styles from "./AmentitiesReport.module.scss";
import { convertDate } from "utils";

const AmentitiesReport = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate, data, isLoading } = useMutation(
    apiInstance.getAmentitesReport,
    {
      onSuccess: (data) => {
        setModalOpen(true);
        onClose();
      },
    }
  );

  const onFinish = (values) => {
    values.From = values.From.format("YYYY-MM-DD");
    values.To = values.To?.format("YYYY-MM-DD");
    mutate(values);
  };

  return (
    <>
      <Modal
        footer={null}
        title="Amenities report"
        open={isOpen}
        onCancel={onClose}
      >
        <Form form={form} onFinish={onFinish} labelCol={{ span: 3 }}>
          <Form.Item label="Flight id" name="FlightId">
            <Input />
          </Form.Item>
          <Form.Item label="From" name="From">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="To" name="To">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={isLoading}
            style={{ marginLeft: "auto" }}
          >
            Make Report
          </Button>
        </Form>
      </Modal>
      <ModalInner
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={data?.data}
      />
    </>
  );
};

export default AmentitiesReport;
