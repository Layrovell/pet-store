import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/config.store';
import { CategoryType } from '../../interface/category';

interface CategoriesState {
  categories: {
    content: CategoryType[];
    count?: number;
  } | null;
  attributes: any[];
  categoryById: {};
  loading: {
    categories: boolean,
    attributes: boolean,
    categoryById: boolean;
  };
  error: {
    categories: string | null,
    attributes: string | null,
    categoryById: string | null,
  };
}

const initialState: CategoriesState = {
  categories: null,
  attributes: [],
  categoryById: {},
  loading: {
    categories: false,
    attributes: false,
    categoryById: false,
  },
  error: {
    categories: null,
    attributes: null,
    categoryById: null,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoryRequest: (state, action: PayloadAction<{ page: number; size: number } | undefined>) => {
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
    // category by id
    fetchCategoryByIdRequest: (state, action: PayloadAction<number>) => {
      state.loading.categoryById = true;
      state.error.categoryById = null;
    },
    fetchCategoryByIdSuccess: (state, action: PayloadAction<CategoryType>) => {
      state.loading.categoryById = false;
      state.categoryById = action.payload;
    },
    fetchCategoryByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading.categoryById = false;
      state.error.categoryById = action.payload;
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
  // 
  fetchCategoryByIdRequest: categoriesSlice.actions.fetchCategoryByIdRequest,
  fetchCategoryByIdSuccess: categoriesSlice.actions.fetchCategoryByIdSuccess,
  fetchCategoryByIdFailure: categoriesSlice.actions.fetchCategoryByIdFailure,
};

// Selectors
export const selectCategories = (state: RootState): RootState => state.categories.categories;

// Reducer
export default categoriesSlice.reducer;
