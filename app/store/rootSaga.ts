import { all, fork } from 'redux-saga/effects';

import authWatcherSaga from '../features/auth/saga';
import productWatcherSaga from '../features/product/saga';
import promiseWatcherSaga from '../features/promises/saga';
import categoriesWatcherSaga from '../features/category/saga';

export default function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
    fork(productWatcherSaga),
    fork(promiseWatcherSaga),
    fork(categoriesWatcherSaga),
  ]);
}
