import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../root/config.store';
import { Product, StatusType } from '../../interface/product.interface';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<StatusType[]>) => {},
    productsIsLoading: (state) => {
      state.loading = true;
    },
    productsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    productsFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const productsActions = {
  getProducts: productSlice.actions.getProducts,
  productIsLoading: productSlice.actions.productsIsLoading,
  productsSuccess: productSlice.actions.productsSuccess,
  productsFailure: productSlice.actions.productsFailure,
};

// Selectors
export const selectProducts = (state: RootState): Product[] => state.product.products;
export const selectProductsLoading = (state: RootState): boolean => state.product.productsIsLoading;
export const selectProductsError = (state: RootState): string => state.product.productsFailure;

// Reducer
export default productSlice.reducer;
