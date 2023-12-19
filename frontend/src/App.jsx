import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import Registration from './pages/Registration';
import Alertbox from './components/Alertbox';
import { useState } from 'react';

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
      <div className="bg-gradient-to-b from-azure-300 to-azure-700">
        <div style={{position: 'absolute', top: '10%', left: '45%'}}>
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
            <Route path="/dashboard" element={<Dashboard />} />.
            <Route path="/register" element={<Registration addAlert={addAlert} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
