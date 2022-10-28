import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./UserMain.module.scss";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Login time",
    dataIndex: "loginTime",
  },
  {
    title: "Logout time",
    dataIndex: "logoutTime",
  },
  {
    title: "Time spent on system",
    dataIndex: "sessionTime",
  },
  {
    title: "Unsuccessful logout reason",
    dataIndex: "reason",
  },
];

const UserMain = () => {
  const { user } = useSelector((state: any) => state.auth);

  const data = user.sessions.map((item: any) => ({
    ...item,
    sessionTime: item.sessionTime === -1 ? "**" : item.sessionTime,
    date: item.loginTime.split(" ")[0],
  }));

  return (
    <div className={styles.wrapper}>
      <p>Hi {user.userName}</p>
      <p>Time spent on system: {user.curSessionTime}</p>
      <p>Number of crashes: {user.numberOfCrashes}</p>
      <Table dataSource={data} columns={columns} bordered pagination={false} />
    </div>
  );
};

export default UserMain;
