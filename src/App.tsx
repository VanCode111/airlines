import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "pages/Auth/Auth";
import "antd/dist/antd.min.css";
import MainAdministrator from "pages/MainAdministrator/MainAdministrator";
import { useSelector } from "react-redux";
import Schedules from "pages/Schedules/Schedules";
import Flights from "pages/Flights/Flights";

function App() {
  const { user } = useSelector((state: any) => state.auth);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<MainAdministrator />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
