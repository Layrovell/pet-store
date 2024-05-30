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
  sort_by?: {
    id: string;
    desc: boolean;
  };
};

export const getProductByCategoryIdApi = (params: ProductByCategoryIdRequest) => {
  const { categoryId, filters, sort_by, ...rest } = params;

  return axiosInstance.get(`/categories/${categoryId}/products`, {
    params: {
      ...rest,
      filters: JSON.stringify(filters),
      sort_by: JSON.stringify(sort_by),
      'with-attributes': true,
    },
  });
};
