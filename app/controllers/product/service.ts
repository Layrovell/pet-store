import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Product } from '../../interface/product.interface';
import { productActions } from './slice';

interface ProductServiceOperators {
  data: {
    content: Product[];
    count: number;
  } | null;
  loading: boolean;
  error: string | null;
  loadProducts: (params: { page: number, size: number }) => void;
  loadProductById: (id: number) => void;
  loadProductsByCategoryId: (params: { categoryId: number, page?: number, size?: number }) => void;
}

const useProductsService = (): Readonly<ProductServiceOperators> => {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);

  const loadProducts = useCallback((params: { page: number, size: number }) => {
    dispatch(productActions.fetchProductsRequest(params));
  }, [dispatch]);

  const loadProductById = useCallback((id: number) => {
    dispatch(productActions.fetchProductByIdRequest({ id }));
  }, [dispatch]);

  const loadProductsByCategoryId = useCallback((params: { page?: number, size?: number, categoryId: number }) => {
    dispatch(productActions.fetchProductsByCategoryIdRequest(params));
  }, [dispatch]);

  return {
    data: productsState.products,
    loading: productsState.loading,
    error: productsState.error,
    loadProducts,
    loadProductById,
    loadProductsByCategoryId,
  };
};

export default useProductsService;
