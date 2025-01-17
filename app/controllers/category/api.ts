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

export const getCategoryByIdApi = (categoryId: number) => {
  return axiosInstance.get(`/categories/${categoryId}`);
};

export const getAttributesByCategoryIdApi = (categoryId: number) => {
  return axiosInstance.get(`/categories/${categoryId}/products/attributes`);
};
