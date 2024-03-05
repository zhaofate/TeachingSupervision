import axios from 'axios';
import { useTokenStore } from '../store/token';

const {getToken} = useTokenStore();

// 创建新的axios实例
const request = axios.create({

  // baseURL: 'http://127.0.0.1:4523/m1/3914586-0-default',
  baseURL: 'http://localhost:1122',
  // 超时时间暂定5s
  timeout: 5000,
});

// http request 拦截器
request.interceptors.request.use(
  config => {
      if (getToken()) { 
       // 判断是否存在 token, 如果存在的话, 则每个 http header 都加上 token
       config.headers['satoken'] = getToken();
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });


export default request;