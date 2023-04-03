import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
const Navbar = (props) => {
  return <>
    <Box sx={{ flexGrow: 1  ,width:"100%"}}>
      <AppBar  color="secondary" sx={{position:"fixed"}} >
        <Toolbar >
          <Typography variant='h5' component="div" sx={{ flexGrow: 1}}>
            <Button style={{backgroundColor:'aqua',borderRadius:32}}>Admin Panel</Button>
          </Typography>

          <Button component={NavLink} to='/reset' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Change Password</Button>
          <Button component={NavLink} to='/password' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Reset Password</Button>

          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

          <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>
          {/* <Button component={NavLink} to='#' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button> */}

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
