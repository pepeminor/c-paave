import { InvestmentActions } from './Investment.redux';
import { doGetFollowingProfitLossKis } from './sagas/getFollowingProfitLossKis';
import { getInvestment } from './sagas/onProfitlossQuery';
import { takeLatest } from 'redux-saga/effects';

export function* InvestmentSagas() {
  yield takeLatest(InvestmentActions.getInvestmentListRequest.type, getInvestment);
  yield takeLatest(InvestmentActions.getInvestmentListKisRequest.type, doGetFollowingProfitLossKis);
}
