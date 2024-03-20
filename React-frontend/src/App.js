import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form, Header, Input } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const  [data,setData]=useState({
          disp:"",
          mileage:"",
          cylin:"",
          area:"",
          h:"",
          wheelb:"",
          seat:"",
          weight:"",
          fuelCap:"",
          door:"",
          cyConfig:"",
          fuelSys:"",
          budget:""
  })
//  const payload=JSON.stringify({


//  })
 function handle(e) {
   const newdata={...data}
   newdata[e.target.id]=e.target.value
   setData(newdata)
  //  console.log(newdata)
 }
  function submit(e){
    e.preventDefault();
      // const response = axios.post(url,data,{headers:{"Content-Type" : "application/json"}});
      axios.post("https://flask-api-for-cars.herokuapp.com//predict", {
          disp:parseFloat(data.disp),
          mileage:parseFloat(data.mileage),
          cylin:parseFloat(data.cylin),
          area:parseFloat(data.area),
          h:parseFloat(data.h),
          wheelb:parseFloat(data.wheelb),
          seat:parseFloat(data.seat),
          weight:parseFloat(data.weight),
          fuelCap:parseFloat(data.fuelCap),
          door:parseFloat(data.door),
          cyConfig:data.cyConfig,
          fuelSys:data.fuelSys,
          budget:parseFloat(data.budget)

      },{headers:{"Content-Type" : "application/json"}})
        .then((response) => {
          console.log(response);
          document.getElementsByClassName("sentiment-text")[0].innerText = response["data"]["prediction"];
          document.querySelector("#img").src=response["data"]["imgurl"]
        })
        .catch((err) => {
          console.log(err);
          document.querySelector("#img").src="./err.jpg"
          document.getElementsByClassName("sentiment-text")[0].innerText = "Error"
        });
    }
  


  return (
    <div>
      
    <Form onSubmit={(e)=>submit(e)} >
    
    <div style={{ height: "100vh", width: "100vw", alignContent: "space-between", textAlign: "center", backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "table-cell", justifyContent:"center" ,alignItems:"center" ,verticalAlign: "middle", horizontalAlign: "middle" }}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,marginBottom:"45px"}}>
        <img src='./bal.jpeg' id='img' style={{height:"320px"}}></img>
        <Header style={{display:"inline",marginLeft:"32px",color:"white",fontFamily:"'Montserrat'",fontSize:"45px"}}>
          WHAT IS YOUR BUDGET?
        </Header>
      </div>
      <div>
      <Input transparent value={data.disp}  id="disp"onChange={(e)=>handle(e)}  placeholder='Enter Displacement (cc)' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.mileage}  id="mileage" onChange={(e)=>handle(e)} placeholder="Enter Mileage (km/l)"style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.cylin}  id="cylin" onChange={(e)=>handle(e)} placeholder='Enter No. of Cylinders' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.area}  id="area" onChange={(e)=>handle(e)} placeholder='Enter Total Area (sq mm) ' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.h}  id="h" onChange={(e)=>handle(e)} placeholder='Enter Height (mm) ' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.wheelb}  id="wheelb" onChange={(e)=>handle(e)} placeholder='Enter Wheelbase (mm)' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      </div><div>
      <Input transparent value={data.seat}  id="seat" onChange={(e)=>handle(e)} placeholder='Enter Seating Capacity' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.weight}  id="weight"onChange={(e)=>handle(e)} placeholder='Enter Kerb_Weight (kg)' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.fuelCap}  id="fuelCap" onChange={(e)=>handle(e)} placeholder='Enter Fuel_Tank_Capacity (l)' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      </div><div>
      <Input transparent value={data.door}  id="door" onChange={(e)=>handle(e)} placeholder='Enter No. of Doors' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
      <Input transparent value={data.cyConfig}  id="cyConfig" onChange={(e)=>handle(e)} placeholder='Enter Cylinder_Configuration' style={{ border: "1px solid #fff", padding: "10px",   }} />
      <Input transparent value={data.fuelSys}  id="fuelSys" onChange={(e)=>handle(e)} placeholder='Enter Fuel_System' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />
         </div>
      <Input transparent value={data.budget}  id="budget" onChange={(e)=>handle(e)} placeholder='Whats your Budget' style={{ border: "1px solid #fff", padding: "10px", borderRadius: "5px",  }} />

     <Button type='submit' style={{backgroundColor:"#349e63",color:"white",marginTop:"20px"}}>GET PREDICTION</Button>
      <p className="sentiment-text" style={{ marginTop: "20px", color: "white",fontSize:"34px", fontFamily:"'Montserrat'" }}>No Prediction</p>
    </div>
    </Form>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default App;
