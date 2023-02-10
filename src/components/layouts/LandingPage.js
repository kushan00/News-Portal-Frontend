import React from "react";
import { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";



const LandingPage = () => {

  return (
    <div>

    <center>
      <div class="row  m-0" style={{padding:"50px", display:"flex"}}>
      <div class="col">
        <Link to="/register" >
                <button className="btn btn-dark" style={{ width:"500px", height:"70px", fontSize:"20px"}}>JOIN WITH US</button>
        </Link>
        </div>
        <div class="col">
        <Link to="/login">
                  <button className="btn btn-dark" style={{ width:"500px", height:"70px", fontSize:"20px"}}>LOGIN</button>
        </Link>
      </div>
    </div>
    </center>
    </div>
  );
};

export default LandingPage;
