import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../auth/slice';
import productSlice from '../product/slice';
import promiseSlice from '../promises/slice';

const appReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  promise: promiseSlice,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
