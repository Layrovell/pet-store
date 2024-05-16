import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { categoriesActions, selectCategories } from './slice';
import { CategoryType } from '../../interface/category';
import { CategoryParams } from './api';

interface ProductsServiceOperators {
  data: {
    content: CategoryType[];
    count: number;
  };
  loadCategories: (params: { page: number, size: number }) => void;
  loading: boolean;
  error: string | null;
}

const useCategoriesService = (): Readonly<ProductsServiceOperators> => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);

  return {
    data: useAppSelector(selectCategories),
    loading: categoriesState.loading,
    error: categoriesState.error,
    loadCategories: useCallback((params: { page: number, size: number }) => {
      dispatch(categoriesActions.fetchCategoryRequest(params));
    }, [dispatch]),
  };
};

export default useCategoriesService;
