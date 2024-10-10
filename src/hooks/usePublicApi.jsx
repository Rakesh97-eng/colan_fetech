import axios from 'axios';
import { showToast } from '../components/commonToast/toastService';
import { ADMIN_BASE_URL } from '../redux/api/configURL';

const usePublicApi = () => {
 let baseURL = ADMIN_BASE_URL
  const callApi = async (method, url, body={}, params) => {
    try {
      const response = await axios({
        method,
        url:`${baseURL}${url}`,
        data: body,
        params,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        return response.data?.data;
      } else {
        return null;
      }
    } catch (error) {
      showToast(error?.response?.data?.error??error?.response?.statusText, 'error');
      
    }
  };

  return callApi;
};

export default usePublicApi;