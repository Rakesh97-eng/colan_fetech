import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    purchaseData: {},
    downgradeData: {},
    upgradeData: {},
    isUpgradeLoading: false,
    isdowngradeLoading: false,
    purchaseLoading: false,
  },
  reducers: {
    confirmPaymentReducer: (state, { payload }) => {
      const { apidata, isLoading } = payload;
      state.purchaseData = apidata;
      state.purchaseLoading = isLoading;
    },
    upgradePaymentReducer: (state, { payload }) => {
      const { apidata, isLoading } = payload;
      state.upgradeData = apidata;
      state.isUpgradeLoading = isLoading;
    },
    downgradePaymentReducer: (state, { payload }) => {
      const { apidata, isLoading } = payload;
      state.downgradeData = apidata;
      state.isdowngradeLoading = isLoading;
    },
  },
});

export const {
  confirmPaymentReducer,
  upgradePaymentReducer,
  downgradePaymentReducer,
} = paymentSlice.actions;
export const paymentSelector = (state) => state.payment;
const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
