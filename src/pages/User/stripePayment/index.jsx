import "./stripepayment.css";
import { showToast } from "../../../components/commonToast/toastService";
import { useEffect, useState } from "react";
import { AccountInputCard } from "../../../components/stripePaymentComp/accountInputCard";
import {  useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { purchaseApi, upgradePurchaseApi,downgradePurchaseApi } from "../../../redux/action/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import { paymentSelector } from "../../../redux/slice/paymentSlice";



const PUBLISHABLE_KEY =
  "pk_test_51PLggmB2aHHeshWOyavbPzMQDJbvWEYAGJT7f8nozzI5TCU4pdai4CZYSNIF1z2lPojbkGCAd4GGXsVmTvSzRLQM00rpnr2goY";

let strippromise = loadStripe(PUBLISHABLE_KEY);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const createOptions = (fontSize, padding) => {
  return {
      style: {
          base: {
              fontSize,
              color: '#424770',
              letterSpacing: '0.025em',
              fontFamily: 'Source Code Pro, monospace',
              '::placeholder': {
                  color: '#aab7c4',
              },
              ...(padding ? { padding } : {}),
          },
          invalid: {
              color: '#9e2146',
          },
      },
  };
};
export const StripeAccountCardInputData = [
  {
    type: "Number",
    label: "Card Number",
    includeImg: "true",
    fullwidth: "true",
    placeholderText: "1234 1234 1234 1234 ",
    type: "input",
    id: "cardNumber",
    
    element: <CardNumberElement  {...createOptions(25)} />,
  },
  {
    type: "Number",
    label: "Expiration",
    includeImg:false,
    fullwidth: "false",
    type: "input",
    placeholderText: "MM/YY",
    id: "expirationDate",
    element: <CardExpiryElement />,
  },
  {
    type: "Number",
    label: "CCV",
    includeImg:false,
    fullwidth: "false",
    placeholderText: "***",
    type: "input",
    id: "ccv",
    element: <CardCvcElement />,
  },
  {
    label:"Country",
    includeImg:false,
    fullwidth:"false",
    placeholderText:"Select",
    type:"select",
    id:"country"
  },
  {
    label:"State",
    includeImg:false,
    fullwidth:"false",
    placeholderText:"Select",
    type:"select",
    id:"state"
  },
];

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [isbuttonDisable,setIsbuttonDisable] = useState(true)
  const [address, setAddress] = useState({
    country:"",
    state:""
  });

  const { purchaseData = {} ,upgradeData,downgradeData} = useSelector(paymentSelector);
  const { planId = "", uname = "", email = "" ,isUpgrade = false,paymentAction} = location?.state||{} ;

 const onInputChange = (event)=>{
  setIsbuttonDisable(!event.complete)
 }
  const handleChange = (e)=>{
    const {id,value} = e?.target;
    setAddress({...address,[id]:value})
  }

  const handlePayment = async (event) => {
    event.preventDefault();
    const paymentMethod = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardNumberElement),

      billing_details: {
        name: uname,
        email,
      },
    });
    let paymentData = {
      client_id: sessionStorage.getItem(isUpgrade?"UId":"CId"),
      plan_id: planId,
      payment_method_id: paymentMethod.paymentMethod.id,
    };
    if(isUpgrade){
      if(paymentAction === "upgrade"){
        dispatch(upgradePurchaseApi(paymentData))
      }
      else{
        dispatch(downgradePurchaseApi(paymentData))
      }
    }
    else{
      dispatch(purchaseApi(paymentData));
    }
  };

  useEffect(() => {
    if (purchaseData && purchaseData?.payment_intent_client_secret || upgradeData?.payment_intent_client_secret ) {
      let intented_secret = upgradeData?.payment_intent_client_secret || purchaseData?.payment_intent_client_secret
      const confirmPayment = stripe.confirmCardPayment(
        intented_secret,
        {
          payment_method: {
            card: elements?.getElement(CardNumberElement),
            billing_details: {
              name: uname,
              email,
              address: { 
                country:address?.country, 
                state:address?.state,
                // country: "IN",
                // line1: "123 main street",
                // line2: null,
                // city: "pueblo",
                // state: "co",
                // postal_code: "55555",
              },
            },
          },
        }
      ).then((res)=>{
        console.log("resssss",res);
        if(res?.paymentIntent){
          showToast("Payment Success", "success");
          navigate('/')
        }  
        else{
          showToast(res?.error,"error")
        }
      }).catch((Err)=>{
        console.log("errrr in cardpayment",Err);
        showToast("Error with Card Payment","error")
      });
    }

    
  }, [purchaseData?.payment_intent_client_secret,upgradeData?.payment_intent_client_secret]);

  return (
    <div style={{width:"40%"}}>
      <AccountInputCard
        // formik={formik}
        cardInput={StripeAccountCardInputData}
        onchange={handleChange}
        buttonText={"Paynow"}
        method={"card"}
        handlePayment={handlePayment}
        onInputChange={onInputChange}
        isButtonDisabled={isbuttonDisable}
      />
    </div>
  );
};

const StripePayment = () => {
  return (
    <div className="stripecontainer">
      <h1 style={{ color: "#6772E5" }}>Stripe</h1>
      <p style={{ fontSize: "20px" }}>Payment Details</p>

      <Elements stripe={strippromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripePayment;
