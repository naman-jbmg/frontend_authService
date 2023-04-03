import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";
import "./dash.css";
import SideMenu from "../sideMenu/SideMenu";
import UserTable2 from "../UserTable/UserTable2";
import React from "react";
import { Button } from "react-bootstrap";
import Layout from "./Layout";
import UseAuth from "./auth/hooks/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



console.log("ASDASDA")
const Dashboard = () => {
  const {state}= useLocation();
  const navigate = useNavigate();
  const [usersAll]=UseAuth();
  let names= state?.name;
  console.log(names)
  const userRole=localStorage.getItem("CurrentUserRole");
  
  console.log("gdfdsfasd",userRole);
  const handleLogout = () => {
    console.log("Logout Clicked");

    navigate("/login");
  };
  toast.success("login Successfull," + " " + names+"!")

  return (
    <>
   
    
      <Layout />
      
      
      {/* <SideMenu /> */}
     <UserTable2/>
      
  {/* {userRole==='Admin' ? <SideMenu/> :<UserTable2/> } */}
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
      <ToastContainer/>
      {console.log("asdas")}
    </>
  );
};

export default Dashboard;
