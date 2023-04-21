import React from "react";
import { userAuthHost } from "../../Utils";
import "./rolePerm.css";
import { TextField } from '@mui/material';
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { PermissionTableHeading } from "../../UserTable/Tabledata";
import { useEffect, useState } from "react";
export default function Permission() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const [show, setShow] = useState(false);
const [permission,setPermission]=useState("");
const [description,setDescription]=useState("");
const handleClose = () => {
  setShow(false);
};

const handleShow = () => {
  setShow(true);
  

};
const handleAddPermission = () => {
  axios
    .post("http://localhost:4000/accounts/create-permission", { 
    "permissionName":permission,
    "Description":description
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => console.log(error));
};
const handleDeletePermission = (id) => {
    
  axios
    .delete(`http://localhost:4000/accounts/PermissionDelete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      const newUsers = users.filter((u) => u.id !== id);
      setUsers(newUsers);
      handleClose();
    })
    .catch((error) => console.log(error));
};
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${userAuthHost}/auth/all-permission`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
          {PermissionTableHeading.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.permissionName}</td>
              <td>{user.id}</td>
              <td>{user.Description}</td>
              <td><a
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                           onClick={()=>handleDeletePermission(user.id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a></td>
            </tr>
          ))}
        </tbody>
        <Button variant="success" onClick={handleShow}>
                    Add Permission
          </Button>
      </table>
      <div className="modal_box">
            <Modal
               show={show}
               onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Permission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <form>
                <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
              boxShadow: 2,
            }}
            margin="normal"
            required
            fullWidth
            id="role"
            name="role"
             onChange={(event) => setPermission(event.target.value)}
            // value={actualData.password}
            label="Enter Permission"
            type="text"
          />
                <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
              boxShadow: 2,
            }}
            margin="normal"
            required
            fullWidth
            id="description"
            name="descripttion"
             onChange={(event) => setDescription(event.target.value)}
            // value={actualData.password}
            label="Enter Description"
            type="text"
          />

                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button  onClick={handleAddPermission}>
                    Add Role
                </Button>
               
              </Modal.Footer>
            </Modal>

            {/* Model Box Finish */}
          </div>
    </div>
  );
}
