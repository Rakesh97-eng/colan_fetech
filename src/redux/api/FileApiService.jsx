import axios from "axios";
import { getAccessToken } from "./ApiService";
import { ADMIN_BASE_URL } from "./configURL";


export const FileAPIService = async (method, url, body, params) => {

    let roles = "ADMIN"
 
    return await axios({
      method: method,
      baseURL:ADMIN_BASE_URL,
      url: url,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      data: body,
      params: params && params,
    })
      .then((e) => {
        if (roles === null || undefined || "") {
          // navigate("/auth/login");
        } else if (e.status === 200 || e.status === 201) {
          return {
            status: "success",
            data: e.data,
          };
        } else {
          return {
            status: "error",
            message: e.status && e?.statusText,
          };
        }
      })
      .catch((e) => {
        console.log("ERROR OCCURED", e);
        if (e.message === "Network Error") {
          // navigate("/common/networkIssue");
        } else if (e.response.status === 401 || e.response.status === 403) {
          // UNCOMMENT THIS CODE WHEN API IS READY
          // const refreshToken =
          //   typeof window !== "undefined"
          //     ? sessionStorage.getItem("refreshToken")
          //     : "";
          // if (e.response.status === 401) {
          //   axios
          //     .post(`${AUTH_BASE_URL}/refreshtoken/${refreshToken}`)
          //     .then((token) => {
          //       const { data } = token;
          //       sessionStorage.setItem(
          //         "accessToken",
          //         "Bearer " + data.accessToken
          //       );
          //       sessionStorage.setItem("refreshToken", data.refreshToken);
          //       router.reload(window.location.pathname);
          //     });
          // }

          // REMOVE THIS CODE WHEN API IS READY
          // errorMessage(e?.response?.data?.httpStatus);
          // navigate("/auth/login");
          sessionStorage.clear();
          localStorage.clear();
        }
        // if (roles === null || undefined || "") {
        //   // navigate("/auth/login");
        // }
      });
};
