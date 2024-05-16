import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { productActions } from './slice';
import { getProductByCategoryIdApi, getProductByIdApi, getProductsApi } from './api';

// Worker Sagas
function* fetchProducts(action: PayloadAction<{ page?: number; size?: number }>): SagaIterator {
  try {
    const response = yield call(getProductsApi, action.payload);
    yield put(productActions.fetchProductsSuccess(response.data));
  } catch (error) {
    console.log('fetch products error:', error);
    yield put(productActions.fetchProductsFailure('Failed to load products!'));
  }
}

function* fetchProductById(action: PayloadAction<{ id: number }>): SagaIterator {
  const { id } = action.payload;

  try {
    const response = yield call(getProductByIdApi, id);
    yield put(productActions.fetchProductByIdSuccess(response.data));
  } catch (error) {
    console.log('fetch product by id error:', error);
    yield put(productActions.fetchProductByIdFailure(`Failed to load product by id ${id}!`));
  }
}

function* fetchProductByCategoryId(action: PayloadAction<{ categoryId: number, page?: number; size?: number }>): SagaIterator {
  const { categoryId } = action.payload;

  try {
    const response = yield call(getProductByCategoryIdApi, action.payload);
    yield put(productActions.fetchProductsByCategoryIdSuccess(response.data));
  } catch (error) {
    console.log('fetch product by category id error:', error);
    yield put(productActions.fetchProductsByCategoryIdFailure(`Failed to load product by id ${categoryId}!`));
  }
}

// Watcher Saga
function* productWatcherSaga(): SagaIterator {
  yield takeLatest(productActions.fetchProductsRequest.type, fetchProducts);
  yield takeLatest(productActions.fetchProductByIdRequest.type, fetchProductById);
  yield takeLatest(productActions.fetchProductsByCategoryIdRequest.type, fetchProductByCategoryId);
}

export default productWatcherSaga;
