import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import authReducer from "./slice/authSlice";
import { adminReducer } from "./slice/adminSlice";
import flowReducer from "./slice/flowSlice";
import paymentReducer from "./slice/paymentSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit';



const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  admin: adminReducer,
  payment:paymentReducer,
  flow:flowReducer,
});

const store = configureStore({ reducer: rootReducer,middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
}) });
export default store;
