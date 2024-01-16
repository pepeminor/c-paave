import APIList from 'config/api';
import { SpecialErrorCode } from 'constants/enum';
import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import {
  IKisGetEqtEnquiryHistoryOrderResponse,
  IKisGetEqtEnquiryHistoryOrderParams,
  IEqtOrderHistoryMappingResponse,
} from 'interfaces/services';
import lodash from 'lodash';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { FilterOption } from 'screens/OrderBook/constants';
import { FulfilledRequestError, dateStringKIS2PAAVE, formatDateToString, queryKis } from 'utils';
import config from 'config';

function handleDate(date?: Date) {
  return formatDateToString(date || null, 'yyyyMMdd') || '';
}

function* sagaHandling(action: IAction<null>) {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.orderHistoryFilter);
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  try {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && selectedAccount.selectedSubAccount?.accountNumber != null) {
      const params: IKisGetEqtEnquiryHistoryOrderParams = {
        clientID: selectedAccount.username,
        accountNo: selectedAccount.selectedSubAccount?.accountNumber,
        fromDate: handleDate(filterOption.fromDate),
        toDate: handleDate(filterOption.toDate),
        sellBuyType: filterOption.sellBuyType || SELL_BUY_TYPE_FILTER_VALUE.ALL,
        status: filterOption.orderStatus || ALL_ORDER_STATUS_FILTER_VALUE.ALL,
        offset: filterOption.pageNumber ?? 0,
        fetchCount:
          filterOption.pageNumber != null ? (filterOption.pageNumber + 1) * config.pageSizeKis : config.pageSizeKis,
      };
      const response: IResponse<IKisGetEqtEnquiryHistoryOrderResponse[]> = yield call(
        queryKis,
        APIList.getKisEqtEnquiryHistoryOrder,
        params
      );

      const filterResponseWithLoadMore: IKisGetEqtEnquiryHistoryOrderResponse[] = response.data.slice(
        filterOption.pageNumber != null ? filterOption.pageNumber * config.pageSizeKis : 0
      );

      const newResponse: IEqtOrderHistoryMappingResponse[] = [];

      filterResponseWithLoadMore.forEach(obj => {
        obj.orderTime = dateStringKIS2PAAVE(obj.orderTime);
        const newObj = lodash.mapKeys(obj, (_value, key) => {
          switch (key) {
            case 'orderNo':
              return 'orderID';

            case 'orderTime':
              return 'orderDateTime';

            case 'symbol':
              return 'stockCode';

            case 'orderQty':
              return 'orderQuantity';

            case 'matchedQty':
              return 'matchedQuantity';

            default:
              return key;
          }
        }) as IEqtOrderHistoryMappingResponse;
        newResponse.push(newObj);
      });

      yield action.response != null &&
        put({
          type: action.response.success,
          payload: newResponse,
          hideLoading: true,
          loadMore: Boolean(filterOption.pageNumber),
        });
    } else {
      yield action.response != null && put({ type: action.response.fail });
    }
  } catch (error) {
    if (error instanceof FulfilledRequestError) {
      if (error.data.code?.match(SpecialErrorCode.SERVICE_UNAVAILABLE) != null) {
        yield action.response != null &&
          put({
            type: action.response.success,
            payload: [],
            hideLoading: true,
            loadMore: Boolean(filterOption.pageNumber),
          });
      } else {
        yield action.response != null &&
          put({
            type: action.response.fail,
          });
      }
    }
  }
}

export default function* watchOnGetEquityEnquiryHistoryOrder() {
  yield takeLeading(SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER, sagaHandling);
}
