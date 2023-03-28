import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Usertable.css";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UseAuth from "../pages/auth/hooks/UseAuth";
export default function UserTable2() {
  const [show, setShow] = useState(false);
  const [users] = UseAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <h2>
                <b>Registered Users</b>
              </h2>
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
                  {users.map((user, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{user.id}</td>
                      <td>{user.role}</td>
                      <td>{user.permission}</td>

                      <td>
                        <a
                          className="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                        >
                          <i className="material-icons">&#xE417;</i>
                        </a>
                        <a className="edit" title="Edit" data-toggle="tooltip">
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        <a
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Country"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter City"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Country"
                    />
                  </div>

                  <button type="submit" className="btn btn-success mt-4">
                    Add Record
                  </button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Model Box Finsihs */}
          </div>
        </div>
      </div>
    </div>
  );
}
