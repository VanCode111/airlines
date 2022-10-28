import React from "react";
import Diagram from "components/Diagram/Diagram";
import styles from "./Summary.module.scss";
import { Checkbox, DatePicker, Form, Select, Table } from "antd";
import { mockSummary } from "../../constants";
import { colors } from "../../constants";
import DiagramHints from "components/DiagramHints/DiagramHints";
import { useGetAdvancedInformationQuery } from "store/services/summary";
import { Spin } from "antd";
import { convertDate } from "utils";

const columns = [
  {
    title: "",
    dataIndex: "aa",
    visible: false,
  },
  {
    title: "From",
    dataIndex: "from",
  },
];

const Summary = () => {
  const [form] = Form.useForm();

  const date = Form.useWatch("date", form);
  const isAges = Form.useWatch("isAges", form);
  const isGenders = Form.useWatch("isGenders", form);

  console.log(date);

  const { data, isFetching } = useGetAdvancedInformationQuery({
    date: date ? convertDate(date) : "all",
    age: "all",
    gender: "all",
  });

  const hints = data
    ? data[0].answers.map(({ text }: { text: any }, index: number) => ({
        color: colors[index],
        label: text,
      }))
    : [];

  console.log(isAges);
  return (
    <div className={styles.summary}>
      <Form form={form}>
        <Form.Item name="date" label="Time period">
          <DatePicker />
        </Form.Item>
      </Form>

      {isFetching && <Spin className={styles.spin} size="large" />}
      {!isFetching && data && (
        <table>
          <tr>
            <th></th>
            <th></th>
            {isGenders && <th colSpan={2}>Gender</th>}

            {isAges && <th colSpan={4}>Age</th>}

            <th colSpan={3}>Cabin Type</th>
            <th colSpan={6}>Destination Airport</th>
          </tr>
          <tr>
            <th></th>
            <th>Total</th>
            {isGenders && (
              <>
                <th>Age</th>
                <th>Cabin Type</th>
              </>
            )}

            {isAges && (
              <>
                <th>18-24</th>
                <th>25-39</th>
                <th>40-59</th>
                <th>60+</th>
              </>
            )}
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

          {data.map((item: any) => (
            <>
              <tr className={styles.question}>
                <td>{item.questionText}</td>
                <td colSpan={16}>
                  <Diagram
                    elements={item.answers.map(
                      ({ total }: { total: any }, index: number) => ({
                        value: total,
                        color: colors[index],
                      })
                    )}
                  />
                </td>
              </tr>
              {item.answers.map((answer: any) => (
                <tr>
                  {Object.entries(answer).map(([key, item]: any) => {
                    if (key === "age" && !isAges) {
                      return null;
                    }
                    if (key === "gender" && !isGenders) {
                      return null;
                    }
                    return typeof item === "object" ? (
                      Object.values(item).map((value: any) => <td>{value}</td>)
                    ) : (
                      <td>{item}</td>
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
        </table>
      )}

      {!isFetching && (
        <div className={styles.hints}>
          <DiagramHints hints={hints} />
        </div>
      )}

      <Form
        form={form}
        initialValues={{ isAges: true, isGenders: true }}
        className={styles.selects}
      >
        <Form.Item name="isGenders" valuePropName="checked">
          <Checkbox>Gender</Checkbox>
        </Form.Item>
        <Form.Item label="Genders" className={styles.select}>
          <Select disabled={!isGenders}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isAges" valuePropName="checked">
          <Checkbox>Age</Checkbox>
        </Form.Item>
        <Form.Item label="Ages" className={styles.select}>
          <Select disabled={!isAges}>
            <Select.Option value="demo">Age</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Summary;
