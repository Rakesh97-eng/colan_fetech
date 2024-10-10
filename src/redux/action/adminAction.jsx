import axios from "axios";
import { showToast } from "../../components/commonToast/toastService";
import { Capitalize } from "../../utils/findids/helperutils";
import { APIService } from "../api/ApiService";
import { ADMIN_BASE_URL } from "../api/configURL";
import { FileAPIService } from "../api/FileApiService";
// import { router } from "next/router";
import {
  addClientApiReducer,
  addSubAmdinsReducer,
  addSubscriptionApiReducer,
  getClientApiReducer,
  getSubAdminReducer,
  getSubscriptionApiReducer,
  addCMSApiReducer,
  getEarningsReducer,
  editSubscriptionApiReducer,
  addManageDataReducer,
  deleteClientReducer,
  addChatbotReducer,
  getChatbotReducer,
  getAllChatbotReducer,
  getChatbotByIdReducer,
  editChatBotByIdReducer,
  getRolesReducer,
  editSubAdminReducer,
  deleteReducer,
  deleteSubscriptionApiReducer,
  deleteChatbotReducer,
  getUserNameReducer,
  addRolesApiReducer,
  getAllUserRolesApiReducer,
  getUserRoleByIdReducer,
  deleteUserRoleByIdReducer,
  updateUserRoleByIdReducer,
  sendWhatsappmsgReducer,
  dashbordDataReducer,
  addcmsfeaturesApiReducer,
  addcmsblogsApiReducer,
  addcmssolutionsApiReducer,
  addcmscreatecontentApiReducer,
} from "../slice/adminSlice";


export function apiHelper(apiReducer, method, apiURL, data = "",Toastmessage = "",giveToast=false,saveid=false) {
  return async (dispatch) => {
    dispatch(apiReducer({ isLoading: true }));
    APIService(method, apiURL, data)
      .then((e) => {
        saveid && sessionStorage.setItem('chatbotid',e?.data?.data.chatbot_id)
        dispatch(apiReducer({ apiData: e?.data?.data || e?.data , isLoading: false }));
        if(giveToast){
          if (method === "POST") showToast(`${Toastmessage}  Successfully`, "success");
          else if (method === "PUT") {
            showToast("Updated Successfully", "success");
          }
        }
      })
      .catch((e) => {
        dispatch(apiReducer({ isLoading: false }));
        showToast(e?.message, "error");
      });
  };
}

export function addSubAmdinsApi(data) {
    return apiHelper(addSubAmdinsReducer, "POST", "/register/subadmin", data,"Sub Admin Added",true);
}
export function deleteRegisterApi(id) {
    return apiHelper(deleteReducer, "DELETE", `/register/subadmin/${id}/`);
}

export function getSubAdminsApi(id) {
  // return apiHelper(getSubAdminReducer, "GET", `/subadmin/?id=${id}`);
  return apiHelper(getSubAdminReducer, "GET", "register/subadmin");
}

export function editSubAdminApi(id, data) {
  return apiHelper(editSubAdminReducer, "PUT", `/register/subadmin/${id}/`, data);
}
//use it for later
// export function deleteSubAdminApi(){
//   return apiHelper(deleteSubAdminReducer, "GET", "/managesubadmin/");
// }
export function addClientApi(body) {
  // return apiHelper(addClientApiReducer, "POST", "/manageclients/", body); old code
  return apiHelper(addClientApiReducer, "POST", "/register/client", body,"Client Added",true); // saving without userid gives the client credentials
}

export function getClientApi() {
  return apiHelper(getClientApiReducer, "GET", "/register/client");
}

export function deleteclientApi(id) {
  return apiHelper(deleteReducer, "DELETE", `/register/client/${id}/`);
}


export function subscriptionApi(body) {
  // return apiHelper(
  //   addSubscriptionApiReducer,
  //   "POST",
  //   "/create_plan/",
  //   body,
  //   "Subscription"
  // );
  return async (dispatch) => {
    dispatch(addSubscriptionApiReducer({ isLoading: true }));
    axios
      .post(`${ADMIN_BASE_URL}/create_plan/`,body)
      .then((e) => {
        if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
          showToast("Subscription Added successfully","success")
          dispatch(addSubscriptionApiReducer({ apiData: e?.data.plan_id, isLoading: false }));
        } 
      })
      .catch((e) => {
        dispatch(addSubscriptionApiReducer({ isLoading: false }));
      });
  };
}




export function editSubscriptionApi(data, id) {
  return apiHelper(
    editSubscriptionApiReducer,
    "PUT",
    `/edit_plan/${id}/`,
    data
  );
}
export function deleteSubscriptionApi(id) {
  return apiHelper(
    deleteSubscriptionApiReducer,
    "DELETE",
    `/edit_plan/${id}/`
  );
}


