import React from "react";
import { FC } from "react";
import Card from "components/Card/Card";
import styles from "./FlightInfo.module.scss";

interface FlightInfoProps {
  from: string;
  to: string;
  cabinType: string;
  date: string;
  flightNumber: string;
  label: string;
}

const FlightInfo: FC<FlightInfoProps> = ({
  from,
  to,
  cabinType,
  date,
  flightNumber,
  label,
}) => {
  return (
    <Card label={label}>
      <div className={styles.flightInfo}>
        <div className={styles.flightInfoItem}>
          From: <span>{from}</span>
        </div>
        <div className={styles.flightInfoItem}>
          From: <span>{from}</span>
        </div>
        <div className={styles.flightInfoItem}>
          From: <span>{from}</span>
        </div>
        <div className={styles.flightInfoItem}>
          From: <span>{from}</span>
        </div>
      </div>
    </Card>
  );
};

export default FlightInfo;
