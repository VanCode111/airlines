import React, { useEffect, useState } from "react";
import {
  useChangeFlightConfirmMutation,
  useGetSchedulesQuery,
} from "store/services/schedules";
import styles from "./Schedules.module.scss";
import Filters from "./components/Filters/Filters";
import { Button, Table } from "antd";
import axios from "axios";
import { useGetAirportsCodesQuery } from "store/services/flights";
import { convertDate } from "utils";
import classNames from "classnames";
import ScheduleEdit from "components/ScheduleEdit/ScheduleEdit";
import ImportChangesModal from "components/ImportChangesModal/ImportChangesModal";

const columns = [
  {
    title: "Date",
    dataIndex: "Date",
  },
  {
    title: "Time",
    dataIndex: "Time",
  },
  {
    title: "From",
    dataIndex: "from",
  },
  {
    title: "To",
    dataIndex: "to",
  },
  {
    title: "Flight Number",
    dataIndex: "FlightNumber",
  },
  {
    title: "Aircraft",
    dataIndex: "aircraft",
  },
  {
    title: "Economy price",
    dataIndex: "EconomyPrice",
  },
  {
    title: "Buisness price",
    dataIndex: "businessClass",
  },
  {
    title: "First class price",
    dataIndex: "firstClass",
  },
];

const Schedules = () => {
  const [filters, setFilters] = useState({});
  const [changeFlightConfirm] = useChangeFlightConfirmMutation();
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [isScheduleEditOpen, setIsScheduleEditOpen] = useState(false);
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);

  const openChangesModal = () => {
    setIsChangesModalOpen(true);
  };

  const closeChangesModal = () => {
    setIsChangesModalOpen(false);
  };

  const openScheduleEdit = () => {
    setIsScheduleEditOpen(true);
  };

  const closeScheduleEdit = () => {
    setIsScheduleEditOpen(false);
  };

  const { data, isLoading, isFetching, refetch } =
    useGetSchedulesQuery(filters);

  const updateList = () => {
    refetch();
  };

  const onChangeFlightConfirm = () => {
    changeFlightConfirm({ id: selectedFlight?.ID });
  };

  const applyFilters = (values: any) => {
    let { outbound } = values;
    console.log(convertDate(outbound));
    outbound = convertDate(outbound);
    setFilters({ ...values, outbound });
  };

  console.log(data);
  return (
    <div className={styles.schedules}>
      <Filters applyFilters={applyFilters} />
      <div className={styles.data}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={isFetching}
          pagination={false}
          rowClassName={(record, index) =>
            classNames({
              [styles.red]: record.Confirmed !== 1,
              [styles.selected]: record === selectedFlight,
            })
          }
          onRow={(record) => {
            return { onClick: () => setSelectedFlight(record) };
          }}
        />
      </div>
      <div className={styles.buttons}>
        <Button onClick={onChangeFlightConfirm} disabled={!selectedFlight}>
          Cancel Flight
        </Button>
        <Button
          className={styles.edit}
          onClick={openScheduleEdit}
          disabled={!selectedFlight}
        >
          Edit Flight
        </Button>
        <Button onClick={openChangesModal}>Import Changes</Button>
      </div>
      <ScheduleEdit
        onClose={closeScheduleEdit}
        flightData={selectedFlight}
        isOpen={isScheduleEditOpen}
      />
      <ImportChangesModal
        updateList={updateList}
        isOpen={isChangesModalOpen}
        onClose={closeChangesModal}
      />
    </div>
  );
};

export default Schedules;
