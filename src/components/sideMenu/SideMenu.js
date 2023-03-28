import React from "react";
import "./SideMenu.css";
import "../../index.css"
// import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
// import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
// import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
// import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
// import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
// import FactoryIcon from '@mui/icons-material/Factory';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import SettingsIcon from '@mui/icons-material/Settings';
// import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
// import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';

const SideMenu = () => {



  return (

  // currentUser?.email &&

  <aside id="mainSidebar" className="mainSidebar" >
  <IconButton
        size="small"
        color="inherit"
        aria-label="menu"
        className="side-bar"
        // onClick={toggleSidebar}
      >
        {/* {
           clicked  ? <ArrowBackIosSharpIcon/> : <ArrowForwardIosSharpIcon/> 
          
        } */}
      </IconButton>

<div id="mainMenu">
{/* <div className="list-group-item"><img src=""/><span>JBM Group</span></div>  */}

<Link to= '/user-role' className="list-group-item" data-parent="#mainMenu"><GroupsTwoToneIcon className="icon"/><span>Dashboard</span></Link>
<Link to= '/user-permission' className="list-group-item" data-parent="#mainMenu"><SettingsTwoToneIcon className="icon" /><span>Permission</span></Link>
<Link to='role' className="list-group-item" data-parent="#mainMenu"><span>Role</span></Link>
<Link to='/reset' className="list-group-item" data-parent="#mainMenu"><span></span></Link>
<Link to= '/sendpasswordresetemail' className="list-group-item" data-parent="#mainMenu"><span></span></Link>
</div>
</aside> 
      
   
  );
};

export default SideMenu;




