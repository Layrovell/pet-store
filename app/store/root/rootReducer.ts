import { type Action, combineReducers } from '@reduxjs/toolkit';

import userReducer from '../user/slice';

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state: any, action: Action): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
