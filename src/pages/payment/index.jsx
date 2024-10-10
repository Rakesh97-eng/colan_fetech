// import { Grid } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import PaymentCard from "../../components/common/paymentCard";
// import { getSubscriptionApi } from "../../redux/action/adminAction";
// import { adminSelector } from "../../redux/slice/adminSlice";
// import { SubscriptionData } from "../../utils/constants/cardItem";
// import "./payment.Style.css";
// function Switch({switchvalue,setSwitchValue}) {

//   const handleSwitch = (val) => {
//     setSwitchValue(val);
//   };
//   return (
//     <div className="swichlayout">
//       <span
//         className="switchchild"
//         onClick={()=>handleSwitch("month")}
//         style={{ background: switchvalue ==="month"? "#00E785" : "" }}
//       >
//         Monthly
//       </span>
//       <span
//         className="switchchild"
//         onClick={()=>handleSwitch("year")}
//         style={{ background: switchvalue === "year"? "#00E785" : "" }}
//       >
//         Yearly
//       </span>
//     </div>
//   );
// }

// const Payment = () => {

//   const [switchvalue, setSwitchValue] = useState('month');
//   const [tabValue,setTabValue] = useState([])
//   const {getSubscriptionDetail} = useSelector(adminSelector);
//   const dispatch = useDispatch()
//   useEffect(()=>{
//     dispatch(getSubscriptionApi())
//   },[])
//   useEffect(()=>{
//     setTabValue(getSubscriptionDetail?.filter((val)=>val.interval === switchvalue))
//   },[switchvalue,getSubscriptionDetail])

//   return (
//     <>
//       {/* <h1>Payments</h1> */}
//       <div className="paymentcontainer">
//         <span>
//           <h1 style={{ color: "white" }}>Subscription Plans</h1>
//           <p style={{ color: "white" }}>
//             {" "}
//             choose the Subscription plan that suits your needs
//           </p>
//         </span>
//         <Switch switchvalue={switchvalue} setSwitchValue={setSwitchValue} />

//           <Grid container xs={6} spacing={2}>
//           {tabValue?.map((subscription,i) => (
//             <PaymentCard key={i} data={subscription}  />
//           ))}

//           </Grid>

//       </div>
//     </>
//   );
// };
// export default Payment;

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Carousel } from "../../components/common/carousel";
import PaymentCard from "../../components/common/paymentCard";
import { getSubscriptionApi } from "../../redux/action/adminAction";
import { userActivePlanApi } from "../../redux/action/userAction";
import { adminSelector } from "../../redux/slice/adminSlice";
import { userSelector } from "../../redux/slice/userSlice";
import { SubscriptionData } from "../../utils/constants/cardItem";
import "./payment.Style.css";
function Switch({ switchvalue, setSwitchValue }) {
  const handleSwitch = (val) => {
    setSwitchValue(val);
  };
  return (
    <div className="swichlayout">
      <span
        className="switchchild"
        onClick={() => handleSwitch("month")}
        style={{ background: switchvalue === "month" ? "#00E785" : "" }}
      >
        Monthly
      </span>
      <span
        className="switchchild"
        onClick={() => handleSwitch("year")}
        style={{ background: switchvalue === "year" ? "#00E785" : "" }}
      >
        Yearly
      </span>
    </div>
  );
}

const Payment = () => {
  const [switchvalue, setSwitchValue] = useState("month");
  const [tabValue, setTabValue] = useState([]);
  const [userPlanId, setUserPlanId] = useState("");
  const { getSubscriptionDetail } = useSelector(adminSelector);
  const [currentview, setCurrentView] = useState(6);
  const { userActivePlandata,userActivePlandataLoading } = useSelector(userSelector);
  const location = useLocation();
  const { isUpgrade, paymentAction } = location?.state ?? {};

  const dispatch = useDispatch();
  useEffect(() => {
    if (isUpgrade) {
      dispatch(userActivePlanApi());
      dispatch(getSubscriptionApi());
    } else {
      dispatch(getSubscriptionApi());
    }
  }, []);

  useEffect(()=>{
     setCurrentView(6)
  },[switchvalue])

  useEffect(() => {
    if (paymentAction) {
      let userBill = userActivePlandata?.plan?.find(
        (val) => val.status
      )?.billing;
      let paymentActivon_value =
        paymentAction === "update"
          ? getSubscriptionDetail?.filter(
              (val) => parseInt(val?.price) > parseInt(userBill)
            )
          : getSubscriptionDetail?.filter(
              (val) => parseInt(val?.price) < parseInt(userBill)
            );

      setTabValue(
        paymentActivon_value?.filter((val) => val.interval === switchvalue)
      );
    } else {
      setTabValue(
        getSubscriptionDetail?.filter((val) => val.interval === switchvalue)
      );
    }
  }, [switchvalue, getSubscriptionDetail, userActivePlandata]);
  useEffect(() => {
    if (userActivePlandata?.plan) {
      setUserPlanId(
        userActivePlandata?.plan?.find((val) => val.status)?.plan_id
      );
    }
  }, [userActivePlandata]);
  return (
    <>
      {/* <h1>Payments</h1> */}
      <div className="paymentcontainer">
        <span>
          <h1 style={{ color: "white", marginTop: "80px" }}>
            Subscription Plans
          </h1>
          <p style={{ color: "white", textAlign: "center" }}>
            {" "}
            choose the Subscription plan that suits your needs
          </p>
        </span>
        <Switch switchvalue={switchvalue} setSwitchValue={setSwitchValue} />
        <Carousel
        currentview={currentview}
        setCurrentView={setCurrentView}
          tabValue={tabValue}
          userPlanId={userPlanId}
          isUpgrade={isUpgrade}
          paymentAction={paymentAction}
          dataLoading = {userActivePlandataLoading}
        />
      </div>
    </>
  );
};
export default Payment;
