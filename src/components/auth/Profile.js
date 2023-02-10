import React ,{ useContext , useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Auth, RegisterUsers } from "../../services/AuthServices";
import AuthContext from "../context/Auth.context";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    Input,
    Button,
    Container,
    Row,
    Col,
} from "reactstrap";
import UserImage from "../../assests/images/user.png";
import Swal from 'sweetalert2';
import { ValidateSignUp } from "./Validation";
import "./responsive.css";
import moment from "moment";
import { updateUser } from "../../services/AuthServices";


const Profile = () => {

  const navigate = useNavigate();

  const { Token, userRole } = useContext(AuthContext);

  const [user , setUser] = useState({});



  const getUser = async () => {
    const data = await Auth(Token);
    console.log(data?.data?.data?.user);
    setUser(data?.data?.data?.user);
    setFormData({
        fullName: data?.data?.data?.user?.fullName,
        email: data?.data?.data?.user?.email,
        mobileno:data?.data?.data?.user?.mobileno
    });
  }

  useEffect(() => {
    getUser();
  },[]);



  const [updateChange, setUpdaetChange] = useState(false);
  const ChangetoUpdate = (e) => {
    e.preventDefault();
    setUpdaetChange(true);
  };

  const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileno:"+94"
    });

    const { fullName, email, mobileno  } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const UpdateData = async (e) => {

		e.preventDefault();

		let validate = ValidateSignUp(formData);
		let msg = validate?.message;
		if(validate.status == false)
		{
			Swal.fire({
                toast: true,
                icon: 'warning',
                html: `<span>${msg}</span>`,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });
		}

		else{
                var data = await updateUser(user._id,formData);
                console.log("data",data)
                if(data?.data?.status == 1)
                {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats!',
                    text: 'Update successfull...!',
                    })
                navigate("/profile");
                window.location.reload();
                }
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed..!',
                        text: `${data?.data?.message}`,
                    })
                }
			}
	};




  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
        <center>
            <h1 style={{fontSize:"40px" , marginBottom: "30px" , color:"red" , width:"800px"}}><b>{user?.fullName}'s Profile</b></h1>

                <div>
                    <Card id="responsiveCard">
                    <CardBody>
                    <img src={UserImage} style={{ width: 200, padding:'10px'}}></img>
                        <div style={{ width: "600px" }}>
                        <Form className="form">
				        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Mobile no"
                                name="mobileno"
                                value={mobileno}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                            <br />
                            <Button
                            color="danger"
                            onClick={(e) => ChangetoUpdate(e)}
                            style={{ display: updateChange ? "none" : "flex" }}
                            >
                            Click To Update
                            </Button>
                            <Button
                            className="btn btn-dark"
                            onClick={(e) => UpdateData(e)}
                            style={{ display: updateChange ? "flex" : "none" }}
                            >
                            Update
                            </Button>
                        </Form>
                        </div>
                    </CardBody>
                    </Card>  

                </div>
        </center>
    </div>
  );
}

export default Profile;