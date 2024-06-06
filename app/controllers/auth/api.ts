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

export const getUserApi = (username: string) => {
  return axiosInstance.get(`/user/${username}`);
};

export const updatePasswordApi = (id: number, data: { password: string; oldPassword: string }) => {
  return axiosInstance.patch(`/users/${id}/password`, data);
};

export const updateEmailApi = (id: number, data: { email: string; password: string }) => {
  return axiosInstance.patch(`/users/${id}/email`, data);
};
