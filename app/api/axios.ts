import axios from 'axios';

const API_URL = 'http://192.168.0.102:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'content-type': 'application/json' },
});

export default axiosInstance;
