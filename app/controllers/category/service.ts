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
    categoryById: boolean;
  };
  error: {
    categories: string | null,
    attributes: string | null,
    categoryById: string | null,
  };
  attributes: any[];
  categoryById: CategoryType,
  loadCategories: (params?: { page: number, size: number }) => void;
  loadAttributesByCategory: (categoryId: number) => void;
  loadCategoryById: (categoryId: number) => void;
}

const useCategoriesService = (): Readonly<ProductsServiceOperators> => {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);

  return {
    data: useAppSelector(selectCategories),
    loading: categoriesState.loading,
    error: categoriesState.error,
    attributes: categoriesState.attributes,
    categoryById: categoriesState.categoryById,
    loadCategories: useCallback((params?: { page: number, size: number }) => {
      dispatch(categoriesActions.fetchCategoryRequest(params));
    }, [dispatch]),
    loadAttributesByCategory: useCallback((categoryId: number) => {
      dispatch(categoriesActions.fetchAttributesByCategoryIdRequest(categoryId));
    }, [dispatch]),
    loadCategoryById: useCallback((categoryId: number) => {
      dispatch(categoriesActions.fetchCategoryByIdRequest(categoryId));
    }, [dispatch]),
  };
};

export default useCategoriesService;
