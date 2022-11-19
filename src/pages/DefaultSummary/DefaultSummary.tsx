import { Button } from "antd";
import React from "react";
import {
  useGetDefaultSummaryQuery,
  useGetSummaryTimePeriodsQuery,
} from "store/services/summary";
import styles from "./DefaultSummary.module.scss";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const DefaultSummary = () => {
  const { data, isFetching } = useGetDefaultSummaryQuery(null);
  const { data: timePeriods } = useGetSummaryTimePeriodsQuery(null);
  const navigate = useNavigate();
  console.log(data);

  const newData = () => {
    const res: any = [];
    Object.values(data).forEach((item: any) =>
      Object.values(item).forEach((a: any) => res.push(a))
    );
    console.log(res);
    return res;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Button onClick={() => navigate("/summary")}>
          View detailed result
        </Button>
        <Button onClick={() => navigate("/main")} danger>
          Exit
        </Button>
      </div>

      {isFetching && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin style={{ marginTop: "20px" }} />
        </div>
      )}

      {!isFetching && data && timePeriods && (
        <div>
          <div className={styles.header}>
            <p style={{ marginTop: "20px" }}>
              Field work:{" "}
              {`${timePeriods[0]} - ${timePeriods[timePeriods.length - 1]}`}
            </p>
            <p>
              Sample Size:{" "}
              {
                Object.values(data.ages).reduce(
                  (acc: any, item: any) => acc + item,
                  0
                ) as number
              }
            </p>
          </div>

          <table className={styles.summary}>
            <tr>
              <th colSpan={2}>Gender</th>

              <th colSpan={4}>Age</th>

              <th colSpan={3}>Cabin Type</th>
              <th colSpan={6}>Destination Airport</th>
            </tr>
            <tr>
              <th>Male</th>
              <th>Female</th>

              <th>18-24</th>
              <th>25-39</th>
              <th>40-59</th>
              <th>60+</th>

              <th>Economy</th>
              <th>Business</th>
              <th>First Class</th>
              <th>AUH</th>
              <th>CAI</th>
              <th>BAH</th>
              <th>ADE</th>
              <th>DOH</th>
              <th>RUH</th>
            </tr>

            <tr>
              {newData().map((item: any) => (
                <td>{item}</td>
              ))}
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default DefaultSummary;
