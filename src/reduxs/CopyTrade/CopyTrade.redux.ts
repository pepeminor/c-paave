import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CopyTradeState } from './CopyTrade.type';
import * as CopyTradeCustomAction from './CopyTrade.action';
import { GetCopySubscriptionResponse } from 'interfaces/CopyTrade';
import { PersistConfig, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: CopyTradeState = {
  modalFirstOpen: false,
  termAndConditionViewed: false,
  subscription: {},
  copyTradeBanner: true,
};

export const copyTradeSlice = createSlice({
  name: 'copyTradeState',
  initialState,
  reducers: {
    setModalFirstOpen: state => {
      state.modalFirstOpen = true;
    },
    setTermAndConditionViewed: state => {
      state.termAndConditionViewed = true;
    },
    openCopyTradeBanner: state => {
      state.copyTradeBanner = true;
    },
    closeCopyTradeBanner: state => {
      state.copyTradeBanner = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      CopyTradeCustomAction.getCopyTradeSubscription.fulfilled,
      (state, action: PayloadAction<GetCopySubscriptionResponse[]>) => {
        state.subscription = action.payload.reduce((obj, item) => {
          obj[item.subAccount] = item;
          return obj;
        }, {} as Record<string, GetCopySubscriptionResponse>);
      }
    );
    builder.addCase(CopyTradeCustomAction.subscribeCopyTrade.rejected, state => {
      state.subscription = {};
    });
    builder.addCase(CopyTradeCustomAction.resetCopyTradeSubscription.type, state => {
      state.subscription = {};
    });
    builder.addCase(
      CopyTradeCustomAction.subscribeCopyTrade.fulfilled,
      (state, action: PayloadAction<GetCopySubscriptionResponse>) => {
        state.subscription[action.payload.subAccount] = action.payload;
      }
    );
    builder.addCase(
      CopyTradeCustomAction.editCopyTradeSubscription.fulfilled,
      (state, action: PayloadAction<GetCopySubscriptionResponse>) => {
        state.subscription[action.payload.subAccount] = action.payload;
      }
    );
    builder.addCase(CopyTradeCustomAction.unSubscribeCopyTrade.fulfilled, (state, action: PayloadAction<string>) => {
      delete state.subscription[action.payload];
    });
  },
});

export const CopyTradeAction = { ...copyTradeSlice.actions, ...CopyTradeCustomAction };

const persistConfig: PersistConfig<ReturnType<typeof copyTradeSlice.reducer>> = {
  key: copyTradeSlice.name,
  storage: AsyncStorage,
  blacklist: [],
};

export default persistReducer(persistConfig, copyTradeSlice.reducer) as unknown as typeof copyTradeSlice.reducer;
