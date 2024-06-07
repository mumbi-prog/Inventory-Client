import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Logins/AdminLogin";
import AdminSignup from "../Logins/AdminSignup";
import Dashboard from "../Admin/Dashboard";
import CreateProduct from "../Admin/CreateProduct";
import UserList from "../Admin/UserList";
import WelcomeAdmin from "../Admin/WelcomeAdmin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<dminLogin/>} />
      <Route path="/adminsignup" element={<AdminSignup />} />
      <Route path="/adminlogin" element={<AdminLogin/>} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/newproduct" element={<CreateProduct />}/>
      <Route path="/userlist" element={<UserList />}/>
      <Route path="/welcomeadmin" element={<WelcomeAdmin />} />
    </Routes>
  );
};

export default AllRoutes;
