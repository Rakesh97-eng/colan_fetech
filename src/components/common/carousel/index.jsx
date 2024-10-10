import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaymentCard from "../paymentCard";
import "./corousel.css";

export const Carousel = ({ tabValue, userPlanId, isUpgrade, dataLoading,paymentAction,currentview,setCurrentView }) => {
  const [cardArr, setCardArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const movecard = (val) => {
    setCurrentView((prevvalue) => prevvalue + val);
  };
  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "center",padding:"0px 15px" ,position:"relative"}}
      className="mt-5"
    >

      <ArrowBackIosNewIcon
       style={{position:"absolute",left:"0px"}} className={currentview === 6 ? "disabled" : "activearrow"}
       onClick={() => movecard(-1)}
      />
      <div className="row" style={{width:"80%",justifyContent:"center"}}>
        {dataLoading ? (
          <div style={{display:"flex",height:"100vh"}}>
          {Array.from(Array(3).keys()).map((val, i) => (
            <div
              key={i}
              style={{ margin: "2px" }}
              className="skeleton"
            ></div>
          ))}
        </div>
        ) : tabValue?.length > 0 ? (
          tabValue
            ?.slice(currentview - 6, currentview)
            .map((subscription, i) => {
              let isSubscribed = subscription.id === userPlanId;
              return (
                <div
                  key={i}
                  className=""
                >
                  <PaymentCard
                    key={i}
                    data={subscription}
                    isSubscribed={isSubscribed}
                    isUpgrade={isUpgrade}
                    paymentAction={paymentAction}
                  />
                </div>
              );
            })
        ) : (
          <div style={{height:"100vh"}}>No Data Found</div>
        )}
      </div>

          <ArrowForwardIosIcon
       style={{position:"absolute",right:"0px"}} className={cardArr.length <= currentview ? "disabled" : "activearrow"}
       onClick={() => movecard(1)}
      />
    </div>
  );
};
