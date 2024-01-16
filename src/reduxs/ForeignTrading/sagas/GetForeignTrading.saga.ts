import { call, put, select, takeLatest } from 'redux-saga/effects';
import { formatDateToString, query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { ForeignTradingActions } from '../ForeignTrading.redux';
import { IResponse } from 'interfaces/common';
import { ForeignTradingResponse, ForeignTradingState, GetForeignTradingPayload } from '../ForeignTrading.type';
import { IState } from 'reduxs/global-reducers';

function* doGetForeignTrading(action: PayloadAction<GetForeignTradingPayload>) {
  try {
    const newData: Partial<ForeignTradingState> = {};
    const currentBuyData: Array<unknown> = yield select(
      (state: IState) => state.foreignTrading.foreignBuy[action.payload.marketType]
    );
    if (currentBuyData == null || action.payload.refresh) {
      const params = {
        marketType: action.payload.marketType,
        upDownType: 'DOWN',
      };
      const { data }: IResponse<ForeignTradingResponse[]> = yield call(query, APIList.getForeignTrading, params);
      newData.foreignBuy = {
        [action.payload.marketType]: data,
        lastUpdated: formatDateToString(new Date(), 'HH:mm dd/MM/yyyy'),
      };
    }
    const currentSellData: Array<unknown> = yield select(
      (state: IState) => state.foreignTrading.foreignSell[action.payload.marketType]
    );
    if (currentSellData == null || action.payload.refresh) {
      const params = {
        marketType: action.payload.marketType,
        upDownType: 'UP',
      };
      const { data }: IResponse<ForeignTradingResponse[]> = yield call(query, APIList.getForeignTrading, params);
      newData.foreignSell = {
        [action.payload.marketType]: data,
        lastUpdated: formatDateToString(new Date(), 'HH:mm dd/MM/yyyy'),
      };
    }
    yield put(ForeignTradingActions.getDataSuccess(newData));
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetForeignerTradingError', error);
  }
}

export default function* watchGetForeignTrading() {
  yield takeLatest(ForeignTradingActions.getData, doGetForeignTrading);
}
