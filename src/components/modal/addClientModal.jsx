import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CommonTextFields from "../common/Field/CommonTextFIelds";
import "../modal/modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addClientApi,
  getSubscriptionApi,
  getUserNameExistApi,
} from "../../redux/action/adminAction";
import { useNavigate } from "react-router-dom";
import CommonDropDown from "../common/Field/CommonDropDown";
import { adminSelector } from "../../redux/slice/adminSlice";
import { useEffect } from "react";
import { usePassword } from "../../hooks/usePassword";
import useDebounceEffect from "../../hooks/useDebounced";
import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { emojiRegex } from "../../utils/constants/commonregex";
import { forwardRef } from "react";

const AddClientModal = forwardRef((props,ref)=> {
  const { openModal=false, setOpenModal,clientsubscriptiondetail } = props;
  const dispatch = useDispatch();
  const generatePassword = usePassword();

  const { getSubscriptionDetail, subscriptionDetail,userName } =
    useSelector(adminSelector);
  const handleClose = () => {
    setOpenModal(false);
    formik.resetForm()
  };

  const handleChange = (e)=>{
    let {value} = e.target;
    let billingDetails = findBilling(value)
   formik.setFieldValue("subscription_plan",value)
   formik.setFieldValue("billing",billingDetails.amount)
  }

  const findBilling=(value)=>{
   let data =  clientsubscriptiondetail?.filter((detail)=>detail.id===value);
   return {amount :data[0]?.price,plan:data[0]?.interval}
  }


  // useEffect(() => {
  //   // dispatch(getSubscriptionApi());
  // }, [subscriptionDetail]);

  const [usernameError, setUsernameError] = useState("");
  const handleUserName = (e) => {
    let { value } = e.target;
      formik.setFieldValue("name", value);
      handleUserNameSearch(value);
  };

  const handleUserNameSearch = useDebounceEffect((term) => {
    if(emojiRegex.test(term)){
      return
    }
    else if(term.length>0){
      dispatch(getUserNameExistApi(term));
      formik.setFieldTouched("name", true);
    }
  }, 500);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email_id: "",
      mobile_no: "",
      billing: "",
      subscription_plan: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabet characters"),
      email_id: Yup.string()
        .required("Email is required")
        .email("Invalid Email Format"),
      mobile_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid Phone Number") // Check for 10-digit numeric phone number
        .required("Phone Number is required"),
      billing: Yup.string().required("Billing is required"),
      subscription_plan: Yup.string().required("Subscription Plan is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let val = {
        // name: values.name,
        email: values.email_id,
        mobile_no: values.mobile_no,
        billing: values.billing,
        plan: values.subscription_plan,
        password:generatePassword(values.name,values.mobile_no),
        username:values.name,
        role_id:2
      };
      dispatch(addClientApi(val));
      resetForm();
      setOpenModal(false);
    },
  });

  useEffect(() => {
    if (userName?.error) {
      setUsernameError("Username Not Available");
    } else {
      setUsernameError("");
    }
  }, [userName?.error]);

  return (
    <React.Fragment>
      <Dialog
        ref={ref}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialogPad">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <DialogTitle
                id="alert-dialog-title"
                sx={{ paddingLeft: "0px !important" }}
              >
                Add Clients
              </DialogTitle>
            </div>
            <div>
              <CancelIcon
                sx={{ cursor: "pointer", color: "red" }}
                onClick={handleClose}
              />
            </div>
          </div>
                <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <label>User Name</label>
            <TextField
              fullWidth
              id="name"
              margin="normal"
              onChange={(e) => {
                handleUserName(e);
                setUsernameError("");
              }}
              onBlur={(e) => formik.handleBlur(e)}
              value={formik?.values["name"]}
              error={Boolean(
                usernameError ||
                  (formik?.touched["name"] && formik?.errors["name"])
              )}
              helperText={
                <>
                  {usernameError ||
                    (formik?.touched["name"] && formik?.errors["name"])}
                </>
              }
              variant="outlined"
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                width: "50%",
                mt: 0,
                mb: 0,
                borderRadius: "10px",
                "& .MuiOutlinedInput-input": "",
              }}
            />

          </Stack>
          <br />
          <div>
            <CommonTextFields
              label="Email"
              id="email_id"
              formik={formik}
              placeholder=""
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="Phone Number"
              id="mobile_no"
              type="number"
              formik={formik}
              placeholder=""
            />
          </div>
          <br />
          <div>
            
            <CommonDropDown
              id="subscription_plan"
              label="Subscription Plan"
              formik={formik}
              options={clientsubscriptiondetail}
              customChange = {handleChange}
            />
          </div>
          <br />
          <div>
              <CommonTextFields
              label="Billing"
              id="billing"
              formik={formik}
              placeholder=""
              disabled={true}
            />
 
          </div>
          <br />
          <div className="contentCenter">
            <Button className="submitBtn" onClick={formik.handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
})

export default AddClientModal;
