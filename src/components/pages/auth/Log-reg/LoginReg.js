import { Grid, Card,Tabs,Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
//import Pic1 from '../../../images/pic1.png'
import Pic1 from '../../../../images/img2.jpg'
import Registration from './Registration';
import UserLogin from './UserLogin';
// import  from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}
const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
  <Grid container sx={{ height: '100vh'}} >
      <Grid item lg={7} sm={5} sx={{
        marginTop:8,
        backgroundImage: `url(${Pic1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', sm: 'block' }
      }}>
      </Grid>
      <Grid item lg={5} sm={12} xs={12} sx={{marginTop:8}}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ mx: 3, height: 480}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                <Tab label='Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>
          </Box>
          <Box textAlign='center' sx={{ mt: 2 }}>
            
            {/* <Typography variant='h5' sx={{ fontWeight: 'bold' ,color:"blue"}}>Thirdeye-AI</Typography> */}
          </Box>
        </Card>
      </Grid>
    </Grid>
  </>;
};

export default LoginReg;
