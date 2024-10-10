import React from "react";
import { useNavigate } from "react-router-dom";
import CenteredTextField from "../../../components/common/Field/CenteredTextField";
import logo from "../../../assests/images/connexLogo.png";
import { useFormik } from "formik";
import {  addDemoApi, addLoginApi, addRegisterApi } from "../../../redux/action/authAction";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerApiReducer } from "../../../redux/slice/authSlice";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Link,
} from "@mui/material";

const BookDemo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigate("/login");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email_id: "",
      mobile_no: "",
      lastname:"",

    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabet characters"),
        username: Yup.string()
        .required("Last Name is required"),
      email_id: Yup.string()
        .required("Email is required")
        .email("Invalid Email Format"),
      mobile_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid phone number") // Check for 10-digit numeric phone number
        .required("Phone Number is required"),
    //   password: Yup.string().required("Password is required") .matches(/^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*?[^0-9A-Za-z]).{8,32}$/, "Password should contain atleast one Number,one Alphatet,one SpecialCharacters"),
    //   isTermChecked: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    }),
    onSubmit: (values) => {
      let val = {
        first_name: values.username,
        last_name: values.username,
        email_id: values.email_id,
        mobile_no: values.mobile_no,
      };
      dispatch(addDemoApi(val, navigate));
      formik.resetForm();
    },
  });

  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "auto",
        }}
      />
      <div className="loginCard">
        <form onSubmit={formik.handleSubmit}>
          <div className="loginContainer">
            <h2>Book Here</h2>
            <br />
            <CenteredTextField
              label="Username"
              id="username"
              placeholder="Username"
              formik={formik}
            />
            <br />
            <CenteredTextField
              label="Last Name"
              id="lastname"
              placeholder="Last Name"
              formik={formik}
            />{" "}
            <br />
            <CenteredTextField
              label="Email Id"
              id="email_id"
              type="email"
              placeholder="Email Id"
              formik={formik}
            />
            <br />
            <CenteredTextField
              label="Phone Number"
              id="mobile_no"
              placeholder="Phone Number"
              formik={formik}
            />
            <br />
        
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
            {/* <div className="form-options">
            <label>
              <input id="isTermChecked" value={formik.values["isTermChecked"]} type="checkbox" name="rememberMe" /> I agree to all the{" "}
              <span style={{color:"#0880E8"}}>Terms</span> and <span style={{color:"#0880E8"}}> privacy policy</span>
            </label>
          </div> */}
            <button
              type="button"
              className="loginBtn"
              onClick={formik.handleSubmit}
            >
              Book Demo
            </button>
            <br></br>
            <p style={{marginTop:"5px"}} className="backmenu" onClick={()=>navigate("/")}>Back to Menu</p>

            <br />

            <div>
           
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemo;
