import axios from "axios";
import { showToast } from "../../components/commonToast/toastService";
import { APIService } from "../api/ApiService";
import { AUTH_BASE_URL } from "../api/configURL";
import { adddemoReducer, contactusreducer, editUserReducer, forgotApiReducer, getAboutusReducer, getDemoReducer, getProfileReducer, loginApiReducer, registerApiReducer, userRoleReducer } from "../slice/authSlice";

export function addLoginApi(body, navigate,setLoading) {
  return async (dispatch) => {
    setLoading(true)
    dispatch(loginApiReducer({ isLoading: true }));
    axios
      .post(`${AUTH_BASE_URL}/api/login/`, body)
      .then((e) => {
        let user_type = e?.data?.user_type
        dispatch(loginApiReducer({ apiData: e?.data, isLoading: false }));
        sessionStorage.setItem("roles", user_type);
        sessionStorage.setItem("ur", user_type=="Admin"||user_type==="Subadmin"?2:1);
        sessionStorage.setItem("UId", e?.data?.user_id)
        sessionStorage.setItem('AccessToken',e?.data?.access)
        sessionStorage.setItem('RefreshToken',e?.data?.refresh)
        setLoading(false)
        navigate( user_type=="Admin"?"/dashboard":"/dashboard/subadmin");
        showToast("Login Success", "success");
      })
      .catch((e) => {
        let err = e?.response?.data?.detail || e?.message
        dispatch(loginApiReducer({ isLoading: false }));
        showToast(err,"error");
        setLoading(false)
      });
  };
  // return apiHelper(loginApiReducer, "POST", "/login/", body);
}

export function addRegisterApi(body, navigate) {
  // return apiHelper(registerApiReducer, "POST", "/register/", body);
  try{
    return async (dispatch) => {
      dispatch(registerApiReducer({ isLoading: true }));
      axios
        .post(`${AUTH_BASE_URL}/signup/`, body)
        .then((e) => {
          if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
            const {username,email} = e?.data?.data;
            dispatch(registerApiReducer({ apiData: e.data, isLoading: false }));
            sessionStorage.setItem("roles", "Client");
            sessionStorage.setItem("ur",1);
            sessionStorage.setItem('CId',e?.data?.data?.id)
            navigate("/payment",{state:{uname:username,email:email}});
            showToast("Registration Success", "success");
          } else {
            showToast(e.response.data.username[0],"error");
          }
        })
        .catch((e) => {
          dispatch(registerApiReducer({ isLoading: false }));
          showToast(e.message,"error");
        });
    };

  }
  catch(err){
    showToast(err?.message,"error")
  }
}

export const ForgotPasswordApi=(body,navigate)=>{
  return async (dispatch) => {
    dispatch(forgotApiReducer({ isLoading: true }));
    axios
      .post(`${AUTH_BASE_URL}/api/forgot/`, body)
      .then((e) => {
        if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
          dispatch(forgotApiReducer({ apiData: e.data, isLoading: false }));
          navigate("/");
          showToast("New Password Updated", "success");
        } else {
          showToast(e.response.data.username[0],"error");
        }
      })
      .catch((e) => {
        dispatch(forgotApiReducer({ isLoading: false }));
        showToast(e.response.data.detail,"error");
      });
  };
}


// For Roles
export const RoleAuthApi = (id)=>{
  return async(dispatch)=>{
    dispatch(userRoleReducer({isLoading:true}));
    APIService("GET",`/permission/?user_id=${id}`)
    .then((e)=>{
        dispatch(userRoleReducer({isLoading:false,apiData:e?.data.data}));
    })
    .catch((e) => {
      dispatch(userRoleReducer({isLoading:false}));
    });
  }
}

export const GetProfileApi = ()=>{
  return async(dispatch)=>{
    dispatch(getProfileReducer({isLoading:true}))
    APIService("GET","/api/profile/")
    .then((e)=>{
      dispatch(getProfileReducer({isLoading:false,apiData:e?.data}))
    })
    .catch((e)=>{
      dispatch(getProfileReducer({isLoading:false}))
    })
  }
}


export const EditUserApi = (id)=>{
  return async(dispatch)=>{
    dispatch(editUserReducer({isLoading:true}));
    APIService("PUT",`/api/profile/`)
    .then((e)=>{
        dispatch(editUserReducer({isLoading:false}));
    })
    .catch((e) => {
      dispatch(editUserReducer({isLoading:false}));
    });
  }
}


// BOOK DEMO
export const addDemoApi = (body,navigate)=>{
  try{
    return async (dispatch) => {
      dispatch(adddemoReducer({ isLoading: true }));
      axios
        .post(`${AUTH_BASE_URL}/demo/`, body)
        .then((e) => {
          if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
            dispatch(adddemoReducer({ apiData: e.data, isLoading: false }));
            navigate("/");
            showToast("Demo Request Noted", "success");
          } else {
            showToast(e.response.data.error,"error");
          }
        })
        .catch((e) => {
          dispatch(adddemoReducer({ isLoading: false }));
          showToast(e.message,"error");
        });
    };

  }
  catch(err){
    showToast(err?.message,"error")
  }
}
export const getDemoApi = ()=>{
  try{
    return async (dispatch) => {
      dispatch(getDemoReducer({ isLoading: true }));
      APIService("GET",`/demo/all/`)
      .then((e)=>{
          dispatch(getDemoReducer({apiData: e.data?.data,isLoading:false}));
      })
      .catch((e) => {
        dispatch(getDemoReducer({isLoading:false}));
        showToast(e.message,"error");
      });
    };

  }
  catch(err){
    showToast(err?.message,"error")
  }
} 

export const getAboutsusApi = ()=>{
  try{
    return async (dispatch) => {
      dispatch(getAboutusReducer({ isLoading: true }));
      axios.get(`${AUTH_BASE_URL}/managecms/latest/`)
      .then((e)=>{
          dispatch(getAboutusReducer({apiData: e.data?.data[0],isLoading:false}));
      })
      .catch((e) => {
        dispatch(getAboutusReducer({isLoading:false}));
        showToast(e.message,"error");
      });
    };

  }
  catch(err){
    showToast(err?.message,"error")
  }
}



//contact us
export const contactusapi = (body)=>{
  try{
    return async (dispatch) => {
      dispatch(contactusreducer({ isLoading: true }));
      axios
        .post(`${AUTH_BASE_URL}/contact_us/`, body)
        .then((e) => {
          if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
            dispatch(contactusreducer({ apiData: e.data, isLoading: false }));
            showToast("Message Sent Successfully", "success");
          } else {
            showToast(e.response.data.error,"error");
          }
        })
        .catch((e) => {
          dispatch(contactusreducer({ isLoading: false }));
          showToast(e.response.data.error,"error");
        });
    };

  }
  catch(err){
    showToast(err?.message,"error")
  }
}