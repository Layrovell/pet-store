import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type NotificationType = {
  key: number;
  message: string;
  code?: number;
};

export type NavigationState = {
  redirect: string | null;
  // pendingRequests: number;
  notifications: NotificationType[];
}

const initialState: NavigationState = {
  redirect: null,
  // pendingRequests: 0,
  notifications: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRedirect(state, action: PayloadAction<string>) {
      state.redirect = action.payload;
    },
    clearRedirect: (state) => {
      state.redirect = null;
    },
    // incrementPending(state) {
    //   state.pendingRequests += 1;
    // },
    // decrementPending(state) {
    //   state.pendingRequests -= 1;
    // },
    addNotification(state, action: PayloadAction<NotificationType>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<{ key: number }>) {
      state.notifications = state.notifications.filter((n) => n.key !== action.payload.key);
    },
    clearAllNotifications(state) {
      state.notifications = [];
    },
  },
});

export const appActions = {
  setRedirect: appSlice.actions.setRedirect,
  clearRedirect: appSlice.actions.clearRedirect,
  addNotification: appSlice.actions.addNotification,
  removeNotification: appSlice.actions.removeNotification,
  clearAllNotifications: appSlice.actions.clearAllNotifications,
};

export default appSlice.reducer;
