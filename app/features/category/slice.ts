import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/config.store';

interface CategoriesState {
  data: {
    content: any[];
    count?: number;
  };
}

const initialState: CategoriesState = {
  data: {
    content: [],
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetch: (state, action: PayloadAction<any>) => {},
    add: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const categoriesActions = {
  fetch: categoriesSlice.actions.fetch,
  add: categoriesSlice.actions.add,
};

// Selectors
export const selectCategories = (state: RootState): any => state.categories.data;

// Reducer
export default categoriesSlice.reducer;
