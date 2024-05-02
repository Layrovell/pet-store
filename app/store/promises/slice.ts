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
  },
});

export const promiseActions = {
  // promise: promiseSlice.actions.promise,
  promisePending: (name: string) => promiseSlice.actions.promise({ status: PromiseStatus.PENDING, name }),
  promiseResolved: (name: string, data: any) =>
    promiseSlice.actions.promise({ status: PromiseStatus.RESOLVED, name, data }),
  promiseRejected: (name: string, error: any) =>
    promiseSlice.actions.promise({ status: PromiseStatus.REJECTED, name, error }),
  promiseAsync: (name: string, promise: Promise<any>) => ({ type: 'promise/AUTH_PROMISE', payload: { promise, name } }),
};

// Selectors
export const selectIsLoading = (state: any, name: string): boolean => state[name]?.status === PromiseStatus.PENDING;
export const getSelectApiData = (name: string) => (state: any): any => state.promise[name]?.data;
export const selectApiError = (name: string) => (state: any): string => state.promise[name]?.error;
export const selectAllState = (state: any): boolean => state.promise;

// Reducer
export default promiseSlice.reducer;
