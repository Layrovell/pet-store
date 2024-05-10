import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { type SagaIterator } from '@redux-saga/core';
import { call, put, putResolve, select, take, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SECRET_KEY } from '@env';

import { authActions, authTypes } from './slice';
import { loginApi, registerApi } from './api';
import { User } from '../../interface/user.interface';
import { AUTH_KEY } from '../../store/root/config.store';
import { promiseAsync } from '../promises/saga';
import { promiseActions } from '../promises/slice';

// Worker Sagas
export function* loginWorker(action: any): SagaIterator {
  try {
    yield putResolve(promiseActions.promiseAsync(AUTH_KEY, loginApi(action.payload)));
    yield take(promiseActions.promiseResolved({ name: AUTH_KEY, data: {} }).type);

    const data = yield select((state) => state.promise);

    const token = data[AUTH_KEY]?.data?.accessToken;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    const userData = JWT.decode(token, SECRET_KEY);
    yield put(authActions.addUser(userData.user));
    yield put(promiseActions.clearPromise({ name: AUTH_KEY }));
  } catch (error: unknown) {
    console.error('Error in loginWorker:', error); // The promiseAsync is responsible for error handling
  }
}

export function* registerWorker(action: PayloadAction<User>): SagaIterator {
  try {
    const registerPromise = registerApi(action.payload);
    yield call(promiseAsync, { payload: { name: AUTH_KEY, promise: registerPromise } });
    yield put(authActions.login({ email: action.payload.email, password: action.payload.password }));
  } catch (error: unknown) {
    console.error('Error in registerWorker:', error); // The promiseAsync is responsible for error handling
  }
}

// Watcher Saga
function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authTypes.login, loginWorker);
  yield takeEvery(authTypes.register, registerWorker);
}

export default authWatcherSaga;