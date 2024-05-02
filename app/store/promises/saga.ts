import { type SagaIterator } from '@redux-saga/core';
import { call, put, putResolve, takeEvery } from 'redux-saga/effects';
import { promiseActions } from './slice';
import { AxiosError } from 'axios';

// Worker Sagas
export function* promiseAsync({ payload: { name, promise } }: any): SagaIterator {
  try {
    yield put(promiseActions.promisePending(name));
    const { data } = yield call(() => promise);
    yield put(promiseActions.promiseResolved(name, data));
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    console.error('Promise rejected in promiseAsync:', errorMessage, error);
    yield put(promiseActions.promiseRejected(name, errorMessage));
  }
}

// Watcher Saga
function* promiseWatcherSaga(): SagaIterator {
  yield takeEvery('promise/AUTH_PROMISE', promiseAsync);
}

export default promiseWatcherSaga;
