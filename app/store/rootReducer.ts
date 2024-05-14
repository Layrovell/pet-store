import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../controllers/auth/slice';
import productSlice from '../controllers/product/slice';
import promiseSlice from '../controllers/promises/slice';
import categoriesSlice from '../controllers/category/slice';
import cartSlice from '../controllers/cart/slice';

const appReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  promise: promiseSlice,
  categories: categoriesSlice,
  cart: cartSlice,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
