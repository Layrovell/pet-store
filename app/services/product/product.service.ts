import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { Product } from '../../interface/product.interface';
import { productActions, selectProducts } from '../../store/product/slice';

interface CategoriesServiceOperators {
  data: {
    content: Product[];
    count: number;
  };
  loadProducts: (filters?: any) => any;
}

const useProductsService = (): Readonly<CategoriesServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectProducts),
    loadProducts: useCallback((filters) => {
      dispatch(productActions.fetch(filters));
    }, [dispatch]),
  };
};

export default useProductsService;
