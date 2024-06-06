import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../interface/user.interface';
import { RootState } from '../../store/config.store';

export interface AuthState {
  data: User | null; // Defining user data structure here
  loading: {
    login: boolean;
    register: boolean;
    updatePassword: boolean;
    updateEmail: boolean;
  };
  error: {
    login: string | null,
    register: string | null,
    updatePassword: string | null,
    updateEmail: string | null,
  };
  status: {
    updatePassword: number | null;
    updateEmail: number | null;
  };
}

const initialState: AuthState = {
  data: null,
  loading: {
    login: false,
    register: false,
    updatePassword: false,
    updateEmail: false,
  },
  error: {
    login: null,
    register: null,
    updatePassword: null,
    updateEmail: null,
  },
  status: {
    updatePassword: null,
    updateEmail: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading.login = true;
      state.error.login = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading.login = false;
      state.data = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading.login = false;
      state.error.login = action.payload;
    },
    // 
    registerRequest: (state, action: PayloadAction<User>) => {
      state.loading.register = true;
      state.error.register = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading.register = false;
      state.data = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading.register = false;
      state.error.register = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    // updating user password
    updatePasswordRequest: (state, action: PayloadAction<{ id: number, data: { password: string, oldPassword: string } }>) => {
      state.loading.updatePassword = true;
      state.error.updatePassword = null;
      state.status.updatePassword = null;
    },
    updatePasswordSuccess: (state, action: PayloadAction<any>) => {
      state.loading.updatePassword = false;
      state.status.updatePassword = action.payload;
    },
    updatePasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading.updatePassword = false;
      state.error.updatePassword = action.payload;
      state.status.updatePassword = null;
    },
    // updating user email
    updateEmailRequest: (state, action: PayloadAction<{ id: number, data: { password: string, email: string } }>) => {
      state.loading.updateEmail = true;
      state.error.updateEmail = null;
      state.status.updateEmail = null;
    },
    updateEmailSuccess: (state, action: PayloadAction<any>) => {
      state.loading.updateEmail = false;
      state.status.updateEmail = action.payload;
    },
    updateEmailFailure: (state, action: PayloadAction<string>) => {
      state.loading.updateEmail = false;
      state.error.updateEmail = action.payload;
      state.status.updateEmail = null;
    },
  },
});

export const authActions = {
  loginRequest: authSlice.actions.loginRequest,
  loginSuccess: authSlice.actions.loginSuccess,
  loginFailure: authSlice.actions.loginFailure,
  // 
  registerRequest: authSlice.actions.registerRequest,
  registerSuccess: authSlice.actions.registerSuccess,
  registerFailure: authSlice.actions.registerFailure,
  logout: authSlice.actions.logout,
  addUser: authSlice.actions.addUser,
  // 
  updatePasswordRequest: authSlice.actions.updatePasswordRequest,
  updatePasswordSuccess: authSlice.actions.updatePasswordSuccess,
  updatePasswordFailure: authSlice.actions.updatePasswordFailure,
  // 
  updateEmailRequest: authSlice.actions.updateEmailRequest,
  updateEmailSuccess: authSlice.actions.updateEmailSuccess,
  updateEmailFailure: authSlice.actions.updateEmailFailure,
};

// Selectors
export const selectUser = (state: RootState): User => state.auth.data;

// Reducer
export default authSlice.reducer;
