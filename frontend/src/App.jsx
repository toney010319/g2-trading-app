import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Registration from './pages/Registration';
import Alertbox from './components/Alertbox';
import { useState } from 'react';
import Deposit from './dashboard/Deposit';
import AdminDashboard from './admin/AdminDashboard';

const App = () => {
const [alerts, setAlerts] = useState([]); 

const addAlert = (type, message) => {
  setAlerts(prev => [...prev, {type, message}]);
  setTimeout(() => {
    removeAlert(0) 
  }, 3000)
}

const removeAlert = (index) => {
  setAlerts(prev => prev.filter((a, i) => i !== index))  
}


  return (
    <>
      <div className="relative">
          <div className="bg-gradient-to-b from-azure-300 to-azure-700">
            <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
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
              <Routes>
                <Route path="/" element={<Login addAlert={addAlert} />} />
                <Route path="/dashboard/*" element={<Dashboard addAlert={addAlert} />} />.
                <Route path="/admin" element={<AdminDashboard addAlert={addAlert}/>} />
                <Route path="/register" element={<Registration addAlert={addAlert} />} />
                <Route path ="/deposit" element={<Deposit addAlert={addAlert}/>} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    </>
  )
}

export default App
