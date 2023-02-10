import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateNewProductURL = StartUrl?.StartUrl + "/vendor-portal/product/add";
const GetAllProductsURL = StartUrl?.StartUrl + "/vendor-portal/product/get-all";
const GetOneProductsURL = StartUrl?.StartUrl + "/vendor-portal/product/get-product/";
const SearchProductURL = StartUrl?.StartUrl + "/vendor-portal/product/search/";
const UpdateProductURL = StartUrl?.StartUrl + "/vendor-portal/product/update-product/";
const DeleteProductUrl = StartUrl?.StartUrl + "/vendor-portal/product/delete-product/";


export async function AddNewProduct(data){
    let result;
    await  axios.post(CreateNewProductURL,data)
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

export async function GetAllProductDetails(){
    let result;
    await  axios.get(GetAllProductsURL)
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

export async function GetOneProductDetails(id){
    let result;
    await  axios.get(GetOneProductsURL + id)
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

export async function SearchProductDetails(searchTerm){
  let result;
  await  axios.get(SearchProductURL + searchTerm)
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



export async function updateProduct(id,data) {
  
  return await axios.put(UpdateProductURL + id, data);

  }
  
export async function DeleteProduct(id){
    return await axios.delete(DeleteProductUrl+id);
  }

