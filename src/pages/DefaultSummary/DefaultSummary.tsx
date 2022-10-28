import { Button } from "antd";
import React from "react";
import { useGetDefaultSummaryQuery } from "store/services/summary";
import styles from "./DefaultSummary.module.scss";
import { useNavigate } from "react-router-dom";

const DefaultSummary = () => {
  const { data, isFetching } = useGetDefaultSummaryQuery(null);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Button onClick={() => navigate("/summary")}>
          View detailed result
        </Button>
        <Button onClick={() => navigate("/main")}>Exit</Button>
      </div>

      {!isFetching && data && (
        <table>
          <tr>
            <th></th>
            <th></th>
            <th colSpan={2}>Gender</th>

            <th colSpan={4}>Age</th>

            <th colSpan={3}>Cabin Type</th>
            <th colSpan={6}>Destination Airport</th>
          </tr>
          <tr>
            <th></th>
            <th>Total</th>

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
        </table>
      )}
    </div>
  );
};

export default DefaultSummary;
