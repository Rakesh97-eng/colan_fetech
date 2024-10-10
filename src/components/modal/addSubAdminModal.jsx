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
  addSubAmdinsApi,
  getAllRolesApi,
  getRolesApi,
  getUserNameExistApi,
} from "../../redux/action/adminAction";
import CommonDropDown from "../common/Field/CommonDropDown";
import { adminSelector } from "../../redux/slice/adminSlice";
import { useEffect } from "react";
import { usePassword } from "../../hooks/usePassword";
import useDebounceEffect from "../../hooks/useDebounced";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { designationData } from "../../utils/findids/helperutils";
import { addSubclientsApi } from "../../redux/action/userAction";
import { forwardRef } from "react";

export  const AddSubAdminModal= forwardRef((props,ref) => {
  const { openModal = false, setOpenModal, userId = "" } = props;
  const [validationTriggered, setValidationTriggered] = useState(false); // Add a state to track if validation has been triggered
  const { getAllUserRoles, userRoles, deleteAllUserRoles, userName } =
    useSelector(adminSelector);
  const dispatch = useDispatch();
  let userRole = sessionStorage.getItem("roles");

  const generatePassword = usePassword();
  const handleClose = () => {
    setUsernameError("");
    setOpenModal(false);
    formik.resetForm();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email_id: "",
      mobile_no: "",
      status: "",
      designation: "",
      username: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("First Name is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "First Name can only contain alphabet characters"
        ),
      last_name: Yup.string()
        .required("Last Name is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Last Name can only contain alphabet characters"
        ),
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
      status: Yup.string().required("Status is required"),
      designation: Yup.string().required("Designation is required"),
    }),
    onSubmit: (values) => {
      let val = {
        user_client: userId,
        password: generatePassword(values.first_name, values.mobile_no),
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email_id,
        mobile_no: values.mobile_no,
        is_active: values.status === "Active",
        role_id: values.designation,
      };
      dispatch(
        userRole === "Admin" ? addSubAmdinsApi(val) : addSubclientsApi(val)
      );
      handleClose();
      setUsernameError("");
      formik.resetForm();
    },
  });

  const handleUserName = (e) => {
    let { value } = e.target;
    formik.setFieldValue("username", value);
    // formik.setFieldTouched("username",true)
    handleUserNameSearch(value);
  };

  const handleUserNameSearch = useDebounceEffect((term) => {
    if (term?.length > 0) {
      dispatch(getUserNameExistApi(term));
      formik.setFieldTouched("username", true);
    }
  }, 500);

  const [usernameError, setUsernameError] = useState("");
  useEffect(() => {
    dispatch(getAllRolesApi());
  }, []);
  useEffect(() => {
    if (userName?.error) {
      // setUsernameError("Username Not Available");
      formik.setFieldError("username", "Username Not Available");
      // formik.setFieldTouched('username',"Username Not Available")
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
                Add Sub Admin
              </DialogTitle>
            </div>
            <div>
              <CancelIcon
                sx={{ cursor: "pointer", color: "red" }}
                onClick={handleClose}
              />
            </div>
          </div>
          <div>
            <CommonTextFields
              label="First Name"
              id="first_name"
              formik={formik}
              placeholder=""
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="Last Name"
              id="last_name"
              formik={formik}
              placeholder=""
            />
          </div>
          <br />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <label>User Name</label>
            <TextField
              fullWidth
              id="username"
              margin="normal"
              onChange={(e) => {
                handleUserName(e);
                setUsernameError("");
              }}
              onBlur={(e) => formik.handleBlur(e)}
              value={formik?.values["username"]}
              error={Boolean(
                usernameError ||
                  (formik?.touched["username"] && formik?.errors["username"])
              )}
              helperText={
                <>
                  {usernameError ||
                    (formik?.touched["username"] && formik?.errors["username"])}
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
            {/* <CommonTextFields
              label="User Name"
              id="username"
              formik={formik}
              placeholder=""
              customChange = {handleUserName}
            /> */}
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
              id="status"
              label="Status"
              placeholder="Select an status"
              formik={formik}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </div>
          <br />
          <div>
            <CommonDropDown
              id="designation"
              label="Designation"
              placeholder="Select an Designation"
              formik={formik}
              options={designationData(getAllUserRoles)}
              // options={[
              //   { value: 3, label: "Accountant" },
              //   { value: 2, label: "Manager" },
              //   { value: 1, label: "Employee" },
              // ]}
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
