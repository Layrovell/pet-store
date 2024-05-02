import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { authActions, selectUser } from '../../store/auth/slice';
import { User } from '../../interface/user.interface';
import { promiseActions } from '../../store/promises/slice';
import { AUTH_KEY } from '../../store/root/config.store';

interface AuthServiceOperators {
  login: (email: string, password: string) => any;
  register: (userData: User) => any;
  logout: () => void;
  data: User;
}

const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    login: useCallback((email, password) => {
      // dispatch(promiseActions.promisePending(AUTH_KEY))
      dispatch(authActions.login({ email, password }));
    },
    [dispatch]),
    register: useCallback((userData) => {
      dispatch(promiseActions.promisePending(AUTH_KEY))
      dispatch(authActions.register(userData));
    },[dispatch]),
    data: useAppSelector(selectUser),
    logout: useCallback(() => {
      dispatch(promiseActions.promisePending(AUTH_KEY))
      dispatch(authActions.logout());
    },
    [dispatch]),
  };
};

export default useAuthService;
