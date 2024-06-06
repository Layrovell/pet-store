import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SECRET_KEY } from '@env';
import { AxiosError } from 'axios';

import { authActions } from './slice';
import { loginApi, registerApi, updateEmailApi, updatePasswordApi } from './api';
import { User } from '../../interface/user.interface';

// Worker Sagas
export function* loginWorker(action: any): SagaIterator {
  try {
    const response = yield call(loginApi, action.payload);
    const token = response?.data?.accessToken;
    AsyncStorage.setItem('token', token);
    const userData = JWT.decode(token, SECRET_KEY);

    yield put(authActions.loginSuccess(userData.user));
  } catch (error: unknown) {
    console.error('Error in loginWorker:', error);
    yield put(authActions.loginFailure('Failed to login the user'));
  }
}

export function* registerWorker(action: PayloadAction<User>): SagaIterator {
  try {
    yield call(registerApi, action.payload);
    yield put(authActions.loginRequest({ email: action.payload.email, password: action.payload.password }));
  } catch (error: unknown) {
    console.error('Error in registerWorker:', error);
    yield put(authActions.registerFailure('Failed to register the user!'));
  }
}

export function* updatePasswordWorker(action: PayloadAction<{ id: number; data: { password: string; oldPassword: string } }>): SagaIterator {
  try {
    const { id, data } = action.payload;
    const response = yield call(updatePasswordApi, id, data);
    if (response.status === 200) {
      yield put(authActions.updatePasswordSuccess('Password updated successfully'));
    }
  } catch (error: unknown) {
    let errorMessage = 'Failed to update the password';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    console.error('Error in updatePasswordWorker:', errorMessage, error);
    yield put(authActions.updatePasswordFailure(errorMessage));
  }
}

export function* updateEmailWorker(action: PayloadAction<{ id: number; data: { password: string; email: string } }>): SagaIterator {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateEmailApi, id, data);
    yield put(authActions.updateEmailSuccess(response.data));
  } catch (error: unknown) {
    let errorMessage = 'Failed to update the email';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    console.error('Error in updatePasswordWorker:', errorMessage, error);
    yield put(authActions.updateEmailFailure(errorMessage));
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