import { all, fork } from 'redux-saga/effects';

import authWatcherSaga from '../auth/saga';
import productWatcherSaga from '../product/saga';
import promiseWatcherSaga from '../promises/saga';
import categoriesWatcherSaga from '../category/category.saga';

export default function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
    fork(productWatcherSaga),
    fork(promiseWatcherSaga),
    fork(categoriesWatcherSaga),
  ]);
}
