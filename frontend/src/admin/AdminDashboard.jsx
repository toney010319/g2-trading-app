import axios from 'axios';
import { useEffect } from 'react'
import AdminDashboardLayout from './AdminDashboardLayout';
import { Routes, Route } from 'react-router-dom';
import AdminVerifcation from './AdminVerifcation';
import AdminDashboardHome from './AdminDashboardHome';
import Dashboard from '../dashboard/Dashboard';
import TransactionLogs from './components/TransactionLogs';
const AdminDashboard = ({ addAlert }) => {
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
    <>
      <AdminDashboardLayout addAlert={addAlert} >
        <Routes>
          <Route path="/" element={<AdminDashboardHome addAlert={addAlert} />} />
          <Route path="/verification" element={<AdminVerifcation addAlert={addAlert} />} />
          <Route path="/Transaction" element={<TransactionLogs addAlert={addAlert} />} />
          <Route path="/dashboard" element={<Dashboard addAlert={addAlert} />} />


        </Routes>
      </AdminDashboardLayout>
    </>
  )
}

export default AdminDashboard
