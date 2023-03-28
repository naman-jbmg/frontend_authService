// import React from "react";
// import { createContext, useState,useEffect } from "react";
// const AuthContext = createContext({});

// export  const AuthProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const token = localStorage.getItem("jwtToken");


//   const fetchUsers = async () => {
//     const response = await axios.get("http://localhost:4000/accounts/",{
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
    
//     setUsers(response.data);
//   };

//   const createUser = async (user) => {
//     const response = await axios.get("http://localhost:4000/accounts/register", {
      
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(user),
//     });
    
//     setUsers([...users, response.data]);
//   };

//   const updateUser = async (id, updatedUser) => {
//     const response = await fetch(`/api/users/${id}`, {
     
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updatedUser),
//     });
//     const data = await response.json();
//     const updatedUsers = users.map((user) =>
//       user.id === id ? { ...user, ...data } : user
//     );
//     setUsers(updatedUsers);
//   };
  
//   const DeleteUser = () => {
//     console.log(selectedUser.id);
//     axios
//       .delete(`http://localhost:4000/accounts/${selectedUser.id}`)
//       .then(() => {
//         const newUsers = users.filter((u) => u.id !== selectedUser.id);
//         setUsers(newUsers);
//         handleCloseModal();
//       })
//       .catch((error) => console.log(error));
//   };

//   // const deleteUser = async (id) => {
//   //   await fetch(`/api/users/${id}`, {
//   //     method: 'DELETE',
//   //     headers: {
//   //       Authorization: `Bearer ${localStorage.getItem('adminJWT')}`,
//   //     },
//   //   });
//   //   const filteredUsers = users.filter((user) => user.id !== id
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
        
      
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;