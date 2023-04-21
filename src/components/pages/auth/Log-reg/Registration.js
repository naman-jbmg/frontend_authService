import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./reg.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false)
  const [actualData, setactualData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
    acceptTerms: "true",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setactualData({ ...actualData, [name]: value });
  };

  const handleSubmit = async (event) => {
    
    try {
      console.log("ppp");
      event.preventDefault();
      setLoading(true);
      await axios
        .post("http://localhost:4000/accounts/register", {
          title: actualData.title,
          firstName: actualData.firstName,
          lastName: actualData.lastName,
          email: actualData.email,
          password: actualData.password,
          confirmPassword: actualData.confirmPassword,
          role: actualData.role,
          acceptTerms: true,
        })
        .then((resp) => {
          toast.success(resp.data.message);
          if(navigate){
         
          }
          console.log(navigate);
          console.log("end ");
          console.log(resp);

          // data = resp.data;
          // console.log(".then", data);
          // navigate('/dashboard');
        })

        
       
    } catch (err) {
      console.log(err);
          toast.error('Registration failed');
      console.log("lll : ", err);
    }finally{
      setLoading(false);
    }
    
  };
  return (
    <>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <div>
            <InputLabel id="for_Title">Title</InputLabel>
            <Select
              className="for-Title"
              style={{ marginTop: 16, height: 40 }}
              labelId="for_Title"
              id="demo-simple-select"
              value={actualData.title}
              label="Title"
              name="title"
              onChange={handleInputChange}
              sx={{ alignSelf: "center", fontSize: "2vh", boxShadow: 2 }}
            >
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
            </Select>

            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                },
                boxShadow: 2,
              }}
              style={{ marginLeft: 4 }}
              margin="normal"
              onChange={handleInputChange}
              id="firstName"
              name="firstName"
              value={actualData.firstName}
              label="First Name"
            />

            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                },
                boxShadow: 2,
              }}
              style={{ marginLeft: 3 }}
              className="last"
              margin="normal"
              required
              onChange={handleInputChange}
              id="lastName"
              name="lastName"
              value={actualData.lastName}
              label="Last Name"
            />
          </div>
          {/* <TextField margin='normal' required fullWidth id='role' name='role' label='Role' /> */}
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            onChange={handleInputChange}
            value={actualData.email}
            label="Email Address"
            type="email"
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
              boxShadow: 2,
            }}
          />

          <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
              boxShadow: 2,
            }}
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            onChange={handleInputChange}
            value={actualData.password}
            label="Password"
            type="password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleInputChange}
            id="password_confirmation"
            name="confirmPassword"
            value={actualData.confirmPassword}
            label="Confirm Password"
            type="password"
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
              boxShadow: 2,
            }}
          />
          <InputLabel id="for_Role">Role</InputLabel>

          <Select
            labelId="for_Role"
            id="select-small"
            sx={{ boxShadow: 2 }}
            // value={}
            onChange={handleInputChange}
            name="role"
            label="Role"
            value={actualData.role}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>

          <FormControlLabel
            style={{ marginLeft: 30 }}
            control={
              <Checkbox
                value="true"
                color="primary"
                name="acceptTerms"
                id="tc"
                sx={{ boxShadow: 2, mr: 2 }}
              />
            }
            label="I agree to term and condition."
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5, borderRadius: 33 }}
            >
              Join
            </Button>
          
            {/* {response && <div>{JSON.stringify(response)}</div>} */}
          </Box>
          {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""} */}

          {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    
    label="Age"
   
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl> */}
        </form>
      </div>
    </>
  );
};

export default Registration;
