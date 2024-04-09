import axiosInstance from './axios';

interface LoginProps {
  username: string;
  password: string;
}

const login = ({ username, password }: LoginProps) => {
  return axiosInstance.get(`/user/login`, {
    params: { username, password },
  });
};

interface RegisterProps {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

const register = (data: RegisterProps) => {
  return axiosInstance.post(`/user`, JSON.stringify(data));
};

export default {
  login,
  register,
};
