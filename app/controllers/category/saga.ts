import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { categoriesActions } from './slice';
import { getAttributesByCategoryIdApi, getCategoriesApi, getCategoryByIdApi } from './api';
import requestSagaWrapper from 'controllers/navigation/saga';

// Worker Sagas
export function* fetchCategoriesWorker(action: PayloadAction<{ page?: number; size?: number } | undefined>): SagaIterator {
  try {
    const response = yield call(requestSagaWrapper, getCategoriesApi, 'categories', action.payload);
    yield put(categoriesActions.fetchCategoriesSuccess(response.data));
  } catch (error: unknown) {
    console.error('Error in fetchCategoriesWorker:', error);
    yield put(categoriesActions.fetchCategoriesFailure('Failed to load categories!'))
  }
}

export function* fetchCategoryByIdWorker(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(requestSagaWrapper, getCategoryByIdApi, 'categoryById', action.payload);
    yield put(categoriesActions.fetchCategoryByIdSuccess(response.data));
  } catch (error: unknown) {
    console.error('Error in fetchCategoryByIdWorker:', error);
    yield put(categoriesActions.fetchCategoryByIdFailure(`Failed to load category with id ${action.payload}!`))
  }
}

export function* fetchAttributesByCategoryIdsWorker(action: PayloadAction<number>): SagaIterator {
  try {
    const response = yield call(getAttributesByCategoryIdApi, action.payload);
    yield put(categoriesActions.fetchAttributesByCategoryIdSuccess(response.data));
  } catch (error: unknown) {
    console.error('Error in fetchAttributesByCategoryIdsWorker:', error);
    yield put(categoriesActions.fetchAttributesByCategoryIdFailure(`Failed to load category attributes by category id ${action.payload}!`))
  }
}

// Watcher Saga
function* categoriesWatcherSaga(): SagaIterator {
  yield takeLatest(categoriesActions.fetchCategoryRequest, fetchCategoriesWorker);
  yield takeLatest(categoriesActions.fetchCategoryByIdRequest, fetchCategoryByIdWorker);
  yield takeLatest(categoriesActions.fetchAttributesByCategoryIdRequest, fetchAttributesByCategoryIdsWorker);
}

export default categoriesWatcherSaga;
