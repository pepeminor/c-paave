import { EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE } from 'reduxs/actions';
import {
  IFollowingDailyProfitLossResponse,
  IFollowingDailyProfitLossParams,
  IAccumulativeProfitLossResponse,
} from 'interfaces/equity';
import { IResponse, IRequest } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { takeLeading } from 'redux-saga/effects';
import { FulfilledRequestError, query } from 'utils';
import { UserWallActions } from 'reduxs/UserWall';

function* doGetFollowingDailyProfitLossKis(request: IRequest<IFollowingDailyProfitLossParams>) {
  try {
    const response: IResponse<IFollowingDailyProfitLossResponse> = yield query(
      APIList.getFollowingDailyProfitLossKis,
      request.payload
    );

    try {
      const { fromDate, toDate, pageNumber = 0 } = request.payload;
      if (pageNumber > 0) {
        throw 'Abort';
      }
      const accResponse: IResponse<IAccumulativeProfitLossResponse> = yield query(
        APIList.getFollowingKisAccumulatedProfitLoss,
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
    if (err instanceof FulfilledRequestError) {
      yield put({
        type: request.response.fail,
        payload: { errorMessage: err.data.code },
        hideLoading: true,
      });
    }
  }
}

export default function* watchGetFollowingDailyProfitLoss() {
  yield takeLeading(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE, doGetFollowingDailyProfitLossKis);
}
