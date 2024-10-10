import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomizedTables from "../../components/common/commonTable";
import {
  ClientAuthoriZationData,
  RolesAndPermissionsData,
  RolesAndPermissionsHead,
} from "../../components/common/tableData";
import AddButton from "../../components/common/Button/addButton";
import { useEffect } from "react";
import { deleteUserRolesApi, getAllRolesApi } from "../../redux/action/adminAction";
import { adminSelector } from "../../redux/slice/adminSlice";
import AuthHoc from "../../components/authHoc/authHoc";

const ManageRoles = (props) => {
   const {isauthenticated } = props;
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [rowdata,setRowdata] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {getAllUserRoles,userRoles,deleteAllUserRoles} = useSelector(adminSelector)
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };


  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };

  // const handleRedirect = () => {
  //   navigate("/dashboard/roles/addRole");
  // };
  useEffect(()=>{
    dispatch(getAllRolesApi())
  },[userRoles,deleteAllUserRoles])

  const handleAddRoles = () => {
    navigate("/dashboard/addrole");
  };

  const handleDelete = (val)=>{
    dispatch(deleteUserRolesApi(val?.id))
  }

  return (
    <>
      <div className="commonbox">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

        <p style={{fontSize:"24px",fontWeight:"600"}}>Manage Roles & Permissions</p>
 
        { isauthenticated?.add && <AddButton  buttonText={"Add"} handleClick={handleAddRoles} />}
          </div>
        <div>
        { isauthenticated?.view &&  <CustomizedTables
            columns={RolesAndPermissionsHead}
            rows={getAllUserRoles}
            paginationStatus={true}
            rowsPerPageOptions={paginationRowsOptions}
            page={page}
            size={size}
            isEditAllowed = {isauthenticated?.change}
            isDeleteAllowed={isauthenticated?.delete}
            handleChangePage={handlePageChange}
            handleChangeRowsPerPage={handlePerRowsChange}
            onDelete = {handleDelete}
          />}
       
        </div>
      </div>
    </>
  );
};


export default AuthHoc(ManageRoles,"group");
// export default ManageRoles;