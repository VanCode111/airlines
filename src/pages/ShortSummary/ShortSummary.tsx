import React, { useEffect } from "react";
import styles from "./ShortSummary.module.scss";
import logo from "assets/logo.png";
import Card from "components/Card/Card";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAverageSeatsPriceQuery,
  useGetFreeSeatsQuery,
  useGetReportQuery,
} from "store/services/summary";

const ShortSummary = () => {
  const navigate = useNavigate();
  const { data: emptySeats } = useGetFreeSeatsQuery(null);
  const { data: report } = useGetReportQuery(null);
  const { data: seatsPrice } = useGetAverageSeatsPriceQuery(null);
  let seatsPrices = seatsPrice ? Object.values(seatsPrice) : [];

  useEffect(() => {}, []);

  return (
    <div className={styles.wrapper}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        style={{ display: "block", margin: "0 auto" }}
      />
      {report && (
        <Card label="In the last 30 days...">
          <Card label="Flights">
            <p>Number confirmed: {report.confirmed}</p>
            <p>Number cancelled: {report.unconfirmed}</p>
            <p>
              Average daily flight time: {Math.floor(report.averageTime)}{" "}
              minutes
            </p>
          </Card>
          <Card label="Top customers (Number of purchases)">
            {Object.entries(report.bestBuyers).map(([key, value], index) => (
              <p>{`${index + 1} ${key} (${value} Tickets)`}</p>
            ))}
          </Card>
          <Card label="Top Amonic Airlines offices">
            {Object.entries(report.bestWorkers).map(([key, value], index) => (
              <p>{`${index + 1} ${key} (${value})`}</p>
            ))}
          </Card>
        </Card>
      )}

      {emptySeats && (
        <Card label="Weekly report of percentage of empty seats">
          <div className={styles.innerWrapper}>
            <span>Yesterday: ${emptySeats.week0}</span>
            <span>Two days ago: ${emptySeats.week1} </span>
            <span>Three days ago: ${emptySeats.week2}</span>
          </div>
        </Card>
      )}

      {!!seatsPrices?.length && (
        <Card label="Revenue from ticket sales ">
          <div className={styles.innerWrapper}>
            <span>This week: {seatsPrices[0] as number}</span>
            <span>Last week: {seatsPrices[1] as number} </span>
            <span>Two weeks ago: {seatsPrices[2] as number}</span>
          </div>
        </Card>
      )}

      <div className={styles.innerWrapper} style={{ marginTop: "20px" }}>
        <span>Report generated in: seconds</span>
        <Button danger onClick={() => navigate("/main")}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ShortSummary;
