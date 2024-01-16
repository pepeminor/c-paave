import { EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE } from 'reduxs/actions';
import {
  IFollowingDailyProfitLossResponse,
  IFollowingDailyProfitLossParams,
  IAccumulativeProfitLossResponse,
} from 'interfaces/equity';
import { IResponse, IRequest } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { FulfilledRequestError, alertMessage, query } from 'utils';
import { takeLeading } from 'redux-saga/effects';
import { UserWallActions } from 'reduxs/UserWall';

export enum ERROR_CODE {
  NET_ASSET_NOT_FOUND = 'NET_ASSET_NOT_FOUND',
}

function* doGetFollowingDailyProfitLoss(request: IRequest<IFollowingDailyProfitLossParams>) {
  try {
    const response: IResponse<IFollowingDailyProfitLossResponse> = yield query(
      APIList.getFollowingDailyProfitLoss,
      request.payload
    );

    try {
      const { fromDate, toDate } = request.payload;
      const accResponse: IResponse<IAccumulativeProfitLossResponse> = yield query(
        APIList.getFollowingAccumulatedProfitLoss,
        {
          followingUserId: request.payload.followingUserId,
          fromDate,
          toDate,
        }
      );
      yield put(UserWallActions.getAccumulativeProfitLossByDateSuccess(accResponse.data));
    } catch (err) {
      //
    }

    yield put({
      type: request.response.success,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
    if (err instanceof FulfilledRequestError) {
      if (err.data.code === ERROR_CODE.NET_ASSET_NOT_FOUND) {
        alertMessage('warning', ERROR_CODE.NET_ASSET_NOT_FOUND);
      }
    }
  }
}

export default function* watchGetFollowingDailyProfitLoss() {
  yield takeLeading(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE, doGetFollowingDailyProfitLoss);
}
