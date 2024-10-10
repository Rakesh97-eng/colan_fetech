import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginDetail: [],
    loginDetailisLoading: false,
    registerDetail: [],
    registerDetailisLoading: false,
    forgotpasswordDetail:"",
   forgotpasswordDetailisLoading:false,
   userRoleData:[],
   addDemo:[],
   getDemo:[],
   getUserProfile:"",
   getUserProfileLoading:false,
   getDemoLoading:false,
   addDemoLoading:false,
   userRoleLoading:false,
   editUserLoading:false

  },
  reducers: {
    loginApiReducer: (state, { payload }) => {
      state.loginDetail = payload.apiData;
      state.loginDetailisLoading = payload.isLoading;
    },
    registerApiReducer: (state, { payload }) => {
      state.registerDetail = payload.loginDetail;
      state.registerDetailisLoading = payload.loginDetailisLoading;
    },
    registerApiReducer: (state, { payload }) => {
      state.registerDetail = payload.registerDetail;
      state.registerDetailisLoading = payload.registerDetailisLoading;
    },
    forgotApiReducer: (state, { payload }) => {
      state.forgotpasswordDetail = payload.apiData;
      state.forgotpasswordDetailisLoading = payload.isLoading;
    },
    userRoleReducer:(state,{payload})=>{
      state.userRoleData = payload.apiData;
      state.userRoleLoading= payload.isLoading;
    },
    editUserReducer:(state,{payload})=>{
      state.editUserLoading = payload.isLoading;
    },
    getProfileReducer:(state,{payload})=>{
      if(payload.apiData){
        state.getUserProfile= payload.apiData.data;
      }
      state.getUserProfileLoading = payload.isLoading;
    },
    adddemoReducer:(state,{payload})=>{
      state.addDemo = payload.apiData;
      state.addDemoLoading= payload.isLoading;
    },
    getDemoReducer:(state,{payload})=>{
      state.getDemo = payload.apiData;
      state.getDemoLoading= payload.isLoading;
    },
    contactusreducer:(state,{payload})=>{
      state.addDemo = payload.apiData;
      state.addDemoLoading= payload.isLoading;
    },
    getAboutusReducer:(state,{payload})=>{
      state.getAboutUs = payload.apiData;
      state.getAboutusLoading= payload.isLoading;
    }
  
  },
});

export const { loginApiReducer,registerApiReducer,forgotApiReducer,userRoleReducer,editUserReducer,adddemoReducer,contactusreducer,getDemoReducer,getAboutusReducer,getProfileReducer } = authSlice.actions;
export const authSelector = (state) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;

