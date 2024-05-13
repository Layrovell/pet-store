import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Product } from '../../interface/product.interface';
import { productActions, selectProducts } from './slice';
import { GetProductsType } from './api';

interface ProductServiceOperators {
  data: {
    content: Product[];
    count: number;
  };
  loadProducts: (params?: GetProductsType) => void;
}

const useProductsService = (): Readonly<ProductServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectProducts),
    loadProducts: useCallback((params) => {
      dispatch(productActions.fetch(params));
    }, [dispatch]),
  };
};

export default useProductsService;
