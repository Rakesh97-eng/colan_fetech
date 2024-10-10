import React from "react";
import { useNavigate } from "react-router-dom";
import CenteredTextField from "../../../components/common/Field/CenteredTextField";
import logo from "../../../assests/images/connexLogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addLoginApi } from "../../../redux/action/authAction";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  let remembercheck = useRef(null)
  const[rememberstatus,setRememberstatus] = useState(localStorage.getItem('remember')||false);
  const[rememberme,setRememberme] = useState(localStorage.getItem('remember')||'')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const handleNavigate = (val) => {
    navigate(`/${val}`);
  };
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: localStorage.getItem('fetechApp-username')||"",
      password: localStorage.getItem('fetechApp-password')|| "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User Name is required")
        .matches(/^[a-zA-Z\s]+$/, "User Name can only contain alphabet characters"),
      password: Yup.string().required("Password is required")
      .matches(/^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*?[^0-9A-Za-z]).{8,32}$/, "Password should contain atleast one number,one alphabet,one specialCharacters"),
    }),
    onSubmit: (values) => {
      let val = {
        username: values.username,
        password: values.password,
      };
      if(rememberstatus){
        localStorage.setItem('fetechApp-username',formik.values.username)
        localStorage.setItem('fetechApp-password',formik.values.password)
        
      }
      else {
        localStorage.setItem('fetechApp-username','')
        localStorage.setItem('fetechApp-password','')
        localStorage.setItem('remember','')
      }

        dispatch(addLoginApi(val,navigate,setLoading));

    },
  });
  
  useEffect(()=>{
   
    if(rememberme == 'true'){
      remembercheck.current.checked = true
    }
  },[rememberme])

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      formik.handleSubmit(formik.values)
    }
  }
  const handleRemember = ()=>{
    setRememberstatus(remembercheck?.current?.checked)
    if(rememberme == 'true'){
      localStorage.setItem('remember','')
    }
    else{
      localStorage.setItem('remember','true')
    }

  }
  return (
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
          <h2>LOGIN</h2>
          <br />
          <CenteredTextField
            label="Username"
            id="username"
            placeholder="Username"
            formik={formik}
          />
          <br />
          <CenteredTextField
            label="Password"
            id="password"
            type={"password"}
            placeholder="Password"
            formik={formik}
            keypress= {handleKeyPress}
          />
          <br />
          <div className="form-options">
            <label>

              <input type="checkbox" name="rememberMe" ref={remembercheck} onChange={handleRemember}/> Remember Me
            </label>
            <span className="forgot-password" onClick={()=>handleNavigate('forgot')}>Forgot Password?</span>
          </div>
          <button className="loginBtn" onClick={formik.handleSubmit} disabled={loading}>{loading?"loading...":"Login"}</button>
          <br />
          <br />
          <div>
            <p>
              Don't have an account?{" "}
              <b style={{ cursor: "pointer" }} onClick={()=>handleNavigate("register")}>
                SignUp
              </b>{" "}
            </p>
            <p className="backmenu" onClick={()=>navigate("/")}>Back to Menu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
