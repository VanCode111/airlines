import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/main">Home</Link>
      <Link to="/flights">Flights</Link>
      <Link to="/amenities">Amenities</Link>
      <Link to="/schedules">Schedules</Link>
    </div>
  );
};

export default Header;
