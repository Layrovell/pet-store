import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';

import { StatusType } from '../../interface/product.interface';
import { productsActions } from './slice';
import { getProductsApi } from '../../services/product/product.api';

// Worker Sagas
export function* fetchProductsWorker(action: { payload: StatusType[] }): SagaIterator {
  try {
    yield put(productsActions.productIsLoading());
    const data = yield call(getProductsApi, action.payload);
    yield put(productsActions.productsSuccess(data.data));
  } catch (e: unknown) {
    yield put(productsActions.productsFailure(`Sorry, couldn't load the products!`));
  }
}

// Watcher Saga
function* productWatcherSaga(): SagaIterator {
  yield takeEvery(productsActions.getProducts.type as any, fetchProductsWorker);
}

export default productWatcherSaga;
