import { type SagaIterator } from '@redux-saga/core';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { userActions } from './slice';
import { getUserApi } from '../../services/user/user.api';

// Worker Sagas
export function* fetchUser(action: any): SagaIterator {
  try {
    yield put(userActions.getUserIsLoading());
    const user = yield call(getUserApi, action.payload.username); // { username: 'Marina123' }
    yield put(userActions.getUserSuccess(user.data));
  } catch (e: unknown) {
    yield put(userActions.getUserFailure(`Sorry, we couldn't load the user!`));
  }
}

// Watcher Saga
function* userWatcherSaga(): SagaIterator {
  yield takeEvery(userActions.getUserByUsername.type, fetchUser);
}

export default userWatcherSaga;
