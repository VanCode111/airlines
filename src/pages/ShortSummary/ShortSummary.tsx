import React, { useEffect, useState } from "react";
import styles from "./ShortSummary.module.scss";
import logo from "assets/logo.png";
import Card from "components/Card/Card";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAverageSeatsPriceQuery,
  useGetFreeSeatsQuery,
  useGetReportQuery,
} from "store/services/summary";

const ShortSummary = () => {
  const navigate = useNavigate();
  const { data: emptySeats, isLoading: loading1 } = useGetFreeSeatsQuery(null);
  const { data: report, isLoading: loading2 } = useGetReportQuery(null);
  const { data: seatsPrice, isLoading: loading3 } =
    useGetAverageSeatsPriceQuery(null);

  const isLoading = loading3 || loading2 || loading1;
  const [ms, setms] = useState(0);
  const days = report?.days
    ? Object.entries(report.days).sort((a: any, b: any) => a[1] - b[1])
    : [];

  let seatsPrices = seatsPrice ? Object.values(seatsPrice) : [];

  useEffect(() => {
    setms(Date.now());
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

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
          <div className={styles.cardWrapper}>
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
            <Card label="Number of passengers flying">
              <>
                {days[0] && (
                  <p>
                    <>
                      Busiest Day: {days[0][0]} with {days[0][1]} flying
                    </>
                  </p>
                )}
                {days[1] && (
                  <p>
                    <>
                      Most quiet day: {days[1][0]} with {days[1][1]} flying
                    </>
                  </p>
                )}
              </>
            </Card>
            <Card label="Top Amonic Airlines offices">
              {Object.entries(report.bestWorkers).map(([key, value], index) => (
                <p>{`${index + 1} ${key} (${value})`}</p>
              ))}
            </Card>
          </div>
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
        {seatsPrice && (
          <span>
            Report generated in: {Math.floor(Date.now() - ms) / 1000} seconds
          </span>
        )}
        <Button danger onClick={() => navigate("/main")}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ShortSummary;
