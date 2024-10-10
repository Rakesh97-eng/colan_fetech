import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoleAuthApi } from "../../redux/action/authAction";
import { authSelector } from "../../redux/slice/authSlice";
import LazyLoader from "../lazyLoader";

const AuthHoc = (Childcomp, compname) => {
  const AddAuthComp = (props) => {
    const dispatch = useDispatch();
    const { userRoleData,userRoleLoading } = useSelector(authSelector);
    const [isRoleSet,setIsRoleset] = useState(true);
    const [isauthenticated, setIsAuthenticated] = useState({
      view: true,
      change: false,
      add: false,
      delete: false,
    });
    useEffect(() => {
      //dispatch api
      let id = sessionStorage.getItem('UId')
      dispatch(RoleAuthApi(id));
    }, []);

    useEffect(() => {
      if (userRoleData) {
        for (let module in userRoleData) {
          if (module === compname) {
            let roleobj = {};
            userRoleData[compname].map((val) => {
              roleobj[val] = true;
            });
            setIsAuthenticated({ ...isauthenticated, ...roleobj });
          }
        }
        setIsRoleset(false)
      }
    }, [userRoleData]);
    return isRoleSet  ? <>Loading...</> : <Childcomp isauthenticated={isauthenticated} />;
  };
  return AddAuthComp;
};

export default AuthHoc;
