import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions, selectUser } from './slice';
import { User } from '../../interface/user.interface';
import { promiseActions } from '../promises/slice';
import { AUTH_KEY } from '../../store/config.store';

interface AuthServiceOperators {
  login: (email: string, password: string) => any;
  register: (userData: User) => any;
  logout: () => void;
  data: User;
}

const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  // todo: images from disk: upload/get controllers

  return {
    login: useCallback((email, password) => {
      dispatch(authActions.login({ email, password }));
    },
    [dispatch]),
    register: useCallback((userData) => {
      dispatch(authActions.register(userData));
    },[dispatch]),
    data: useAppSelector(selectUser),
    logout: useCallback(() => {
      dispatch(authActions.logout());
    },
    [dispatch]),
  };
};

export default useAuthService;
