import axiosInstance from '../../api/axios';

export type ProductsApiRequest = {
  categoryId?: number;
  page?: number;
  size?: number;
};

export const getProductsApi = (params?: ProductsApiRequest) => {
  return axiosInstance.get(`/products`, {
    params: params,
  });
};

export const getProductByIdApi = (id: number) => {
  return axiosInstance.get(`/products/${id}`);
};

type ProductByCategoryIdRequest = {
  categoryId: number;
  withCategory?: boolean;
  size?: number;
  page?: number;
  withAttributes?: boolean;
  filters?: any[];
};

export const getProductByCategoryIdApi = (params: ProductByCategoryIdRequest) => {
  const { categoryId, filters, ...rest } = params;
  
  return axiosInstance.get(`/categories/${categoryId}/products`, {
    params: {...rest, filters: JSON.stringify(filters)}
  });
};
