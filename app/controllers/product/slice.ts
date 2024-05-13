import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/config.store';
import { Product } from '../../interface/product.interface';

interface ProductState {
  data: {
    content: Product[];
    count?: number;
  } | null;
}

const initialState: ProductState = {
  data: null,
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
};

// Selectors
export const selectProducts = (state: RootState): any => state.product.data;

// Reducer
export default productSlice.reducer;
