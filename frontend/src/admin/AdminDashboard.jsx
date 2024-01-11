import { Routes, Route } from "react-router-dom";
import AdminDashboardHome from "./AdminDashboardHome";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const AdminDashboard = ({ addAlert }) => {

  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();
    console.log("Initiate token, admin dashboard");
  }, []);

  return (
    <>
      <AdminDashboardLayout addAlert={addAlert}>
        <Routes>
          <Route path="/" element={<AdminDashboardHome addAlert={addAlert} />} />
        </Routes>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboard;
