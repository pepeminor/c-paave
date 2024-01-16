import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from 'interfaces/common';
import { deepMapFields, query } from 'utils';
import { FinancialInfoState, FinancialRatioRemainResponse } from '../FinancialInfo.type';
import { select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { PeriodOptions } from 'screens/DiscoverStockInfoOverview/Financial/constants';

export function* handleGetRemainInfo(action: PayloadAction<string>) {
  try {
    const period: PeriodOptions = yield select((state: IState) => state.FinancialInfo.period);
    const { data: quarterData }: IResponse<FinancialRatioRemainResponse[]> = yield period === 'QUARTERLY' &&
      query(APIList.financialRatioQuarterly, {
        code: action.payload,
        sortAsc: true,
      });
    const mappedQuarters = quarterData?.map(item =>
      deepMapFields(item, { returnOnAsset: 'returnOnAssets', earningPerShare: 'earningsPerShare' })
    );
    const { data: yearData }: IResponse<FinancialRatioRemainResponse[]> = yield period === 'YEARLY' &&
      query(APIList.financialRatioYearly, {
        code: action.payload,
        sortAsc: true,
      });
    return {
      QUARTERLY: mappedQuarters,
      YEARLY: yearData,
    } as FinancialInfoState['info'];
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('Error in handleGetRemainInfo: ', error);
    return { QUARTERLY: [], YEARLY: [] };
  }
}
