import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { alertMessage, mapV2 } from 'utils/common';
import { FulfilledRequestError, formatDateToString, formatStringToDate, query } from 'utils';
import { UserWallActions } from '../UserWall.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { IFollowingDailyProfitLossRequest, IFollowingDailyProfitLossResponse } from '../UserWall.type';
import { ERROR } from 'constants/error';
import { formatDailyProfitLoss } from '../UserWall.helper';
import { ACCOUNT_TYPE } from 'global';
import { IResponse } from 'interfaces/common';
import { IAccumulativeProfitLossResponse } from 'interfaces/equity';
import { addDays } from 'date-fns';
import { IVNIndexResponse } from 'reduxs/DailyProfitLoss';
import { mapVNIndexReturnToChartData } from 'reduxs/DailyProfitLoss/DailyProfitLoss.helper';

export function* doGetFollowingDailyProfitLoss(request: PayloadAction<IFollowingDailyProfitLossRequest>) {
  try {
    // Get Profit Loss
    const response: IFollowingDailyProfitLossResponse = yield query(
      request.payload.accountType === ACCOUNT_TYPE.VIRTUAL
        ? APIList.getFollowingDailyProfitLoss
        : APIList.getFollowingDailyProfitLossKis,
      request.payload.params
    );

    let accData = {};
    try {
      if (response.data.followingDailyProfits.length === 0) {
        throw 'No Data';
      }
      const fromDate = response.data.followingDailyProfits[0].date;
      const { toDate } = request.payload.params;
      const accResponse: IResponse<IAccumulativeProfitLossResponse> = yield query(
        request.payload.accountType === ACCOUNT_TYPE.VIRTUAL
          ? APIList.getFollowingAccumulatedProfitLoss
          : APIList.getFollowingKisAccumulatedProfitLoss,
        {
          followingUserId: request.payload.params.followingUserId,
          fromDate: getNewFromDate(request.payload.accountType === ACCOUNT_TYPE.VIRTUAL, fromDate, toDate),
          toDate,
        }
      );
      accData = accResponse.data;
    } catch (err) {
      //
    }

    const [NAVDataPercent, VNIndexDataPercent, NetAssetValue, NavProfit, accumulatedProfit, accumulatedProfitRatio] =
      formatDailyProfitLoss(response);
    yield put(
      UserWallActions.getUserProfitLossSuccess({
        accountType: request.payload.accountType,
        userId: request.payload.params.followingUserId,
        period: request.payload.period,
        data: {
          NAVDataPercent,
          VNIndexDataPercent,
          NetAssetValue,
          NavProfit,
          dataProfitLoss: response.data.followingDailyProfits,
          accountCreatedDate: response.data.accountCreatedDate,
          accountLinkedDate: response.data.accountLinkedDate,
          accumulatedProfit,
          accumulatedProfitRatio,
          ...accData,
        },
      })
    );

    // Get VNIndex Return
    if (request.payload.accountType === ACCOUNT_TYPE.VIRTUAL) {
      return;
    }
    try {
      const { fromDate, pageSize, pageNumber } = request.payload.params;
      const { data }: IVNIndexResponse = yield query(APIList.vnindexReturn, {
        fromDate: getLatestDate(fromDate, response.data.accountLinkedDate),
        pageSize,
        pageNumber,
      });
      yield put(
        UserWallActions.getVNIndexReturnSuccess({
          [request.payload.period]: {
            normalizedRate: mapV2(data, mapVNIndexReturnToChartData),
          },
        })
      );
    } catch (error) {
      // Do nothing
    }
  } catch (err) {
    if (err instanceof FulfilledRequestError) {
      if (err.data.code === ERROR.NET_ASSET_NOT_FOUND) {
        alertMessage('warning', ERROR.NET_ASSET_NOT_FOUND);
      }
    }
    yield put(
      UserWallActions.getUserProfitLossFailed({
        userId: request.payload.params.followingUserId,
        accountType: request.payload.accountType,
      })
    );
  }
}

function getLatestDate(date?: string, anotherDate?: string) {
  if (date == null) return anotherDate;
  if (anotherDate == null) return date;
  return date > anotherDate ? date : anotherDate;
}

function getNewFromDate(isVirtual: boolean, fromDate?: string, toDate?: string) {
  if (isVirtual) {
    return fromDate;
  }
  if (fromDate === toDate) {
    return fromDate;
  }
  return formatDateToString(addDays(formatStringToDate(fromDate ?? '', 'yyyyMMdd'), 1));
}
