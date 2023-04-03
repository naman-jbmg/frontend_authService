import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import axios from "axios";

const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    if (actualData.email) {
      console.log(actualData.email);
      try {
        let finalData = {"email" : actualData.email}
        console.log(JSON.stringify(actualData)); 
        const response = await axios.post(`http://localhost:4000/accounts/forgot-password`,
          finalData
        ).then((response)=>{
          if (response.status === 'success') {
            console.log(response.message);
            document.getElementById('password-reset-email-form').reset();
            setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' });
          } else {
            setError({ status: true, msg: response.message, type: 'error' });
          }

        })  
    }catch (error) {
      setError({ status: true, msg: error.message, type: 'error' });
    }
   } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default SendPasswordResetEmail;
