import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import Registration from './pages/Registration';

const App = () => {

  return (
    <>
      <div className="bg-gradient-to-b from-azure-300 to-azure-700">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />.
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
