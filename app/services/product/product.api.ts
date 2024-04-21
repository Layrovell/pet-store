import axiosInstance from '../../api/axios';

interface GetProductsProps {
  status: string[];
}

export const getProductsApi = ({ status }: GetProductsProps) => {
  return axiosInstance.get(`/pet/findByStatus`, {
    params: status,
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
