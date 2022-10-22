import React from "react";
import Diagram from "components/Diagram/Diagram";
import styles from "./Summary.module.scss";
import { Table } from "antd";
import { mockSummary } from "../../constants";
import { colors } from "../../constants";
import DiagramHints from "components/DiagramHints/DiagramHints";

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
  const hints = mockSummary[0].answers.map(({ text }, index) => ({
    color: colors[index],
    label: text,
  }));

  return (
    <div className={styles.summary}>
      <table>
        <tr>
          <th></th>
          <th></th>
          <th colSpan={2}>Gender</th>
          <th colSpan={4}>Age</th>
          <th colSpan={3}>Cabin Type</th>
          <th colSpan={6}>Destination Airport</th>
        </tr>
        <tr>
          <th></th>
          <th>Total</th>
          <th>Age</th>
          <th>Cabin Type</th>
          <th>18-24</th>
          <th>25-39</th>
          <th>40-59</th>
          <th>60+</th>
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

        {mockSummary.map((item) => (
          <>
            <tr className={styles.question}>
              <td>{item.questionText}</td>
              <td colSpan={16}>
                <Diagram
                  elements={item.answers.map(({ total }, index) => ({
                    value: total,
                    color: colors[index],
                  }))}
                />
              </td>
            </tr>
            {item.answers.map((answer) => (
              <tr>
                {Object.values(answer).map((item) =>
                  typeof item === "object" ? (
                    Object.values(item).map((value) => <td>{value}</td>)
                  ) : (
                    <td>{item}</td>
                  )
                )}
              </tr>
            ))}
          </>
        ))}
      </table>

      <div className={styles.hints}>
        <DiagramHints hints={hints} />
      </div>
    </div>
  );
};

export default Summary;
