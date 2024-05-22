import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/config.store';
import { CategoryType } from '../../interface/category';

interface CategoriesState {
  categories: {
    content: CategoryType[];
    count?: number;
  } | null;
  attributes: any[];
  loading: {
    categories: boolean,
    attributes: boolean,
  };
  error: {
    categories: string | null,
    attributes: string | null,
  };
}

const initialState: CategoriesState = {
  categories: null,
  attributes: [],
  loading: {
    categories: false,
    attributes: false,
  },
  error: {
    categories: null,
    attributes: null,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoryRequest: (state, action: PayloadAction<{ page: number; size: number }>) => {
      state.loading.categories = true;
      state.error.categories = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<{ content: CategoryType[], count: number }>) => {
      state.loading.categories = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading.categories = false;
      state.error.categories = action.payload;
    },
    // attributes by category id
    fetchAttributesByCategoryIdRequest: (state, action: PayloadAction<number>) => {
      state.loading.attributes = true;
      state.error.attributes = null;
    },
    fetchAttributesByCategoryIdSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading.attributes = false;
      state.attributes = action.payload;
    },
    fetchAttributesByCategoryIdFailure: (state, action: PayloadAction<string>) => {
      state.loading.attributes = false;
      state.error.attributes = action.payload;
    },
  },
});

export const categoriesActions = {
  fetchCategoryRequest: categoriesSlice.actions.fetchCategoryRequest,
  fetchCategoriesSuccess: categoriesSlice.actions.fetchCategoriesSuccess,
  fetchCategoriesFailure: categoriesSlice.actions.fetchCategoriesFailure,
  // 
  fetchAttributesByCategoryIdRequest: categoriesSlice.actions.fetchAttributesByCategoryIdRequest,
  fetchAttributesByCategoryIdSuccess: categoriesSlice.actions.fetchAttributesByCategoryIdSuccess,
  fetchAttributesByCategoryIdFailure: categoriesSlice.actions.fetchAttributesByCategoryIdFailure,
};

// Selectors
export const selectCategories = (state: RootState): RootState => state.categories.categories;

// Reducer
export default categoriesSlice.reducer;
