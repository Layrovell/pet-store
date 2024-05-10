import { useCallback } from 'react';

import { getSelectApiData, selectApiError, selectIsLoading } from '../../controllers/promises/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface PromiseServiceOperators {
  getIsLoading: (name: string) => boolean;
  getError: (name: string) => any | undefined;
  data: (name: string) => any;
}

const usePromiseService = (): Readonly<PromiseServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    getIsLoading: useCallback((name: string) => 
      useAppSelector((state) => selectIsLoading(state.promise, name)),
    [dispatch]),

    getError: useCallback((name: string) =>
      useAppSelector((state) => selectApiError(name)(state)),
    [dispatch]),

    data: useCallback((name: string) =>
      useAppSelector((state) => getSelectApiData(name)(state)),
    [dispatch]),
  };
};

export default usePromiseService;
