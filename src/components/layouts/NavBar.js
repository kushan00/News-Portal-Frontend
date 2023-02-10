import React,{useState ,  useEffect} from "react";
import { useContext  } from "react";
import AuthContext from "../context/Auth.context";
import { useNavigate , Link} from "react-router-dom";
import { Label , Button, Row, Col } from "reactstrap";


const Navbar = ()=>{

    const navigate = useNavigate();


    const [ User,setUser ] = useState(null);
    const { Token, userRole } = useContext(AuthContext);

    useEffect(()=>{
      setUser(localStorage.getItem("user"));
    },[])


    const handleSubmit = () => {
        console.log("executed logout");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        window.location.reload();
        navigate("/");
      }

    return(
        <>
        <div>
          <div className="topnav-right">
                <Row style={{float:"right" , margin:"20px"}}>
                    <Col style={{marginTop:"20px" , display: Token == null ? "none" : "flex" }} >
                      <button className="btn btn-danger" onClick={()=>handleSubmit()}><i class="fa-solid fa-power-off"></i></button>
                    </Col>
                    <Col style={{marginTop:"20px"}}>
                        <b style={{fontSize:"15px" , display: Token == null ? "none" : "flex"}}>{User}</b>                        
                    </Col>
                    <Col>
                        <i 
                        className="fa-solid fa-circle text-right" 
                        style={{float:"right",display: Token == null ? "none" : "flex" ,fontSize:"60px" , color:"#001EB9"}}
                        >
                        </i>  
                        
                    </Col>                   
                </Row>            
          </div>
          <br/><br/><br/><br/>
        </div>
        </>
    );
}

export default Navbar;