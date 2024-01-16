import { put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { HotStockItem, HotStockState } from '../HotStock.type';
import { HotStockAction } from '../HotStock.reducer';
import { HotStockHelper } from '../HotStock.helper';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
import { DiscoverActions } from 'reduxs/Discover';

function* doUpdateHotStockParams(action: PayloadAction<Partial<HotStockState>>) {
  try {
    const state: HotStockState = yield select((state: IState) => state.HotStock);
    const newParams = action.payload;
    const queryParams = {
      type: newParams.hotStockType ?? state.hotStockType,
      period: newParams.hotStockPeriodType ?? state.hotStockPeriodType,
      order: newParams.hotStockOrderType ?? state.hotStockOrderType,
      source: newParams.hotStockSource ?? state.hotStockSource,
      pageNumber: newParams.hotStockPageNumber ?? state.hotStockPageNumber ?? 0,
      pageSize: newParams.hotStockPageSize ?? state.hotStockPageSize,
    };
    const isDemoAccount: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemoAccount && queryParams.source === 'KIS') {
      return;
    }
    const result: HotStockItem[] = yield HotStockHelper.queryHotStock(queryParams);
    yield put(HotStockAction.setHotStockList({ data: result, status: 'SUCCESS' }));
  } catch (error) {
    yield put(HotStockAction.setHotStockList({ data: [], status: 'FAILED' }));
  }
  yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshHotStockFinish: true }));
}

export default function* watchUpdateHotStockParams() {
  yield takeLatest(HotStockAction.updateHotStockParams.type, doUpdateHotStockParams);
}
