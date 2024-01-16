import APIList from 'config/api';
import { ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import { IOrderStopHistoryParams, IOrderStopHistoryResponse } from 'interfaces/equity';
import { put, select } from 'redux-saga/effects';
import { EQUITY_GET_ORDER_STOP_HISTORY } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { FilterOption } from 'screens/OrderBook/constants';
import { createApiQuerySaga, formatDateToString, formatStringToDate, ObjectHandler } from 'utils';
import config from 'config';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export default createApiQuerySaga(EQUITY_GET_ORDER_STOP_HISTORY, {
  [DOMAIN_PAAVE]: {
    api: APIList.getOrderStopHistory,
    beforeQuery: prepareParams,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
  },
  [DOMAIN_KIS]: {
    api: APIList.getOrderStopHistoryKIS,
    beforeQuery: prepareParamsKis,
    callbackSuccess: handleSuccessKIS,
    callbackFail: handleFailed,
    mapSchema: {
      pageSize: 'fetchCount',
      pageNumber: 'offset',
    },
    accountNumberRequired: true,
  },
});

function handleDate(date?: Date) {
  return date ? formatDateToString(date, 'yyyyMMdd') || '' : '';
}

function* prepareParamsKis() {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.conditionOrderFilter);
  return {
    ...filterOption,
    fromDate: handleDate(filterOption.fromDate),
    toDate: handleDate(filterOption.toDate),
    status: filterOption.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.ALL ? undefined : filterOption.orderStatus,
    sellBuyType: filterOption.sellBuyType === SELL_BUY_TYPE_FILTER_VALUE.ALL ? undefined : filterOption.sellBuyType,
    pageSize: filterOption.pageNumber != null ? (filterOption.pageNumber + 1) * config.pageSizeKis : config.pageSizeKis, // offset wont work
  };
}

function* prepareParams() {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.conditionOrderFilter);
  return {
    ...filterOption,
    fromDate: handleDate(filterOption.fromDate),
    toDate: handleDate(filterOption.toDate),
    status: filterOption.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.ALL ? undefined : filterOption.orderStatus,
    sellBuyType: filterOption.sellBuyType === SELL_BUY_TYPE_FILTER_VALUE.ALL ? undefined : filterOption.sellBuyType,
    offset: (filterOption.pageNumber ?? 0) * (filterOption.pageSize ?? 0),
  };
}

function* handleSuccess(response: IResponse<IOrderStopHistoryResponse>, action: IAction<IOrderStopHistoryParams>) {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.conditionOrderFilter);
  if (response && action.response) {
    yield put({
      type: action.response.success,
      payload: response.data,
      hideLoading: true,
      loadMore: Boolean(filterOption.pageNumber),
    });
  }
}

function* handleSuccessKIS(response: IResponse<IOrderStopHistoryResponse[]>, action: IAction<IOrderStopHistoryParams>) {
  const dateStringKIS2PAAVE = (dateString: string) => {
    const result: Date = formatStringToDate(dateString, dateString.length === 8 ? 'yyyyMMdd' : 'yyyyMMddHHmmss');
    return formatDateToString(result, 'HH:mm:ss dd/MM/yyyy')!;
  };
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.conditionOrderFilter);
  if (response && action.response) {
    const filterResponseWithLoadMore: IOrderStopHistoryResponse[] = response.data.slice(
      filterOption.pageNumber != null ? filterOption.pageNumber * config.pageSizeKis : 0
    );
    yield put({
      type: action.response.success,
      payload: filterResponseWithLoadMore.map(
        item =>
          new ObjectHandler(item)
            .mapFields({
              stopOrderId: 'stopOrderID',
              createTime: {
                key: 'orderDateTime',
                transformValue: dateStringKIS2PAAVE,
              },
              code: 'stockCode',
            })
            .setField('modifiable', item.status === 'PENDING')
            .setField('cancellable', item.status === 'PENDING').obj
      ),
      hideLoading: true,
      loadMore: Boolean(filterOption.pageNumber),
    });
  }
}

function* handleFailed(action: IAction<IOrderStopHistoryParams>, _error: any) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
    // if (error.code) alertMessage('danger', error.code);
  }
}
