import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from './Notification.type';

const initialState: NotificationState = {
  mode: 'DEFAULT',
  tab: 'Order',
  deletingList: [],
};

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<NotificationState['mode']>) {
      state.mode = action.payload;
      state.deletingList = [];
    },
    setTab(state, action: PayloadAction<NotificationState['tab']>) {
      state.tab = action.payload;
      state.mode = 'DEFAULT';
    },
    toggleDeleteCheckbox(state, action: PayloadAction<number>) {
      const isExist = state.deletingList.includes(action.payload);
      if (isExist) {
        state.deletingList = state.deletingList.filter(id => id !== action.payload);
      } else {
        state.deletingList = [...state.deletingList, action.payload];
      }
    },
    updateDeletingList(state, action: PayloadAction<number[]>) {
      state.deletingList = action.payload;
    },
  },
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
