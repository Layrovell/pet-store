import axiosInstance from '../../api/axios';

export type GetProductsType = {
  categoryId: number[];
};

export const getProductsApi = (params?: GetProductsType) => {
  return axiosInstance.get(`/products`, {
    params: params,
    paramsSerializer: (params) => {
      return `${params.categoryId ? params.categoryId.map((code: any) => `categoryId=${code}`).join('&') : ''}`;
    },
  });
};

interface GetProductById {
  id: string;
}

export const getProductByIdApi = ({ id }: GetProductById) => {
  return axiosInstance.get(`/pet`, {
    params: id,
  });
};
