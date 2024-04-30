import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interface/user.interface';
import { RootState } from '../root/config.store';

interface AuthState {
  data: User | null; // Defining user data structure here
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
    },
    register: (state, action: PayloadAction<User>) => {
    },
    logout: (state) => {
      state.data = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const authActions = {
  login: authSlice.actions.login,
  register: authSlice.actions.register,
  logout: authSlice.actions.logout,
  addUser: authSlice.actions.addUser,
};

// Selectors
export const selectUser = (state: RootState): User => state.auth.data;

// Reducer
export default authSlice.reducer;
