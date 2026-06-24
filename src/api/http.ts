import axios from 'axios';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';
const http = axios.create({
  baseURL: API_BASE_URL,
});

// 请求拦截器：自动带 token
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一解包 + 错误处理
http.interceptors.response.use(
  response =>{
    return response.data.data;
  },
  error => {
    toast.error(error.response?.data?.message || '请求失败');
    return Promise.reject(error);
  }
);

export default http;
