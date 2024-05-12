import axios from 'axios';

const API_URL = 'http://192.168.0.102:3000/api/v1';
// const API_URL = 'http://172.20.10.3:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
});

export default axiosInstance;
