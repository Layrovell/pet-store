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
  loadCategories: (params?: CategoryParams) => void;
}

const useCategoriesService = (): Readonly<ProductsServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectCategories),
    loadCategories: useCallback((params) => {
      dispatch(categoriesActions.fetch(params));
    }, [dispatch]),
  };
};

export default useCategoriesService;
