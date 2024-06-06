import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthState, authActions, selectUser } from './slice';
import { User } from '../../interface/user.interface';

type AuthServiceOperators = AuthState & {
  login: (email: string, password: string) => any;
  register: (userData: User) => any;
  logout: () => void;
  updatePassword: (id: number, data: { password: string; oldPassword: string }) => any;
  updateEmail: (id: number, data: { email: string; password: string }) => any;
}

const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  // todo: images from disk: upload/get controllers

  return {
    data: useAppSelector(selectUser),
    loading: authState.loading,
    error: authState.error,
    status: authState.status,
    login: useCallback((email, password) => {
      dispatch(authActions.loginRequest({ email, password }));
    }, [dispatch]),
    register: useCallback((userData) => {
      dispatch(authActions.registerRequest(userData));
    }, [dispatch]),
    logout: useCallback(() => {
      dispatch(authActions.logout());
    }, [dispatch]),
    updatePassword: useCallback((id: number, data: { password: string; oldPassword: string }) => {
      dispatch(authActions.updatePasswordRequest({ id, data }));
    }, [dispatch]),
    updateEmail: useCallback((id: number, data: { email: string; password: string }) => {
      dispatch(authActions.updateEmailRequest({ id, data }));
    }, [dispatch]),
  };
};

export default useAuthService;
