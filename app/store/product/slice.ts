import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../root/config.store';
import { Product } from '../../interface/product.interface';

interface ProductState {
  data: {
    content: Product[];
    count?: number;
  };
}

const initialState: ProductState = {
  data: {
    content: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetch: (state, action: PayloadAction<any>) => {},
    add: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const productActions = {
  fetch: productSlice.actions.fetch,
  add: productSlice.actions.add,
  // addProducts: (payload: any) => ({ type: productTypes.fetchAll, payload }),
};

// Selectors
export const selectProducts = (state: RootState): any => state.product.data;

// Reducer
export default productSlice.reducer;
