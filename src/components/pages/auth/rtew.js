import {
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
    Alert,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  import { useNavigate } from "react-router-dom";
  import { Flare, Handyman } from "@mui/icons-material";
  import { flexbox } from "@mui/system";
  
  const Registration = () => {
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
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
        setError(validate(actualData));
        console.log(actualData);
        
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
            console.log("7676 : ", resp);
            console.log("popopo");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("lll : ", error);
      }
      setIsSubmit(true);
    };
    useEffect(() => {
      console.log(error);
      if (Object.keys(error).length === 0 && isSubmit) {
        console.log(actualData);
      }
    }, [error]);
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.title) {
        errors.title = "Title is required!";
      }
      if (!values.firstName) {
        errors.firstName = "FirstName is required!";
      }
      if (!values.lastName) {
        errors.lastName = "LastName is required!";
      }
      if (!values.role) {
        errors.role = "Role is required!";
      }
      if (!values.acceptTerms) {
        errors.acceptTerms = " Please Accept Terms ";
      }
      if (!values.lastName) {
        errors.lastName = "LastName is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      return errors;
    };
  
    return (
      <>
        <div>
        {Object.keys(error).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : ("")}
          <form method="post" onSubmit={handleSubmit}>
            <div style={{ marginTop: 0}}>
              
              <InputLabel
                id="for_Title"
                style={{ alignSelf: "center", fontSize: "2vh" }}
              >
                Title
              </InputLabel>
              <Select
                style={{ marginTop: 16, height: 40 }}
                labelId="for_Title"
                id="demo-simple-select"
                value={actualData.title}
                label="Title"
                name="title"
                onChange={handleInputChange}
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
              </Select>
              <p>{error.title}</p>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
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
                }}
                style={{ marginLeft: 3 }}
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
              }}
            />
             <p>{error.email}</p>
            <TextField
             sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
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
            <p>{error.password}</p>
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
              }}
            />
            <InputLabel id="for_Role">Role</InputLabel>
  
            <Select
              labelId="for_Role"
              id="select-small"
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
                />
              }
              label="I agree to term and condition."
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Join
              </Button>
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
  


  import { useNavigation } from '@react-navigation/native';

function ScreenA() {
  const navigation = useNavigation();

  function handlePress() {
    // Assume fetchUserData() returns a promise that resolves with the user data
    fetchUserData().then(userData => {
      // Pass userData as a parameter when navigating to ScreenB
      navigation.navigate('ScreenB', { userData });
    });
  }

  return (
    <Button title="Fetch User Data" onPress={handlePress} />
  );
}

function ScreenB({ route }) {
  // Access the userData passed as a parameter from ScreenA
  const userData = route.params?.userData;

  return (
    <View>
      <Text>User Data:</Text>
      <Text>{JSON.stringify(userData)}</Text>
    </View>
  );
}


















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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  useNavigate } from "react-router-dom";


const Registration = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();

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
  const[response,setResponse]=useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setactualData({ ...actualData, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      console.log("ppp");
      event.preventDefault();
      

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
        }).then((response)=>response.json)
        .then((resp) => {
          
          setResponse(resp);
          toast.success("Successfully Registered");
          navigate('/login')
          
          // data = resp.data;
          // console.log(".then", data);
          // navigate('/dashboard');
        })
        .catch((err) => {
          console.log(err);
          toast.error("Registration Failed");
        });
    } catch (err) {
      console.log("lll : ", err);
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
                  
                }, boxShadow: 2 
              }}
              style={{ marginLeft: 3,}}
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
              sx={{ mt: 3, mb: 2, px: 5 ,borderRadius:33}}
            >
              Join
            </Button>
            {/* <ToastContainer /> */}
            {response && <div>{JSON.stringify(response)}</div>}
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
