import React, { useEffect, useState } from "react";
import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import * as Yup from "yup";
import CustomizedTables from "../../../components/common/commonTable";
import {
  ClientAuthoriZationData,
  RoleAuthoriZationData,
  RoleAuthoriZationHead,
  RolesAndPermissionsHead,
} from "../../../components/common/tableData";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addRolesApi } from "../../../redux/action/adminAction";

const AddRoles = () => {
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [roledata, setRoleData] = useState([]);
  const [choosenRole, setChoosenRole] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let roles = sessionStorage.getItem('roles')

  const handlerowchange = (value, row) => {
    try {
      const { checked, name } = value.target;
      const { Modules, id } = row;
      let checkedroles = roledata?.map((val) => {
        if (val["#"] === row["#"]) {
          if (name === "view" && checked) {
            // let data = JSON.parse(sessionStorage.getItem('permission')) ?? {}

            return { ...val, view: checked, disable: false };
          } else if (name === "view" && !checked) {
            sessionStorage.setItem("permission", JSON.stringify(val));
            return {
              ...val,
              add:false,
              edit: false,
              delete: false,
              change: false,
              view: false,
              disable: true,
            };
          } else {
            return { ...val, [name]: checked, view: true };
          }
        }
        return val;
      });
      setRoleData(checkedroles);
      if (choosenRole[id] && name !== "view") {
        if (choosenRole[id].includes(name)) {
          let check = choosenRole[id].splice(choosenRole[id].indexOf(name), 1);
          setChoosenRole({ ...choosenRole, [id]: [...choosenRole[id]] });
        } else {
          setChoosenRole({ ...choosenRole, [id]: [...choosenRole[id], name] });
        }
      } else {
        if (name === "view") {
          if (checked) setChoosenRole({ ...choosenRole, [id]: [name] });
          else {
            delete choosenRole[id];
            const updateChoosenRole = { ...choosenRole };
            setChoosenRole(updateChoosenRole);
          }
        } else {
          setChoosenRole({ ...choosenRole, [id]: [name, "view"] });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const handleConfirm = ()=>{
  //   navigate('/dashboard/roles')
  // }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rolename: "",
    },
    validationSchema: Yup.object({
      rolename: Yup.string().required("Role Name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let apiValue = {
        "role_name": values.rolename.charAt(0).toUpperCase() + values.rolename.slice(1),
       "permissions": {...choosenRole  }
      }
      dispatch(addRolesApi(apiValue))
      navigate('/dashboard/roles')
    },
  });

  useEffect(() => {
        let data = roles === "Admin"?RoleAuthoriZationData:ClientAuthoriZationData
    setRoleData(data);
  }, []);
  return (
    <div className="commonbox">
 <p style={{ fontSize: "24px", fontWeight: "600" }}>Add Roles</p>    
 
   <div className="row">
        <div className="col-lg-6">
          <CommonTextFields label="Role Name" id="rolename" formik={formik} />
        </div>
      </div>
      <br />
      <p style={{ fontSize: "24px", fontWeight: "600" }}>Grant Authorizations</p>
      <br />
      <CustomizedTables
        columns={RoleAuthoriZationHead}
        rows={roledata}
        paginationStatus={true}
        // rowsPerPageOptions={paginationRowsOptions}
        page={page}
        size={size}
        handleChange={handlerowchange}
        // dataLoading = {adminDataLoading}
      />
      <div className="contentCenter">
        <Button className="submitBtn" onClick={formik.handleSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AddRoles;
