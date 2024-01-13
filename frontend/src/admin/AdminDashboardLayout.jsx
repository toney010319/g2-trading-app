import { Outlet } from "react-router-dom";
import AdminNavigationBar from "./components/AdminNavigationBar";
import { useEffect } from "react";
import axios from 'axios'
// eslint-disable-next-line react/prop-types
const AdminDashboardLayout = ({ addAlert }) => {
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();

  }, []);
  return (
    <div className="flex h-screen">


      <div className="w-screen">
        <div className="flex-1">
          <AdminNavigationBar addAlert={addAlert} />
        </div>

        <div className="flex-1"><Outlet /></div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
