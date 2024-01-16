import APIList from 'config/api';
import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE, SYSTEM_TYPE } from 'global';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import {
  IKisGetEqtEnquiryOrderResponse,
  IKisGetEqtEnquiryOrderParams,
  IEqtOrderHistoryMappingResponse,
} from 'interfaces/services';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_ENQUIRY_ORDER } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { FilterOption } from 'screens/OrderBook/constants';
import { queryKis, dateStringKIS2PAAVE, FulfilledRequestError } from 'utils';
import lodash from 'lodash';
import { SpecialErrorCode } from 'constants/enum';

enum ORDER_STATUS_FILTER_PENDING_TO_MARKET {
  READYTOSEND = 'READY_TO_SEND',
  INACTIVE = 'INACTIVE_ORDER',
  PENDINGAPPROVAL = 'PENDING_APPROVAL',
  SENDING = 'SENDING',
}

function* sagaHandling(action: IAction<null>) {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.activeOrderFilter);
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  try {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && selectedAccount.selectedSubAccount?.accountNumber != null) {
      const params: IKisGetEqtEnquiryOrderParams = {
        clientID: selectedAccount.username,
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        sellBuyType: filterOption.sellBuyType || SELL_BUY_TYPE_FILTER_VALUE.ALL,
        systemType: SYSTEM_TYPE.EQUITY,
        status: filterOption.orderStatus || ALL_ORDER_STATUS_FILTER_VALUE.ALL,
        stockSymbol: '',
        offset:
          filterOption.pageNumber != null && filterOption.pageSize != null
            ? filterOption.pageNumber * filterOption.pageSize
            : undefined,
        fetchCount: filterOption.pageSize,
      };

      const response: IResponse<{ beanList: IKisGetEqtEnquiryOrderResponse[] }> = yield call(
        queryKis,
        APIList.getKisEqtEnquiryOrder,
        params
      );

      const newResponse: IEqtOrderHistoryMappingResponse[] = [];

      response.data.beanList.forEach(obj => {
        obj.orderTime = dateStringKIS2PAAVE(obj.orderTime);

        const newObj = lodash.mapKeys(obj, (_value, key) => {
          switch (key) {
            case 'orderNo':
              return 'orderID';

            case 'orderTime':
              return 'orderDateTime';

            case 'symbol':
              return 'stockCode';

            case 'buySellOrder':
              return 'sellBuyType';

            case 'orderQty':
              return 'orderQuantity';

            case 'matchedQty':
              return 'matchedQuantity';

            case 'feeTax':
              return 'sellingTax';

            default:
              return key;
          }
        }) as IEqtOrderHistoryMappingResponse;
        newResponse.push(newObj);
      });

      // process code whose status is INACTIVE, READYTOSEND, SENDING, PENDINGAPPROVAL to PENDING_TO_MARKET
      const newDataResponse = newResponse.filter(item =>
        item.orderStatus === ORDER_STATUS_FILTER_PENDING_TO_MARKET.READYTOSEND ||
        item.orderStatus === ORDER_STATUS_FILTER_PENDING_TO_MARKET.INACTIVE ||
        item.orderStatus === ORDER_STATUS_FILTER_PENDING_TO_MARKET.SENDING ||
        item.orderStatus === ORDER_STATUS_FILTER_PENDING_TO_MARKET.PENDINGAPPROVAL
          ? (item.orderStatus = ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET)
          : item.orderStatus
      );
      yield action.response != null &&
        put({
          type: action.response.success,
          payload: newDataResponse,
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

export default function* watchOnGetEquityEnquiryOrder() {
  yield takeLeading(SERVICE_GET_EQUITY_ENQUIRY_ORDER, sagaHandling);
}
