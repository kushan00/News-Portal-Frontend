import { useContext , useEffect , useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthContext from "./components/context/Auth.context";

import Login from "./components/auth/Login";
import Navbar from "./components/layouts/NavBar";
import EditNews from "./components/news/EditNews";
import NewsAdd from "./components/news/NewsAdd";
import NewsHome from "./components/news/NewsHome";
import LandingPage from "./components/layouts/LandingPage";
import SearchNews from "./components/news/SearchNews";
import Register from "./components/auth/Register";
import UserHome from "./components/user/UserHome";

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

                {/* Admin Routes */}
                <Route path="/news-add" element={<NewsAdd/>}/>
                <Route path="/Home" element={<NewsHome/>}/>
                <Route path="/update/:id" element={<EditNews/>}/>
                <Route path="/search/:id" element={<SearchNews/>}/>

                {/* User Routes */}
                <Route path="/NewsHome" element={<UserHome/>}/>
             
              </>
              )
              :
              (
              <>
                <Route exact path="*" element={<LandingPage/>}/>
                <Route path="/register" element={<Register/>}/>
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
