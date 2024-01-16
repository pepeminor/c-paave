import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig, persistReducer } from 'redux-persist';
import { IState } from 'reduxs/global-reducers';
import { IDefaultAccount, NotificationType } from './Setting.type';
import { merge } from 'lodash';
import { SIGNOUT } from 'reduxs/actions';

const initialState = {
  accountDefault: {} as IDefaultAccount,
  notShowAgainKisOTP: false,
  notifications: {
    aiRating: false,
    theme: false,
    vnindexReturns: false,
    pinnedNews: false,
  },
  isUpdateAllNotifications: false,
};

export type SettingState = typeof initialState;

export const SettingSelectors = {
  selectedAccountDefault: (userId: string) => (state: IState) => state.SettingReducer.accountDefault[userId],
  selectNotShowAginKisOTP: (state: IState) => state.SettingReducer.notShowAgainKisOTP,
  selectNotifications: (state: IState) => state.SettingReducer.notifications,
  selectIsUpdateAllNotifications: (state: IState) => state.SettingReducer.isUpdateAllNotifications,
};

const settingSlice = createSlice({
  initialState,
  name: 'Setting',
  reducers: {
    setAccountDefault: (state, action: PayloadAction<{ userId: string; sub: string }>) => {
      const { userId, sub } = action.payload;
      state.accountDefault = merge(state.accountDefault, { [userId]: sub });
    },
    setNotShowAgainKisOTP: (state, action: PayloadAction<boolean>) => {
      state.notShowAgainKisOTP = action.payload;
    },
    changeNotifications: (state, action: PayloadAction<{ key: NotificationType; value: boolean }>) => {
      const { key, value } = action.payload;

      state.notifications = merge(state.notifications, { [key]: value });
    },
    updateAllNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications.aiRating = action.payload;
      state.notifications.theme = action.payload;
      state.notifications.vnindexReturns = action.payload;
      state.notifications.pinnedNews = action.payload;
      state.isUpdateAllNotifications = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(SIGNOUT, state => {
      state.notShowAgainKisOTP = false;
    });
  },
});
const persistConfig: PersistConfig<ReturnType<typeof settingSlice.reducer>> = {
  key: 'Setting',
  storage: AsyncStorage,
  whitelist: ['accountDefault', 'notShowAgainKisOTP', 'notifications', 'isUpdateAllNotifications'],
};

export const SettingActions = settingSlice.actions;
export const SettingReducer = persistReducer(persistConfig, settingSlice.reducer);
