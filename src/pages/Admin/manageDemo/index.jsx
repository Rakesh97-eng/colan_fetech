import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../../styles/App.css";
import CustomizedTables from "../../../components/common/commonTable";
import {
  ClientDataHead,
  ClientData,
  DemoaHeadData,
} from "../../../components/common/tableData";
import AddSubAdminModal from "../../../components/modal/addSubAdminModal";
import AuthHoc from "../../../components/authHoc/authHoc";
import { useEffect } from "react";
import { getDemoApi } from "../../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/slice/authSlice";

const ManageDemo = () => {
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [modalOpen, setModalOpen] = useState();
  const dispatch = useDispatch();
  const {getDemo,addDemo, getDemoLoading } = useSelector(authSelector)
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  useEffect(()=>{
    dispatch(getDemoApi())
  },[addDemo])

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };



  return (
    <>
      <div className="commonbox">
        <p style={{fontSize:"24px",fontWeight:"600"}}>Request For Demo</p>
        <br />
        <CustomizedTables
          columns={DemoaHeadData}
          rows={getDemo}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          dataLoading={getDemoLoading}
          page={page}
          size={size}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    </>
  );
};

export default AuthHoc(ManageDemo,"managedemo");
// export default ManageDemo;
