import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { navigationActions } from './slice';

// Worker Sagas
function* requestSagaWrapper(apiCall: any, key: string, ...args: any): SagaIterator {
  try {
    yield put(navigationActions.incrementRequestCount());
    const response = yield call(apiCall, ...args);
    yield put(navigationActions.decrementRequestCount());
    return response;
  } catch (error: any) {
    yield put(navigationActions.decrementRequestCount());
    const errorNotification = {
      key: key,
      notification: error.message || 'An error occurred',
    };
    yield put(navigationActions.addNotification(errorNotification));
    yield put(navigationActions.setRedirect({ route: 'ErrorScreen' }));
    throw error;
  }
}

export default requestSagaWrapper;
