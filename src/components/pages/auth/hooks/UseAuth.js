
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function UseAuth() {

const [usersAll,setUsers]=useState([]);
const [AllPermission,setAllpermission]=useState([])
const [AllRole,setRole]=useState([])
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
    const fetchRole= async () => {
     const response = await axios.get("http://localhost:4000/accounts/auth/all-role",{
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     
     setRole(response.data);
   };

  
  fetchUsers();
  fetchRole();
 },[]);
  
 return [usersAll,AllRole];
};
