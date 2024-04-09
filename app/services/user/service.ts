import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, selectUserError, selectUserLoading, userActions } from '../../store/user/slice';
import { User } from '../../interface/user.interface';

interface UserServiceOperators {
  data: User;
  getUser: (username: string) => void;
  loading: boolean;
  error: string;
}

const useUserService = (): Readonly<UserServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectUser),
    loading: useAppSelector(selectUserLoading),
    error: useAppSelector(selectUserError),
    getUser: useCallback((username) => {
      dispatch(userActions.getUserIsLoading());
      dispatch(userActions.getUserByUsername({ username }));
    },
    [dispatch]),
  };
};

export default useUserService;
