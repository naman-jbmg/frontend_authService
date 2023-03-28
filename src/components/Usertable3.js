import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Usertable3() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const token = localStorage.getItem("jwtToken"); 

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
  };

  const handleShowModal = (user) => {
    setShowModal(true);
    setSelectedUser(user);
    setFirstName(user ? user.firstName : "");
    setLastName(user ? user.lastName : "");
    setEmail(user ? user.email : "");
    setRole(user ? user.role : "");
  };

  const handleAddUser = () => {
    axios
      .post("http://localhost:4000/accounts/register", { firstName, lastName, email })
      .then((response) => {
        setUsers([...users, response.data]);
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:4000/accounts/${selectedUser.id}`, {
        firstName,
        lastName,
        email,
        role,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      })
      .then((response) => {
        const index = users.findIndex((u) => u.id === response.data.id);
        const newUsers = [...users];
        newUsers[index] = response.data;
        setUsers(newUsers);
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = () => {
    console.log(selectedUser.id);
    axios
      .delete(`http://localhost:4000/accounts/${selectedUser.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const newUsers = users.filter((u) => u.id !== selectedUser.id);
        setUsers(newUsers);
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        const response = await axios.get("http://localhost:4000/accounts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        toast.success("Login successfully")
      } catch (err) {
        if (!err?.response) {
          console.log(err);
          toast.error("No Server Response");
        } else if (err.response?.status === 400) {
          toast.error(err.response?.data.message);
          //setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          toast.error("Unauthorized");
        } else {
          toast.error("Login Failed");
        }
        
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Table
        striped
        bordered
        hover
        style={{ display: "inline-block", marginLeft: 90, marginTop: 100 ,width:40}}
      >
        <thead>
          <tr>
            <th>S.No.</th>
            <th>USER_ID</th>
            <th>User Name</th>
            
            <th>Email</th>
            <th>Role</th>
            <th>Permission</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Permission"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </td>
              <td>
                <Button
                
                  size="xs"
                  title="Edit"
                  data-toggle="tooltip"
                  onClick={() => handleShowModal(user)}
                >
                <i className="material-icons">&#xE254;</i>
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ marginTop: 90 ,display:"flex"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>
            
            

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="role"
                placeholder="Role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />
            </Form.Group> */}
            <Form.Group style={{marginTop:15}} controlId="formBasicRole">
            <DropdownButton
                  id="dropdown-basic-button"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                 
                >
                  <Dropdown.Item value="">{}</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {selectedUser && (
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={selectedUser ? handleUpdateUser : handleAddUser}
          >
            {selectedUser ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
