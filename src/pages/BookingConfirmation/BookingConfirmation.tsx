import React from "react";
import styles from "./BookingConfirmation.module.scss";
import { FC } from "react";
import FlightInfo from "./components/FlightInfo/FlightInfo";
import PassengerDetail from "./components/PassengerDetail/PassengerDetail";

const BookingConfirmation: FC = () => {
  return (
    <div className={styles.confirmation}>
      <FlightInfo
        from="from"
        to="to"
        cabinType="to"
        date="to"
        flightNumber="to"
        label="Outbound flight details"
      />
      <FlightInfo
        from="from"
        to="to"
        cabinType="to"
        date="to"
        flightNumber="to"
        label="Outbound flight details"
      />

      <PassengerDetail />
    </div>
  );
};

export default BookingConfirmation;
