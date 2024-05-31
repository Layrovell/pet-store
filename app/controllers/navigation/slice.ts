import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/config.store';

export interface NavigationState {
  redirect: string | null;
  count: number;
  notifications: { key: string; notification: string }[];
}

const initialState: NavigationState = {
  redirect: null,
  count: 0,
  notifications: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setRedirect(state, action: PayloadAction<{ route: string }>) {
      state.redirect = action.payload.route;
    },
    incrementPendingRequestsCount(state) {
      state.count += 1;
    },
    decrementPendingRequestsCount(state) {
      state.count -= 1;
    },
    addNotification(state, action: PayloadAction<{ key: string; notification: string }>) {
      state.notifications.push(action.payload);
    },
    clearNotification(state, action: PayloadAction<{ key: string }>) {
      state.notifications = state.notifications.filter((n) => n.key !== action.payload.key);
    },
    clearAllNotifications(state) {
      state.notifications = [];
    },
  },
});

export const navigationActions = {
  setRedirect: navigationSlice.actions.setRedirect,
  incrementRequestCount: navigationSlice.actions.incrementPendingRequestsCount,
  decrementRequestCount: navigationSlice.actions.decrementPendingRequestsCount,
  addNotification: navigationSlice.actions.addNotification,
  clearNotification: navigationSlice.actions.clearNotification,
  clearAllNotifications: navigationSlice.actions.clearAllNotifications,
};

export const selectCurrentRoute = (state: RootState): RootState => state.navigation.currentRoute;

export default navigationSlice.reducer;
