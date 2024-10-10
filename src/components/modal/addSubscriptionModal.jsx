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
  getSubscriptionApi,
  subscriptionApi,
} from "../../redux/action/adminAction";
import CommonDropDown from "../common/Field/CommonDropDown";
import { useEffect } from "react";
import { adminSelector } from "../../redux/slice/adminSlice";
import { useState } from "react";
import { forwardRef } from "react";

const AddSubscriptionModal=forwardRef((props,ref) =>{
  let optionArray = [
    { value: "Tier1", label: "Tier1", disabled: false, active: false },
    { value: "Tier2", label: "Tier2", disabled: false, active: false },
    { value: "Tier3", label: "Tier3", disabled: false, active: false },
  ];
  const { openModal = false, setOpenModal } = props;
  const [modaloption, setModalOption] = useState([{label:"Please Choose Any Plan",disabled:true,active:true}]);
  const { getSubscriptionDetail } = useSelector(adminSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenModal(false);
    formik.resetForm();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      plan_period: "",
      tier: "",
      no_of_users:"",
      no_of_chatbots:"",
      subscription_amount: "",
      description: "",
      status: "",
    },
    validationSchema: Yup.object({
      plan_period: Yup.string().required("Plan Period is required"),
      tier: Yup.string().required("Tier is required"),  
      subscription_amount: Yup.number()
      .required("Subscription Amount is required")
      .positive("Subscription Amount must be a positive number")
      .integer("Subscription Amount must be an integer").test(
        "maxDigits",
        "value should not be more than 10k",
        (number) => number <= 10000
      ).test(  "minDigits ",
      "minimum value must be atleast 100",
      (number) => number > 100),
      no_of_users:Yup.string().required("Mention the Number of Users"),
      no_of_chatbots:Yup.string().required("Mention the Number of Chatbots"),
      description: Yup.string().required("Description is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      let val = {
        interval: values.plan_period,
        subscription_plan: values.tier,
        plan_name: values.tier,
        price: values.subscription_amount,
        description: values.description,
        status: values.status,
        no_of_users:values.no_of_users,
        no_of_chatbots:values.no_of_chatbots
      };
      dispatch(subscriptionApi(val));
      formik.resetForm();
      setOpenModal(false);
    },
  });
  useEffect(() => {
    getSubscriptionApi();
  }, []);

  //   const handleSubadmins = () => {
  //   };
  useEffect(() => {
    let optionData = [];
    if(formik.values["plan_period"]){
      if (getSubscriptionDetail?.length > 0) {
        let filtered = getSubscriptionDetail?.filter( (detail) => detail.plan_period === formik?.values["plan_period"])
        if(filtered.length>0){
          filtered .map((detail) => {
             optionData = optionArray.map((option) => {
               if (detail.subscription_plan === option.value) {
                 option.disabled = "true";
                 option.active = "true";
               }
               return option;
             });
           });
        }
        else{
          setModalOption(optionArray);
          return
        }
        setModalOption(optionData);
      }
      else{
        setModalOption(optionArray)
      }
    }
  }, [getSubscriptionDetail, formik.values["plan_period"]]);

  return (
    <React.Fragment>
      <Dialog
        ref={ref}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="testing"
      >
        <div className="dialogPad">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <DialogTitle
                id="alert-dialog-title"
                sx={{ paddingLeft: "0px !important" }}
              >
                Add Subscription
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
            {/* <CommonTextFields
              label="Status"
              id="status"
              formik={formik}
              placeholder=""
            /> */}
            <CommonDropDown
              id="plan_period"
              label="Plan"
              formik={formik}
              options={[
                { value: "month", label: "Monthly" },
                { value: "year", label: "Yearly" },
              ]}
            />
          </div>
          <br />
          <div>
            {/* <CommonTextFields
              label="Tier"
              id="plan"
              formik={formik}
              placeholder=""
            /> */}
            <CommonTextFields
              id="tier"
              label="Tier"
              formik={formik}
              // options={modaloption}
              placeholder="Ex : Tier1"
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="No of Users"
              id="no_of_users"
              type="number"
              formik={formik}
              placeholder="Enter No of Users"
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="No of Chatbots"
              id="no_of_chatbots"
              type="number"
              formik={formik}
              placeholder="Enter No of Chatbots"
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="Subscription Amount"
              id="subscription_amount"
              type="number"
              formik={formik}
              placeholder="Enter Amount"
            />
          </div>
          <br />
          <div>
            <CommonTextFields
              label="Description"
              id="description"
              formik={formik}
              placeholder="Description"
            />
          </div>
          <br />
          <div>
            {/* <CommonTextFields
              label="Status"
              id="status"
              formik={formik}
              placeholder=""
            /> */}
            <CommonDropDown
              id="status"
              label="Status"
              formik={formik}
              options={[
                { value: 1, label: "Active" },
                { value: 2, label: "Inactive" },
              ]}
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

export default AddSubscriptionModal
