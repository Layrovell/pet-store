import { type SagaIterator } from '@redux-saga/core';
import { put, putResolve, select, take, takeEvery } from 'redux-saga/effects';

import { productActions } from './slice';
import { getProductsApi } from './api';
import { promiseActions } from '../promises/slice';
import { PRODUCT_KEY } from '../../store/config.store';

// Worker Sagas
export function* fetchProductsWorker(action: { payload: any }): SagaIterator {
  try {
    yield putResolve(promiseActions.promiseAsync(PRODUCT_KEY, getProductsApi(action.payload)));
    yield take(promiseActions.promiseResolved({ name: PRODUCT_KEY, data: {} }).type);

    const data = yield select((state) => state.promise);
    const products = data[PRODUCT_KEY]?.data;

    yield put(productActions.add(products));
    yield put(promiseActions.clearPromise({ name: PRODUCT_KEY }));
  } catch (e: unknown) {
    console.error('Error in fetchProductsWorker:', e);
  }
}

// Watcher Saga
function* productWatcherSaga(): SagaIterator {
  yield takeEvery(productActions.fetch, fetchProductsWorker);
}

export default productWatcherSaga;
