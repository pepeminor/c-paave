import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, select } from 'redux-saga/effects';
import { handleGetPriceToX } from './GetPriceToX';
import { handleGetRemainInfo } from './GetRemainInfo';
import { FinancialInfoState } from '../FinancialInfo.type';
import { getFinancialInfo } from '../FinancialInfo.action';
import { handleGetRevenueIncome } from './GetRevenueIncome';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

type SagaResponse = {
  priceToX: FinancialInfoState['info'];
  remainInfo: FinancialInfoState['info'];
  revenueIncome: FinancialInfoState['info'];
};

export function* handleGetFinancialInfo(action: PayloadAction<string>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const { priceToX, remainInfo, revenueIncome }: SagaResponse = yield all({
      priceToX: handleGetPriceToX(action),
      remainInfo: handleGetRemainInfo(action),
      revenueIncome: handleGetRevenueIncome(action),
    });
    yield put({
      type: getFinancialInfo.fulfilled,
      payload: {
        QUARTERLY: priceToX.QUARTERLY?.map(item => ({
          ...item,
          ...remainInfo.QUARTERLY?.find(
            remainItem => remainItem.quarter === item.quarter && remainItem.year === item.year
          ),
          ...revenueIncome.QUARTERLY?.find(
            revenueIncomeItem => revenueIncomeItem.quarter === item.quarter && revenueIncomeItem.year === item.year
          ),
        })),
        YEARLY: priceToX.YEARLY?.map(item => ({
          ...item,
          ...remainInfo.YEARLY?.find(remainItem => remainItem.year === item.year),
          ...revenueIncome.YEARLY?.find(revenueIncomeItem => revenueIncomeItem.year === item.year),
        })),
      } as FinancialInfoState['info'],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('Error in handleGetFinancialInfo: ', error);
  }
}
