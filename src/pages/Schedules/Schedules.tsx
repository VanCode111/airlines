import React from "react";
import { useGetSchedulesQuery } from "store/services/schedules";
import styles from "./Schedules.module.scss";
import Filters from "./components/Filters/Filters";
import { Table } from "antd";

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
  const { data, refetch, isLoading } = useGetSchedulesQuery(null);

  console.log(data);

  return (
    <div className={styles.schedules}>
      <Filters />
      {data}
      <div className={styles.data}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Schedules;
