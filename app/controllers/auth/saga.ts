import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SECRET_KEY } from '@env';

import { authActions } from './slice';
import { loginApi, registerApi, updateEmailApi, updatePasswordApi } from './api';
import { User } from '../../interface/user.interface';
import { handleError } from 'utils/errorHandler';

// Worker Sagas
export function* loginWorker(action: PayloadAction<{ email: string; password: string }>): SagaIterator {
  try {
    const response = yield call(loginApi, action.payload);
    const token = response?.data?.accessToken;
    AsyncStorage.setItem('token', token);
    const userData = JWT.decode(token, SECRET_KEY);

    yield put(authActions.loginSuccess(userData.user));
  } catch (error: unknown) {
    yield* handleError(error, 'Failed to log in user.', authActions.loginFailure);
  }
}

export function* registerWorker(action: PayloadAction<User>): SagaIterator {
  try {
    yield call(registerApi, action.payload);
    yield put(authActions.loginRequest({ email: action.payload.email, password: action.payload.password }));
  } catch (error: unknown) {
    yield* handleError(error, 'Failed to register user.', authActions.registerFailure);
  }
}

export function* updatePasswordWorker(action: PayloadAction<{ id: number; data: { password: string; oldPassword: string } }>): SagaIterator {
  try {
    const { id, data } = action.payload;
    const response = yield call(updatePasswordApi, id, data);
    yield put(authActions.updatePasswordSuccess(response.status));
  } catch (error: unknown) {
    yield* handleError(error, 'Failed to update password.', authActions.updatePasswordFailure);
  }
}

export function* updateEmailWorker(action: PayloadAction<{ id: number; data: { password: string; email: string } }>): SagaIterator {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateEmailApi, id, data);
    yield put(authActions.updateEmailSuccess(response.status));
  } catch (error: unknown) {
    yield* handleError(error, 'Failed to update email.', authActions.updateEmailFailure);
  }
}

// Watcher Saga
function* authWatcherSaga(): SagaIterator {
  yield takeEvery(authActions.loginRequest, loginWorker);
  yield takeEvery(authActions.registerRequest, registerWorker);
  yield takeEvery(authActions.updatePasswordRequest, updatePasswordWorker);
  yield takeEvery(authActions.updateEmailRequest, updateEmailWorker);
}

export default authWatcherSaga;