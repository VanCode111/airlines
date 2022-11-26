import React, { useMemo } from "react";
import styles from "./Modal.module.scss";
import { Modal, Table } from "antd";

const columns = [
  {
    title: "From",
    dataIndex: "from",
  },
  {
    title: "To",
    dataIndex: "to",
  },
];

const createColumns = (data) => {
  const columns = [];

  if (!data) {
    return [];
  }

  Object.values(data)?.forEach((item) => {
    Object.keys(item)?.forEach((value) => {
      columns.push({
        title: value,
        dataIndex: value,
      });
    });
  });

  return columns;
};

const getDataSource = (data, initialData) => {
  const dataSource = [];

  if (!data) {
    return [];
  }

  initialData = initialData.reduce(
    (acc, item) => ({ ...acc, [item.dataIndex]: 0 }),
    {}
  );

  Object.keys(data).forEach((key) => {
    dataSource.push({ ...initialData, Amenitie: key, ...data[key] });
  });

  return dataSource;
};

const ModalInner = ({ data, isOpen, onClose }) => {
  console.log(data);
  const columns = useMemo(
    () => [
      { title: "Amenitie", dataIndex: "Amenitie" },
      ...createColumns(data),
    ],
    [data]
  );

  const dataSource = useMemo(() => getDataSource(data, columns), [data]);

  console.log(columns);
  return (
    <Modal
      footer={null}
      title="Amenities report"
      open={isOpen}
      onCancel={onClose}
      width={1500}
    >
      <Table columns={columns} dataSource={dataSource} />
    </Modal>
  );
};

export default ModalInner;
