import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Input,
  Form,

} from "reactstrap";
import { updateProduct , GetOneProductDetails } from "../../services/ProductServices";

const EditProduct = () => {

const navigate = useNavigate();
const id = useParams();

const [image, setImage] = useState([]);
const [allImages, setallImages] = useState([]);
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

const getSelectedProduct = async ()=>{
    const data = await GetOneProductDetails(id.id);
    if(data?.data?.status == 1)
    {
        setSKU(data?.data?.data?.data?.SKU);
        setquantity(data?.data?.data?.data?.quantity);
        setproductName(data?.data?.data?.data?.productName);
        setproductDescription(data?.data?.data?.data?.productDescription);
        setallImages(data?.data?.data?.data?.images);
    }
}

useEffect(() => {
    getSelectedProduct();
}, []);


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
  await updateProduct(id.id,formData).then(result => {
    console.log("result",result)
    if(result.data.status === 1)
    {
      alert('Product Updated Successfully');
      navigate("/");
    }
    else
    {
      alert('Product Not Updated');
      window.location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}

  return (
    <div style={{margin:"100px"}}>
        
        <h1 style={{marginLeft:"10px"}}>PRODUCTS {">"} <label style={{color:"#001EB9" , fontSize:"20px"}}>Edit product</label></h1>
        <br/><br/>
     
 

                <div>
                    <Card>
                    <CardBody>
                        <div style={{ width: "600px" }}>
                        <Form className="form" >
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
                                <br/>
                                {
                                    allImages.length > 0 ? 
                                    <div>
                                    <label style={{ padding: '10px' ,  color:"blue"}}>Selected Images</label>
                                    <br/>
                                    {
                                        allImages.map((item,index) => {
                                            return (
                                                <span>
                                                    <img 
                                                    key={index}
                                                    style={{ padding: '10px' ,  borderRadius:"10px"}}
                                                    width={120} height={120}
                                                    src={item?.filename}
                                                    />
                                                </span>
                                        );
                                        })
                                    }
                                    </div>
                                    : 
                                    null
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

export default EditProduct;
