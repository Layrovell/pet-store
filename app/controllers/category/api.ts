import axiosInstance from '../../api/axios';

export type CategoryParams = {
  with_category_attributes?: boolean;
}

export const getCategoriesApi = (params?: CategoryParams) => {
  return axiosInstance.get(`/categories`, {
    params,
  });
};
