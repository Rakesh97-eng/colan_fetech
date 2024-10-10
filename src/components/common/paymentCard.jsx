// import "./commonComp.css";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Grid } from "@mui/material";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// const PaymentCard = ({ data }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
 
//   // const { subscription_plan, billing, name,value,checkList, textvalue, description } = data;
//   const { plan_name,price, interval, name, textvalue, description,stripe_plan_id="" } = data;

//   let checkList = ["50 Imnage Generation","500 credits","Monthly 100 credits free","Customer Support","Dedicated Server","Priority Generation"]
//   const handlePayment = (id) => {
//     sessionStorage.setItem('ur',0)
//     navigate("/stripepayment",{state:{planId:id,...location.state}});
//     // navigate('/login')
//   };

//   return (
//     <>
//         <Grid item>
//           {textvalue ? (
//             <div className="paymenttextcontainer">
//               <div className="paymenttexthead">
//                 <p style={{ fontWeight: "800", fontSize: "28px" }}>{name}</p>
//                 <p>{textvalue}</p>
//               </div>
//               <div className="paymentextcontent">
//                 <div style={{ height: "80%", overflowY: "scroll" }}>
//                   {description}
//                 </div>
//                 <button className="paymentbutton" onClick={handlePayment}>
//                   Contact Us
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="paymentcardcontainer">
//               <div className="paymentcardpricing">
//                 <p style={{ fontWeight: 600 }}> {plan_name}</p>
//                 <p>{textvalue ? textvalue : <><AttachMoneyIcon/><span>{price}/{interval}</span></>}</p>
//               </div>
//               <div className="paymentcardchecklist">
//                 {checkList?.map((name, i) => (
//                   <div key={i}>
//                     <CheckBoxIcon sx={{ color: "#00E785" }} />
//                     <span>{name}</span>
//                   </div>
//                 ))}
//               </div>
//               <button className="paymentbutton" onClick={()=>handlePayment(stripe_plan_id)}>
//                 Get Started
//               </button>
//             </div>
//           )}
//         </Grid>
//     </>
//   );
// };
// export default PaymentCard;

import "./commonComp.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button } from "react-bootstrap";

const PaymentCard = ({ data,isSubscribed,isUpgrade,paymentAction=null }) => {
  const navigate = useNavigate();
 const location =useLocation();
  const { plan_name,price, interval, name, textvalue, description,stripe_plan_id="" } = data;

  let checkList = ["50 Imnage Generation","500 credits","Monthly 100 credits free","Customer Support","Dedicated Server","Priority Generation"]
  const handlePayment = (id) => {
    sessionStorage.setItem('ur',0)
    navigate("/stripepayment",{state:{planId:id,isUpgrade,...location.state}});
  };

  return (
    <>
          {textvalue ? (
            <div className="paymenttextcontainer">
              <div className="paymenttexthead">
               
                <p style={{ fontWeight: "800", fontSize: "28px" }}>{name}</p>
                <p>{textvalue}</p>
              </div>
              <div className="paymentextcontent">
                <div style={{ height: "80%", overflowY: "scroll" }}>
                  {description}
                </div>
                <button className="paymentbutton" onClick={handlePayment}>
                  Contact Us
                </button>
              </div>
            </div>
          ) : (
            <div className={`paymentcardcontainer ${isSubscribed ? "active_card" : "update_card active"}`}>
           {isSubscribed ? <Button style={{backgroundColor:"#00e68a",border:"#00e68a",color:"black",marginBottom:"4px",width:"100%"}}>Active Plan</Button> : null }
              <div className="paymentcardpricing">
                <p style={{ fontWeight: 600 }}> {plan_name}</p>
                <p>{textvalue ? textvalue : <><AttachMoneyIcon/><span>{price}/{interval}</span></>}</p>
              </div>
              <div className="paymentcardchecklist">
                {checkList?.map((name, i) => (
                  <div key={i} className="d-flex">
                    <CheckBoxIcon sx={{ color: "#00E785",marginRight:"8px" }} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              {isSubscribed ? null  : <button className="paymentbutton" onClick={()=>handlePayment(stripe_plan_id)}>
               {paymentAction? paymentAction=="update"?"Upgrade":"Degrade":" Get Started"}
              </button>}
            </div>
          )}
       
    </>
  );
};
export default PaymentCard;

