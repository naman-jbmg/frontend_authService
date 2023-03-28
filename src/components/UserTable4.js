// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
// import axios from "axios";

// export default function UserTable4() {
//   const [users, setUsers] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(5);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const result = await axios("https://jsonplaceholder.typicode.com/users");
//       setUsers(result.data);
//     };
//     fetchUsers();
//   }, []);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "https://jsonplaceholder.typicode.com/users",
//         currentUser
//       );
//       setShowAddModal(false);
//       setCurrentUser({});
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://jsonplaceholder.typicode.com/users/${currentUser.id}`,
//         currentUser
//       );
//       setShowEditModal(false);
//       setCurrentUser({});
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(
//         `https://jsonplaceholder.typicode.com/users/${userId}`
//       );
//       setUsers(users.filter((user) => user.id !== userId));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleOpenEditModal = (user) => {
//     setCurrentUser(user);
//     setShowEditModal(true);
//   };

//   return (
//     <>
//       <div className="container">
//         <h1>User Table</h1>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleOpenEditModal(user)}
//                   >
//                     Edit
//                   </Button>{" "}
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDeleteUser(user.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
//         const response = await axios.get('/api/users', {
//           headers: {
//             Authorization: `Bearer ${token}` // Set the Authorization header with the JWT token
//           }
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>User Table</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/user');
      setUser(response.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.name}!</h1>
      {user.isAdmin ? (
        <div>
          <h2>User Table</h2>
          {/* Render the user table component here */}
        </div>
      ) : (
        <div>
          <h2>Profile Information</h2>
          {/* Render the user's profile information here */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
