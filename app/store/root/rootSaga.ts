import { all, fork } from 'redux-saga/effects';

import authWatcherSaga from '../auth/saga';
import productWatcherSaga from '../product/saga';

export default function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
    fork(productWatcherSaga),
  ]);
}
