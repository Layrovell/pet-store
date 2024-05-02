import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { type SagaIterator } from '@redux-saga/core';
import { all, call, delay, getContext, put, putResolve, select, take, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions } from './slice';
import { getUserApi, loginApi, registerApi } from '../../services/auth/auth.api';
import { User } from '../../interface/user.interface';
import { AUTH_KEY } from '../root/config.store';
import { promiseAsync } from '../promises/saga';
import { promiseActions } from '../promises/slice';

const key = 'jwt-pet-store-app-secret-v1';

// export function* saveTokenWorker(action: any): SagaIterator {
//   try {
//     // const loginPromise = loginApi(action.payload);
//     // yield put(promiseActions.promiseAsync(AUTH_KEY, loginApi(action.payload)));
//     const data = yield select((state) => state.promise )
//     console.log('=====DATA====:', data);
//   } catch (error: unknown) {

//   }
// }

// Worker Sagas
export function* loginWorker(action: any): SagaIterator {
  try {
    // const loginPromise = loginApi(action.payload);
    yield putResolve(promiseActions.promiseAsync(AUTH_KEY, loginApi(action.payload)));
    const test = yield take(promiseActions.promiseResolved(AUTH_KEY, {}).type)
    yield take(promiseActions.promiseResolved(AUTH_KEY, {}).type)

    // yield delay(100)
    const data = yield select((state) => state.promise )
    // console.log('=====test:', test);
    console.log('=====DATA:', data);
    // yield putResolve({type: "auth/save"})
    // const token = resolvedData?.accessToken;
    // if (!token) {
    //   throw new Error('Token not found in login response');
    // }

    // console.log('Token:', token);
    // yield call([AsyncStorage, 'setItem'], 'token', token);
    // const userData = JWT.decode(token, key);
    // yield put(authActions.addUser(userData.user));
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
  yield takeEvery('auth/login', loginWorker);
  // yield takeEvery('auth/save', saveTokenWorker);
  // yield takeEvery(authActions.login.type, loginWorker);
  yield takeEvery(authActions.register.type, registerWorker);
}

async function parseToken(t: string) {
  let userData = null;

  try {
    userData = JWT.decode(t, key);
    return userData;
  } catch (decodeError) {
    console.error('JWT decoding error:', decodeError, t, key);
    throw new Error('Token decoding failed');
  }
}

export default authWatcherSaga;