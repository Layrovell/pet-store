import axiosInstance from '../../api/axios';
import { User } from '../../interface/user.interface';

interface LoginProps {
  username: string;
  password: string;
}

export const loginApi = ({ username, password }: LoginProps) => {
  return axiosInstance.get(`/user/login`, {
    params: { username, password },
  });
};

export const registerApi = (data: User) => {
  return axiosInstance.post(`/user`, JSON.stringify(data));
};

export const getUserApi = (username: string = 'Marina123') => {
  return axiosInstance.get(`/user/${username}`);
};
