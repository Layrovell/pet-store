import AsyncStorage from '@react-native-async-storage/async-storage';
import { type SagaIterator } from '@redux-saga/core';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions } from './slice';
import { getUserApi, loginApi, registerApi } from '../../services/auth/auth.api';
import { User } from '../../interface/user.interface';

// Worker Sagas
export function* loginWorker(action: any): SagaIterator {
  try {
    yield put(authActions.authIsLoading());
    yield call(loginApi, action.payload);
    AsyncStorage.setItem('token', action.payload.username); // store username here
    yield put(authActions.authSuccess());
  } catch (e: unknown) {
    yield put(authActions.authFailure(`Sorry, couldn't authenticate!`));
  }
}

export function* registerWorker(action: PayloadAction<User>): SagaIterator {
  try {
    yield put(authActions.authIsLoading());
    yield call(registerApi, action.payload);
    yield put(authActions.login({
      email: action.payload.username,
      password: action.payload.password,
    }));
  } catch (e: unknown) {
    yield put(authActions.authFailure(`Sorry, couldn't authenticate!`));
  }
}
// 
export function* fetchUserWorker(action: any): SagaIterator {
  try {
    yield put(authActions.authIsLoading());
    const user = yield call(getUserApi, action.payload.username); // { username: 'Marina123' }
    yield put(authActions.getUserSuccess(user.data));
  } catch (e: unknown) {
    yield put(authActions.getUserFailure(`Sorry, we couldn't load the user!`));
  }
}


// Watcher Saga
function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authActions.login.type, loginWorker);
  yield takeEvery(authActions.register.type, registerWorker);
  // 
  yield takeEvery(authActions.getUserByUsername.type, fetchUserWorker);
}

export default authWatcherSaga;
