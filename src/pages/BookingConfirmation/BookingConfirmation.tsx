import React, { useState } from "react";
import styles from "./BookingConfirmation.module.scss";
import { FC } from "react";
import FlightInfo from "./components/FlightInfo/FlightInfo";
import PassengerDetail from "./components/PassengerDetail/PassengerDetail";
import { Button, Table } from "antd";
import BillingConfirmationModal from "components/BillingConfirmationModal/BillingConfirmationModal";

const columns = [
  {
    title: "Firstname",
    dataIndex: "from",
  },
  {
    title: "Lastname",
    dataIndex: "to",
  },
  {
    title: "Birthday",
    dataIndex: "Date",
  },
  {
    title: "Passport number",
    dataIndex: "Time",
  },
  {
    title: "Passport Country",
    dataIndex: "FlightNumbers",
  },
  {
    title: "Phone",
    dataIndex: "Price",
  },
];

const data: any = [];

const BookingConfirmation: FC = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

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
      <div className={styles.table}>
        <span>Passengers list</span>
        <Table
          columns={columns}
          dataSource={data}
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
