import React from "react";
import { useNavigate } from "react-router-dom";
import CenteredTextField from "../../../components/common/Field/CenteredTextField";
import logo from "../../../assests/images/connexLogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ForgotPasswordApi } from "../../../redux/action/authAction";
const ForgotPassword = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          email: "",
          username:"",
          password:"",
          mobile_no:""

        },
        validationSchema: Yup.object({
          email: Yup.string()
            .required("Email is required")
            .email("Invalid Email Format"),
            username:Yup.string()
            .required("User Name is required"),
            password:Yup.string()
            .required("Password is required"),
            mobile_no:Yup.string()
            .required("Phone Number is required")
  
        }),
        onSubmit: (values) => {
          let val = {
            username: values.username,
            password: values.password,
            mobile_no: values.mobile_no,
            email_id: values.email,
          };
          dispatch(ForgotPasswordApi(val,navigate))
          
        },
      });

  return (
    <>
      {" "}
      <div>
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200px", // Adjust the width as needed
            height: "auto", // Maintain aspect ratio
          }}
        />
        <div className="loginCard">
          <div className="loginContainer">
            <h2>Forgot Password</h2>
            {/* <p>Enter your Email we will sent a OTP to reset your Password</p> */}
            <br />

            
            <CenteredTextField
              label="Username"
              id="username"
              placeholder="Enter your Name"
              formik={formik}
            />
            <br/>
            <CenteredTextField
              label="Email"
              id="email"
              placeholder="Enter your Email"
              formik={formik}
            />
            <br/>
            <CenteredTextField
              label="Password"
              id="password"
              placeholder="Enter New Password"
              formik={formik}
            />
            <br/>
            <CenteredTextField
              label="Phone Number"
              id="mobile_no"
              placeholder="Enter your Number"
              formik={formik}
            />
            <br/>
           

            <button className="loginBtn" onClick={formik.handleSubmit}>Continue</button>
           <br></br>
           <br />
           <p>
            <span style={{ cursor: "pointer" }} onClick={()=>navigate('/')}>Back To Login</span> 
           </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
