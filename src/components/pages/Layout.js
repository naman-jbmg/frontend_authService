import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar2 from "../Sidebar2/Sidebar2";
import SideMenu from "../sideMenu/SideMenu";
import Contact from "./Contact";

const Layout = () => {
  return <>
    <CssBaseline />
    <Navbar/>
    {/* <SideMenu/> */}
    <Sidebar2/>
    <Outlet/>
    
  </>
};

export default Layout;
