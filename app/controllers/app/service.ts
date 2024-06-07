import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { appActions, NavigationState, NotificationType } from './slice';

type AppServiceOperators = NavigationState & {
  addNotification: ({ key, message }: NotificationType) => void;
  removeNotification: (key: { key: number }) => void;
  clearRedirect: () => void;
};

const useAppService = (): Readonly<AppServiceOperators> => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);

  return {
    notifications: appState.notifications,
    redirect: appState.redirect,
    addNotification: useCallback((notification) => {
      dispatch(appActions.addNotification(notification));
    }, [dispatch]),
    removeNotification: useCallback(({ key }) => {
      dispatch(appActions.removeNotification({ key }));
    }, [dispatch]),
    clearRedirect: useCallback(() => {
      dispatch(appActions.clearRedirect());
    }, [dispatch]),
  };
};

export default useAppService;
