import axiosInstance from '../../api/axios';

export const getProductsApi = () => {
  return axiosInstance.get(`/products`);
};

interface GetProductById {
  id: string;
}

export const getProductByIdApi = ({ id }: GetProductById) => {
  return axiosInstance.get(`/pet`, {
    params: id,
  });
};
