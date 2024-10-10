import React, { useEffect, useState } from "react";
import CommonTextFields from "../common/Field/CommonTextFIelds";
import CustomizedTables from "../common/commonTable";
import {
  ClientAuthoriZationData,
  RoleAuthoriZationData,
  RoleAuthoriZationHead,
  RolesAndPermissionsHead,
} from "../common/tableData";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddRoles = () => {

  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [roles,setRoles] = useState([])
  let userrole = sessionStorage.getItem("roles")
  const navigate = useNavigate();
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };

  const changeRoles = (e,data)=>{
    console.log("Dataaaaaaaaaa",data.Modules,e.target.name);
  }

  useEffect(()=>{
    let data = userrole === "Admin"?RolesAndPermissionsHead:ClientAuthoriZationData
    setRoles(data)
  },[userrole])


  return (
    <div className="commonbox">
      <p style={{ fontSize: "24px", fontWeight: "600" }}>Add Roles</p>
      <div className="row">
        <div className="col-lg-6">
          <CommonTextFields label="Role Name" id="RoleName" />
        </div>
      </div>
      <br />
      <p style={{ fontSize: "24px", fontWeight: "600" }}>Grant Authorizations</p>
      <br />
      <CustomizedTables
        columns={RoleAuthoriZationHead}
        rows={roles}
        paginationStatus={true}
        rowsPerPageOptions={paginationRowsOptions}
        page={page}
        size={size}
        handleChange = {changeRoles}
        //for loader component
        // dataLoading = {adminDataLoading}
        handleChangePage={handlePageChange}
        handleChangeRowsPerPage={handlePerRowsChange}
      />
      <div className="contentCenter">
        <Button className="submitBtn" onClick={()=>navigate('/dashboard/roles')}>Confirm</Button>
      </div>
    </div>
  );
};

export default AddRoles;
