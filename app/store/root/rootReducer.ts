import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../../features/auth/slice';
import productSlice from '../product/slice';
import promiseSlice from '../../features/promises/slice';
import categoriesSlice from '../category/category.slice';

const appReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  promise: promiseSlice,
  categories: categoriesSlice,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
