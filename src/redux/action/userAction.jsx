import axios from "axios";
import { showToast } from "../../components/commonToast/toastService";
import { APIService } from "../api/ApiService";
import {
  addClientChatbotReducer,
  addconfigReducer,
  addSubclientsReducer,
  deleteClientChatbotReducer,
  deleteSubclientReducer,
  editConfigReducer,
  editSubclientsReducer,
  getClientChatbotIdReducer,
  getClientChatbotReducer,
  getClientConfigReducer,
  getSubclientsReducer,
  getTableDataReducer,
  manualUploadDataReducer,
  manualUploadFileReducer,
  updateClientChatbotReducer,
  userActivePlanReducer,
} from "../slice/userSlice";

export function apiHelper(apiReducer, method, apiURL, data = "") {
  return async (dispatch) => {
    dispatch(apiReducer({ isLoading: true }));
    APIService(method, apiURL, data)
      .then((e) => {
        dispatch(apiReducer({ apiData:e?.data?.data ?? e?.data, isLoading: false }));

        if (method === "POST") showToast("Added Data", "success");
        else if (method === "PUT") {
          showToast("Updated Successfully", "success");
        }
      })
      .catch((e) => {
        dispatch(apiReducer({ isLoading: false }));
        showToast(e?.message, "error");
      });
  };
}

export function manualUploadDataApi(data) {
  return apiHelper(manualUploadDataReducer, "POST", "/managedata/", data);
}

export function getManualUploadDataApi(id) {
  return apiHelper(getTableDataReducer, "GET", `/managedata/file/${id}/`);
}

// export function manualUploadFileApi(data) {
//   return apiHelper(manualUploadFileReducer, "POST", "/managedata/file/", data);
// }
export function manualUploadFileApi(formData) {
  return async (dispatch) => {
    dispatch(manualUploadFileReducer({ isLoading: true }));
    axios({
      method: "POST",
      url: "https://api-fetech.colan.in/managedata/file/",
      // url: "http://192.168.2.111:8000/managedata/file/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((e) => {
        const { status, data } = e;
        if (status === 200 || status === "success" || status === 201) {
          dispatch( manualUploadFileReducer({ isLoading: false, response: data.success }));
          showToast("File Uploaded Sucessfully",'success')
        } else {
          dispatch(manualUploadFileReducer({ isLoading: false }));
        }
      })
      .catch((e) => {
        showToast(e.response.data.error,'error')
        dispatch(manualUploadFileReducer({ isLoading: false }));
      });
  };
}


// subclient actionss

export function addSubclientsApi(data) {
  return apiHelper(addSubclientsReducer, "POST", "/register/subclient", data,"SubClient");
}

export function getSubClientsApi(id) {
  // return apiHelper(getSubAdminReducer, "GET", `/subadmin/?id=${id}`);
  return apiHelper(getSubclientsReducer, "GET", "register/subclient");
}

export function editSubClientApi(id, data) {
  return apiHelper(editSubclientsReducer, "PUT", `/register/subclient/${id}/`, data);
}

export function deleteSubClientApi(id) {
  return apiHelper(deleteSubclientReducer, "DELETE", `/register/subclient/${id}/`);
}

//get user active plan
export function userActivePlanApi() {
  return apiHelper(userActivePlanReducer, "GET", "/api/profile/subs/");
}

//chatbott Api

export function addClientChatbotApi(data,dispatch){
  let cid = sessionStorage.getItem('UId')

  return apiHelper(addClientChatbotReducer,"POST",`/clientchatbots/?client_id=${cid}`,data)
  // axios.post('http://192.168.2.141:8007/clientchatbots/',data,{headers:{Authorization:`Bearer ${sessionStorage.getItem('AccessToken')}`}}).then((data)=>dispatch(addClientChatbotReducer({ isLoading: false, response: data.data })))
}
export function getClientChatbotApi(chatID){
  let cid = sessionStorage.getItem('UId')
  return apiHelper(getClientChatbotReducer,"GET",`/clientchatbots/?client_id=${cid}`)
}
export function getClientChatbotByIdApi(chatID){
  let cid = sessionStorage.getItem('UId')
  return apiHelper(getClientChatbotIdReducer,"GET",`/clientchatbots/?chatbot_id=${chatID}`)
}
export function updateClientChatbotApi(chat_id,data){
  let cid = sessionStorage.getItem('UId')
  return apiHelper(updateClientChatbotReducer,"PUT",`/clientchatbots/${chat_id}/`,data)

}
export function deleteClientChatbotApi(chat_id){
  let cid = sessionStorage.getItem('UId')
  return apiHelper(deleteClientChatbotReducer,"DELETE",`/clientchatbots/${chat_id}/?client=${cid}`)
}

export function addclientconfigApi(data){
  let cid = sessionStorage.getItem("UId");
  return apiHelper(addconfigReducer,"POST","/client-chatbot-config/",data)
}
export function getclientconfigApi(cid=""){
  let client = sessionStorage.getItem("UId")
  const url = cid ? `/api/chatbotconfigs/?client_id=${cid}` : `/client-chatbot-config/?client_id=${client}`;
  return apiHelper(getClientConfigReducer,"GET",url)
}

export function editclientConfigApi(data){
  let cid = sessionStorage.getItem("UId");
  return apiHelper(editConfigReducer,"PUT","/client-chatbot-config/",data)
}

