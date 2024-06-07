import { put, PutEffect } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { Action } from 'redux';

import { appActions } from 'controllers/app/slice';
import routes from 'navigation/routes';

type FailureActionCreator = (message: string) => Action & { payload: string };

export function* handleError(
  error: unknown,
  defaultMessage: string,
  failureAction: FailureActionCreator
): Generator<PutEffect<Action>, void, void> {
  let errorMessage = defaultMessage;
  let code: number | undefined;

  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.message || errorMessage;
    code = error.response?.status;
  }

  console.error('Error in handleError:', errorMessage, error);

  yield put(failureAction(errorMessage));
  yield put(appActions.addNotification({ key: new Date().getTime(), message: errorMessage, code }));
  yield put(appActions.setRedirect(routes.ERROR_SCREEN));
}
