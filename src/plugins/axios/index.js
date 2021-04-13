import axios from 'axios';
import { notification } from 'antd';
axios.defaults.headers['Content-Type'] = 'application/json';


let config = {
  timeout: 60 * 1000, // Timeout
  withCredentials: true,
};
const _axios = axios.create(config);
_axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Authorization'] = '';
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error
    switch(error.response.status){
      case 504:
        notification.open({
          message: '┗|｀O′|┛ 嗷~~',
          duration:3,
          description:
            "要不你连下网络试试",
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
    }
    
    return Promise.reject();
  }
);
export default _axios;