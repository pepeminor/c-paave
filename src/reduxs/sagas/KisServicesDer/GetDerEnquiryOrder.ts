import APIList from 'config/api';
import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE, SYSTEM_TYPE } from 'global';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import {
  IKisGetDerEnquiryOrderResponse,
  IKisGetDerEnquiryOrderParams,
  IDerOrderHistoryMappingResponse,
} from 'interfaces/services';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_DER_ENQUIRY_ORDER } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { FilterOption } from 'screens/OrderBook/constants';
import { queryKis, dateStringKIS2PAAVE, FulfilledRequestError } from 'utils';
import { SpecialErrorCode } from 'constants/enum';
import lodash from 'lodash';

function* sagaHandling(action: IAction<null>) {
  const filterOption: FilterOption = yield select((state: IState) => state.orderBookFilter.activeOrderFilter);
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  try {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && selectedAccount.selectedSubAccount?.accountNumber != null) {
      const params: IKisGetDerEnquiryOrderParams = {
        accountNumber: selectedAccount.selectedSubAccount.accountNumber,
        systemType: SYSTEM_TYPE.DERIVATIVES,
        stockSymbol: '',
        validity: '',
        sellBuyType: filterOption.sellBuyType || SELL_BUY_TYPE_FILTER_VALUE.ALL,
        status: filterOption.orderStatus || ALL_ORDER_STATUS_FILTER_VALUE.ALL,
        offset:
          filterOption.pageNumber != null && filterOption.pageSize != null
            ? filterOption.pageNumber * filterOption.pageSize
            : undefined,
        fetchCount: filterOption.pageSize,
      };

      const response: IResponse<IKisGetDerEnquiryOrderResponse[]> = yield call(
        queryKis,
        APIList.getKisDerEnquiryOrder,
        params
      );

      const newResponse: IDerOrderHistoryMappingResponse[] = [];

      response.data.forEach(obj => {
        obj.orderTime = dateStringKIS2PAAVE(obj.orderTime);

        const newObj = lodash.mapKeys(obj, (_value, key) => {
          switch (key) {
            case 'orderNumber':
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
        }) as IDerOrderHistoryMappingResponse;
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

export default function* watchOnGetDerEnquiryOrder() {
  yield takeLeading(SERVICE_GET_DER_ENQUIRY_ORDER, sagaHandling);
}
