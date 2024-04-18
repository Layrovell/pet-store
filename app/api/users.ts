import axiosInstance from "./axios";

const getUser = (username: string) => {
  return axiosInstance.get(`/user/${username}`);
};

export default {
  getUser,
};
