import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../interface/product.interface';

interface ProductState {
  products: {
    content: Product[];
    count?: number;
  } | null;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
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
      state.products = {
        content: action.payload.content,
        count: action.payload.count,
      };
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
    fetchProductsByCategoryIdRequest: (state, action: PayloadAction<{ categoryId: number; page?: number; size?: number }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsByCategoryIdSuccess: (state, action: PayloadAction<{ content: Product[], count: number }>) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsByCategoryIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
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
};

// Reducer
export default productsSlice.reducer;
