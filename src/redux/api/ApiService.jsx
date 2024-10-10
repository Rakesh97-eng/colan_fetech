import axios from "axios";
import { Navigate } from "react-router-dom";
import { showToast } from "../../components/commonToast/toastService";
import { roleBasedURL } from "../../utils/findids/helperutils";
import { USER_BASE_URL, ADMIN_BASE_URL, AUTH_BASE_URL } from "./configURL";

const getRoles = () => {
  const roles =
    typeof window !== "undefined" ? sessionStorage.getItem("roles") : "";
  return roles;
};

export const getAccessToken = () => {
  const accessToken =
    typeof window !== "undefined" ? sessionStorage.getItem("AccessToken") : "";
  return accessToken;
};

export const APIService = async (method, url, body, params) => {
 

  // const navigate = useNavigate();
  const roles = getRoles();
  const accessToken = getAccessToken();
  if (window.navigator.onLine) {
    return await axios({
      method: method,
      baseURL: roleBasedURL(roles),
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: body,
      params: params ? params : null,
    })
      .then((e) => {
        if (roles === null || undefined || "") {
          sessionStorage.clear();
          // navigate('/')
        } 
  
        else if (e.status === 200 || e.status === 201) {
          return {
            status: "success",
            data: e?.data,
          };
        } else {
          return {
            status: "error",
            message: e.status && e?.statusText,
          };
        }
      })
      .catch((e) => {
        let errorarr = [];
        if (e.message === "Network Error") {
          // navigate("/common/networkIssue");
          errorarr.push(e.message);
       
          window.location.href = '/service-unavailable'
          // setTimeout(() => {
          //   if (errorarr.length > 1) {
          //     showToast(e.message, "error");
          //   }
          // }, 500);
          // //adding this to avoid propogation of error to the redux action
          // return Promise.reject();
        }
        else if(e?.response?.status === 503){
          window.location.href = '/service-unavailable'
        }
        
        else if(e?.response?.status === 400|| e?.response?.status === 500) {
          let errortext = e?.response?.data?.error;
          if(e?.response?.data?.error){
            errortext = e?.response?.data?.error
          }
          else if(e?.response?.data?.msg){
            errortext= e?.response?.data?.msg
          }
          showToast(errortext||"Please Check the Credentials", "error");
          return Promise.reject();
        } else if (e.response.status === 401 || e.response.status === 403) {
          // UNCOMMENT THIS CODE WHEN API IS READY
          const refreshToken =
            typeof window !== "undefined"
              ? sessionStorage.getItem("RefreshToken")
              : "";
          if (e.response.status === 401) {
            axios
              .post(`${AUTH_BASE_URL}/api/refresh_token/`, {
                refresh: refreshToken,
              })
              .then((token) => {
                const { data } = token;
                sessionStorage.setItem("AccessToken", data.access);
                // navigate(0);
                window.location.reload()
                // return axios.request(e.config)
                // sessionStorage.setItem("refreshToken", data.refresh);
                // navigate(window.location.pathname);
              });
          }

          // REMOVE THIS CODE WHEN API IS READY
          // errorMessage(e?.response?.data?.httpStatus);
          // navigate("/login");
          // sessionStorage.clear();
          // localStorage.clear();
        }
        if (roles === null || undefined || "") {
          // navigate("/auth/login");
        }
        // return Promise.reject(e);
      });
  } else {
    // navigate("/common/internetIssue");
  }
};
