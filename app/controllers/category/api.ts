import axiosInstance from '../../api/axios';

export type CategoryParams = {
  with_category_attributes?: boolean;
  page?: number;
  size?: number;
}

export const getCategoriesApi = (params?: CategoryParams) => {
  return axiosInstance.get(`/categories`, {
    params,
  });
};
