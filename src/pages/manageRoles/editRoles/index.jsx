import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  ClientAuthoriZationData,
  EditRole,
  RoleAuthoriZationData,
  RoleAuthoriZationHead,
} from "../../../components/common/tableData";
import CustomizedTables from "../../../components/common/commonTable";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserRolesApi,
  getUserRolesApi,
} from "../../../redux/action/adminAction";
import { adminSelector } from "../../../redux/slice/adminSlice";

let userRole = sessionStorage.getItem("roles");
function getRoleBasedColum() {
  return userRole === "Admin" ? RoleAuthoriZationData : ClientAuthoriZationData;
}

const EditRoles = () => {
  const [editRoles, setEditRoles] = useState(getRoleBasedColum());
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserRolesById } = useSelector(adminSelector);
  useEffect(() => {
    dispatch(getUserRolesApi(location.state?.data?.id));
    setEditRoles(getRoleBasedColum());
  }, [location.state?.data?.id]);

  useEffect(() => {
    if (getUserRolesById) {
      const updatedRoles = getRoleBasedColum().map((role) => {
        const updatedPermissions = getUserRolesById[role.id] || [];
        const updatedRole = { ...role };
        updatedPermissions.forEach((permission) => {
          updatedRole[permission] = true;
        });

        return updatedRole;
      });

      setEditRoles(updatedRoles);
    }
  }, [getUserRolesById]);

  const handleConfirm = () => {
    let data = {};
    editRoles.map((edits) => {
      let editArr = Object.keys(edits).filter(
        (val) => edits[val] === true && val !== "disable"
      );
      if (editArr.length > 0) data[edits.id] = editArr;
    });
    dispatch(editUserRolesApi(location.state?.data?.id, data));
    navigate("/dashboard/roles");
  };

  const handleeditrowchange = (value, row) => {
    try {
      const { checked, name } = value.target;
      const { Modules, id } = row;
      let checkedroles = editRoles?.map((val) => {
        if (val["#"] === row["#"]) {
          if (name === "view" && checked) {
            // let data = JSON.parse(sessionStorage.getItem('permission')) ?? {}

            return { ...val, view: checked, disable: false };
          } else if (name === "view" && !checked) {
            sessionStorage.setItem("permission", JSON.stringify(val));
            return {
              ...val,
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
      setEditRoles(checkedroles);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="commonbox">
      <p className="compheading">Edit Roles</p>
      <CustomizedTables
        columns={RoleAuthoriZationHead}
        rows={editRoles}
        handleChange={handleeditrowchange}
        paginationStatus={true}
      />
      <br />
      <div
        className="contentCenter"
        style={{ justifyContent: "space-around !important" }}
      >
        <Button className="submitBtn" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default EditRoles;
