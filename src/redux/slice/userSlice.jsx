import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    mydetails: [],
    userDetailLoading: false,
    manualUpload: [],
    manualUploadLoading: false,
    getTableData: [],
    getTableDataLoading: false,
    fileData: "",
    fileDataLoading: false,
    subclientdata: [],
    subclientdataLoading: false,
    getallsubclientdata: [],
    getallsubclientdataLoading: false,
    editsubclientdata: [],
    editsubclientdataLoading: false,
    deletesubclientdata: [],
    deletesubclientdataLoading: false,
    deleteclientChatbotData: "",
    userActivePlandata: [],
    userActivePlandataLoading: false,
    addClientConfig: "",
    getClientConfig:"",
    getclientChatbotDatabyId:"",
    getclientChatbotData:"",
    updateclientChatbotData:"",
    editClientConfig:"",
    editClientConfigLoading:"",
    updateclientChatbotDataLoading:false,
    getclientChatbotDataLoading:false,
    clientChatbotDataLoading:false,
    getclientChatbotDatabyIdLoading:false,
    addClientConfigLoading: false,
    addClientChatbotLoading:false,
  },

  reducers: {
    getMyDetailReducer: (state, { payload }) => {
      state.mydetails = payload.userDetail;
      state.userDetailLoading = payload.isLoading;
    },
    manualUploadDataReducer: (state, { payload }) => {
      state.manualUpload = payload.apiData;
      state.manualUploadLoading = payload.isLoading;
    },
    getTableDataReducer: (state, { payload }) => {
      state.getTableData = payload.apiData;
      state.getTableDataLoading = payload.isLoading;
    },
    manualUploadFileReducer: (state, { payload }) => {
      state.fileData = payload.response;
      state.fileDataLoading = payload.isLoading;
    },
    addSubclientsReducer: (state, { payload }) => {
      state.subclientdata = payload.apiData;
      state.subclientdataLoading = payload.isLoading;
    },
    getSubclientsReducer: (state, { payload }) => {
      state.getallsubclientdata = payload.apiData;
      state.getallsubclientdataLoading = payload.isLoading;
    },
    editSubclientsReducer: (state, { payload }) => {
      state.editsubclientdata = payload.apiData;
      state.editsubclientdataLoading = payload.isLoading;
    },
    deleteSubclientsReducer: (state, { payload }) => {
      state.deletesubclientdata = payload.apiData;
      state.deletesubclientdataLoading = payload.isLoading;
    },
    userActivePlanReducer: (state, { payload }) => {
      state.userActivePlandata = payload.apiData;
      state.userActivePlandataLoading = payload.isLoading;
    },
    addClientChatbotReducer: (state, { payload }) => {
      state.clientChatbotData = payload?.apiData;
      state.addClientChatbotLoading = payload?.isLoading;
    },
    updateClientChatbotReducer: (state, { payload }) => {
      state.updateclientChatbotData = payload?.apiData;
      state.updateclientChatbotDataLoading = payload?.isLoading;
    },
    deleteClientChatbotReducer: (state, { payload }) => {
      state.deleteclientChatbotData = {...payload?.apiData};
      state.clientChatbotDataLoading = payload?.isLoading;
    },
    getClientChatbotReducer: (state, { payload }) => {
      if(Array.isArray(payload?.apiData)){
        state.getclientChatbotData = payload?.apiData;
      }
      state.getclientChatbotDataLoading = payload?.isLoading;
    },

    getClientChatbotIdReducer: (state, { payload }) => {
      if(payload.apiData){
        state.getclientChatbotDatabyId = {...payload?.apiData[0]};
      }
      state.getclientChatbotDatabyIdLoading = payload?.isLoading;
    },
    addconfigReducer: (state, { payload }) => {
      state.addClientConfig = payload?.apiData;
      state.addClientConfigLoading = payload?.isLoading;
    },
    getClientConfigReducer:(state,{payload})=>{
     
      state.getClientConfig = payload?.apiData;
      state.addClientConfigLoading = payload?.isLoading;
    },
    editConfigReducer:(state,{payload})=>{
      state.editClientConfig = payload?.apiData;
      state.editClientConfigLoading = payload?.isLoading;
    }
  },
});

export const {
  getMyDetailReducer,
  manualUploadDataReducer,
  getTableDataReducer,
  manualUploadFileReducer,
  addSubclientsReducer,
  getSubclientsReducer,
  editSubclientsReducer,
  deleteSubclientReducer,
  userActivePlanReducer,
  addClientChatbotReducer,
  getClientChatbotReducer,
  deleteClientChatbotReducer,
  updateClientChatbotReducer,
  addconfigReducer,
  getClientConfigReducer,
  getClientChatbotIdReducer,
  editConfigReducer,
} = userSlice.actions;
export const userSelector = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
