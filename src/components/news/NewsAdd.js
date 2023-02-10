import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  Row,
  Col,
  CardImg,
  Container,
  CardText,
} from "reactstrap";
import moment from "moment/moment";
import axios from "axios";
import { AddNewNews } from "../../services/NewsServices";

const NewsAdd = () => {

  const navigate = useNavigate();

const [image, setImage] = useState([]);
const [body, setbody] = useState('');
const [newsName, setnewsName] = useState('');
const [newsDescription, setnewsDescription] = useState('');



const onChangebody = (e) => {
  setbody(e.target.value);
}
const onChangenewsName = (e) => {
  setnewsName(e.target.value);
}
const onChangenewsDescription = (e) => {
  setnewsDescription(e.target.value);
}

console.log(image)

const handleSubmit = async () => {

  let formData = new FormData()
  formData.append('body', body);
  formData.append('newsName', newsName);
  formData.append('newsDescription', newsDescription);
  Array.from(image).forEach(item => {
    formData.append('products', item)
  });
  console.log("sending data set ",formData);
  await AddNewNews(formData).then(result => {
    console.log("result",result)
    if(result.data.status === 1)
    {
      alert('News Added Successfully');
      navigate("/");
    }
    else
    {
      alert('News Not Added');
      window.location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}

  return (
    <div style={{margin:"100px"}}>
        
        <h1 style={{marginLeft:"10px"}}>NEWS {">"} <label style={{color:"#001EB9" , fontSize:"20px"}}>Add news</label></h1>
        <br/><br/>
     
 

                <div>
                    <Card>
                    <CardBody>
                        <div style={{ width: "600px" }}>
                        <Form className="form">
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Enter body"
                                name="body"
                                value={body}
                                onChange={(e) => onChangebody(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Enter Product Name"
                                name="newsName"
                                value={newsName}
                                onChange={(e) => onChangenewsName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input                               
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Enter Description"
                                name="newsDescription"
                                value={newsDescription}
                                onChange={(e) => onChangenewsDescription(e)}
                            />
                        </div>
                        <div className="form-group">
                            
                              <Input
                                onChange={(e) => {
                                  setImage(e.target.files)
                                }}
                                multiple
                                type="file"
                              />
                                  {
                                  Array.from(image).map((item,index) => {
                                    return (
                                      <span>
                                        <img 
                                          key={index}
                                          style={{ padding: '10px' ,  borderRadius:"10px"}}
                                          width={120} height={120}
                                          src={item ? URL.createObjectURL(item) : null} />
                                      </span>
                                    )
                                  })
                                }
                        </div>
                            <br />
                            <Button
                            className="btn btn-success"
                            color="success"
                            onClick={() => handleSubmit()}
                            >
                            Submit
                            </Button>
                        </Form>
                        </div>
                        <br/>
                        <a href="/" className="btn btn-danger" style={{textDecoration:"none"}}> Cancel </a>
                    </CardBody>
                    </Card>  

                </div>

      <br/>


    </div>
  );
};

export default NewsAdd;
