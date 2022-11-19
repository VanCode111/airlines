import React, { useState } from "react";
import styles from "./Flights.module.scss";
import Filters from "./components/Filters/Filters";
import { Button, Checkbox, Form, Input, Table } from "antd";
import { useGetFlightsForBookingQuery } from "store/services/flights";
import Card from "components/Card/Card";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

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
  const [filters, setFilters] = useState<any>({});
  const [returnFilters, setReturnFilters] = useState({});
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [amountPassengers, setAmountPassengers] = useState("1");

  const navigate = useNavigate();

  const from = Form.useWatch("from", form);
  const [isReturn, setIsReturn] = useState(true);
  const [displayThreeOutbound, setDisplayThreeOutbound] = useState(false);
  const [displayThreeReturn, setDisplayThreeReturn] = useState(false);

  const { data, isLoading, isFetching } = useGetFlightsForBookingQuery({
    ...filters,
    advanced: displayThreeOutbound,
  });
  const { data: reversedFlights, isLoading: reversedIsLoading } =
    useGetFlightsForBookingQuery({
      ...returnFilters,
      advanced: displayThreeReturn,
    });

  const applyFilters = (filters: any) => {
    let { from, to, cabinType, outbound, returnDate } = filters;
    outbound = convertDate(filters.outbound);
    returnDate = convertDate(filters.returnDate);
    console.log(returnDate);
    filters = { from, to, cabinType, date: outbound };
    const returnFilters: any = {
      from: to,
      to: from,
      date: returnDate,
      cabinType,
    };
    setFilters(filters);
    setReturnFilters(returnFilters);
  };

  const bookFlight = () => {
    navigate("/confirmation", {
      state: {
        selectedReturn,
        selectedOutbound,
        amountPassengers: +amountPassengers,
        cabinType: filters.cabinType,
      },
    });
  };

  return (
    <div className={styles.schedules}>
      <Filters
        changeIsReturn={(e: any) => setIsReturn(e.target.value)}
        isReturn={isReturn}
        applyFilters={applyFilters}
        form={form}
      />
      <div className={styles.data}>
        <div className={styles.tableHeader}>
          Outbound flight details:
          <Checkbox
            checked={displayThreeOutbound}
            onChange={(e) => setDisplayThreeOutbound(e.target.checked)}
          >
            Display three days before and after
          </Checkbox>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={isFetching}
          pagination={false}
          rowClassName={(record, index) =>
            classNames({
              [styles.selected]: record === selectedOutbound,
            })
          }
          onRow={(record) => {
            return { onClick: () => setSelectedOutbound(record) };
          }}
        />
      </div>
      {isReturn && (
        <div className={styles.data}>
          <div className={styles.tableHeader}>
            Return flight details:
            <Checkbox
              checked={displayThreeReturn}
              onChange={(e) => setDisplayThreeReturn(e.target.checked)}
            >
              Display three days before and after
            </Checkbox>
          </div>
          <Table
            columns={columns}
            dataSource={reversedFlights}
            loading={reversedIsLoading}
            bordered
            pagination={false}
            rowClassName={(record, index) =>
              classNames({
                [styles.selected]: record === selectedReturn,
              })
            }
            onRow={(record) => {
              return { onClick: () => setSelectedReturn(record) };
            }}
          />
        </div>
      )}
      {(Boolean(selectedReturn) || selectedOutbound) && (
        <div className={styles.confirmCard}>
          <Card label="Confirm booking for">
            <div className={styles.confirmBooking}>
              <Form.Item label="Passengers">
                <Input
                  value={amountPassengers}
                  onChange={(e) => setAmountPassengers(e.target.value)}
                />
              </Form.Item>
              <Button onClick={bookFlight}>Book flight</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Flights;
