import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Registration from "./pages/Registration";
import Alertbox from "./components/Alertbox";
import { useState } from "react";
import Deposit from "./dashboard/Deposit";
import Footer from "./components/Footer";
import MyProfile from "./dashboard/Myprofile";
import RequireAuth from "./context/hooks/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import AdminDashboard from "./admin/AdminDashboard";

// ... (previous imports)

const App = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, message) => {
    setAlerts((prev) => [...prev, { type, message }]);
    setTimeout(() => {
      removeAlert(0);
    }, 5000);
  };

  const removeAlert = (index) => {
    setAlerts((prev) => prev.filter((a, i) => i !== index));
  };

  return (
    <>
      <div className="relative">
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: `url(/slowbg.gif)`,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "100vh",
            zIndex: "-1",
            backgroundSize: "50% 100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {alerts.map((alert, index) => (
              <Alertbox
                key={index}
                type={alert.type}
                message={alert.message}
                onClose={() => removeAlert(index)}
              />
            ))}
          </div>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Login addAlert={addAlert} />} />
                <Route
                  path="/register"
                  element={<Registration addAlert={addAlert} />}
                />
                {/* TRADER ROUTES */}
                <Route element={<RequireAuth allowedRoles={["Trader"]} />}>
                  <Route
                    path="/dashboard/*"
                    element={<Dashboard addAlert={addAlert} />}
                  />
                  
                  <Route
                    path="/deposit"
                    element={<Deposit addAlert={addAlert} />}
                  />

                  {/* <Route path="/stripe" 
                  element={<Checkout />} 
                  /> */}

                  <Route
                    path="/my-profile"
                    element={<MyProfile addAlert={addAlert} />}
                  />
                </Route>
                {/* ADMIN ROUTES */}
                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                  <Route
                    path="/admin/*"
                    element={<AdminDashboard addAlert={addAlert} />}
                  />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
  
    </>
  );
};

export default App;
