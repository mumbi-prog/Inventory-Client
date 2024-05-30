import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from '../Pages./Home';
import AdminLogin from "../Logins/AdminLogin";
import AdminSignup from "../Logins/AdminSignup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adminsignup" element={<AdminSignup />} />
      <Route path="/adminlogin" element={<AdminLogin/>} />
    </Routes>
  );
};

export default AllRoutes;
