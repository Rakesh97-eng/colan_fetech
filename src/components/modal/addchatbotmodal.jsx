import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { adminSelector } from "../../redux/slice/adminSlice";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as Yup from "yup";
import { addChatBotApi, getSubscriptionApi } from "../../redux/action/adminAction";
import { useEffect } from "react";
import CommonDropDown from "../common/Field/CommonDropDown";
import Switch from "@mui/material/Switch";
import { optionData } from "../../utils/findids/helperutils";

export default function AddChatbotModal(props) {
  const { openModal = false, setOpenModal } = props;
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const { getClientDetail } = useSelector(adminSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenModal(false);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      // chatbotData: {
      clientName: "",
      chatbotName: "",
      // question: "",
      status: false,
      // },
    },
    validationSchema: Yup.object({
      // chatbotData: Yup.object({
      chatbotName: Yup.string().required("Chatbot name is required"),
      // question: Yup.string().required("Question is required"),
      // }),
    }),
    onSubmit: () => {
      saveElements();
    },
  });

  const saveElements = () => {
    // const startingNodeId = "1";
    // const resultJSON = buildJSON(
    //   reactFlowInstance.toObject().nodes,
    //   reactFlowInstance.toObject().edges,
    //   startingNodeId
    // );

    let savedElements = {
      Chatbot_name: formik.values.chatbotName,
      // question: formik.values.question,
      status: formik.values?.status,
      client_id: formik.values.clientName,
    };

    dispatch(addChatBotApi(savedElements));
    
    setOpenModal(false);
  };

  useEffect(() => {
    getSubscriptionApi();
  }, []);

  //   const handleSubadmins = () => {
  //   };


  const handleStatus = (e) => {
    // setChatbotData({ ...formik.values, status: !formik.values.status });
    formik.setFieldValue('status',!formik.values.status)
  };
  return (
    <React.Fragment>
      <Dialog
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
                Add Subscription
              </DialogTitle>
            </div>
            <div>
              <CancelIcon
                sx={{ cursor: "pointer", color: "red" }}
                onClick={handleClose}
              />
            </div>
            <div className="dndflowheader">
              <h2>Manage ChatBot</h2>
              <div className="dndflowfields">
                <div className="dndflowinput">
                  <label>Client Name</label>

                  <CommonDropDown
                    id="clientName"
                    // label="Client Name
                    formik={formik}
                    options={optionData(getClientDetail)}
                  />
                </div>
                <div className="dndflowinput">
                  <label>Chatbot Name</label>
                  <span>
                    <input
                      value={formik?.values?.chatbotName}
                      name="chatbotName"
                      // onChange={(e) => updateName(e)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.chatbotName && formik.errors.chatbotName ? (
                      <div className="errors" style={{ color: "red" }}>
                        {formik.errors.chatbotName}
                      </div>
                    ) : null}
                  </span>
                </div>

                <div className="dndactive">
                  <label>Status:</label>
                  <span>Active</span>
                  <Switch
                    {...label}
                    name="status"
                    checked={formik?.values?.status}
                    value={formik?.values?.status}
                    onChange={(e) => handleStatus(e)}
                  />
                  <span>Inactive</span>
                </div>
              </div>
            </div>

            <div className="contentCenter">
              <Button className="submitBtn" onClick={formik.handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
