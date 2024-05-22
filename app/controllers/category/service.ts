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
  loading: {
    categories: boolean,
    attributes: boolean,
  };
  error: {
    categories: string | null,
    attributes: string | null,
  };
  attributes: any[];
  loadCategories: (params: { page: number, size: number }) => void;
  loadAttributesByCategory: (categoryId: number) => void;
}

const useCategoriesService = (): Readonly<ProductsServiceOperators> => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);

  return {
    data: useAppSelector(selectCategories),
    loading: categoriesState.loading,
    error: categoriesState.error,
    attributes: categoriesState.attributes,
    loadCategories: useCallback((params: { page: number, size: number }) => {
      dispatch(categoriesActions.fetchCategoryRequest(params));
    }, [dispatch]),
    loadAttributesByCategory: useCallback((categoryId: number) => {
      dispatch(categoriesActions.fetchAttributesByCategoryIdRequest(categoryId));
    }, [dispatch]),
  };
};

export default useCategoriesService;
