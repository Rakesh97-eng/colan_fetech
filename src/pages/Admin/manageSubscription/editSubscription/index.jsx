import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CommonTextFields from "../../../../components/common/Field/CommonTextFIelds";
import CommonSwitch from "../../../../components/common/switch/commonswitch";
import { editSubscriptionApi } from "../../../../redux/action/adminAction";
import { useDispatch } from "react-redux";

const EditSubscription = () => {
  const [editData, setEditData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    navigate("/dashboard/subscription");
  };

  useEffect(() => {
    setEditData(location.state?.data);
    return () => {
      location.state = "";
      setEditData({});
    };
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      plan: editData?.plan_name || "",
      subscription_amount: editData?.price || "",
      description: editData?.description || "No Data Available",
      status: editData?.status === 1 ? true : false || "",
      no_of_users: editData?.no_of_users,
      no_of_chatbots: editData?.no_of_chatbots,
      interval: editData?.interval == "month"?true :false || ""
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      let val = {
        interval:values.interval?"month":"year",
        plan_name: values.plan,
        price: values.subscription_amount,
        description: values.description,
        status: values.status ? 1 : 2,
        no_of_users: values.no_of_users,
        no_of_chatbots: values.no_of_chatbots,
      };
      dispatch(editSubscriptionApi(val, editData?.id));
      navigate("/dashboard/subscription");
    },
  });

  return (
    <div className="commonbox">
      <p className="compheading">Edit Subscription</p>
      <br />
      <div className="row">
        <div className="col-lg-6">
          <CommonTextFields
            label="Plan"
            id="plan"
            formik={formik}
            disabled={true}
          />
          <br />
        </div>
        <div className="col-lg-6">
          <CommonTextFields
            label="Subscription Amount "
            id="subscription_amount"
            type="number"
            formik={formik}
          />
        </div>
        <div className="col-lg-6">
          <CommonTextFields
            label="No of Users"
            id="no_of_users"
            formik={formik}
          />
          <br />
        </div>
        <div className="col-lg-6">
          <CommonTextFields
            label="No of Chatbots "
            id="no_of_chatbots"
            formik={formik}
          />
        </div>
        <div className="col-lg-6">
          <CommonTextFields
            label="Description"
            id="description"
            formik={formik}
          />
        </div>
        <div className="col-lg-6">
          <CommonSwitch label="Period" id="interval" isPeriod={true} formik={formik} />
        </div>

        <div className="col-lg-6 mt-4">
          <CommonSwitch label="Status" id="status" formik={formik} />
        </div>
      </div>
      <br />
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

export default EditSubscription;
