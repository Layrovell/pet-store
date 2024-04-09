import axiosInstance from "../../api/axios";

export const getUserApi = (username: string = 'Marina123') => {
  return axiosInstance.get(`/user/${username}`);
};
