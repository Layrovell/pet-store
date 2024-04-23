import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { Product, StatusType } from '../../interface/product.interface';
import { productsActions, selectProducts, selectProductsError, selectProductsLoading } from '../../store/product/slice';

interface ProductsServiceOperators {
  products: Product[];
  productsLoading: boolean;
  productsError: string;
  getProducts: (productStatus: StatusType[]) => void;
}

const useProductsService = (): Readonly<ProductsServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    products: useAppSelector(selectProducts),
    productsLoading: useAppSelector(selectProductsLoading),
    productsError: useAppSelector(selectProductsError),
    getProducts: useCallback((productStatus) => {
      dispatch(productsActions.productIsLoading());
      dispatch(productsActions.getProducts(productStatus));
    },
    [dispatch]),
  };
};

export default useProductsService;
