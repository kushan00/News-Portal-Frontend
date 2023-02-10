import axios from "axios";

import StartUrl from "../configs/Url.json";

const LoginURL = StartUrl?.StartUrl + "/news-portal/signin";
const RegisterURL = StartUrl?.StartUrl + "/news-portal/signup";
const AuthURL = StartUrl?.StartUrl + "/news-portal/auth";
const UpdateUserURL = StartUrl?.StartUrl + "/news-portal/update-User/";

export async function LoginUsers(data){
    const alldata = {
        email:data?.email,
        password:data?.password,
    };
    
    let result;
    await  axios.post(LoginURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function RegisterUsers(data){
    const alldata = {
        fullName:data?.fullName,
        mobileno:data?.mobileno,
        email:data?.email,
        password:data?.password,
        userRole:data?.userRole,    
    }

    let result;
    await  axios.post(RegisterURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function Auth(token){
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    let result;
    await  axios.get(AuthURL,config)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function updateUser(id,data) {
  const alldata = {
      fullName: data?.fullName,
      mobileno: data?.mobileno,
      email: data?.email,
  };

  return await axios.put(UpdateUserURL + id, alldata);

}