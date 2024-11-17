import { useState } from 'react'
import './App.css'
import Navbar from './Component/Navbar/Navbar'
import NewLogin from './Component/Login/NewLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import ForgetPassword from './Component/Login/ForgetPassword';


function App() {
  const [selectedRole, setSelectedRole] = useState('');
  return (
    <>
   

        <Router>
          <div className="container">
            <Navbar setSelectedRole={setSelectedRole}/>
            <Routes>
              <Route path="/" element={<NewLogin selectedRole={selectedRole} />} /> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forgotpassword" element={<ForgetPassword />} /> 
            </Routes>
          </div>
        </Router>

    </>
  )
}

export default App
