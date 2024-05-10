import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../controllers/auth/slice';
import productSlice from '../controllers/product/slice';
import promiseSlice from '../controllers/promises/slice';
import categoriesSlice from '../controllers/category/slice';

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
