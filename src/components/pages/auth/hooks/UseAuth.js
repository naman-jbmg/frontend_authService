
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function UseAuth() {

const [users,setUsers]=useState([]);
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
  
 return [users];
};
