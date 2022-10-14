import React, { useEffect } from "react";
import { useGetSchedulesMutation } from "store/services/schedules";
import styles from "./Schedules.module.scss";
import Filters from "./components/Filters/Filters";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "date",
  },
  {
    title: "From",
    dataIndex: "date",
  },
  {
    title: "To",
    dataIndex: "date",
  },
  {
    title: "Flight Number",
    dataIndex: "date",
  },
  {
    title: "Aircraft",
    dataIndex: "date",
  },
  {
    title: "Economy price",
    dataIndex: "date",
  },
  {
    title: "Buisness price",
    dataIndex: "date",
  },
  {
    title: "First class price",
    dataIndex: "date",
  },
];

const Schedules = () => {
  const [gets, { data, isLoading }] = useGetSchedulesMutation();
  useEffect(() => {
    gets(null);
  }, []);

  console.log(data);
  return (
    <div className={styles.schedules}>
      <Filters />
      {data}
      {isLoading}
      <div className={styles.data}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={isLoading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Schedules;
