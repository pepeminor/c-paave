import { ISpecialPriceType } from 'constants/enum';
import { MARKET, SELL_BUY_TYPE } from 'global';

export interface IRealTradingEqtOrderParams {
  readonly code: string;
  readonly marketType: keyof typeof MARKET;
  readonly sellBuyType: SELL_BUY_TYPE;
  readonly accountNumber: string;
  readonly orderQuantity: number;
  readonly orderPrice?: number | ISpecialPriceType;
  readonly orderType: ISpecialPriceType;
  expiryDate?: string;
  macAddress: string;
}

export interface IRealTradingDerOrderParams {
  code: string;
  validity: string;
  orderType: ISpecialPriceType;
  orderPrice: number | undefined;
  sellBuyType: SELL_BUY_TYPE;
  accountNumber: string;
  orderQuantity: number;
  macAddress: string;
}

export interface IRealTradingEqtOrderResponse {
  message: string;
  success: boolean;
  orderDetail: {
    bs: string;
    ccy: string;
    qty: number;
    hedge: string;
    msQty: string;
    price: number;
    bankID: string;
    origin: string;
    orderID: string;
    bankACID: string;
    branchID: string;
    clientID: string;
    orderType: string;
    shortName: string;
    shortSell: string;
    stopPrice: number;
    holdAmText: string;
    timeInForce: string;
    allOrNothing: string;
    batchOrderID: string;
    goodTillDate: string;
    instrumentID: string;
    orderGroupID: string;
    subAccountID: string;
    clientBaseCcy: string;
    stopOrderType: string;
    tradingAccSeq: number;
    activationDate: string;
    instrumentName: string;
    userApprovalRemark: string;
    fee: [
      {
        amount: number;
        feeCName: string;
        feeID: string;
        feeName: string;
      }
    ];
  };
  orderNumber: string;
  orderGroupID: string;
}
