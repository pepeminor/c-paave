import { SELL_BUY_TYPE } from 'global';
import { IOrderStopHistoryResponse } from 'interfaces/equity';
import {
  IDerOrderHistoryMappingResponse,
  IEqtOrderHistoryMappingResponse,
  IKisGetDerEnquiryOrderResponse,
} from 'interfaces/services';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import BaseModal from './BaseModal';
import ModalCancel from './ModalCancel';
import ModalModify from './ModalModify';

export enum ModalType {
  MODIFY = 'MODIFY',
  CANCEL = 'CANCEL',
}

export type IOrderBookSymbol = {
  symbol: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse | null;
  type: ModalType;
};

export type ModalContentProps = {
  symbol:
    | IEqtOrderHistoryMappingResponse
    | IOrderStopHistoryResponse
    | IDerOrderHistoryMappingResponse
    | IKisGetDerEnquiryOrderResponse;
};

export const OrderBookModal = memo(() => {
  const symbol = useSelector((state: IState) => state.orderBookSymbol.symbol);
  const modalType = useSelector((state: IState) => state.orderBookSymbol.type);

  const sellOrBuy = symbol?.sellBuyType === SELL_BUY_TYPE.BUY ? 'Buy' : 'Sell';
  const title = modalType === ModalType.CANCEL ? `Cancel ${sellOrBuy} Order` : `Modify ${sellOrBuy} Order`;

  if (symbol == null) return null;

  return (
    <BaseModal
      title={title}
      isVisible={symbol != null}
      ListContentModal={
        modalType === ModalType.MODIFY ? <ModalModify symbol={symbol} /> : <ModalCancel symbol={symbol} />
      }
    />
  );
});
