import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { productActions } from './slice';
import { getProductByCategoryIdApi, getProductByIdApi, getProductsApi } from './api';
import { FilteredProductsPayload } from '@type/product.interface';
import { handleError } from 'utils/errorHandler';

// Worker Sagas
function* fetchProducts(action: PayloadAction<{ page?: number; size?: number }>): SagaIterator {
  try {
    const response = yield call(getProductsApi, action.payload);
    yield put(productActions.fetchProductsSuccess(response.data));
  } catch (error) {
    yield* handleError(error, 'Failed to load products.', productActions.fetchProductsFailure);
  }
}

function* fetchProductById(action: PayloadAction<{ id: number }>): SagaIterator {
  const { id } = action.payload;

  try {
    const response = yield call(getProductByIdApi, id);
    yield put(productActions.fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield* handleError(error, `Failed to load product with ID ${id}.`, productActions.fetchProductByIdFailure);
  }
}

function* fetchProductByCategoryId(action: PayloadAction<FilteredProductsPayload>): SagaIterator {
  const { categoryId } = action.payload;

  try {
    const response = yield call(getProductByCategoryIdApi, action.payload);
    yield put(productActions.fetchProductsByCategoryIdSuccess(response.data));
  } catch (error) {
    yield* handleError(error, `Failed to load product for category ID ${categoryId}.`, productActions.fetchProductsByCategoryIdFailure);
  }
}

// Watcher Saga
function* productWatcherSaga(): SagaIterator {
  yield takeLatest(productActions.fetchProductsRequest.type, fetchProducts);
  yield takeLatest(productActions.fetchProductByIdRequest.type, fetchProductById);
  yield takeLatest(productActions.fetchProductsByCategoryIdRequest.type, fetchProductByCategoryId);
}

export default productWatcherSaga;
