import { IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { IProfitLossResponse } from '../../../interfaces/equity';
import { alertMessage } from 'utils/common';
import { call } from 'redux-saga/effects';
import { FulfilledRequestError, query } from 'utils';
import { ERROR } from 'constants/error';
import { InvestmentActions } from '../Investment.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadGetInvestmentListKisRequest } from '../Investment.type';

const getFollowingProfitLossKis = (payload: IPayloadGetInvestmentListKisRequest) => {
  return query(APIList.getFollowingProfitLossKis, payload.params);
};

export function* doGetFollowingProfitLossKis(request: PayloadAction<IPayloadGetInvestmentListKisRequest>) {
  try {
    const response: IResponse<IProfitLossResponse> = yield call(getFollowingProfitLossKis, request.payload);
    if (response.data != null) {
      yield put(
        InvestmentActions.getInvestmentListKisSuccess({
          profitLossResponse: response.data,
          isOtherUser: true,
        })
      );
      yield request.payload.callBack?.handleSuccess?.(response);
    }
  } catch (err) {
    if (err instanceof FulfilledRequestError) {
      if (err.data.code === ERROR.NET_ASSET_NOT_FOUND) {
        alertMessage('warning', ERROR.NET_ASSET_NOT_FOUND);
      }
    }
  }
}
