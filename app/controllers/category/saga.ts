import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { categoriesActions } from './slice';
import { getAttributesByCategoryIdApi, getCategoriesApi } from './api';

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

export function* fetchAttributesByCategoryIdsWorker(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(getAttributesByCategoryIdApi, action.payload);
    yield put(categoriesActions.fetchAttributesByCategoryIdSuccess(response.data));
  } catch (error: unknown) {
    console.error('Error in fetchCategoriesWorker:', error);
    yield put(categoriesActions.fetchAttributesByCategoryIdFailure('Failed to load categories!'))
  }
}

// Watcher Saga
function* categoriesWatcherSaga(): SagaIterator {
  yield takeEvery(categoriesActions.fetchCategoryRequest, fetchCategoriesWorker);
  yield takeEvery(categoriesActions.fetchAttributesByCategoryIdRequest, fetchAttributesByCategoryIdsWorker);
}

export default categoriesWatcherSaga;
