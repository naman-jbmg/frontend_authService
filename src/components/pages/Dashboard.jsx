import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";
import "./dash.css";
import SideMenu from "../sideMenu/SideMenu";
import UserTable2 from "../UserTable/UserTable2";
import React from "react";
import { Button } from "react-bootstrap";
import Layout from "./Layout";
import UseAuth from "./auth/hooks/UseAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users]=UseAuth();
  const userRole=localStorage.getItem("CurrentUserRole");
  
  console.log("gdfdsfasd",userRole);
  const handleLogout = () => {
    console.log("Logout Clicked");

    navigate("/login");
  };

  return (
    <>
      <Layout />
      {/* <SideMenu /> */}
     {/* <UserTable2/> */}
      
  {userRole==='Admin' ? <SideMenu/> :<UserTable2/> }
{/* <Route path="/dashboard" element={jwtToken= "123" ? <Dashboard /> : <change/>} /> */}
      <Grid container sx={{ marginTop: 7, marginLeft: 11 }}>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>
          <Typography variant="h5">Email: thirdye@gmail.com</Typography>
          <Typography variant="h6">Name: Thirdeye</Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
