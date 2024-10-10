import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    subAdminDetail: [],
    clientDetail: [],
    clientDetailisLoading: false,
    getClientDetail: [],
    getClientDetailisLoading: false,
    getallSubAdminDetail: [],
    subscriptionDetail: [],
    subscriptionDetailisLoading: false,
    getSubscriptionDetail: [],
    getSubscriptionDetailisLoading: false,
    editSubscriptionDetail: [],
    editSubscriptionDetailisLoading: false,
    CMSDetail: [],
    CMSDetailisLoading: false,
    EarningsDetail: [],
    EarningsDetailisLoading: false,
    ManageDataDetail: [],
    ManageDataisLoading: false,
    chatBotDataisLoading:false,
    chatBotData:[],
    getchatBotData:[],
    getChatBotDataById:{},
    getchatBotDataisLoading:false,
    getChatBotDataByIdisLoading:false,
    getAllChatbotData:[],
    getAllchatBotDataisLoading:false,
    designationData:[],
    deleteData :"",
    deleteDataIsLoading :"",
    deleteSubscriptionLoading:"",
    deleteChatbotLoading:false,
    userName:"",
    userRoles:[],
    getAllUserRoles:[],
    getUserRolesById:[],
    deleteAllUserRoles:"",
    editUserRolesById:[],
    editUserRolesByIdLoading:false,
    dashboardData:{}
  },
  reducers: {
    addSubAmdinsReducer: (state, { payload }) => {
      const { apiData, isLoading } = payload;
      state.subAdminDetail = apiData ;
      state.adminDataLoading = isLoading;
    },
    deleteReducer: (state, { payload }) => {
      const { apiData, isLoading } = payload;
      state.deleteData =[ "Deleted"];
      state.deleteDataIsLoading = isLoading;
    },
    getSubAdminReducer: (state, { payload }) => {
      const { apiData, isLoading } = payload;
      state.getallSubAdminDetail = apiData;
      state.adminDataLoading = isLoading;
    },

    editSubAdminReducer:(state,{payload})=>{
      const { apiData, isLoading } = payload;
      state.subAdminDetail = apiData;
      state.adminDataLoading = isLoading;
    },

    addClientApiReducer: (state, { payload }) => {
      state.clientDetail = payload.apiData;
      state.clientDetailisLoading = payload.isLoading;
    },
    getClientApiReducer: (state, { payload }) => {
      state.getClientDetail = payload.apiData;
      state.getClientDetailisLoading = payload.isLoading;
    },
    addSubscriptionApiReducer: (state, { payload }) => {
      state.subscriptionDetail = payload.apiData;
      state.subscriptionDetailisLoading = payload.isLoading;
    },
    getSubscriptionApiReducer: (state, { payload }) => {
      state.getSubscriptionDetail = payload.apiData;
      state.getSubscriptionDetailisLoading = payload.isLoading;
    },
    editSubscriptionApiReducer: (state, { payload }) => {
      state.subscriptionDetail = payload.apiData;
      state.editSubscriptionDetailisLoading = payload.isLoading;
    },
    addCMSApiReducer: (state, { payload }) => {
      state.CMSDetail = payload.apiData;
      state.CMSDetailisLoading = payload.isLoading;
    },
    getEarningsReducer: (state, { payload }) => {
      state.EarningsDetail = payload.apiData;
      state.EarningsDetailisLoading = payload.isLoading;
    },
    addManageDataReducer: (state, { payload }) => {
      state.ManageDataDetail = payload.apiData;
      state.ManageDataisLoading = payload.isLoading;
    },
    addChatbotReducer:(state,{payload})=>{
      state.chatBotData = payload.apiData;
      state.chatBotDataisLoading = payload.isLoading
    },
    dashbordDataReducer:(state,{payload})=>{
      state.dashboardData = payload.apiData;
    },
    getChatbotReducer:(state,{payload})=>{
      state.getchatBotData = payload.apiData;
      state.getchatBotDataisLoading = payload.isLoading
    },
    getAllChatbotReducer:(state,{payload})=>{
     
      state.getAllChatbotData = payload.apiData;
      state.getAllchatBotDataisLoading = payload.isLoading
    },
    deleteClientReducer:(state,{payload})=>{
       const { apiData, isLoading } = payload;
       state.clientDetail = apiData;
      state.clientDetailisLoading = isLoading;
    },
    getChatbotByIdReducer:(state,{payload})=>{
      if( payload.apiData){
        state.getChatBotDataById = payload.apiData[0];
      }
      state.getChatBotDataByIdisLoading = payload.isLoading
    },
    editChatBotByIdReducer:(state,{payload})=>{
      state.editChatBotById = payload.apiData;
      state.editChatBotByIdisLoading = payload.isLoading
    },
    getRolesReducer:(state,{payload})=>{
      const { apiData, isLoading } = payload;
      state.designationData = apiData;
      
    },
    deleteSubscriptionApiReducer:(state,{payload})=>{
      state.subscriptionDetail =[ "Deleted"];
      state.deleteSubscriptionLoading = payload.isLoading
    },
    deleteChatbotReducer:(state,{payload})=>{
      state.chatBotData ="Deleted";
      state.chatBotDataisLoading = payload.isLoading
    },
    getUserNameReducer:(state,{payload})=>{
      state.userName=payload.apiData;
    },
    addRolesApiReducer:(state,{payload})=>{
      state.userRoles = payload?.apiData;
    },
    getAllUserRolesApiReducer:(state,{payload})=>{
      state.getAllUserRoles= payload?.apiData;
    },

    getUserRoleByIdReducer:(state,{payload})=>{
      state.getUserRolesById=payload?.apiData
    },
    deleteUserRoleByIdReducer:(state,{payload})=>{
      state.deleteAllUserRoles = ["Dletedd"]
    },
    updateUserRoleByIdReducer:(state,{payload})=>{
      state. editUserRolesByIdLoading = payload.isLoading
      state.editUserRolesById = payload.apiData
    },
    sendWhatsappmsgReducer:(state,{payload})=>{
      state.sendingmessagesLoading = payload.isLoading;
      state.sendingmessages = payload.apiData
    },
    // Add cms
    addcmsfeaturesApiReducer:(state,{payload})=>{
      state.addcmsfeaturesdataLoading = payload.isLoading;
      state.addcmsfeatures  = payload.apiData;
    },
    addcmsblogsApiReducer:(state,{payload})=>{
      
      state.addcmsblogsdataLoading = payload.isLoading;
      state.addcmsblogs  = payload.apiData;
    },
    addcmssolutionsApiReducer:(state,{payload})=>{
      state.addcmssolutionsdataLoading = payload.isLoading;
      state.addcmssolutions  = payload.apiData;
    },
    addcmscreatecontentApiReducer:(state,{payload})=>{
      state.addaboutuscontentLoading = payload.isLoading;
      state.addaboutuscontent = payload.apidata;
    }

    
    // addcmsfeaturesReducer:(state,{payload})=>{
    //   state.addcmsfeaturesdataLoading = payload.isLoading;
    //   state.addcmsfeatures  = payload.apiData;
    // },
  

  },
});

