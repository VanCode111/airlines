import React, { useState } from "react";
import styles from "./BookingConfirmation.module.scss";
import { FC } from "react";
import FlightInfo from "./components/FlightInfo/FlightInfo";
import PassengerDetail from "./components/PassengerDetail/PassengerDetail";
import { Button, Table } from "antd";
import BillingConfirmationModal from "components/BillingConfirmationModal/BillingConfirmationModal";
import { useLocation } from "react-router-dom";

const columns = [
  {
    title: "Firstname",
    dataIndex: "firstName",
  },
  {
    title: "Lastname",
    dataIndex: "lastName",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
  },
  {
    title: "Passport number",
    dataIndex: "passport",
  },
  {
    title: "Passport Country",
    dataIndex: "country",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
];

const data: any = [];

const BookingConfirmation: FC = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [addedPassengers, setAddedPassengers] = useState<any>([]);

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const addPassenger = (passenger: any) => {
    setAddedPassengers((prev: any) => [...prev, passenger]);
  };

  let { state } = useLocation();
  state = state || {};
  const { selectedReturn, selectedOutbound, cabinType } = state;

  return (
    <div className={styles.confirmation}>
      {selectedOutbound && (
        <FlightInfo
          from={selectedOutbound.from}
          to={selectedOutbound.to}
          cabinType={cabinType}
          date={selectedOutbound.Date}
          flightNumber={selectedOutbound.FlightNumbers}
          label="Outbound flight details"
        />
      )}

      {selectedReturn && (
        <FlightInfo
          from={selectedReturn.from}
          to={selectedReturn.to}
          cabinType={cabinType}
          date={selectedReturn.Date}
          flightNumber={selectedReturn.FlightNumbers}
          label="Return flight details"
        />
      )}

      <PassengerDetail addPassenger={addPassenger} />
      <div className={styles.table}>
        <span>Passengers list</span>
        <Table
          columns={columns}
          dataSource={addedPassengers}
          bordered
          pagination={false}
        />
        <Button className={styles.remove}>Remove passenger</Button>
      </div>

      <div className={styles.buttons}>
        <Button>Back to search for flights</Button>
        <Button onClick={openConfirmationModal}>Confirm booking</Button>
      </div>
      <BillingConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
      />
    </div>
  );
};

export default BookingConfirmation;
