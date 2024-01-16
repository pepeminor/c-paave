import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from 'interfaces/common';
import { query } from 'utils';
import { FinancialInfoState, QuarterYearFinancialRatioResponse } from '../FinancialInfo.type';
import { select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';

export function* handleGetPriceToX(action: PayloadAction<string>) {
  try {
    const period: string = yield select((state: IState) => state.FinancialInfo.period.slice(0, -2));
    const {
      data: { quarters, years },
    }: IResponse<QuarterYearFinancialRatioResponse> = yield query(APIList.quarterYearFinancialRatio, {
      stockCode: action.payload,
      sortAsc: true,
      period,
    });
    return {
      QUARTERLY: quarters.map(item => {
        const { date, ...rest } = item;
        const parsedDate = new Date(date);
        return {
          ...rest,
          year: parsedDate.getFullYear(),
          quarter: Math.floor((parsedDate.getMonth() + 3) / 3),
        };
      }),
      YEARLY: years.map(item => {
        const { date, ...rest } = item;
        const parsedDate = new Date(date);
        return {
          ...rest,
          year: parsedDate.getFullYear(),
        };
      }),
    } as FinancialInfoState['info'];
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('Error in handleGetPriceToX: ', error);
    return { QUARTERLY: [], YEARLY: [] };
  }
}
