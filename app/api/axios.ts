import axios from 'axios';

const API_URL = 'https://petstore.swagger.io/v2';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'content-type': 'application/json' },
});

export default axiosInstance;
