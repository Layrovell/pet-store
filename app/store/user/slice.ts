import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interface/user.interface';
import { RootState } from '../root/config.store';

interface UserState {
  data: User | null; // Defining user data structure here
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserByUsername: (state, action: PayloadAction<{ username: string }>) => {
      return state;
    },
    getUserIsLoading: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    },
    getUserFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
    },
  },
});

export const userActions = {
  getUserByUsername: userSlice.actions.getUserByUsername,
  getUserIsLoading: userSlice.actions.getUserIsLoading,
  getUserSuccess: userSlice.actions.getUserSuccess,
  getUserFailure: userSlice.actions.getUserFailure,
};

// Selectors
export const selectUser = (state: RootState): User => state.user.data;
export const selectUserLoading = (state: RootState): boolean => state.user.loading;
export const selectUserError = (state: RootState): string => state.user.error;

// Reducer
export default userSlice.reducer;
