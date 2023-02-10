import React,{useState ,  useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link} from "react-router-dom";
import { Label , Button, Row, Col } from "reactstrap";
import { logout, selectToken } from "../../Redux/AuthSlice";

const Navbar = ()=>{

    const navigate = useNavigate();

    //const [ Token,setToken ] = useState(localStorage.getItem("token"));
    const [ User,setUser ] = useState(localStorage.getItem("user"));


    const Token1 = useSelector(selectToken);
    console.log("Logged User token",Token1);
    const [token, settoken] = useState(null);
  
    useEffect(() => {
      var token2 =  localStorage.getItem("token");
      if(Token1 == null)
      {
        if(token2 == null)
        {
          settoken(null);
        }
        else
        {
          settoken(token2);
        }
      }
      else
      {
        settoken(Token1);
      }
    }, [])

    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log("executed logout");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        window.location.reload();
        dispatch(logout());
        navigate("/");
      }

    return(
        <>
        <div>
          <div className="topnav-right">
                <Row style={{float:"right" , margin:"20px"}}>
                    <Col style={{marginTop:"20px"}}>
                      <button className="btn btn-danger" onClick={()=>handleSubmit()}><i class="fa-solid fa-power-off"></i></button>
                    </Col>
                    <Col style={{marginTop:"20px"}}>
                        <b style={{fontSize:"15px" , display: token == undefined ? "none" : "flex"}}>{User}</b>                        
                    </Col>
                    <Col>
                        <i 
                        className="fa-solid fa-circle text-right" 
                        style={{float:"right",display: token == undefined ? "none" : "flex" ,fontSize:"60px" , color:"#001EB9"}}
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