import React ,{useState,useEffect} from 'react';
import { GetAllNewsDetails } from '../../services/NewsServices';
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

const UserHome = () => {

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




 useEffect(()=>{
    getAllproducts();
 },[])




 
 const columns = [
   {
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >ID</Badge>),
       selector: "ID",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px" }}><b>{data?.ID}</b><br /></Label>
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
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >News Title</Badge>),
       selector: "newsName",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px"}}><b>{data?.newsName}</b><br /></Label>
           </div>
       ),
   },
   {
       name: (<Badge color='white' style={{ fontSize: "18px",color:"#001EB9" }} >Price</Badge>),
       selector: "newsDescription",
       cell: (data) => (
           <div style={{ display: "flex", flexDirection: "column" }}>
               <Label style={{ fontSize: "18px" }}><b>{data?.newsDescription}</b><br /></Label>
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
        </Row>
        <br/><br/>
        <DataTable
            data={products}
            columns={columns}
            progressPending={loading}
         />
    </>
  );
}

export default UserHome;
