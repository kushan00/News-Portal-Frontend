import React ,{useState,useEffect} from 'react';
import { GetAllNewsDetails ,DeleteNews } from '../../services/NewsServices';
import DataTable from "react-data-table-component";
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
   Col
} from "reactstrap";
import moment from 'moment';
import { useNavigate , Link} from "react-router-dom";

const NewsHome = () => {

 const navigate = useNavigate();

 const [loading, setLoading] = useState(false);
 const [products, setproducts] = useState([]);
 const [searchTextItem, setsearchTextItem] = useState("");

 const handleSearch=(e)=>{
    console.log(e.target.value);
    setsearchTextItem(e.target.value);
 }

 const getAllproducts = async () => {
    setLoading(true);
    const data = await GetAllNewsDetails();
    console.log("data",data);
    setproducts(data?.data?.data?.data)
    setLoading(false);
 }

 const searchItem =()=>{
    console.log(searchTextItem);
    navigate("/search/"+ searchTextItem);
 }

 const [deleteID, setdeleteID] = useState("");
 const [openDeleteModal, setopenDeleteModal] = useState(false);

 const openDeleteModel = (id)=>{
    console.log("id",id);
    setdeleteID(id);
    setopenDeleteModal(true);
 }

 const deleteNewsItem = async () => {
    const data = await DeleteNews(deleteID);
   
    if(data?.data?.status == 1)
    {
        alert("delete Success");
        setopenDeleteModal(false);
        getAllproducts();
    }
    else
    {
        alert("delete Failed");
        setopenDeleteModal(false);
    }
    console.log("data",data);
 }

 useEffect(()=>{
    getAllproducts();
 },[])




 
 const columns = [
   {
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >SKU</Badge>),
       selector: "SKU",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px" }}><b>{data?.SKU}</b><br /></Label>
           </div>
       ),
   },
   {
      name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >IMAGE</Badge>),
      selector: "SKU",
      cell: (data) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={data?.images[0]?.filename} style={{width:"30%" , height:"30%" , margin:"5px"}} />              
          </div>
      ),
   },
   {
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >Product Name</Badge>),
       selector: "productName",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px"}}><b>{data?.productName}</b><br /></Label>
           </div>
       ),
   },
   {
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >Price</Badge>),
       selector: "price",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px" }}><b>{data?.price}</b><br /></Label>
           </div>
       ),
   },
   {     
       cell: (data) => (

           <div className="row">
               <div className="col">
                   <a onClick={() => {openDeleteModel(data?._id)}}><i class="fa-solid fa-trash" style={{ fontSize: "20px",color:"#001EB9" }}></i></a> 
               </div>               
               &nbsp;&nbsp;&nbsp;&nbsp;
               <div className="col">
               <a href={"/update/" + data?._id}><i class="fa-sharp fa-solid fa-pen" style={{ fontSize: "20px",color:"#001EB9" }}></i></a>
               </div>
               &nbsp;&nbsp;&nbsp;&nbsp;
               <div className="col">
               <a onClick={(e)=>{alert("Added To Favourites..!")}}><i class="fa-regular fa-star" style={{ fontSize: "20px",color:"#001EB9" }}></i></a>
               </div>
           </div>
 
       ),
     },

];

  return (
    <>
        <h1 style={{marginLeft:"10px"}}>News Portal</h1>
        <br/><br/>
        <Row style={{marginLeft:"1px"}}>
            <Col >
            <div style={{
                        borderRadius: '30px',
                        border: '1px solid #ccc',
                        padding: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        flex: 1,
                        backgroundColor:"#F7F7F7",
                        width:"500px",
                        //height:"50px"
                    }}>
                <input
                    type="text"
                    placeholder="Search For News"
                    style={{
                        backgroundColor:"#F7F7F7",
                        borderRadius: '30px',
                        border: '0px',
                        padding: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        flex: 1,

                    }}
                    name="search"
                    value={searchTextItem}
                    onChange={(e)=>handleSearch(e)}
                    />                        
                    <button                    
                    type="submit"
                    style={{
                        float:"right",
                        backgroundColor:"#001EB9",
                        borderRadius: '30px',
                        border: '30px',
                        color: '#666',
                        padding: '8px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        width:"180px"
                    }}
                    onClick={()=>{searchItem()}}
                    >                    
                    <span style={{color:'white' , marginLeft:"10px", marginRight:"10px"}}> <i class="fa-sharp fa-solid fa-magnifying-glass"></i> Search</span>
                    </button>  
            </div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
                <a href="/news-add" className='btn btn-light' style={{backgroundColor:"#001EB9"}}>
                        <span style={{color:'white' , marginLeft:"20px", marginRight:"20px"}}>Add News</span>
                </a>
                &nbsp;&nbsp;&nbsp;
            </Col>
        </Row>
        <br/><br/>
        <DataTable
            data={products}
            columns={columns}
            progressPending={loading}
         />

        <div>
        <Modal
          isOpen={openDeleteModal}
          className="modal-dialog-centered"
          fade={true}
          backdrop={true}
        >
          <ModalHeader toggle={() => setopenDeleteModal(false)}>
          </ModalHeader>
          <ModalBody>
            <div>
                <center>
                    <i class="fa-sharp fa-solid fa-circle-exclamation" style={{fontSize:"50px" , color:"red"}}></i>
                    <br/><br/>
                    <h3 style={{fontSize:"25px"}}>ARE YOU SURE ?</h3>
                    <b style={{fontSize:"16px"}}>You will not be able to undo this action if you proceed!.</b>
                </center>
            </div>
            <br/>
            <center>
                <div>
                <Button className="btn btn-light" style={{backgroundColor:"#FFFFFF",borderColor:"#001EB9" , borderWidth:"3px" , marginRight:"40px"}} onClick={() => setopenDeleteModal(false)}>
                <b style={{ color:"black" }}>Cancel</b>
                </Button>

                <Button className="btn btn-light" style={{backgroundColor:"#001EB9" }} onClick={(e) => deleteNewsItem(e)}>
                    <span style={{color:'white' , marginLeft:"10px", marginRight:"10px"}}>Delete</span>
                </Button>
            </div>
            </center>
            
          </ModalBody>
        </Modal>
        </div>

    </>
  );
}

export default NewsHome;
