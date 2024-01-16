import { EQUITY_GET_PROFIT_LOSS_VIRTUAL } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { IProfitLossResponse } from 'interfaces/equity';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { query } from 'utils';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

const DEMO_DATA = {
  netAsset: 500000000,
  previousNetAsset: 500000000,
  netAssetReturn: 0,
  cashBalance: 500000000,
  buyingPower: 500000000,
  cashT0: 0,
  cashT1: 0,
  totalAwaitCash: 0,
  profitLossItems: [],
  sectorWeight: [],
  totalProfitLoss: 0,
  totalProfitLossRate: 0,
  stockBalance: 0,
  navProfitLoss: 0,
};

function* getProfitLoss(action: IAction<null>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: action.response?.success,
      payload: DEMO_DATA,
    });
    return;
  }

  try {
    const response: IResponse<IProfitLossResponse> = yield call(query, APIList.getProfitLoss);
    if (action.response && response.data) {
      yield put({
        type: action.response.success,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetVirtualProfitLoss() {
  yield takeLeading(EQUITY_GET_PROFIT_LOSS_VIRTUAL, getProfitLoss);
}
