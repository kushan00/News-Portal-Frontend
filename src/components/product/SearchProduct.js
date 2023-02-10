import React ,{useState,useEffect } from 'react';
import { SearchProductDetails } from '../../services/ProductServices';
import DataTable from "react-data-table-component";
import {
   Row,
   Col
} from "reactstrap";
import { useNavigate , Link, useParams} from "react-router-dom";

const SearchProduct = () => {

 const navigate = useNavigate();

 const id = useParams();

 const [loading, setLoading] = useState(false);
 const [products, setproducts] = useState([]);
 const [searchTextItem, setsearchTextItem] = useState("");

 const handleSearch=(e)=>{
    console.log(e.target.value);
    setsearchTextItem(e.target.value);
 }

 const getAllproducts = async () => {
    setLoading(true);
    console.log(id.id);
    const data = await SearchProductDetails(id.id);
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



  return (
    <>
        <h1 style={{marginLeft:"10px"}}>PRODUCTS</h1>
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
                    placeholder="Search For Products"
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
                <a href="/product-add" className='btn btn-light' style={{backgroundColor:"#001EB9"}}>
                        <span style={{color:'white' , marginLeft:"20px", marginRight:"20px"}}>New Product</span>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href="/fav" className='btn btn-light' style={{backgroundColor:"#FFFFFF",borderColor:"#001EB9"}}>
                        <i class="fa-solid fa-star" style={{ fontSize: "20px",color:"#001EB9" }}></i>
                </a>
            </Col>
        </Row>
        <br/><br/>

        {products.length > 0 ? 
         <label style={{color:"grey"}}>{products.length} results found for '{id.id}'.</label>
         :"" }

        {products.length > 0 ? 
        <table>
            {products?.map((item,index)=>{
                return(
                    <tr>
                        <div>
                            <label>{item?.SKU}</label><br/>
                            <label>{item?.productName}</label><br/>
                            <label>{item?.productDescription}</label><br/>                            
                        </div>
                        <hr></hr>
                    </tr>
                );
            })}
        </table>
        :
        <center>
            <h2>No search Items Available</h2>
        </center>
        }
    </>
  );
}

export default SearchProduct;
