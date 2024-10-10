import touch from "../../assests/images/touch.png";
import check from "../../assests/images/check.png";
import eye from "../../assests/images/eye.png";
import block from "../../assests/images/block.png";
import telegram from "../../assests/images/telegram.png";
import mail from "../../assests/images/mail.png";
import card from "../../assests/images/card.png"
import gpay from "../../assests/images/gpay.png"
import bank from "../../assests/images/bank.png"
import * as Yup from 'yup';

export const CardItem = [
  {
    id:"messages_sent",
    icon: touch,
    name: "Number of click on links",
    value: 370,
  },
  {
    id:"messages_sent",
    icon: telegram,
    name: "Message Sent",
    value: 370,
  },
  {
    id:"messages_received",
    icon: mail,
    name: "Message Received",
    value: 120,
  },
  {
    id:"messages_read",
    icon: eye,
    name: "Number of Read",
    value: 370,
  },
  {
    id:"yes_responses",
    icon: check,
    name: "Number of Yes",
    value: 370,
  },
  {
    id:"no_responses",
    icon: block,
    name: "Number of No",
    value: 370,
  },
];

export const ResponseCardItem = [
  { icon: eye, name: "Echobot", comment: "Not Identifying the user's" },
  { icon: touch, name: "TestBot", comment: "Not Identifying the user's" },
  { icon: check, name: "Buddy", comment: "Not Identifying the user's" },
  { icon: block, name: "Amigo", comment: "Not Identifying the user's" },
  { icon: telegram, name: "John", comment: "Not Identifying the user's" },
  { icon: eye, name: "Redmi", comment: "Not Identifying the user's" },
  { icon: mail, name: "Colan", comment: "Not Identifying the user's" },
  { icon: eye, name: "Echobot", comment: "Not Identifying the user's" },
  { icon: check, name: "Echobot", comment: "Not Identifying the user's" },
];

export const SubscriptionData = [
  { subscription_plan: "Tier 1", billing: "$7.80", checkList: ["50 Imnage Generation","500 credits","Monthly 100 credits free","Customer Support","Dedicated Server","Priority Generation"] },
  { subscription_plan: "Tier 2", billing: "$8.80", checkList: ["50 Imnage Generation","500 credits","Monthly 100 credits free","Customer Support","Dedicated Server","Priority Generation"] },
  { subscription_plan: "Tier 3", billing: "$9.80", checkList: ["50 Imnage Generation","500 credits","Monthly 100 credits free","Customer Support","Dedicated Server","Priority Generation"] },
  { name: "For More Details", textvalue: "Contact the sales person by using the button below",description:"orem Ipsum is simply dummy text of the printing and typesetting industry. orem Ipsum is simply dummy text of the printing and typesetting industry.orem Ipsum is simply dummy text of the printing and typesetting industry.psum is simply dummy text of the printing and typesetting industry. orem Ipsum is simply dummy text of the printing and typesetting industry.orem Ipsum is simply dummy text of the printing and typesetting industry" },
];



export const AccountCardHead=[
  {icon:card,label:"Card"},
  {icon:gpay,label:"UPI"},
  {icon:bank,label:"Bank Account"},
]

export const AccountCardInputData=[
  {
    type:"Number",
    label:"Card Number",
    includeImg:"true",
    fullwidth:"true",
    placeholderText:"1234 1234 1234 1234 ",
    type:"input",
    id:"cardNumber"
  },
  {
    type:"Number",
    label:"Expiration",
    includeImg:"false",
    fullwidth:"false",
    type:"input",
    placeholderText:"MM/YY",
    id:"expirationDate"
  },
  {
    type:"Number",
    label:"CCV",
    includeImg:"false",
    fullwidth:"false",
    placeholderText:"***",
    type:"input",
    id:"ccv"
  },
  {
    label:"Country",
    includeImg:"false",
    fullwidth:"true",
    placeholderText:"Select",
    type:"select",
    id:"country"
  },
]

export const GpayCardData = [
  {
    label:"Enter your UPI id",
    includeImg:"false",
    fullwidth:"true",
    placeholderText:"Enter upi id",
    id:"upiId"
  }
]

export const BankAccountCardData=[
  {
    type:"Number",
    label:"Account Number",
    includeImg:"false",
    fullwidth:"true",
    placeholderText:"Enter Account number",
    id:"accountNumber"
  },
  {
    type:"Number",
    label:"IFSC",
    includeImg:"false",
    fullwidth:"true",
    placeholderText:"Enter IFSC Code",
    id:"ifsc"
  }
]


export const bankAccountValidationSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .required('Account Number is required')
    .matches(/^\d{10,16}$/, 'Invalid Account Number'),
    ifsc: Yup.string()
    .required('IFSC is required')
   
});

export const upiValidationSchema = Yup.object().shape({
  upiId: Yup.string()
    .required('UPI ID is required')
    .matches(/^[\w.-]+@\w+$/, 'Invalid UPI ID')
    .matches(/^[A-Z]/, 'First Letter should be in Uppercase'),
});
 

export const cardValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card Number is required')
    // .matches(/^\d{13,20}$/, 'Invalid card number'),
    .matches(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?$/, 'Invalid Card Number'),
  expirationDate: Yup.string()
    .required('Expiration Date is required')
    .matches(/^(0[0-9]|1[0-5])\/\d{2}$/, 'Invalid Expiration Date'),
  ccv: Yup.string()
    .required('CCV is required')
    .matches(/^\d{3}$/, 'Invalid CCV'),
});