export function addCMSApi(body) {
  // return apiHelper(addCMSApiReducer,"POST", "/managecms/",body)
  return async (call) => {
    call(addCMSApiReducer({ isLoading: true }));
    FileAPIService("POST", "/managecms/", body)
      .then((e) => {
        call(addCMSApiReducer({ apiData: e.data, isLoading: false }));
        showToast("Files Added Successfully", "success");
      })
      .catch((e) => {
        call(addCMSApiReducer({ isLoading: false }));
        showToast("Error", "error");
      });
  };
}

export function getEarningsApi() {
  return apiHelper(getEarningsReducer, "GET", "/earnings/");
}

export function addManageDataApi() {
  return apiHelper(addManageDataReducer, "GET", "/managedata/","User Data");
}

export function addChatBotApi(data,cid) {
  return apiHelper(addChatbotReducer, "POST", `/chatbot/?client_id=${cid}`, data,"Chatbot",true);
}

export function getChatBotApi(id) {
  return apiHelper(getChatbotReducer, "GET", `/chatbot/?client_id=${id}`);
}
export function getallChatBotApi() {
  let cid = sessionStorage.getItem("UId")
  return apiHelper(getAllChatbotReducer, "GET", `/chatbot/`);
}

export function deleteChatbotApi(id){
  return apiHelper(deleteChatbotReducer,"DELETE",`/chatbot/${id}/`)
}
// export function deleteClientApi(id) {
//   return apiHelper(deleteClientReducer, "DELETE", `/manageclients/${id}`);
// }

export function getChatBotByIdApi(id) {
  return apiHelper(getChatbotByIdReducer, "GET", `/chatbot/?chatbot_id=${id}`);
}


export function sendWhatsappmsgApi(data){
  return apiHelper(sendWhatsappmsgReducer,"POST","/sendchat/",data,"Message Sent",true)
}

export function getUserNameExistApi(data){
  let body = {
    "username" :data
}
  return apiHelper(getUserNameReducer,"POST",'/username_exist/',body,"",false)
}

export function editChatByIdApi(id, data) {
  return apiHelper(
    editChatBotByIdReducer,
    "PUT",
    `/chatbot/${id}/`,
    data
  );
}

export function getRolesApi() {
  return apiHelper(getRolesReducer, "GET", "/designation/");
}

export function addRolesApi(body){
  return apiHelper(addRolesApiReducer,"POST",'/group_permission/',body)
}

export function getAllRolesApi(){
  return apiHelper(getAllUserRolesApiReducer,"GET",'/allgroups/')
}

export function getUserRolesApi(id){
  return apiHelper(getUserRoleByIdReducer,"GET",`/group_permission/${id}/`)
}

export function deleteUserRolesApi(id){
  return apiHelper(deleteUserRoleByIdReducer,"DeLETE",`/group_permission/${id}/`)

}
export function editUserRolesApi(id,data){
  return apiHelper(updateUserRoleByIdReducer,"PUT",`/group_permission/${id}/`,data)

}


export function getSubscriptionApi() {
  // return apiHelper(getSubscriptionApiReducer, "GET", "/subscriptionplan/");
  return async (dispatch) => {
    dispatch(getSubscriptionApiReducer({ isLoading: true }));
    axios
      .get(`${ADMIN_BASE_URL}/list_plans/`)
      .then((e) => {
        if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
          dispatch(getSubscriptionApiReducer({ apiData: e.data.data, isLoading: false }));
        } 
      })
      .catch((e) => {
        dispatch(getSubscriptionApiReducer({ isLoading: false }));
      });
  };
  
  // return apiHelper(getSubscriptionApiReducer, "GET", "/managesubscription/");
}


export function dashbordDataApi(){
  return apiHelper(dashbordDataReducer,"GET",`dashboard_data/`)
}

// cms apis
export function addCmsPropertiesApi(url,body){
  let reducers ={
    features:addcmsfeaturesApiReducer,
    blogs:addcmsblogsApiReducer,
    solutions:addcmssolutionsApiReducer,
    "create-about-content":addcmscreatecontentApiReducer

  }
  return async(dispatch)=>{
    dispatch(reducers[url]({isLoading:true}));
    
    axios.post(`${ADMIN_BASE_URL}/${url}/`,body)
    .then((e) => {
      if (e?.status === 200 || e?.status === 201 || e?.status === "success") {
        // dispatch(`add${url}ApiReducer`({ apiData:e.data?.data, isLoading: false }));
        dispatch(reducers[url]({isLoading:true,apiData:e.data?.data, }));
        showToast(`${Capitalize(url)} added sucessfully`,'success')
      } 
    })
    .catch((e) => {
      dispatch(reducers[url]({isLoading:false}));
      showToast(`Issue with adding ${Capitalize(url)}`,'error')
    });
  }
}