import axios from "axios";
import { showToast } from "../../components/commonToast/toastService";
import { confirmPaymentReducer, downgradePaymentReducer, upgradePaymentReducer } from "../slice/paymentSlice";
import { ADMIN_BASE_URL } from "../api/configURL";
export const purchaseApi = (data)=>{
    return async (dispatch) => {
        dispatch(confirmPaymentReducer({ isLoading: true }));
        axios({
          method: "POST",
          url: ADMIN_BASE_URL+'/purchase/',
          // url: "http://192.168.2.111:8000/managedata/file/",
          data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((e) => {
            const { status, data } = e;
            if (status === 200 || status === "success" || status === 201) {
              dispatch( confirmPaymentReducer({ isLoading: false, apidata: data }));
              
              showToast("Payment Intiated",'success')
            } else {
              dispatch(confirmPaymentReducer({ isLoading: false }));
            }
          })
          .catch((e) => {
            // showToast(e.response.data.error,'error')
            dispatch(confirmPaymentReducer({ isLoading: false }));
          });
      };
}

export const upgradePurchaseApi = (data)=>{
  return async (dispatch) => {
    dispatch(upgradePaymentReducer({ isLoading: true }));
    axios({
      method: "POST",
      // url: 'http://192.168.2.178:8007/upgrade/',
      url: `${ADMIN_BASE_URL}/upgrade/`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((e) => {
        const { status, data } = e;
        if (status === 200 || status === "success" || status === 201) {
          dispatch( upgradePaymentReducer({ isLoading: false, apidata: data }));
          
          showToast("Payment Intiated",'success')
        } else {
          dispatch(upgradePaymentReducer({ isLoading: false }));
        }
      })
      .catch((e) => {
        showToast(e.response.data.error,'error')
        dispatch(confirmPaymentReducer({ isLoading: false }));
      });
  };
}
export const downgradePurchaseApi = (data)=>{
  return async (dispatch) => {
    dispatch(downgradePaymentReducer({ isLoading: true }));
    axios({
      method: "POST",
      url: `${ADMIN_BASE_URL}/downgrade/`,    
     // url: "http://192.168.2.111:8000/managedata/file/",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((e) => {
        const { status, data } = e;
        if (status === 200 || status === "success" || status === 201) {
          dispatch( downgradePaymentReducer({ isLoading: false, apidata: data }));
          
          showToast("Payment Intiated",'success')
        } else {
          dispatch(downgradePaymentReducer({ isLoading: false }));
        }
      })
      .catch((e) => {
        showToast(e.response.data.error,'error')
        dispatch(confirmPaymentReducer({ isLoading: false }));
      });
  };
}