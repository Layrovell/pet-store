import { all, fork } from 'redux-saga/effects';

import authWatcherSaga from '../auth/saga';

export default function* rootSaga() {
  yield all([
    fork(authWatcherSaga),
  ]);
}
