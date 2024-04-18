import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interface/user.interface';
import { RootState } from '../root/config.store';

interface AuthState {
  data: User | null; // Defining user data structure here
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  userLoading: boolean;
  userError: string;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  isAuthenticated: false,
  error: '',
  userLoading: false,
  userError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
    },
    register: (state, action: PayloadAction<User>) => {
    },
    // Should the current user stores in this slice???
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = null;
    },
    authIsLoading: (state) => {
      state.loading = true;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = '';
    },
    authFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    // 
    getUserIsLoading: (state) => {
      state.userLoading = true;
    },
    getUserByUsername: (state, action: PayloadAction<{ username: string }>) => {
      return state;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.userLoading = false;
      state.data = action.payload;
      state.userError = '';
    },
    getUserFailure: (state, action: PayloadAction<any>) => {
      state.userLoading = false;
      state.data = null;
      state.userError = action.payload;
    },
  },
});

export const authActions = {
  login: authSlice.actions.login,
  register: authSlice.actions.register,
  logout: authSlice.actions.logout,
  authIsLoading: authSlice.actions.authIsLoading,
  authSuccess: authSlice.actions.authSuccess,
  authFailure: authSlice.actions.authFailure,
  // 
  getUserByUsername: authSlice.actions.getUserByUsername,
  getUserIsLoading: authSlice.actions.getUserIsLoading,
  getUserSuccess: authSlice.actions.getUserSuccess,
  getUserFailure: authSlice.actions.getUserFailure,
};

// Selectors
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState): boolean => state.auth.loading;
export const selectAuthError = (state: RootState): string => state.auth.error;
export const selectSuccessError = (state: RootState): string => state.auth.error;
// 
export const selectUser = (state: RootState): User => state.auth.data;
export const selectUserLoading = (state: RootState): boolean => state.auth.userLoading;
export const selectUserError = (state: RootState): string => state.auth.userError;

// Reducer
export default authSlice.reducer;
