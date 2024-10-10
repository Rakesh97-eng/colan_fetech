import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CommonSwitch from "../../../components/common/switch/commonswitch";
import { editSubAdminApi } from "../../../redux/action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import CommonDropDown from "../../../components/common/Field/CommonDropDown";
import { designationData, findDesignation } from "../../../utils/findids/helperutils";
import { adminSelector } from "../../../redux/slice/adminSlice";
import { editSubClientApi } from "../../../redux/action/userAction";

const EditSubAdmin = () => {
  const [editData, setEditData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  let roles = sessionStorage.getItem('roles')
  const {getAllUserRoles,userRoles,deleteAllUserRoles,userName} = useSelector(adminSelector)
  const handleRedirect = () => {
    navigate("/dashboard/subadmin");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setEditData(location.state?.data);
    return () => {
      location.state = "";
      setEditData({});
    };
  }, []);

  let designationObj = {
    1: "Employee",
    2: "Manager",
    3: "Accountant",
  };

  const dispatchaction = (id,value)=>{
    if(roles === "Admin"){
    return  dispatch(editSubAdminApi(id, value));
    }
    else{
     return dispatch(editSubClientApi(id,value))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: editData?.first_name,
      email: editData?.email,
      lastname: editData?.last_name,
      designation: editData?.role_name,
      designationId:editData?.role_id,
      status: editData?.is_active,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is required"),
      email: Yup.string().required("Email is required"),
      lastname: Yup.string().required("Phone Number is required"),
      designation: Yup.string().required("Designation is required"),
    }),
    onSubmit: (values) => {
      let val = {
        first_name: values.firstname,
        email: values.email,
        last_name: values.lastname,
        role_id: values.designationId,
        is_active: values.status,
      };
      let EditedValue = { ...editData, ...val };
      dispatchaction(editData?.id, EditedValue);
      navigate("/dashboard/subadmin");
    },
  });
  return (
    <div className="commonbox">
      <p className="compheading">Edit Sub Admin</p>
      <div>
        <div className="dividgrid">
          <CommonTextFields label="First Name" id="firstname" formik={formik} />

          <CommonTextFields label="Email" id="email" formik={formik} />

          <CommonTextFields label="Last Name" id="lastname" formik={formik} />
          <CommonDropDown
            id="designationId"
            label="Designation"
            placeholder="Select an Designation"
            formik={formik}
            options={designationData(getAllUserRoles)}
            defaultValue={editData?.role_name}
            // options={[
            //   { value: 3, label: "Accountant" },
            //   { value: 2, label: "Manager" },
            //   { value: 1, label: "Employee" },
            // ]}
          />
        </div>
        <div className="dividgrid">
         
          <CommonSwitch label="Status" id="status" formik={formik} />
        </div>
      </div>

      <br />
      <div className="contentCenter">
        <Button className="cancelBtn" onClick={handleRedirect}>
          Cancel
        </Button>
        <Button className="submitBtn" onClick={formik.handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditSubAdmin;
