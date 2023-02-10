import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Input,
  Form,

} from "reactstrap";
import { updateNews , GetOneNewsDetails } from "../../services/NewsServices";

const EditNews = () => {

const navigate = useNavigate();
const id = useParams();

const [image, setImage] = useState([]);
const [allImages, setallImages] = useState([]);
const [ID, setID] = useState('');
const [body, setbody] = useState('');
const [newsName, setnewsName] = useState('');
const [newsDescription, setnewsDescription] = useState('');


const onChangeID = (e) => {
  setID(e.target.value);
}
const onChangebody = (e) => {
  setbody(e.target.value);
}
const onChangenewsName = (e) => {
  setnewsName(e.target.value);
}
const onChangenewsDescription = (e) => {
  setnewsDescription(e.target.value);
}

const getSelectedNews = async ()=>{
    const data = await GetOneNewsDetails(id.id);
    if(data?.data?.status == 1)
    {
        setID(data?.data?.data?.data?.ID);
        setbody(data?.data?.data?.data?.body);
        setnewsName(data?.data?.data?.data?.newsName);
        setnewsDescription(data?.data?.data?.data?.newsDescription);
        setallImages(data?.data?.data?.data?.images);
    }
}

useEffect(() => {
    getSelectedNews();
}, []);


const handleSubmit = async () => {
  let formData = new FormData()
  formData.append('ID', ID);
  formData.append('body', body);
  formData.append('newsName', newsName);
  formData.append('newsDescription', newsDescription);
  Array.from(image).forEach(item => {
    formData.append('Newss', item)
  });
  console.log("sending data set ",formData);
  await updateNews(id.id,formData).then(result => {
    console.log("result",result)
    if(result.data.status === 1)
    {
      alert('News Updated Successfully');
      navigate("/");
    }
    else
    {
      alert('News Not Updated');
      window.location.reload();
    }
  }).catch(err => {
    console.log(err)
  })
}

  return (
    <div style={{margin:"100px"}}>
        
        <h1 style={{marginLeft:"10px"}}>NewsS {">"} <label style={{color:"#001EB9" , fontSize:"20px"}}>Edit News</label></h1>
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
                                placeholder="Enter ID"
                                name="ID"
                                value={ID}
                                onChange={(e) => onChangeID(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="number"
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
                                placeholder="Enter News Name"
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

export default EditNews;
