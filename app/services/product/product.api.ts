import axiosInstance from '../../api/axios';
import { StatusType } from '../../interface/product.interface';

export const getProductsApi = (status: StatusType[]) => {
  return axiosInstance.get(`/pet/findByStatus?status=${status}`);
};

interface GetProductById {
  id: string;
}

export const getProductByIdApi = ({ id }: GetProductById) => {
  return axiosInstance.get(`/pet`, {
    params: id,
  });
};
