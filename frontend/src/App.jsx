import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import Registration from './pages/Registration';

const App = () => {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />.
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
