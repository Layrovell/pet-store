import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FilteredProductsPayload, Product } from '../../interface/product.interface';
import { productActions } from './slice';

const maxItemsPerPage = 10;

interface ProductServiceOperators {
  products: Product[];
  count: number;
  loading: boolean;
  error: string | null;
  loadProducts: (params: { page: number, size: number }) => void;
  loadProductById: (id: number) => void;
  loadProductsByCategoryId: (params: FilteredProductsPayload) => void;
  clearProducts: () => void;
  maxItemsPerPage: number;
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

  const loadProductsByCategoryId = useCallback((params: FilteredProductsPayload) => {
    console.log('params:', params);
    
    dispatch(productActions.fetchProductsByCategoryIdRequest(params));
  }, [dispatch]);

  const clearProducts = useCallback(() => {
    dispatch(productActions.clearProducts());
  }, [dispatch]);

  return {
    products: productsState.products,
    count: productsState.count,
    loading: productsState.loading,
    error: productsState.error,
    loadProducts,
    loadProductById,
    loadProductsByCategoryId,
    clearProducts,
    maxItemsPerPage,
  };
};

export default useProductsService;
