// import "./stripepayment.css";
// import {
//   AccountCardHead,
//   AccountCardInputData,
//   BankAccountCardData,
//   bankAccountValidationSchema,
//   cardValidationSchema,
//   GpayCardData,
//   upiValidationSchema,
// } from "../../../utils/constants/cardItem";
// import { showToast } from "../../../components/commonToast/toastService";
// import { useEffect, useState } from "react";
// import { AccountInputCard } from "../../../components/stripePaymentComp/accountInputCard";
// import { useFormik } from "formik";
// import { useLocation, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js/pure";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useMemo } from "react";
// import SubscriptionForm from "./test-index";
// import { GPayCheckoutForm } from "./gpay";
// import { purchaseApi } from "../../../redux/action/paymentAction";
// import { useDispatch, useSelector } from "react-redux";
// import { paymentSelector } from "../../../redux/slice/paymentSlice";
// import CenteredTextField from "../../../components/common/Field/CenteredTextField";

// const PUBLISHABLE_KEY =
//   "pk_test_51PLggmB2aHHeshWOyavbPzMQDJbvWEYAGJT7f8nozzI5TCU4pdai4CZYSNIF1z2lPojbkGCAd4GGXsVmTvSzRLQM00rpnr2goY";
  

// let strippromise = loadStripe(PUBLISHABLE_KEY);

// const options = {
//   mode: "payment",
//   amount: 1099,
//   currency: "usd",
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// // const AccountCard = (props) => {
// //   const [higlightcard, setHighlightCard] = useState("");
// //   const { showCard } = props;
// //   const changeCard = (value) => {
// //     showCard(value);
// //     setHighlightCard(value);
// //   };
// //   return (
// //     <>
// //       {AccountCardHead.map((carddetail) => {
// //         const { icon, label } = carddetail;
// //         return (
// //           <div
// //             className="accountcardcontainer"
// //             onClick={() => changeCard(label)}
// //             style={{
// //               borderColor: higlightcard === label ? "#00E785" : "inherit",
// //             }}
// //           >
// //             <img src={icon} id="cardimage" />
// //             <div>{label}</div>
// //           </div>
// //         );
// //       })}
// //     </>
// //   );
// // };

// const StripePayment = () => {
//   const location = useLocation();
//   const [showcard, setShowcard] = useState("");
//   const navigate = useNavigate();
//   const [formikConfig, setFormikConfig] = useState(null);
//   const {planId} = location.state
//   const [checknum, setChecknum] = useState({
//     cardNumber: "",
//     expirationDate: "",
//     ccv: "",
//     upiId: "",
//     accountNumber: "",
//     ifsc: "",
//   });
//   const [indexvalue, setIndexvalue] = useState(0);

//   const handleChange = (e, method) => {
//     checkCardFormat(e, method);
//   };

//   // const stripePromise = useMemo(
//   //   () => loadStripe(PUBLISHABLE_KEY),
//   //   [showcard],
//   // )

//   const checkCardFormat = (e, method) => {
//     let { value, name } = e.target;
//     if (method === "card") {
//       if (name === "cardNumber") {
//         value = value.replace(/[^0-9 @ / .]/, "");
//         let checkvalue = value?.split(" ");
//         if (checknum?.cardNumber.length < value.length) {
//           if (checknum?.cardNumber.length > 19) return;
//           if (checkvalue[indexvalue].length === 4) {
//             setChecknum({ ...checknum, [name]: value + " " });
//             setIndexvalue(indexvalue + 1);
//           } else {
//             if (checkvalue[indexvalue].length < 4)
//               setChecknum({ ...checknum, [name]: value });
//             else {
//               setChecknum({
//                 ...checknum,
//                 [name]: checknum.cardNumber + " ",
//               });
//               // setChecknum((prevstate) => prevstate + " " + value[value.length - 1]);
//               setIndexvalue(indexvalue + 1);
//             }
//           }
//         } else {
//           setIndexvalue(checkvalue.length - 1);
//           setChecknum({ ...checknum, [name]: value });
//         }
//       } else if (name === "expirationDate") {
//         value = value.replace(/[^0-9 /]/, "");
//         if (value.length > 5) return;
//         // setChecknum({...checknum,[name]:value})
//         if (checknum.expirationDate.length < value.length) {
//           if (value.length === 2) {
//             setChecknum({ ...checknum, [name]: value + "/" });
//           } else {
//             setChecknum({ ...checknum, [name]: value });
//           }
//         } else {
//           setChecknum({ ...checknum, [name]: value });
//         }
//       } else if (name === "ccv") {
//         value = value.replace(/[^0-9]/, "");
//         if (value.length > 3) return;
//         setChecknum({ ...checknum, [name]: value });
//       }
//     } else if (method === "bankaccount") {
//       value = value.replace(/[^0-9 @ / .]/, "");
//       setChecknum({ ...checknum, [name]: value });
//     } else {
//       setChecknum({ ...checknum, [name]: value });
//     }
//   };

