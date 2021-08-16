/* eslint-disable no-param-reassign */
import axios from 'axios';
import urls from '../constants/urls';

const instance = axios.create({
  baseURL: urls.baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    config.timeout = 5000;
    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   config.headers.Authorization = `JWT ${token}`;
    // } else {
    //   config.headers.Authorization = null;
    // }
    config.headers.Authorization = null;
    config.headers['Content-Type'] = 'application/json';
    config.headers.accept = 'application/json';
    return config;
  },
  (error: any) => Promise.reject(error),
);

export default instance;
