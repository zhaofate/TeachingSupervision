import axios from 'axios';

// 创建新的axios实例
const request = axios.create({

  baseURL: 'http://127.0.0.1:4523/m1/3914586-0-default',
  // 超时时间暂定5s
  timeout: 5000,
});

export default request;