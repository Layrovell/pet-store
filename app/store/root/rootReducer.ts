import { type Action, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../auth/slice';

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
