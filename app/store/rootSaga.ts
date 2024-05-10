import { all, fork } from 'redux-saga/effects';

import authWatcherSaga from '../controllers/auth/saga';
import productWatcherSaga from '../controllers/product/saga';
import promiseWatcherSaga from '../controllers/promises/saga';
import categoriesWatcherSaga from '../controllers/category/saga';

export default function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
    fork(productWatcherSaga),
    fork(promiseWatcherSaga),
    fork(categoriesWatcherSaga),
  ]);
}
