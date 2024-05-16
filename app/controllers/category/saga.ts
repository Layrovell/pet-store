import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { categoriesActions } from './slice';
import { getCategoriesApi } from './api';

// Worker Sagas
export function* fetchCategoriesWorker(action: PayloadAction<{ page?: number; size?: number }>): SagaIterator {
  try {
    const response = yield call(getCategoriesApi, action.payload);
    yield put(categoriesActions.fetchCategoriesSuccess(response.data));
  } catch (error: unknown) {
    console.error('Error in fetchCategoriesWorker:', error);
    yield put(categoriesActions.fetchCategoriesFailure('Failed to load categories!'))
  }
}

// Watcher Saga
function* categoriesWatcherSaga(): SagaIterator {
  yield takeEvery(categoriesActions.fetchCategoryRequest, fetchCategoriesWorker);
}

export default categoriesWatcherSaga;
