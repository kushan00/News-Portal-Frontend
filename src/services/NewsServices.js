import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateNewNewsURL = StartUrl?.StartUrl + "/news-portal/news/add";
const GetAllNewssURL = StartUrl?.StartUrl + "/news-portal/news/get-all";
const GetOneNewssURL = StartUrl?.StartUrl + "/news-portal/news/get-News/";
const UpdateNewsURL = StartUrl?.StartUrl + "/news-portal/news/update-News/";
const DeleteNewsUrl = StartUrl?.StartUrl + "/news-portal/news/delete-News/";
const SearchNewsURL = StartUrl?.StartUrl + "/news-portal/news/search/";

export async function AddNewNews(data){
    let result;
    await  axios.post(CreateNewNewsURL,data)
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

export async function GetAllNewsDetails(){
    let result;
    await  axios.get(GetAllNewssURL)
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

export async function GetOneNewsDetails(id){
    let result;
    await  axios.get(GetOneNewssURL + id)
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




export async function updateNews(id,data) {
  
  return await axios.put(UpdateNewsURL + id, data);

  }
  
export async function DeleteNews(id){
    return await axios.delete(DeleteNewsUrl+id);
  }

  export async function SearchNewsDetails(searchTerm){
    let result;
    await  axios.get(SearchNewsURL + searchTerm)
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