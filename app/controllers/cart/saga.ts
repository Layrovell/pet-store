import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CART_STORAGE_KEY, cartActions } from './slice';

type LoadCartDataFromStorageResult = ReturnType<typeof loadCartDataFromStorage>;

const loadCartDataFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return cartData != null ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart data from AsyncStorage:', error);
    return [];
  }
};

// Worker Sagas
function* loadCartDataSaga(): Generator<any, void, LoadCartDataFromStorageResult> {
  console.log('------ loadCartDataSaga -----');
  
  try {
    const cartData: LoadCartDataFromStorageResult = yield call(loadCartDataFromStorage);
    yield put(cartActions.loadCartData(cartData));
  } catch (error) {
    console.error('Error loading cart data:', error);
  }
}

function* handleAddItemAsyncSaga(action: PayloadAction): SagaIterator {
  yield put(cartActions.add(action.payload));
}

function* handleRemoveItemAsyncSaga(action: PayloadAction): SagaIterator {
  yield put(cartActions.remove(action.payload));
}

// Watcher Saga
export default function* cartSaga() {
  yield takeLatest(cartActions.loadCartData.type, loadCartDataSaga);
  yield takeLatest(cartActions.add.type, handleAddItemAsyncSaga);
  yield takeLatest(cartActions.remove.type, handleRemoveItemAsyncSaga);
}
