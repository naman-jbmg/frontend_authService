import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "./Usertable.css";
import axios from "axios";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UseAuth from "../pages/auth/hooks/UseAuth";
import ReactPaginate from 'react-paginate';


export default function UserTable2() {
  const [currentPage, setCurrentPage] = useState(0);

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [usersAll] = UseAuth();
  const token = localStorage.getItem("jwtToken");
  const pageSize = 5; // set the number of users to display per page
  const offset = currentPage * pageSize;
  const displayedUsers = users.slice(offset, offset + pageSize);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");

  };
  const handleShow = (users) => {
    setShow(true);
    setSelectedUser(users);
    setFirstName(users ? users.firstName : "");
    setLastName(users ? users.lastName : "");
    setEmail(users ? users.email : "");
    setRole(users ? users.role : "");

  };
  const handleAddUser = () => {
    axios
      .post("http://localhost:4000/accounts/register", { firstName, lastName, email })
      .then((response) => {
        setUsers([...users, response.data]);
        handleClose();
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
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = () => {
    console.log(selectedUser.id);
    axios
      .delete(`http://localhost:4000/accounts/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const newUsers = users.filter((u) => u.id !== selectedUser.id);
        
        
        setUsers(newUsers);
        handleClose();
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
    <div>
      <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row ">
            <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Student"
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>
            <div
              className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "green" }}
            >
              <h2>Registered Users</h2>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive ">
              <div className="col-ml-30  offset-sm-1 mt-1  text-gred">
                <Button
                  variant="primary"
                  title="Add Users"
                  onClick={handleShow}
                >
                  <AddCircleTwoToneIcon />
                </Button>
              </div>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Full Name </th>
                    <th>Email</th>
                    <th>USER_ID</th>
                    <th>Role </th>
                    <th>Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((users, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{`${users.firstName} ${users.lastName}`}</td>
                      <td>{users.email}</td>
                      <td>{users.id}</td>
                      <td>{users.role}</td>
                      <td>{users.permission}</td>

                      <td>
                        <a
                          className="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                        >
                          <i className="material-icons">&#xE417;</i>
                        </a>
                        <a className="edit" title="Edit" data-toggle="tooltip" onClick={() => handleShow(users)}>
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                          onClick={()=>handleShow(users)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={Math.ceil(usersAll.length / pageSize)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="modal_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="modal-form">
                  <div className="form-group" style={{ display: "flex" }}>
                    <div className="form-group-0">
                      <select class="form-select" aria-label="Default select example" style={{ marginTop: "10px", padding: 10, paddingRight: 35 }}>
                        <option selected>Title</option>
                        <option value="1">Mr.</option>
                        <option value="2">Mrs.</option>

                      </select>
                    </div>
                    <div className="form-group-1" style={{ marginLeft: 4 }}>
                      <input
                        type="text"
                        className="form-control"
                        id="form-firstName"
                        value={firstName}
                        placeholder="Enter First Name"
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>


                    <div className="form-group-2 ">
                      <input
                        type="text"
                        className="form-control"
                        id="form-lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Enter Last Name"
                      />
                    </div>
                  </div>
                  <div className="form-group2" style={{ display: "flex" }}>
                    <div className="form-group-1">
                      <input
                        type="text"
                        className="form-control"
                        id="form-role"
                        placeholder="Enter Role"
                      />
                    </div>


                    <div className="form-group-2 ">
                      <input
                        type="text"
                        className="form-control"
                        id="form-permission"
                        placeholder="Enter Permission"
                      />
                    </div>
                  </div>
                  <div className="form-group2" style={{ display: "flex" }}>
                    <div className="form-group-1">
                      <input
                        type="text"
                        className="form-control"
                        id="form-email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>



                  <button type="submit" className="btn btn-success mt-4">
                    Add Record
                  </button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                {selectedUser && (
                  <Button variant="danger" onClick={handleDeleteUser}>
                    Delete
                  </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
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

            {/* Model Box Finish */}
          </div>
        </div>
      </div>
    </div>
  );
}
