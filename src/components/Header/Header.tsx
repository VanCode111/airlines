import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

const NAVS: any = {
  User: [
    { label: "Home", to: "/main" },
    { label: "Flights", to: "/flights" },
    { label: "Amenities", to: "/amenities" },
  ],
  Administrator: [
    { label: "Home", to: "/main" },
    { label: "Flights", to: "/flights" },
    { label: "Amenities", to: "/amenities" },
    { label: "Schedules", to: "/schedules" },
    { label: "Summary", to: "/defaultSummary" },
    { label: "Short Summary", to: "/shortSummary" },
  ],
};

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className={styles.wrapper}>
      {user?.role &&
        NAVS[user.role]?.map((item: any) => (
          <Link to={item.to}>{item.label}</Link>
        ))}
    </div>
  );
};

export default Header;
