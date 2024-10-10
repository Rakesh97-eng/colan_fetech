import { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import AuthHoc from "../../components/authHoc/authHoc";
import AddButton from "../../components/common/Button/addButton";
import CustomizedTables from "../../components/common/commonTable";
import { subAdminTableHead } from "../../components/common/tableData";
import {AddSubAdminModal} from "../../components/modal/addSubAdminModal";
import { useModalClose } from "../../hooks/useModalClose";
import {
  deleteclientApi,
  deleteRegisterApi,
  getClientApi,
  getSubAdminsApi,
} from "../../redux/action/adminAction";
import { getSubClientsApi } from "../../redux/action/userAction";
import { adminSelector } from "../../redux/slice/adminSlice";
import { authSelector } from "../../redux/slice/authSlice";
import { userSelector } from "../../redux/slice/userSlice";
import { getLocalRoles } from "../../utils/findids/helperutils";

const ManageSubAdmin = (props) => {
  let userRole = sessionStorage.getItem("roles");
  let grouppermissionparam = userRole === "Admin"?"subadmins":"subclients"
  const { isauthenticated } = props;
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [modalOpen, setModalOpen] = useState();
  const ref = useModalClose(modalOpen,setModalOpen)
  const dispatch = useDispatch();

  let userid = sessionStorage.getItem("UId");
  
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const {
    getallSubAdminDetail,
    subAdminDetail,
    adminDataLoading,
    deleteData = "",
  } = useSelector(adminSelector);


  const {
    subclientdata,
    getallsubclientdata,
    deletesubclientdata,
  } = useSelector(userSelector);

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setSize(newPage);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (userRole === "Admin") {
      dispatch(getSubAdminsApi(userid));
    } else {
      dispatch(getSubClientsApi(userid));
    }

    
  }, [
    subAdminDetail,
    deleteData,
    dispatch,
    subclientdata,
    deletesubclientdata,
  ]);


  const handleDelete = (user) => {
    dispatch(deleteRegisterApi(user.id));
    if (userRole === "Admin") {
      dispatch(deleteRegisterApi(user.id));
    } else {
      dispatch(deleteclientApi(user.id));
    }
  };

  return (
    <>
      <div className="commonbox">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{fontSize:"24px",fontWeight:"600"}}>{`Manage Sub ${userRole}`}</p >
          {/* <Button className="addBtn" onClick={handleModalOpen}>
          + Add
        </Button> */}
          {isauthenticated?.add && (
            <AddButton handleClick={handleModalOpen} buttonText={"Add"} /> )} 
        </div>
        {isauthenticated?.view && (
          <CustomizedTables
            columns={subAdminTableHead}
            rows={
              userRole === "Admin" ? getallSubAdminDetail : getallsubclientdata
            }
            paginationStatus={true}
            rowsPerPageOptions={paginationRowsOptions}
            page={page}
            size={size}
            handleChangePage={handlePageChange}
            handleChangeRowsPerPage={handlePerRowsChange}
            onDelete={handleDelete}
            dataLoading={adminDataLoading}
            navigatepath="editsubadmin"
            isDeleteAllowed={isauthenticated?.delete}
            isEditAllowed={isauthenticated?.change}
          />
        )}

        <AddSubAdminModal
          ref = {ref}
          openModal={modalOpen}
          setOpenModal={setModalOpen}
          userId={userid}
        />
      </div>
      {/* <EnhancedManageSubAdmin {...props} /> */}
    </>
  );
};

export default AuthHoc(ManageSubAdmin,getLocalRoles()==="Admin"?"subadmins":"subclients");
// export default ManageSubAdmin;
