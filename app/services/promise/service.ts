import { useCallback } from 'react';

import { getSelectApiData, promiseActions, selectApiError, selectIsLoading } from '../../store/promises/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';

interface PromiseServiceOperators {
  createPromise: (name: string, operation: () => Promise<any>) => void;
  resolvePromise: (name: string, data: any) => void;
  rejectPromise: (name: string, error: string) => void;
  isLoading: (name: string) => boolean;
  error: (name: string) => string | undefined;
  data: (name: string) => any;
}

const usePromiseService = (): Readonly<PromiseServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    createPromise: useCallback((name: string, operation: any) => {
      dispatch(promiseActions.promisePending(name));
      operation()
        .then((data: any) => {
          dispatch(promiseActions.promiseResolved(name, data));
        })
        .catch((error: any) => {
          dispatch(promiseActions.promiseRejected(name, error.toString()));
        });
    }, [dispatch]),

    resolvePromise: useCallback((name: string, data: any) => {
      dispatch(promiseActions.promiseResolved(name, data));
    }, [dispatch]),

    rejectPromise: useCallback((name: string, error: string) => {
      dispatch(promiseActions.promiseRejected(name, error));
    }, [dispatch]),

    isLoading: useCallback((name: string) => 
      useAppSelector((state) => selectIsLoading(state.promise, name)),
    [dispatch]),

    error: useCallback((name: string) =>
      useAppSelector((state) => selectApiError(name)(state)),
    [dispatch]),

    data: useCallback((name: string) =>
      useAppSelector((state) => getSelectApiData(name)(state)),
    [dispatch]),
  };
};

export default usePromiseService;
