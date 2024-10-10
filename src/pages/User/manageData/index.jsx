import { useEffect, useState } from "react";
import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import CommonUpload from "../../../components/common/Field/CommonUpload";
import CustomizedTables from "../../../components/common/commonTable";
import PhoneInput from 'react-phone-number-input'

import {
  manageDataTableData,
  manageDataTableHead,
} from "../../../components/common/tableData";
import DynamicField from "../../../components/common/Field/DynamicField";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getManualUploadDataApi,
  manualUploadDataApi,
  manualUploadFileApi,
} from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";
import { useRef } from "react";
import { showToast } from "../../../components/commonToast/toastService";
import AddButton from "../../../components/common/Button/addButton";
import AuthHoc from "../../../components/authHoc/authHoc";

const ManageData = (props) => {
  const { getTableData, manualUpload, fileData } = useSelector(userSelector);
  const { isauthenticated } = props;
  let inputref = useRef();
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [selectedFile, setSelectedFile] = useState("Upload XLSX File");
  const dispatch = useDispatch();

  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };
  const storedUId = sessionStorage.getItem("UId");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email_id: "",
      mobile_no: "",
      product_name: "",
      country_code:""
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email_id: Yup.string().required("Email is required"),
      mobile_no: Yup.string().required("Mobile Number is required"),
      product_name: Yup.string().required("Product Name is required"),
    }),
    onSubmit: (values) => {
      let val = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email_id,
        mobile_no: values.mobile_no,
        product_name: values.product_name,
        client_id: storedUId,
      };
      dispatch(manualUploadDataApi(val));
      formik.resetForm();
      // navigate("/dashboard/subadmin");
    },
  });

  const onCountryPhoneChange =(phone, country) =>{
    formik.setFieldValue('country_code',country)
    formik.setFieldValue('mobile_no',phone)
  }

  useEffect(() => {
    dispatch(getManualUploadDataApi(storedUId));
  }, [ manualUpload, fileData]); // getTableData?.data?.id

  const onFileChange = (e) => {
    const files = e.target.files;
    try {
      if (files[0].type.split("/")[1] == "pdf") {
        throw "File Format should be XLSX";
      } else if (files.length > 0) {
        const selectedFileName = files[0].name;
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("client_id", storedUId);
        dispatch(manualUploadFileApi(formData));
        setSelectedFile(selectedFileName);
      }
    } catch (error) {
      setSelectedFile("please upload PDF files");
      showToast(error, "error");
    }
  };
  return (
    <div className="commonbox">
      <p style={{fontSize:"24px",fontWeight:"600"}}>Upload Data</p >

      <CommonUpload
        label={"Upload Your Files"}
        onFileChange={onFileChange}
        id={"about"}
        filename={selectedFile}
      />
      <br />

      <>
        <div className="contentEnd">
          <p style={{fontSize:"24px",fontWeight:"600"}}> Manual Upload Data</p >

          {/* <Button className="addBtn" onClick={formik.handleSubmit}>
          +Add
        </Button> */}
          <AddButton handleClick={formik.handleSubmit} buttonText={"Add"} />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <CommonTextFields
              placeholder="First Name"
              label="First Name"
              id="first_name"
              formik={formik}
            />
            <br />
            <CommonTextFields
              placeholder="Phone Number"
              label="Phone Number"
              type="number"
              id="mobile_no"
              name="manage_data"
              customChange={onCountryPhoneChange}
              formik={formik}
            />
            {/* <lable>Phone Number</lable>
            <PhoneInput
             placeholder="Enter phone number"
             value={formik.mobile_no}
             onChange={(e)=>formik.setFieldValue('mobile_no',e)}
             /> */}
            <br />
            <CommonTextFields
              placeholder="Product Name"
              label="Product Name"
              id="product_name"
              formik={formik}
            />
          </div>
          <div className="col-lg-6">
            <CommonTextFields
              placeholder="Last Name"
              label="Last Name"
              id="last_name"
              formik={formik}
            />
            <br />
            <CommonTextFields label="Email" placeholder="test@gmail.com" id="email_id" formik={formik} />
            <br />
            {/* <DynamicField /> */}
          </div>
        </div>
      </>

      <br />
      <div>
        <CustomizedTables
          columns={manageDataTableHead}
          rows={getTableData}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          // dataLoading = {adminDataLoading}
          page={page}
          size={size}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
      {/* <div className="contentCenter">
        <Button className="submitBtn">Submit</Button>
      </div> */}
    </div>
  );
};

export default ManageData;