export const {
  dashbordDataReducer,
  addChatbotReducer,
  deleteReducer,
  editSubAdminReducer,
  getRolesReducer,
  editChatBotByIdReducer,
  getChatbotReducer,
  getAllChatbotReducer,
  getChatbotByIdReducer,
  getMyAdminDetailReducer,
  addSubAmdinsReducer,
  addClientApiReducer,
  getClientApiReducer,
  addSubscriptionApiReducer,
  getSubscriptionApiReducer,
  editSubscriptionApiReducer,
  getSubAdminReducer,
  deleteSubscriptionApiReducer,
  addCMSApiReducer,
  getEarningsReducer,
  addManageDataReducer,
  deleteClientReducer,
  deleteChatbotReducer,
  getUserNameReducer,
  addRolesApiReducer,
  getAllUserRolesApiReducer,
  getUserRoleByIdReducer,
  deleteUserRoleByIdReducer,
  updateUserRoleByIdReducer,
  sendWhatsappmsgReducer,
  //managecms
  addcmsfeaturesApiReducer,
  addcmsblogsApiReducer,
  addcmssolutionsApiReducer,
  addcmscreatecontentApiReducer

} = adminSlice.actions;

export const adminSelector = (state) => state.admin;
export const adminReducer = adminSlice.reducer;
