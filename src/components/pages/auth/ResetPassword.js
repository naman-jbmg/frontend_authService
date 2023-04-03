
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePas.css'
import axios from 'axios';
const ResetPassword = () => {
  const navigate = useNavigate()
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
    {/* <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Change Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm New Password' type='password' />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid> */}
{/*     
    setTimeout(() => {
          navigate("/login")
        }, 3000) */}

<div className="parent-div">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} id="password-change-form">
        <div className='input-div'>

        
        <input type="password" id="password" name="password" placeholder="New Password" required />

       
        <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm New Password" required />
        </div>
        <button className="btn-primary" type="submit">Update</button>

        {error.status && <div className={`alert alert-${error.type}`} role="alert">{error.msg}</div>}
      </form>
    </div>
  </>;
};

export default ResetPassword;
