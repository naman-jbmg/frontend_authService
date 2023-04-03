import { TextField, Button, Box, Alert } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import useAuth from "../hooks/UseAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const UserLogin = () => {
  

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //const userRef = useRef();
  const errRef = useRef();

  const [error, setError] = useState("");
  const[loading,setLoading]=useState(false)
  const[userRole,setUserRole]=useState('');
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError("");
  }, [loginData.email, loginData.password]);

  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/accounts/authenticate`,
        { email: loginData.email, password: loginData.password }
      ).then((response)=>{
        console.log("login succsess", response?.data);
        console.log(response.data.id);
        // const email = response?.data?.email;
        // const password = response?.data?.password;
        const accessToken = response?.data?.jwtToken;
        localStorage.setItem('jwtToken', accessToken);
        setUserRole(response.data.role);
        // const roles = response?.data?.role;
        localStorage.setItem("CurrentUser", JSON.stringify(response?.data));
        localStorage.setItem("CurrentUserRole", JSON.stringify(response?.data?.role));
        // toast.success("login Successfull");
        
        navigate('/dashboard',{
          state:{
            name:response.data.firstName
          }
        });
      })

      
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setError("No Server Response");
        toast.error(error)
      } else if (err.response?.status === 400) {
        setError(err.response?.data.message);
        toast.error(error)
        
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
        toast.error(error)
      } else {
        setError("Login Failed");
      }
      errRef.current.focus();
    }
  };






  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(loginData);
  //   axios
  //     .post("http://localhost:4000/accounts/authenticate", { loginData })
  //     .then((resp) => {
  //       console.log(resp);
  //       document.getElementById("login-form").reset();
  //       setError({ status: true, msg: "Login Success", type: "success" });
  //       navigate("/dashboard");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const actualData = {
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   }
  //   if (actualData.email && actualData.password) {
  //     console.log(actualData);

  //     document.getElementById('login-form').reset()
  //     setError({ status: true, msg: "Login Success", type: 'success' })
  //     navigate('/dashboard')
  //   } else {
  //     setError({ status: true, msg: "All Fields are Required", type: 'error' })
  //   }
  // }
  return (
    <>
      <form
        id="login-form"
        style={{ marginTop: 4}}
        method="post"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={loginData.email}
          onChange={handleInputChange1}
          sx={{ boxShadow: 5 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          onChange={handleInputChange1}
          sx={{ boxShadow: 5 }}
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5, borderRadius: 33 }}
            endIcon={<SendIcon />}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/password">Forgot Password ?</NavLink>
        {error.status ? (
          <Alert severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default UserLogin;
