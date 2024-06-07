import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { categoriesActions } from './slice';
import { getAttributesByCategoryIdApi, getCategoriesApi, getCategoryByIdApi } from './api';
import { handleError } from 'utils/errorHandler';

// Worker Sagas
export function* fetchCategoriesWorker(action: PayloadAction<{ page?: number; size?: number } | undefined>): SagaIterator {
  try {
    const response = yield call(getCategoriesApi, action.payload);
    yield put(categoriesActions.fetchCategoriesSuccess(response.data));
  } catch (error: unknown) {
    yield* handleError(error, 'Failed to load categories.', categoriesActions.fetchCategoriesFailure);
  }
}

export function* fetchCategoryByIdWorker(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(getCategoryByIdApi, action.payload);
    yield put(categoriesActions.fetchCategoryByIdSuccess(response.data));
  } catch (error: unknown) {
    yield* handleError(error, `Failed to load category with ID ${action.payload}.`, categoriesActions.fetchCategoryByIdFailure);
  }
}

export function* fetchAttributesByCategoryIdsWorker(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(getAttributesByCategoryIdApi, action.payload);
    yield put(categoriesActions.fetchAttributesByCategoryIdSuccess(response.data));
  } catch (error: unknown) {
    yield* handleError(error, `Failed to load category attributes for category ID ${action.payload}.`, categoriesActions.fetchAttributesByCategoryIdFailure);
  }
}

// Watcher Saga
function* categoriesWatcherSaga(): SagaIterator {
  yield takeLatest(categoriesActions.fetchCategoryRequest, fetchCategoriesWorker);
  yield takeLatest(categoriesActions.fetchCategoryByIdRequest, fetchCategoryByIdWorker);
  yield takeLatest(categoriesActions.fetchAttributesByCategoryIdRequest, fetchAttributesByCategoryIdsWorker);
}

export default categoriesWatcherSaga;
