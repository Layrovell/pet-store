import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interface/user.interface';
import { RootState } from '../root/config.store';

interface AuthState {
  data: User | null; // Defining user data structure here
}

const initialState: AuthState = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const authTypes = {
  login: 'auth/login',
  register: 'auth/register',
}

export const authActions = {
  login: (payload: { email: string; password: string }) => ({ type: authTypes.login, payload }),
  register: (payload: User) => ({ type: authTypes.register, payload }),
  logout: authSlice.actions.logout,
  addUser: authSlice.actions.addUser,
};

// Selectors
export const selectUser = (state: RootState): User => state.auth.data;

// Reducer
export default authSlice.reducer;
