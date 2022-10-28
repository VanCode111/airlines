import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "pages/Auth/Auth";
import "antd/dist/antd.min.css";
import MainAdministrator from "pages/MainAdministrator/MainAdministrator";
import { useSelector } from "react-redux";
import Schedules from "pages/Schedules/Schedules";
import Flights from "pages/Flights/Flights";
import BookingConfirmation from "pages/BookingConfirmation/BookingConfirmation";
import Summary from "pages/Summary/Summary";
import DefaultSummary from "pages/DefaultSummary/DefaultSummary";
import Amenities from "pages/Amenities/Amenities";
import UserMain from "pages/UserMain/UserMain";
import Layout from "components/Layout/Layout";

function App() {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "Administrator" && (
          <Route
            path="/main"
            element={
              <Layout>
                <MainAdministrator />
              </Layout>
            }
          />
        )}

        {user?.role === "User" && (
          <Route
            path="/main"
            element={
              <Layout>
                <UserMain />
              </Layout>
            }
          />
        )}

        <Route path="/" element={<Auth />} />

        <Route
          path="/schedules"
          element={
            <Layout>
              <Schedules />
            </Layout>
          }
        />
        <Route
          path="/flights"
          element={
            <Layout>
              <Flights />
            </Layout>
          }
        />
        <Route
          path="/confirmation"
          element={
            <Layout>
              <BookingConfirmation />
            </Layout>
          }
        />
        <Route
          path="/summary"
          element={
            <Layout>
              <Summary />
            </Layout>
          }
        />
        <Route
          path="/defaultsummary"
          element={
            <Layout>
              <DefaultSummary />
            </Layout>
          }
        />
        <Route
          path="/amenities"
          element={
            <Layout>
              <Amenities />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
