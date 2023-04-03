import React from "react";
import { userAuthHost } from "../../Utils";
import "./rolePerm.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Permission() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("jwtToken");

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
            <th>S.No</th>
            <th>Permission</th>
            <th>Permission_ID</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.permissionName}</td>
              <td>{user.id}</td>
              <td>{user.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