//   const handleRoutes = () => {
//     showToast("Payment Sucess", "sucess");
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleCardSubmit = (values) => {
//     // Handle card submission
//     handleRoutes();
//   };

//   const handleUPISubmit = (values) => {
//     // Handle UPI submission
//     handleRoutes();
//   };

//   // const handleBankAccountSubmit = (values) => {
//   //   // Handle bank account submission
//   //   handleRoutes();
//   // };

//   const formik = useFormik(
//     formikConfig || {
//       enableReinitialize: true,
//       initialValues: {},
//       validationSchema: {},
//       onSubmit: () => {},
//     }
//   );

//   // useEffect(() => {
//   //   const { cardNumber, ccv, expirationDate, upiId, accountNumber, ifsc } =
//   //     checknum;

//   //   switch (showcard) {
//   //     case "Card":
//   //       setFormikConfig({
//   //         enableReinitialize: true,
//   //         initialValues: {
//   //           cardNumber: cardNumber,
//   //           expirationDate: expirationDate,
//   //           ccv: ccv,
//   //           country: "",
//   //         },

//   //         validationSchema: cardValidationSchema,

//   //         onSubmit: handleCardSubmit,
//   //       });
//   //       break;

//   //     case "UPI":
//   //       setFormikConfig({
//   //         enableReinitialize: true,
//   //         initialValues: { upiId: upiId },
//   //         validationSchema: upiValidationSchema,
//   //         onSubmit: handleUPISubmit,
//   //       });
//   //       break;
//   //     case "Bank Account":
//   //       setFormikConfig({
//   //         enableReinitialize: true,
//   //         initialValues: { accountNumber: accountNumber, ifsc: ifsc },
//   //         validationSchema: bankAccountValidationSchema,
//   //         onSubmit: handleUPISubmit,
//   //       });
//   //       break;

//   //     default:
//   //       setFormikConfig({
//   //         enableReinitialize: true,
//   //         initialValues: {
//   //           cardNumber: cardNumber,
//   //           expirationDate: expirationDate,
//   //           ccv: ccv,
//   //           country: "",
//   //         },

//   //         validationSchema: cardValidationSchema,

//   //         onSubmit: handleCardSubmit,
//   //       });
//   //       break;
//   //   }
//   // }, [showcard, checknum]);

//   // const inputDetails = (method) => {
//   //   switch (method) {
//   //     case "Card":
//   //       return (
//   //         <AccountInputCard
//   //           formik={formik}
//   //           cardInput={AccountCardInputData}
//   //           onchange={handleChange}
//   //           buttonText={"Paynow"}
//   //           method={"card"}
//   //         />
//   //         //   <Elements stripe={stripePromise} options={options}>
//   //         //   <CheckoutForm />
//   //         // </Elements>
//   //       );

//   //     case "UPI":
//   //       return (
//   //         <AccountInputCard
//   //           formik={formik}
//   //           cardInput={GpayCardData}
//   //           onchange={handleChange}
//   //           buttonText={"verify"}
//   //           method={"upi"}
//   //         />
//   //       );

//   //     case "Bank Account":
//   //       return (
//   //         <AccountInputCard
//   //           formik={formik}
//   //           cardInput={BankAccountCardData}
//   //           onchange={handleChange}
//   //           buttonText={"Paynow"}
//   //           method={"bankaccount"}
//   //         />
//   //       );

//   //     default:
//   //       return (
//   //         <AccountInputCard
//   //           formik={formik}
//   //           cardInput={AccountCardInputData}
//   //           onchange={handleChange}
//   //           buttonText={"Paynow"}
//   //           method={"card"}
//   //         />
//   //         //   <Elements stripe={stripePromise} options={options}>
//   //         //   <CheckoutForm />
//   //         // </Elements>
//   //       );
//   //   }
//   // };

//   const CheckoutForm = () => {
//     const stripe = useStripe();
//     const dispatch = useDispatch();
//     const elements = useElements();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [errorMessage, setErrorMessage] = useState(null);
//    const {purchaseData={}} = useSelector(paymentSelector)
//     //   const  handleSubmit = async (event) => {
//     //     try{
//     //     event.preventDefault();

//     //     if (elements == null) {
//     //       return;
//     //     }
//     //  console.log("elementss",elements);
//     //     // Trigger form validation and wallet collection
//     //     const {error: submitError} = await elements.submit();
//     //     if (submitError) {
//     //       // Show error to your customer
//     //       setErrorMessage(submitError.message);
//     //       return;
//     //     }
//     // const data = {
//     //   'amount': '2000',
//     //   'currency': 'usd',
//     //   'automatic_payment_methods[enabled]': 'true' ,
//     //   description: "for amazon-clone project",
//     //   "shipping": {
//     //     name: "Random singh",
//     //     address: {
//     //       line1: "510 Townsend St",
//     //       postal_code: "98140",
//     //       city: "San Francisco",
//     //       state: "CA",
//     //       country: "US",
//     //     },
//     //   },
//     // }
//     //     // Create the PaymentIntent and obtain clientSecret from your server endpoint
//     //     // const res = await fetch('https://api.stripe.com/v1/payment_intents ', {
//     //     //   method: 'POST',
//     //     // });

//     //     // const {client_secret: clientSecret} = await res.json();
//     //     // let clientSecret = "sk_test_51PA4qHSAewgQma7ffa0q6k0JNqJjbWnKiE4uHCgUxNpgM46az6ljmQ1rXtDCm9kTOTwieyELES5nhW6lMq28a74Z001eWB8go0"
//     //     const fetchStripe = async ()=>{
//     //       await axios.post( 'https://api.stripe.com/v1/payment_intents',data,{
//     //      headers:{
//     //       'Content-Type': 'application/x-www-form-urlencoded',
//     //       Authorization:"Bearer sk_test_51PLggmB2aHHeshWOQH03VPYaFpms0Gq255EEGxFZslb4ey4d6zE7jVpgiL2e687wx0q4YLglq8wCFUGVwiGs5fO400bAHZlPLU"
//     //       // Authorization:"Bearer sk_test_51PA4qHSAewgQma7ffa0q6k0JNqJjbWnKiE4uHCgUxNpgM46az6ljmQ1rXtDCm9kTOTwieyELES5nhW6lMq28a74Z001eWB8go0"

//     //      }
//     //     })
//     //     }

//     //     let req =fetchStripe()

//     //     const {client_secret:clientSecret} = req.data;

//     //     const {error} = await stripe.confirmPayment({
//     //       //`Elements` instance that was used to create the Payment Element
//     //       elements,
//     //       clientSecret,
//     //       confirmParams: {
//     //         return_url: 'http://localhost:3000/',
//     //       },
//     //     });

//     //     if (error) {
//     //       showToast(error.message,"error")
//     //       // This point will only be reached if there is an immediate error when
//     //       // confirming the payment. Show error to your customer (for example, payment
//     //       // details incomplete)
//     //       // setErrorMessage(error.message);
//     //     } else {
//     //        showToast('Payment Sucess',"success")
//     //       //  navigate('/')
//     //       // Your customer will be redirected to your `return_url`. For some payment
//     //       // methods like iDEAL, your customer will be redirected to an intermediate
//     //       // site first to authorize the payment, then redirected to the `return_url`.
//     //     }
//     //   }
//     //   catch(err){
//     //     console.log("Errrr",err);
//     //   }

//     // }

//     const cardStyle = {
//       style: {
//         base: {
//           color: '#32325d',
//           fontFamily: 'Arial, sans-serif',
//           fontSmoothing: 'antialiased',
//           fontSize: '16px',
//           display:"flex",
//           flexDirection:"column",
//           '::placeholder': {
//             color: '#aab7c4',
//           },
//         },
//         invalid: {
//           color: '#fa755a',
//           iconColor: '#fa755a',
//         },
//       },
//     };
//     const handlePayment = async (event) => {
//       event.preventDefault();
//       const paymentMethod = await stripe?.createPaymentMethod({
//         type: "card",
//         card: elements?.getElement(CardElement),
        
//         billing_details: {
//           name,
//           email,
//         },
//       });
//       console.log("paymentmethod",paymentMethod);
//       let paymentData = {
//         "client_id": sessionStorage.getItem("CId"),
//         "plan_id": planId,
//         "payment_method_id": paymentMethod.paymentMethod.id
//       }
//       dispatch(purchaseApi(paymentData))

//     };
//     //  if((purchaseData && purchaseData.payment_intent_client_secret)){
//     //   showToast("Entering Payment","success")
//     //    const confirmPayment = await  stripe
//     //    .confirmCardPayment( purchaseData.payment_intent_client_secret, {
//     //      payment_method: {
//     //       card: elements?.getElement(CardElement),
//     //        billing_details: {
//     //          name,
//     //          email,
//     //          address: {
//     //            country: "IN",
//     //            line1: "123 main street",
//     //            line2: null,
//     //            city: "pueblo",
//     //            state: "co",
//     //            postal_code: "55555",
//     //        },
            
//     //        },
//     //      },
//     //    })
//     //    showToast(confirmPayment.paymentIntent,"success")
//     //    console.log("confirmPayment=====",confirmPayment.paymentIntent);
//     //  }
//     useEffect(()=>{
//       if((purchaseData && purchaseData?.payment_intent_client_secret)){
//         showToast("Entering Payment","success")
//         const confirmPayment =   stripe
//         .confirmCardPayment( purchaseData.payment_intent_client_secret, {
//           payment_method: {
//            card: elements?.getElement(CardElement),
//             billing_details: {
//               name,
//               email,
//               address: {
//                 country: "IN",
//                 line1: "123 main street",
//                 line2: null,
//                 city: "pueblo",
//                 state: "co",
//                 postal_code: "55555",
//             },
             
//             },
//           },
//         })
//         showToast("Payment Success","success")
//         console.log("confirmPayment=====",confirmPayment);

//       }
//     },[purchaseData?.payment_intent_client_secret])

//     return (
//       <form onSubmit={handlePayment} >
//         <lable>Name</lable>
//         <br></br>
//         <input
//           placeholder="Name"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
 
//         <br />
//         <label>Email</label>
//         <br></br>
//         <input
//           placeholder="Email"
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
      
//         <CardElement options={cardStyle} />
      
//         <button type="submit" disabled={!stripe || !elements}>
//           Pay
//         </button>
//         {/* Show error message to your customers */}
//         {errorMessage && <div>{errorMessage}</div>}
//       </form>
//     );
//   };

//   return (
//     <div className="stripecontainer">
//       <h1 style={{ color: "#6772E5" }}>Stripe</h1>
//       <p style={{ fontSize: "20px" }}>Payment Details</p>

//       <Elements stripe={strippromise} options={options}>
//         <CheckoutForm />
//         {/* <GPayCheckoutForm/>git */}
//       </Elements>
//     </div>
//   );
// };

// export default StripePayment;



// =========================================================================================

// mew index code
     {/* <lable>Name</lable>
      <br></br>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <label>Email</label>
      <br></br>
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br> */}

      {/* <CardElement options={cardStyle} /> */}
      {/* <label>Card Number</label>
      <div style={{backgroundColor:"white",padding:"5px 0px"}}>
        <CardNumberElement options={cardStyle} />
      </div>
      
      <label>Expiry Data</label>
      <CardExpiryElement options={cardStyle} />
      <label>CVV</label>
      <CardCvcElement options={cardStyle} /> */}


        // <form onSubmit={handlePayment}>
      {/* <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button> */}
      {/* Show error message to your customers */}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
   {/* </form> */}
