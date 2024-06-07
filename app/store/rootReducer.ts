import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../controllers/auth/slice';
import productsSlice from '../controllers/product/slice';
import promiseSlice from '../controllers/promises/slice';
import categoriesSlice from '../controllers/category/slice';
import cartSlice from '../controllers/basket/slice';
import appSlice from '../controllers/app/slice';

const appReducer = combineReducers({
  auth: authSlice,
  products: productsSlice,
  promise: promiseSlice,
  categories: categoriesSlice,
  cart: cartSlice,
  app: appSlice,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
