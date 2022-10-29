import React, { useState } from "react";
import styles from "./ImportChangesModal.module.scss";
import { FC } from "react";
import { Button, Modal, Upload, UploadProps, message } from "antd";
import Card from "components/Card/Card";
import { useLoadFromFileMutation } from "store/services/schedules";

interface ImportChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateList: () => void;
}

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  //   beforeUpload(file) {
  //     return new Promise((resolve) => {
  //       console.log(file);
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = function (e: any) {
  //         console.log(reader.result);
  //       };
  //       reader.readAsText(file);
  //     });
  //   },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      const reader: any = new FileReader();
      console.log(info.file);
      reader.onload = function (e: any) {
        console.log(reader.result);
      };
      reader.readAsText(info.file);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ImportChangesModal: FC<ImportChangesModalProps> = ({
  isOpen,
  onClose,
  updateList,
}) => {
  const [changesObjects, setChangesObjects] = useState<any>([]);
  const [countUnsuccessful, setCountUnsuccessful] = useState(0);
  const [countSuccessful, setCountSuccessful] = useState(0);
  const [countRepeated, setCountRepeated] = useState(0);
  const [load, { isLoading }] = useLoadFromFileMutation();
  const [isResult, setIsResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const createChanges = (changes: string) => {
    const lines = changes.trim().split("\r\n");

    let amountUnsuccessful = 0;
    let amountRepeated = 0;
    const existedLines: any = {};
    const changesResult = [];

    for (let line of lines) {
      const columns: string[] = line.split(",");
      const lengthOfColumns = columns.length;
      const [action, date, time, flight, from, to, aircraft, price, status] =
        columns;

      if (lengthOfColumns < 9) {
        console.log(line);
        amountUnsuccessful++;
        continue;
      }
      changesResult.push({
        action,
        date,
        time,
        flight,
        from,
        to,
        aircraft,
        price: Math.trunc(+price),
        status,
      });
    }
    setChangesObjects(changesResult);
    setCountUnsuccessful(amountUnsuccessful);
  };

  const applyChanges = async () => {
    setLoading(true);
    setIsResult(false);
    const results = await Promise.all(
      changesObjects.map((item: any) => load(item))
    );
    const countSucc = results.reduce(
      (acc, curr) => (curr.data == 1 ? acc + 1 : acc),
      0
    );

    setCountSuccessful(countSucc);
    setCountRepeated(results.length - countSucc);
    setLoading(false);
    setIsResult(true);
    if (countSucc > 0) {
      updateList();
    }
  };

  return (
    <Modal
      footer={null}
      title="Apply Schedule Changes"
      open={isOpen}
      onCancel={onClose}
    >
      <Upload
        beforeUpload={(file) => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            createChanges(e.target.result);
            console.log(e.target.result);
          };
          reader.readAsText(file);

          // Prevent upload
          return false;
        }}
        {...props}
      >
        <Button>Import</Button>
      </Upload>
      {isResult && (
        <Card label="Result">
          <p>Successful changes applied: {countSuccessful}</p>
          <p>Records with missing fields discarded: {countUnsuccessful}</p>
          <p>Duplicate Records Discarded: {countRepeated}</p>
        </Card>
      )}
      {!!changesObjects.length && (
        <Button
          disabled={loading}
          className={styles.apply}
          onClick={applyChanges}
          loading={loading}
        >
          Apply
        </Button>
      )}
    </Modal>
  );
};

export default ImportChangesModal;
