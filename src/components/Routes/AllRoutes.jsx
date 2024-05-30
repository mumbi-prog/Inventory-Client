import React from "react";
import { Routes, Route } from "react-router-dom";

// import OrganizerSignupPage from "../components/Login/organiserSignup";
// import CustomerSignupPage from '../components/Login/signup';
// import CustomerLoginPage from "../components/Login/customerLogin";
import HomePage from '../Pages./Home';
// import MainOrgApp from "../components/Organizer/MainOrgApp";
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
