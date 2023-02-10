import { useContext , useEffect , useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Login from "./components/auth/Login";
import Navbar from "./components/layouts/NavBar";
import EditProduct from "./components/product/EditProduct";
import ProductAdd from "./components/product/ProductAdd";
import ProductHome from "./components/product/ProductsHome";
import SearchProduct from "./components/product/SearchProduct";


const SiteRouter = () => {

  const { Token, userRole , userLogged } = useContext(AuthContext);

  console.log(useContext(AuthContext));

  return (
    <div>
        <Router>
            <Navbar/>
            <Routes>
            {userLogged ? 
              (
              <>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/product-add" element={<ProductAdd/>}/>
                <Route path="/Home" element={<ProductHome/>}/>
                <Route path="/search/:id" element={<SearchProduct/>}/>
                <Route path="/update/:id" element={<EditProduct/>}/>
             
              </>
              )
              :
              (
              <>
                <Route exact path="*" element={<LandingPage/>}/>
                {/* <Route path="/register" element={<Register/>}/> */}
                <Route path="/login" element={<Login/>}/>
              </>
              )
            }
            </Routes>
		    </Router>
    </div>
  );
}

export default SiteRouter;
