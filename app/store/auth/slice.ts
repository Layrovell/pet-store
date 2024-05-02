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
    addToken: (state, action: PayloadAction) => {
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
  login: (payload: { email: string; password: string }) => ({type: "auth/login", payload}),
  register: authSlice.actions.register,
  logout: authSlice.actions.logout,
  addUser: authSlice.actions.addUser,
};

// Selectors
export const selectUser = (state: RootState): User => state.auth.data;

// Reducer
export default authSlice.reducer;
