import Navigationbar from "../components/Navigationbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, addAlert }) => {
  useEffect(() => {
    const initiateAuthorization = () => {
        const token = document.cookie.split('token=')[1];
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        }
    };
    initiateAuthorization();
}, []);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-screen">
        <div className="flex-1">
          <Navigationbar addAlert={addAlert} />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
