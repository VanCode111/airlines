import React, { ReactNode } from "react";
import styles from "./Card.module.scss";
import { FC } from "react";

interface CardProps {
  label: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ label, children }) => {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <div className={styles.cardContainer}>{children}</div>
    </div>
  );
};

export default Card;
