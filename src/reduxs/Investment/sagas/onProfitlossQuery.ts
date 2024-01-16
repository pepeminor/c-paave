import { put, call, select } from 'redux-saga/effects';
import { IResponse } from 'interfaces/common';
import { queryKis, query } from 'utils';
import { IProfitLossResponse } from 'interfaces/equity';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadGetInvestmentListRequest } from '../Investment.type';
import { InvestmentActions } from '../Investment.redux';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { SYSTEM_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';

export function* getInvestment(action: PayloadAction<IPayloadGetInvestmentListRequest>) {
  try {
    const { params, callBack, api, paramsOther, isLeaderBoard = false } = action.payload;

    const isSubD: boolean = yield select(
      (state: IState) => state.selectedAccount?.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
    );

    const whichQuery = !isLeaderBoard && isSubD ? queryKis : query;
    const response: IResponse<IProfitLossResponse> = yield call(whichQuery, api, paramsOther || params);

    if (response.data != null) {
      yield put(
        InvestmentActions.getInvestmentListSuccess({
          profitLossResponse: response.data,
          isOtherUser: isNotNilOrEmpty(paramsOther),
        })
      );

      yield callBack?.handleSuccess?.(response);
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail get investment', e);
    }
    return;
  }
}
