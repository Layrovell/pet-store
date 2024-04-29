import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { authActions, selectAuthError, selectAuthLoading, selectIsAuthenticated, selectUser, selectUserError, selectUserLoading } from '../../store/auth/slice';
import { User } from '../../interface/user.interface';

interface AuthServiceOperators {
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => any;
  register: (userData: User) => any;
  logout: () => void;
  // 
  data: User;
  userLoading: boolean;
  userError: string;
  getUser: (username: string) => void;
}

const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    isAuthenticated: useAppSelector(selectIsAuthenticated),
    loading: useAppSelector(selectAuthLoading),
    error: useAppSelector(selectAuthError),
    login: useCallback((email, password) => {
      dispatch(authActions.authIsLoading());
      dispatch(authActions.login({ email, password }));
    },
    [dispatch]),
    register: useCallback((userData) => {
      dispatch(authActions.authIsLoading());
      dispatch(authActions.register(userData));
    },[dispatch]),
    // 
    data: useAppSelector(selectUser),
    userLoading: useAppSelector(selectUserLoading),
    userError: useAppSelector(selectUserError),
    getUser: useCallback((username) => {
      dispatch(authActions.authIsLoading());
      dispatch(authActions.getUserByUsername({ username }));
    },
    [dispatch]),
    logout: useCallback(() => {
      dispatch(authActions.authIsLoading());
      dispatch(authActions.logout());
    },
    [dispatch]),
  };
};

export default useAuthService;
