import Navigationbar from "../components/Navigationbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getProfile } from "../lib/api";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, addAlert }) => {
  const user_id = document.cookie.split("user_id=")[1];
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();

    const fetchProfile = async () => {
      try {
        const response = await getProfile(user_id);
        setProfile(response);
        console.log("profile response", profile);

        if (response.status !== "active") {
          addAlert(
            "alert-info",
            "Your account is currently restricted. Kindly await administrative approval or reach out to the administrator for further assistance in obtaining approval"
          );
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user_id]);

  return (
    <div className="flex h-screen">
      {profile.status === "active" && profile.status === "active" && (
        <Sidebar />
      )}
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
