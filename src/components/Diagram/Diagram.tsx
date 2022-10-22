import React from "react";
import styles from "./Diagram.module.scss";
import { FC } from "react";

interface Element {
  value: number;
  color: string;
}

interface DiagramProps {
  elements: Element[];
}

const Diagram: FC<DiagramProps> = ({ elements }) => {
  const allValues = elements.reduce((acc, { value }) => acc + value, 0);

  return (
    <div className={styles.diagram}>
      {elements.map((elm, index) => (
        <div
          key={index}
          className={styles.element}
          style={{
            backgroundColor: elm.color,
            width: `${(elm.value / allValues) * 100}%`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Diagram;
