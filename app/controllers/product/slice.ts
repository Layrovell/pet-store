import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { FilteredProductsPayload, Product } from '../../interface/product.interface';

interface ProductState {
  products: Product[];
  count: number;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  count: 0,
  product: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state, action: PayloadAction<{ page: number; size: number }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<{ content: Product[], count: number }>) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.content];
      state.count = action.payload.count;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // by id:
    fetchProductByIdRequest: (state, action: PayloadAction<{ id: number }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // by category:
    fetchProductsByCategoryIdRequest: (state, action: PayloadAction<FilteredProductsPayload>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsByCategoryIdSuccess: (state, action: PayloadAction<{ content: Product[], count: number }>) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.content];
      state.count = action.payload.count;
    },
    fetchProductsByCategoryIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.count = 0;
    }
  },
});

export const productActions = {
  fetchProductsRequest: productsSlice.actions.fetchProductsRequest,
  fetchProductsSuccess: productsSlice.actions.fetchProductsSuccess,
  fetchProductsFailure: productsSlice.actions.fetchProductsFailure,
  // by id:
  fetchProductByIdRequest: productsSlice.actions.fetchProductByIdRequest,
  fetchProductByIdSuccess: productsSlice.actions.fetchProductByIdSuccess,
  fetchProductByIdFailure: productsSlice.actions.fetchProductByIdFailure,
  // by category
  fetchProductsByCategoryIdRequest: productsSlice.actions.fetchProductsByCategoryIdRequest,
  fetchProductsByCategoryIdSuccess: productsSlice.actions.fetchProductsByCategoryIdSuccess,
  fetchProductsByCategoryIdFailure: productsSlice.actions.fetchProductsByCategoryIdFailure,

  clearProducts: productsSlice.actions.clearProducts,
};

// Reducer
export default productsSlice.reducer;
