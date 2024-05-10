import axiosInstance from '../../api/axios';

interface CategoryParams {
  with_category_attributes?: boolean;
}

export const getCategoriesApi = (params?: CategoryParams) => {
  return axiosInstance.get(`/categories`, {
    params,
  });
};
