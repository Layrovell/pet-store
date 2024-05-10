import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { categoriesActions, selectCategories } from './slice';

interface ProductsServiceOperators {
  data: {
    content: any[];
    count: number;
  };
  loadCategories: (params?: any) => any;
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
