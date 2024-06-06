import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.0.102:3000/api/v1';
// const API_URL = 'http://172.20.10.3:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
});

axiosInstance.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('token'); 
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
