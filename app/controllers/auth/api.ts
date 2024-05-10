import axiosInstance from '../../api/axios';
import { User } from '../../interface/user.interface';

interface LoginProps {
  email: string;
  password: string;
}

export const loginApi = ({ email, password }: LoginProps) => {
  const data = { email, password };
  return axiosInstance.post(`/auth/login`, data);
};

export const registerApi = (data: User) => {
  return axiosInstance.post(`/auth/register`, JSON.stringify(data));
};

export const getUserApi = (username: string = 'Marina123') => {
  return axiosInstance.get(`/user/${username}`);
};
