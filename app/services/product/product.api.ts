import axiosInstance from '../../api/axios';
import { getMockedProducts } from '../../api/mock/products';
import { StatusType } from '../../interface/product.interface';

export const getProductsApi = (status: StatusType[]) => {
  const products = getMockedProducts();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: products });
    }, 3000);
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
