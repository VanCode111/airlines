import React, { useState } from "react";
import styles from "./Flights.module.scss";
import Filters from "./components/Filters/Filters";
import { Checkbox, Form, Table } from "antd";
import { useGetFlightsForBookingQuery } from "store/services/flights";

const columns = [
  {
    title: "From",
    dataIndex: "from",
  },
  {
    title: "To",
    dataIndex: "to",
  },
  {
    title: "Date",
    dataIndex: "Date",
  },
  {
    title: "Time",
    dataIndex: "Time",
  },
  {
    title: "Flight number(s)",
    dataIndex: "FlightNumbers",
  },
  {
    title: "Cabin Price",
    dataIndex: "Price",
  },
  {
    title: "Number of stops",
    dataIndex: "Stops",
  },
];

const convertDate = (date: any) => {
  return new Date(date).toLocaleDateString().split(".").reverse().join("-");
};

const Flights = () => {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({});
  const [returnFilters, setReturnFilters] = useState(null);

  const from = Form.useWatch("from", form);
  const [isReturn, setIsReturn] = useState(true);
  const [displayThreeOutbound, setDisplayThreeOutbound] = useState(false);

  const { data, isLoading, isFetching } = useGetFlightsForBookingQuery({
    ...filters,
    advanced: displayThreeOutbound,
  });
  const { data: reversedFlights, isLoading: reversedIsLoading } =
    useGetFlightsForBookingQuery(returnFilters);

  const applyFilters = (filters: any) => {
    let { from, to, cabinType, outbound, returnDate } = filters;
    outbound = convertDate(filters.outbound);
    returnDate = convertDate(filters.returnDate);
    filters = { from, to, cabinType, date: outbound };
    const returnFilters: any = { from: to, to: from, date: returnDate };
    setFilters(filters);
    setReturnFilters(returnFilters);
  };
  console.log(displayThreeOutbound);
  return (
    <div className={styles.schedules}>
      <Filters
        changeIsReturn={(e: any) => setIsReturn(e.target.value)}
        isReturn={isReturn}
        applyFilters={applyFilters}
        form={form}
      />
      <div className={styles.data}>
        <Checkbox
          checked={displayThreeOutbound}
          onChange={(e) => setDisplayThreeOutbound(e.target.checked)}
        >
          Checkbox
        </Checkbox>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={isFetching}
          pagination={false}
        />
      </div>
      {isReturn && (
        <div className={styles.data}>
          <Table
            columns={columns}
            dataSource={reversedFlights}
            loading={reversedIsLoading}
            bordered
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default Flights;
