 
import {Routes, Route } from 'react-router-dom';
import AdminDashboardHome from "./AdminDashboardHome";
import AdminDashboardLayout from "./AdminDashboardLayout";
const AdminDashboard = ({addAlert}) => {
    return (
    <>
    <AdminDashboardLayout addAlert={addAlert}>
        <Routes>
          <Route path="/" element={<AdminDashboardHome  />} />  
        </Routes>
    </AdminDashboardLayout>
    </>
    
    )
}

export default AdminDashboard;


 