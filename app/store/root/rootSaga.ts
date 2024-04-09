import { all, fork } from 'redux-saga/effects';

import userWatcherSaga from '../user/saga';

export default function* rootSaga() {
  yield all([
    fork(userWatcherSaga),
  ]);
}
