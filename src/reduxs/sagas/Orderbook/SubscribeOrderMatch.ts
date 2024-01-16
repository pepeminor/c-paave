import { Global } from 'constants/main';
import { SCChannel } from 'sc-channel';
import { IAccount, IAction } from 'interfaces/common';
import { call, select, takeEvery } from 'redux-saga/effects';
import {
  SERVICE_GET_EQUITY_ENQUIRY_ORDER,
  UNSUBSCRIBE_ORDER_MATCH,
  SUBSCRIBE_ORDER_MATCH,
  SERVICE_GET_DER_ENQUIRY_ORDER,
} from '../../actions';
import { IState } from 'reduxs/global-reducers';
import { IKisGetDerEnquiryOrderResponse, IKisGetEqtEnquiryOrderResponse } from 'interfaces/services';
import { SUCCESS } from 'reduxs/action-type-utils';
import { RealAccountSec } from 'screens/AccountTrading';
import { isEquityAccount, socketUtils } from 'utils';
import { SocketStatus as SocketStatusEnum } from 'constants/enum';
import { store } from 'screens/App';

let subscribeCount = 0;
let socket: SCChannel | undefined;

function* doSubscribeOrderMatch(_action: IAction<IKisGetEqtEnquiryOrderResponse[] | IKisGetDerEnquiryOrderResponse[]>) {
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  const kisSocketStatus: SocketStatusEnum = yield select((state: IState) => state.socketStatus.KIS);

  if (selectedAccount.username == null) {
    throw Error('No Account Selected');
  }

  if (subscribeCount === 0 && socket != null) {
    socket.unsubscribe();
    socket.unwatch();
  }

  subscribeCount += 1;
  if (Global.sockets[RealAccountSec.KIS] == null || kisSocketStatus !== SocketStatusEnum.CONNECTED) {
    yield call(socketUtils.connectKisSocket);
  }

  socket = Global.sockets[RealAccountSec.KIS]?.subscribe(`orderMatch.${selectedAccount.username}`, {
    batch: true,
  });

  socket?.watch((data: IKisGetEqtEnquiryOrderResponse | IKisGetDerEnquiryOrderResponse) => {
    if (data != null) {
      const selectedAccount: IAccount = store.getState().selectedAccount;
      const orderData = isEquityAccount(selectedAccount)
        ? store.getState().kisEquityEnquiryOrder.data
        : store.getState().kisDerEnquiryOrder.data;

      const todayOrderItemIndex = orderData.findIndex(ele => {
        if (isEquityAccount(selectedAccount)) {
          return ele.stockCode === data.symbol && ele.orderID === (data as IKisGetEqtEnquiryOrderResponse).orderNo;
        }
        return (
          ele.stockCode === data.symbol && ele.orderID === (data as IKisGetDerEnquiryOrderResponse).orderInfo.orderID
        );
      });

      if (todayOrderItemIndex === -1) return;

      const params = isEquityAccount(selectedAccount)
        ? {
            orderPrice: (data as IKisGetEqtEnquiryOrderResponse).orderPrice,
            orderStatus: (data as IKisGetEqtEnquiryOrderResponse).orderStatus,
            matchedValue: (data as IKisGetEqtEnquiryOrderResponse).matchedValue,
            matchedPrice: (data as IKisGetEqtEnquiryOrderResponse).matchedPrice,
            validity: (data as IKisGetEqtEnquiryOrderResponse).validity,
            orderQuantity: (data as IKisGetEqtEnquiryOrderResponse).orderQty,
          }
        : {
            orderPrice: (data as IKisGetDerEnquiryOrderResponse).orderPrice,
            orderStatus: (data as IKisGetDerEnquiryOrderResponse).orderStatus,
            matchedValue: (data as IKisGetDerEnquiryOrderResponse).matchedValue,
            matchedPrice: (data as IKisGetDerEnquiryOrderResponse).matchedPrice,
            validity: (data as IKisGetDerEnquiryOrderResponse).validity,
            orderQuantity: (data as IKisGetDerEnquiryOrderResponse).orderQuantity,
            modifiable: (data as IKisGetDerEnquiryOrderResponse).modifiable,
            cancellable: (data as IKisGetDerEnquiryOrderResponse).cancellable,
          };

      orderData[todayOrderItemIndex] = {
        ...orderData[todayOrderItemIndex],
        ...params,
      };

      store.dispatch({
        type: SUCCESS(
          isEquityAccount(selectedAccount) ? SERVICE_GET_EQUITY_ENQUIRY_ORDER : SERVICE_GET_DER_ENQUIRY_ORDER
        ),
        payload: orderData,
      });
    }
  });
}

function doUnsubscribeOrderMatch() {
  subscribeCount -= 1;
  if (subscribeCount === 0 && socket != null) {
    socket.unsubscribe();
    socket.unwatch();
  }
}

export default function* watchSubscribeOrderMatch() {
  yield takeEvery(SUBSCRIBE_ORDER_MATCH, doSubscribeOrderMatch);
  yield takeEvery(UNSUBSCRIBE_ORDER_MATCH, doUnsubscribeOrderMatch);
}
