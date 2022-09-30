import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "pages/Auth/Auth";
import "antd/dist/antd.min.css";
import MainAdministrator from "pages/MainAdministrator/MainAdministrator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<MainAdministrator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
