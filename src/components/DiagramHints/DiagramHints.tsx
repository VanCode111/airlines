import React from "react";
import styles from "./DiagramHints.module.scss";
import { FC } from "react";

interface Hint {
  color: string;
  label: string;
}

interface DiagramHintsProps {
  hints: Hint[];
}

const DiagramHints: FC<DiagramHintsProps> = ({ hints }) => {
  return (
    <div className={styles.hints}>
      {hints.map(({ color, label }) => (
        <div className={styles.hint}>
          <div
            style={{ backgroundColor: color }}
            className={styles.colorBlock}
          ></div>{" "}
          {label}
        </div>
      ))}
    </div>
  );
};

export default DiagramHints;
