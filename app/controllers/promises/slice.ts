import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

enum PromiseStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  RESOLVED = 'RESOLVED',
}

const initialState: {[key: string]: any} = {};

const promiseSlice = createSlice({
  name: 'promise',
  initialState,
  reducers: {
    promise: (state, action: PayloadAction<{ status: PromiseStatus; data?: any; error?: any; name: string }>) => {
      const { name, ...rest } = action.payload;
      state[name] = { ...rest };
    },
    promisePending: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      state[name] = { status: PromiseStatus.PENDING };
    },
    promiseResolved: (state, action: PayloadAction<{ name: string; data: any }>) => {
      const { name, data } = action.payload;
      state[name] = { status: PromiseStatus.RESOLVED, data };
    },
    promiseRejected: (state, action: PayloadAction<{ name: string; error: any }>) => {
      const { name, error } = action.payload;
      state[name] = { status: PromiseStatus.REJECTED, error };
    },
    clearPromise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      state[name] = {
        ...state[name],
        data: null,
      }
    },
    setPromise: (state, action: PayloadAction<{ name: string, promise: Promise<any> }>) => {
    }
  },
});

export const promiseActions = {
  promisePending: promiseSlice.actions.promisePending,
  promiseResolved: promiseSlice.actions.promiseResolved,
  promiseRejected: promiseSlice.actions.promiseRejected,
  promiseAsync: (name: string, promise: Promise<any>) => ({ type: 'promise/AUTH_PROMISE', payload: { promise, name } }),
  clearPromise: promiseSlice.actions.clearPromise,
};

// Selectors
export const selectIsLoading = (state: any, name: string): boolean => state[name]?.status === PromiseStatus.PENDING;
export const getSelectApiData = (name: string) => (state: any): any => state.promise[name]?.data;
export const selectApiError = (name: string) => (state: any): string => state.promise[name]?.error;
export const selectAllState = (state: any) => state.promise;

// Reducer
export default promiseSlice.reducer;
