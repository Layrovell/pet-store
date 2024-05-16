import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/config.store';
import { CategoryType } from '../../interface/category';

interface CategoriesState {
  categories: {
    content: CategoryType[];
    count?: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoryRequest: (state, action: PayloadAction<{ page: number; size: number }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<{ content: CategoryType[], count: number }>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const categoriesActions = {
  fetchCategoryRequest: categoriesSlice.actions.fetchCategoryRequest,
  fetchCategoriesSuccess: categoriesSlice.actions.fetchCategoriesSuccess,
  fetchCategoriesFailure: categoriesSlice.actions.fetchCategoriesFailure,
};

// Selectors
export const selectCategories = (state: RootState): RootState => state.categories.categories;

// Reducer
export default categoriesSlice.reducer;
