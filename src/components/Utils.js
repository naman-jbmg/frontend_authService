import axios from "axios";



export const devMode = true;

export const userAuthHost = 'http://localhost:4000/accounts'

export const UserAuthenticate = async (email,password)=>{
    const response = await axios.post(
      `${userAuthHost}/authenticate`,
        { email: email, password: password }
      )
    
    return response;
  };
  