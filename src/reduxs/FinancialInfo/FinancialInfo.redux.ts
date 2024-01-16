import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FinancialInfo, FinancialInfoState } from './FinancialInfo.type';
import * as CustomAction from './FinancialInfo.action';
import { IState } from 'reduxs/global-reducers';
import { mapV2 } from 'utils';
import { merge } from 'lodash';

const initialState: FinancialInfoState = {
  period: 'QUARTERLY',
  indicator: 'REVENUE',
  info: {
    QUARTERLY: [],
    YEARLY: [],
  },
};

export const FinancialInfoSelectors = {
  selectCurrentFinanceData: (state: IState) => {
    const { period, info } = state.FinancialInfo;
    return info[period];
  },
  selectData: (field: keyof FinancialInfo, period: FinancialInfoState['period']) => (state: IState) => {
    const { info } = state.FinancialInfo;
    return mapV2(info[period], item => ({
      quarter: item.quarter,
      year: item.year,
      value: item[field] ?? 0,
    }));
  },
};

const financialInfoSlice = createSlice({
  initialState,
  name: 'FinancialInfo',
  reducers: {
    resetFinancialInfo: () => initialState,
    setPeriod: (state, action: PayloadAction<FinancialInfoState['period']>) => {
      state.period = action.payload;
    },
    setIndicator: (state, action: PayloadAction<FinancialInfoState['indicator']>) => {
      state.indicator = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      CustomAction.getFinancialInfo.fulfilled,
      (state, action: PayloadAction<FinancialInfoState['info']>) => {
        state.info = merge(state.info, action.payload);
      }
    );
  },
});

export const FinancialInfoActions = { ...financialInfoSlice.actions, ...CustomAction };
export const FinancialInfoReducer = financialInfoSlice.reducer;
