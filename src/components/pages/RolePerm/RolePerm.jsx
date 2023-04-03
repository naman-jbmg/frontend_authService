import React from 'react'
import { Grid, Card,Tabs,Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import './rolePerm.css';
import Role from './Role';
import Permission from './Permission';


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

export default function RolePerm() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
  return (
    <>
    <Grid item lg={5} sm={12} xs={12} sx={{marginTop:8}}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ mx: 3, height: 480}}>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div className='tab-change'>
              <Tabs  value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                <Tab label='Roles' sx={{ textTransform: 'none', fontWeight: 'bold'}}></Tab>
                <Tab label='Permissions' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
              </Tabs>
              </div>
            </Box>
           
            <div className='tab-panel'>
            <Card sx={{boxShadow:5}}>
            <TabPanel value={value} index={0}>
              <Role/>
            </TabPanel>
            <TabPanel value={value} index={1}>
             <Permission/>
            </TabPanel>
            </Card>
            </div>
            
           
          </Box>
          
        </Card>
      </Grid>

    </>
  )
}
