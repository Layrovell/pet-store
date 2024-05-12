import { type SagaIterator } from '@redux-saga/core';
import { put, putResolve, select, take, takeEvery } from 'redux-saga/effects';

import { promiseActions } from '../promises/slice';
import { categoriesActions } from './slice';
import { getCategoriesApi } from './api';
import { CATEGORIES_KEY } from '../../store/config.store';

// Worker Sagas
export function* fetchCategoriesWorker(action: { payload: any }): SagaIterator {
  try {
    yield putResolve(promiseActions.promiseAsync(CATEGORIES_KEY, getCategoriesApi(action.payload)));
    yield take(promiseActions.promiseResolved({ name: CATEGORIES_KEY, data: {} }).type);

    const data = yield select((state) => state.promise);
    const categories = data[CATEGORIES_KEY]?.data;

    yield put(categoriesActions.add(categories));
    yield put(promiseActions.clearPromise({ name: CATEGORIES_KEY }));
  } catch (e: unknown) {
    console.error('Error in fetchCategoriesWorker:', e);
  }
}

// Watcher Saga
function* categoriesWatcherSaga(): SagaIterator {
  yield takeEvery(categoriesActions.fetch, fetchCategoriesWorker);
}

export default categoriesWatcherSaga;
