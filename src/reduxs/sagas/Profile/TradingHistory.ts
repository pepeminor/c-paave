import { IAction, IResponse } from 'interfaces/common';
import { ITradingHistoryParams, ITradingHistoryResponse } from 'interfaces/profile';
import { put, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { PROFILE_GET_TRADING_HISTORY } from '../../actions';
import { query, formatStringToDate } from 'utils';
import { DATE_FORMAT_DISPLAY } from 'constants/main';

function* handleGetTradingHistory(action: IAction<ITradingHistoryParams>) {
  try {
    const { profileId, loadMore, page, pageSize, sort, profileSubAccount, fromDate, toDate } = action.payload;
    const response: IResponse<ITradingHistoryResponse> = yield query(APIList.getTradingHistory, {
      profileId,
      loadMore,
      pageSize,
      page,
      profileSubAccount,
      fromDate,
      toDate,
    });

    if (sort) {
      response.data.tradingHistories.sort((current, next) => {
        const currentDate = formatStringToDate(current.sellingDate, DATE_FORMAT_DISPLAY);
        const nextDate = formatStringToDate(next.sellingDate, DATE_FORMAT_DISPLAY);
        if (currentDate > nextDate) return -1;
        if (currentDate < nextDate) return 1;
        return 0;
      });
    }

    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
        loadMore: action.payload.loadMore,
      });
    yield action.callBack?.handleSuccess?.(response.data);
  } catch (error) {
    yield action.response != null &&
      put({
        type: action.response.fail,
        hideLoading: true,
      });
    yield action.callBack?.handleFail?.(error);
  }
}

export default function* watchGetAllPartner() {
  yield takeLeading(PROFILE_GET_TRADING_HISTORY, handleGetTradingHistory);
}
