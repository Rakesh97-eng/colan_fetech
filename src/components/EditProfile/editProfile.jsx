import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import { EditUserApi, GetProfileApi } from "../../redux/action/authAction";
import CommonTextFields from "../common/Field/CommonTextFIelds";
import { getLocalRoles, getUserId } from "../../utils/findids/helperutils";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/slice/authSlice";
import { Avatar, Badge } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Ellipse from "../../assests/images/Ellipse 58.png";
import SubscriptionDetails from "./subscriptionDetails";
import { tableData } from "../../utils/constants/tableArray";
import { userActivePlanApi } from "../../redux/action/userAction";
import { userSelector } from "../../redux/slice/userSlice";
import { useState } from "react";

const EditProfile = () => {
  const [plandetails,setPlanDetails] = useState({})
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirect = () => {
    navigate("/dashboard/subadmin");
  };
  const { getUserProfile, getUserProfileLoading } = useSelector(authSelector);
  const {userActivePlandata,userActivePlandataLoading} = useSelector(userSelector)

  const { username, first_name, mobile_no, last_name, email } = getUserProfile;
   let roles = getLocalRoles();

  useEffect(() => {
    // place for edit profile
    dispatch(GetProfileApi());
    dispatch(userActivePlanApi())
  }, []);

  useEffect(()=>{
    if(userActivePlandata?.plan){
      let data = userActivePlandata?.plan.filter((plans)=>plans.is_current_plan)[0];
      setPlanDetails(data)
    }
  },[userActivePlandata])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email_id: email ?? "",
      mobile_no: mobile_no ?? "",
      username: username ?? "",
      country: "",
      zipcode: "",
      address: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User Name is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "User Name can only contain alphabet characters"
        ),
      email_id: Yup.string()
        .required("Email is required")
        .email("Invalid Email Format"),
      mobile_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid Phone Number") // Check for 10-digit numeric phone number
        .required("Phone Number is required"),
      zipcode: Yup.string().required("ZipCode is required"),
      address: Yup.string().required("Address is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: (values) => {
      let val = {
        user_client: getUserId,
        username: values.username,
        email_id: values.email_id,
        mobile_no: values.mobile_no,
        zipcode: values.zipcode,
        address: values.address,
        country: values.country,
      };
      dispatch(EditUserApi(val));
      formik.resetForm();
    },
  });

  const editAvatarStyle = {
    position: "relative",
  };

  const editIconStyle = {
    position: "absolute",
    bottom: "4px",
    right: "0px",
    background: "#040128",
    borderRadius: "50%",
    padding: "2px",
    color: "#00e68a",
    cursor: "pointer",
    fontSize: "larger",
  };

  const getDisablestate = (state) => {
    return state?.length > 0;
  };

  return (
    <div className="commonbox">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="compheading">Edit Profile</p>
        <div style={editAvatarStyle}>
          <Avatar
            alt="Travis Howard"
            src={Ellipse}
            style={{ height: "65px", width: "65px" }}
          />
          <EditIcon style={editIconStyle} color="blue" />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-6">
          <CommonTextFields
            label="Username"
            id="username"
            disabled={getDisablestate(username)}
            formik={formik}
          />
          <br />
          <CommonTextFields
            label="Phonenumber"
            id="mobile_no"
            disabled={getDisablestate(mobile_no)}
            formik={formik}
          />
          <br />
          <CommonTextFields label="Country" id="country" formik={formik} />
        </div>
        <div className="col-lg-6">
          <CommonTextFields
            label="Email"
            id="email_id"
            disabled={getDisablestate(email)}
            formik={formik}
          />
          <br />
          <CommonTextFields label="Address" id="address" formik={formik} />
          <br />
          <CommonTextFields label="Zipcode" id="zipcode" formik={formik} />
        </div>
      </div>
      <br />
      <br />
      <div className="contentCenter">
        <Button className="cancelBtn" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button className="submitBtn" onClick={() => formik.handleSubmit()}>
          Save
        </Button>
      </div>
    {roles === "User" && <div style={{ margin: "12px" }}>
        <SubscriptionDetails data={plandetails} dataLoading={userActivePlandataLoading} />
      </div>}
    </div>
  );
};

export default EditProfile;
