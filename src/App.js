import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/pages/auth/Log-reg/LoginReg";
import ResetPassword from "./components/pages/auth/ResetPassword";
import SendPasswordResetEmail from "./components/pages/auth/SendPasswordResetEmail";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import { AuthProvider } from './components/pages/auth/context/AuthProvider';

import { useEffect,useState } from 'react';
import axios from 'axios';
import RolePerm from './components/pages/RolePerm/RolePerm';
import { color } from '@mui/system';
import { ToastContainer } from "react-toastify";


function App() {
  const accessToken=localStorage.getItem("jwtToken");
  const [users, setUsers] = useState({});
  // const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("jwtToken");

useEffect(()=>{
   const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4000/accounts/",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    setUsers(response.data);
  };
 fetchUsers();
},[]);
  return (
    <div className="App">
       <ToastContainer limit={1}/>
      {/* <BrowserRouter> */}
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="role" element={<RolePerm />} />
            <Route path="password" element={<SendPasswordResetEmail />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
         
          <Route path="dashboard" element={<Dashboard/>} />
          {/* <Route path="/dashboard" element={jwtToken= "123" ? <Dashboard /> : <change/>} /> */}
          < Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      {/* </BrowserRouter> */}
      {/* sendpasswordresetemail */}
      
    </div>
  );
}

export default App;
