import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPayloadGetDailyProfitLossListRequest,
  IPayloadGetDailyProfitLossListSuccess,
  IDailyProfitLoss,
  IPayloadGetDailyProfitLossListKISRequest,
  IVNIndexReturn,
} from './DailyProfitLoss.type';
import { ReducerStatus } from 'interfaces/reducer';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
import { generateDemoProfitLoss } from './DailyProfitLoss.helper';
import { SIGNOUT } from 'reduxs/actions';
import { merge } from 'lodash';

const initialState = {
  dailyProfitLoss: {
    [ACCOUNT_TYPE.KIS]: {
      accountCreatedDate: '',
      accountLinkedDate: '',
      data: {} as IDailyProfitLoss,
    },
    [ACCOUNT_TYPE.VIRTUAL]: {
      accountCreatedDate: '',
      accountLinkedDate: '',
      data: {} as IDailyProfitLoss,
    },
    [ACCOUNT_TYPE.DEMO]: {
      accountCreatedDate: '',
      accountLinkedDate: '',
      data: {} as IDailyProfitLoss,
    },
  },
  dailyProfitLossStatus: ReducerStatus.LOADING,
  vnindexReturn: {} as IVNIndexReturn,
  refreshing: false,
};

export const DailyProfitLossSelectors = {
  selectDailyProfitLossDer: (accountNumber: string) => (state: IState) =>
    state.DailyProfitLossReducer?.dailyProfitLoss[ACCOUNT_TYPE.KIS]?.data?.[accountNumber]?.['7']?.dataProfitLoss || [],
  selectCreateDate: (accountType: ACCOUNT_TYPE) => (state: IState) =>
    state.DailyProfitLossReducer.dailyProfitLoss[accountType].accountCreatedDate,
};

const dailyProfitLossSlice = createSlice({
  initialState,
  name: 'DailyProfitLoss',
  reducers: {
    getDailyProfitLossListRequest(state, _action: PayloadAction<IPayloadGetDailyProfitLossListRequest>) {
      state.dailyProfitLossStatus = ReducerStatus.LOADING;
    },
    getDailyProfitLossListSuccess(state, action: PayloadAction<IPayloadGetDailyProfitLossListSuccess>) {
      const { accountNumber, days } = action.payload;
      const data = state.dailyProfitLoss[ACCOUNT_TYPE.VIRTUAL].data[accountNumber];
      state.dailyProfitLoss[ACCOUNT_TYPE.VIRTUAL].data[accountNumber] = merge(data, {
        [days]: action.payload.dataProfitLoss,
      });
      state.dailyProfitLoss[ACCOUNT_TYPE.VIRTUAL].accountCreatedDate = action.payload.accountCreatedDate;
      state.dailyProfitLoss[ACCOUNT_TYPE.VIRTUAL].accountLinkedDate = action.payload.accountLinkedDate;
      state.dailyProfitLossStatus = ReducerStatus.SUCCESS;
    },
    getDailyProfitLossListFailure(state) {
      state.dailyProfitLossStatus = ReducerStatus.FAILED;
      state.dailyProfitLoss[ACCOUNT_TYPE.VIRTUAL].data = {} as IDailyProfitLoss;
    },
    getDailyProfitLossKISRequest(state, _action: PayloadAction<IPayloadGetDailyProfitLossListKISRequest>) {
      state.dailyProfitLossStatus = ReducerStatus.LOADING;
    },
    getDailyProfitLossKISSuccess(state, action: PayloadAction<IPayloadGetDailyProfitLossListSuccess>) {
      const { accountNumber, days } = action.payload;
      const data = state.dailyProfitLoss[ACCOUNT_TYPE.KIS].data[accountNumber];
      state.dailyProfitLoss[ACCOUNT_TYPE.KIS].data[accountNumber] = merge(data, {
        [days]: action.payload.dataProfitLoss,
      });

      state.dailyProfitLoss[ACCOUNT_TYPE.KIS].accountCreatedDate = action.payload.accountCreatedDate;
      state.dailyProfitLoss[ACCOUNT_TYPE.KIS].accountLinkedDate = action.payload.accountLinkedDate;
      state.dailyProfitLossStatus = ReducerStatus.SUCCESS;
    },
    getVNIndexReturnSuccess(state, action: PayloadAction<IVNIndexReturn>) {
      state.vnindexReturn = {
        ...state.vnindexReturn,
        ...action.payload,
      };
    },
    getDailyProfitLossKISFailure(state) {
      state.dailyProfitLossStatus = ReducerStatus.FAILED;
      state.dailyProfitLoss[ACCOUNT_TYPE.KIS].data = {} as IDailyProfitLoss;
    },
    getDailyProfitLossDemoRequest(state, _action: PayloadAction<number>) {
      const dataDemo = generateDemoProfitLoss();
      const data = state.dailyProfitLoss[ACCOUNT_TYPE.DEMO].data[ACCOUNT_TYPE.DEMO];
      state.dailyProfitLoss[ACCOUNT_TYPE.DEMO].data[ACCOUNT_TYPE.DEMO] = merge(data, dataDemo);
      state.dailyProfitLossStatus = ReducerStatus.SUCCESS;
    },
    refreshDailyProfitLoss(state, action: PayloadAction<boolean>) {
      state.refreshing = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(SIGNOUT, () => {
      return initialState;
    });
  },
});

export const DailyProfitLossActions = dailyProfitLossSlice.actions;
export const DailyProfitLossReducer = dailyProfitLossSlice.reducer;
