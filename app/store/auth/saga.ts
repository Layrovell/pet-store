import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { type SagaIterator } from '@redux-saga/core';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions } from './slice';
import { getUserApi, loginApi, registerApi } from '../../services/auth/auth.api';
import { User } from '../../interface/user.interface';
import { promiseActions } from '../promises/slice';
import { AUTH_KEY } from '../root/config.store';

// Worker Sagas
export function* loginWorker(action: any): SagaIterator {
  try {
    yield put(promiseActions.promisePending(AUTH_KEY));
    const loginResponse = yield call(loginApi, action.payload);
    const token = loginResponse?.data?.accessToken;
    AsyncStorage.setItem('token', token);
    const data = JWT.decode(token, 'jwt-pet-store-app-secret-v1');
    yield put(authActions.addUser(data.user));
    yield put(promiseActions.promiseResolved(AUTH_KEY, loginResponse.data));
  } catch (e: unknown) {
    yield put(promiseActions.promiseRejected(AUTH_KEY, 'Could not login the user')); // msg: `Couldn't login the user!`
  }
}

export function* registerWorker(action: PayloadAction<User>): SagaIterator {
  try {
    yield put(promiseActions.promisePending(AUTH_KEY));
    yield call(registerApi, action.payload);
    yield put(authActions.login({
      email: action.payload.email,
      password: action.payload.password,
    }));
  } catch (e: unknown) {
    yield put(promiseActions.promiseRejected(AUTH_KEY, 'Could not register the user'));
  }
}


// Watcher Saga
function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authActions.login.type, loginWorker);
  yield takeEvery(authActions.register.type, registerWorker);
}

export default authWatcherSaga;
