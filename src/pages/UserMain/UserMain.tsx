import { Button, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./UserMain.module.scss";
import useLogout from "hooks/useLogout";
import classNames from "classnames";
import moment from "moment";

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
  const logout = useLogout();

  const toTime = (milliseconds: any) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  };

  const toLocalDate = (date: any) => {
    const dates: any = new Date(date);
    return dates.toString();
  };

  const data = user.sessions.map((item: any) => ({
    ...item,
    sessionTime:
      item.sessionTime === -1 ? "**" : toTime(item.sessionTime * 1000),
    date: item.loginTime.split(" ")[0],
    loginTime: item.loginTime.split(" ")[1],
    logoutTime: item.logoutTime.split(" ")[1],
  }));

  return (
    <div className={styles.wrapper}>
      <Button onClick={logout} danger>
        Exit
      </Button>
      <p>Hi {user.userName}</p>
      <p>Time spent on system: {toTime(user.curSessionTime * 1000)}</p>
      <p>Number of crashes: {user.numberOfCrashes}</p>
      <Table
        rowClassName={(record, index) =>
          classNames({
            [styles.red]: record.sessionTime === "**",
          })
        }
        dataSource={data}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default UserMain;
