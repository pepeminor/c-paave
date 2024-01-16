import APIList from 'config/api';
import { SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import { IOrderHistoryResponse } from 'interfaces/equity';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_ORDER_HISTORY } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { FilterOption } from 'screens/OrderBook/constants';
import { query, formatDateToString } from 'utils';

function handleDate(date?: Date) {
  return date ? formatDateToString(date, 'yyyyMMdd') || '' : '';
}

function* queryOrderHistory(filterOption: FilterOption) {
  const params = {
    ...filterOption,
    fromDate: handleDate(filterOption.fromDate),
    toDate: handleDate(filterOption.toDate),
    status: filterOption.orderStatus,
    sellBuyType: filterOption.sellBuyType === SELL_BUY_TYPE_FILTER_VALUE.ALL ? undefined : filterOption.sellBuyType,
  };
  const response: IResponse<IOrderHistoryResponse[]> = yield call(query, APIList.getOrderHistory, params);
  return response.data;
}

function* handleGetActiveOrder(action: IAction<undefined>) {
  try {
    const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.orderHistoryFilter);
    const orderHistory: IOrderHistoryResponse[] = yield queryOrderHistory(filterOption);
    if (orderHistory && action.response) {
      yield put({
        type: action.response.success,
        payload: orderHistory,
        hideLoading: true,
        loadMore: Boolean(filterOption.pageNumber),
      });
    }
  } catch (error) {
    if (action.response) {
      yield put({
        type: action.response.fail,
        hideLoading: true,
      });
    }
  }
}

export default function* getActiveOrder() {
  yield takeLeading(EQUITY_GET_ORDER_HISTORY, handleGetActiveOrder);
}
