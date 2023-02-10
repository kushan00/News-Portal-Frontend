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
import { AddNewProduct } from "../../services/ProductServices";

const ProductAdd = () => {

  const navigate = useNavigate();

const [image, setImage] = useState([]);
const [SKU, setSKU] = useState('');
const [quantity, setquantity] = useState('');
const [productName, setproductName] = useState('');
const [productDescription, setproductDescription] = useState('');


const onChangeSKU = (e) => {
  setSKU(e.target.value);
}
const onChangequantity = (e) => {
  setquantity(e.target.value);
}
const onChangeproductName = (e) => {
  setproductName(e.target.value);
}
const onChangeproductDescription = (e) => {
  setproductDescription(e.target.value);
}

console.log(image)

const handleSubmit = async () => {

  let formData = new FormData()
  formData.append('SKU', SKU);
  formData.append('quantity', quantity);
  formData.append('productName', productName);
  formData.append('productDescription', productDescription);
  Array.from(image).forEach(item => {
    formData.append('products', item)
  });
  console.log("sending data set ",formData);
  await AddNewProduct(formData).then(result => {
    console.log("result",result)
    if(result.data.status === 1)
    {
      alert('Product Added Successfully');
      navigate("/");
    }
    else
    {
      alert('Product Not Added');
      window.location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}

  return (
    <div style={{margin:"100px"}}>
        
        <h1 style={{marginLeft:"10px"}}>PRODUCTS {">"} <label style={{color:"#001EB9" , fontSize:"20px"}}>Add new product</label></h1>
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
                                placeholder="Enter SKU"
                                name="SKU"
                                value={SKU}
                                onChange={(e) => onChangeSKU(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="number"
                                placeholder="Enter Quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => onChangequantity(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Enter Product Name"
                                name="productName"
                                value={productName}
                                onChange={(e) => onChangeproductName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input                               
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Enter Description"
                                name="productDescription"
                                value={productDescription}
                                onChange={(e) => onChangeproductDescription(e)}
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

export default ProductAdd;
