import { ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE, SELL_BUY_TYPE_FILTER_VALUE, SYSTEM_TYPE } from 'global';
import { IOrderHistoryResponse } from './equity';

// Modify eqt order
export interface IKisModifyEqtOrderParams {
  accountNo: string;
  orderNo: string;
  orderGroupNo: string;
  newPrice: number;
  newQuantity: number;
  stockSymbol: string;
  market: string;
  originalQuantity: number;
}

export interface IKisModifyEqtOrderResponses {
  orderNo: string;
  orderGroupNo: string;
  success: boolean;
  quantity: number;
  price: number;
  pendingQty: number;
}

// Cancel Eqt item
export interface IEquityOrderCancelItem {
  orderNo: string;
  orderGroupNo: string;
}

export interface IKisCancelEqtOrderParams {
  accountNo: string;
  orders: IEquityOrderCancelItem[];
  clientID: string;
  pin?: string;
}

export interface IKisCancelEqtOrderResponses {
  orderNo: string;
  orderGroupNo: string;
  success: boolean;
  rejectCause: string;
}

// Stock Info
export interface IKisGetEqtStockInfoParams {
  accountNumber: string;
  symbolCode: string;
  market: string;
  sellBuyType: SELL_BUY_TYPE | string;
  clientID: string;
  genBuyAllParams: Omit<IKisGetEqtGenBuyAllParams, 'accountNo' | 'PP' | 'sellBuyType'>;
}

export interface IKisGetEqtStockInfoResponse {
  PP: number;
  marginRatio: number;
}

// Asset Info
export interface IKisGetEqtAssetInfoParams {
  accountNumber: string;
  clientID: string;
  sellBuyType: string;
  genBuyAllParams: Omit<IKisGetEqtGenBuyAllParams, 'accountNo' | 'PP' | 'sellBuyType'>;
}

export interface IKisGetEqtAssetInfoResponse {
  fee: {
    pendingFee: number;
  };
  margin: {
    equity: number;
    dayLoan: number;
    fixedLoan: number;
    stockMain: number;
    marginRatio: number;
    maintenanceRatio: number;
    marginInterestRate: number;
    accuredDebitInterest: number;
  };
  buyingPower: {
    extraCredit: number;
    purchasingPower: number;
    nonMarginPurchasingPower: number;
  };
  accountSummary: {
    loan: number;
    totalAsset: number;
    cashBalance: number;
    netAssetValue: number;
    netInterestFee: number;
    pendingCashDividendCW: number;
    totalStockMarketValue: number;
  };
  cashInformation: {
    soldT0: number;
    soldT1: number;
    cashWithdrawal: number;
    executedPurchaseT1: number;
    accuredCreditInterest: number;
    availableAdvancedCash: number;
    holdForPendingPurchaseT0: number;
    holdForExecutedPurchaseT0: number;
    pendingApprovalForWithdrawal: number;
  };
}

// Gen buy all
export interface IKisGetEqtGenBuyAllParams {
  clientID: string;
  accountNo: string;
  symbolCode: string;
  market: string;
  price: number;
  sellBuyType: SELL_BUY_TYPE | string;
  PP: number;
}

export interface IKisGetEqtGenBuyAllResponses {
  maxQtty: number;
}

// Enquiry Order
export interface IKisGetEqtEnquiryOrderParams {
  accountNo: string;
  systemType: SYSTEM_TYPE;
  clientID?: string;
  stockSymbol?: string;
  sellBuyType?: string;
  status?: ALL_ORDER_STATUS_FILTER_VALUE;
  validity?: string;
  offset?: number;
  fetchCount?: number;
}

export interface IKisGetEqtEnquiryOrderResponse {
  stockCode?: string;
  orderQuantity?: number;
  symbol: string;
  channel: string;
  orderNo: string;
  orderQty: number;
  validity: string;
  accountNo: string;
  orderTime: string;
  orderType: string;
  matchedQty: number;
  matchedPrice: number;
  modifiable: boolean;
  orderPrice: number;
  canceledQty: number;
  cancellable: boolean;
  orderStatus: string;
  buySellOrder: SELL_BUY_TYPE_FILTER_VALUE;
  matchedValue: number;
  orderGroupNo: string;
  unmatchedQty: number;
  rejectReason: boolean;
  feeTax: number;
}

// Enquiry History Order
export interface IKisGetEqtEnquiryHistoryOrderParams {
  accountNo: string;
  fromDate: string;
  toDate: string;
  sellBuyType: SELL_BUY_TYPE_FILTER_VALUE;
  clientID?: string;
  stockSymbol?: string;
  status?: string;
  validity?: string;
  offset?: number;
  fetchCount?: number;
}

export interface IKisGetEqtEnquiryHistoryOrderResponse {
  symbol: string;
  modifiable: boolean;
  cancellable: boolean;
  orderNo: string;
  orderQty: number;
  validity: string;
  accountNo: string;
  orderTime: string;
  orderType: string;
  matchedQty: number;
  orderPrice: number;
  orderStatus: string;
  sellBuyType: string;
  matchedPrice: number;
  matchedValue: number;
  unmatchedQty: number;
  rejectReason: string;
}

export type IEqtOrderHistoryMappingResponse = Omit<IOrderHistoryResponse, 'tradingFee' | 'sellingTax' | 'channel'> & {
  orderGroupNo: string;
  channel?: string;
  sellingTax?: number;
  tradingFee?: number;
  validity?: string;
  rejectReason?: string | boolean;
};

export interface IEqtEnquiryPortfolioParams {
  accountNumber: string;
  offset?: number;
  fetchCount?: number;
}

export interface IKisPortfolioList {
  right: number;
  value: number;
  others: number;
  symbol: string;
  weight: string;
  avgPrice: number;
  boughtT0: number;
  boughtT1: number;
  boughtT2: number;
  mortgage: number;
  sellable: number;
  totalVol: number;
  holdToSell: number;
  lendingRate: number;
  marketPrice: number;
  marketValue: number;
  awaitTrading: number;
  dayChangeValue: string;
  dayChangePercent: string;
  unrealizedPLValue: number;
  unrealizedPLPercent: number;
}

export interface IEqtEnquiryPortfolioResponse {
  summary: {
    PP: number;
    dailyPL: number;
    profitLoss: number;
    marginRatio: number;
    marketValue: number;
    netAssetValue: number;
    profitLossPercent: number;
    totalStockMarketValue: number;
  };
  accountNumber: string;
  portfolioList: IKisPortfolioList[];
}

export interface IKisGetDerEnquiryOrderResponse {
  accountNumber: string;
  symbol: string;
  symbolCode: string;
  stockCode?: string;
  orderID?: string;
  sellBuyType: string;
  orderQuantity: number;
  orderPrice: number;
  matchedQuantity: number;
  matchedPrice: number;
  unmatchedQuantity: number;
  orderType: string;
  orderStatus: string;
  matchedValue: number;
  orderNumber: string;
  orderTime: string;
  validity: string;
  modifiable: boolean;
  cancellable: boolean;
  rejectReason: string;
  conditionOrderGroupID: string;
  position: string;
  minQty: number;
  stopType: string;
  stopPrice: number;
  tPlus1: boolean;
  userID: string;
  stopOrder: boolean;
  auctionOrder: boolean;

  //used for modification
  marketID: string;
  commodityName: string;
  contractMonth: string;
  orderGroupID: string;
  validityDate: string;
  orderInfo: IDerOrderCancelInfo;
}

export interface IKisGetDerEnquiryOrderParams {
  accountNumber: string;
  systemType: SYSTEM_TYPE;
  stockSymbol: string;
  sellBuyType: SELL_BUY_TYPE_FILTER_VALUE;
  status: ALL_ORDER_STATUS_FILTER_VALUE;
  validity: string;
  fetchCount?: number;
  offset?: number;
}

export type IDerOrderHistoryMappingResponse = Omit<
  IKisGetDerEnquiryOrderResponse,
  'tradingFee' | 'sellingTax' | 'channel'
> & {
  orderGroupNo: string;
  channel?: string;
  sellingTax?: number;
  tradingFee?: number;
  validity?: string;
  rejectReason?: string | boolean;
};

export interface IKisCancelDerOrderParams {
  accountNumber: string;
  orderInfo: IDerOrderCancelInfo[];
}

export interface IDerOrderCancelInfo {
  marketID: string;
  commodityName: string;
  contractMonth: string;
  orderNumber: string;
  validity: string;
  orderType: string;
  validityDate: string;
  orderGroupID: string;
  sellBuyType: string;
  symbolCode: string;
  stockCode?: string;
  orderID?: string;
}

export interface IKisGetDerEnquiryHistoryOrderParams {
  accountNumber: string;
  fromDate: string;
  toDate: string;
  status: ALL_ORDER_STATUS_FILTER_VALUE;
  code?: string;
  sellBuyType?: SELL_BUY_TYPE_FILTER_VALUE;
  offset?: number;
  fetchCount?: number;
}

export interface IKisGetDerEnquiryHistoryOrderResponse {
  accountNumber: string;
  symbol: string;
  sellBuyType: string;
  orderQuantity: number;
  orderPrice: number;
  orderType: string;
  matchedQuantity: number;
  matchedPrice: number;
  unmatchedQuantity: number;
  orderStatus: string;
  matchedValue: number;
  orderNumber: string;
  orderTime: string;
  validity: string;
  modifiable: boolean;
  cancellable: boolean;
  rejectReason: string;
  commodityName: string;
  contractMonth: string;
  transactionFee: number;
  tax: number;
  date: string;
  time: string;
  channel: string;
  volume: number;
}

export interface IKisModifyDerOrderParams {
  accountNumber: string;
  orderQty: number;
  orderPrice: number;
  orderInfo: IDerOrderModifyInfo;
}
export interface IDerOrderModifyInfo {
  marketID: string;
  symbol: string;
  commodityName: string;
  contractMonth: string;
  orderNumber: string;
  validity: string;
  orderType: string;
  orderGroupID: string;
  sellBuyType: string;
  conditionOrderGroupID: string;
  validityDate: string;
  matchedQuantity: number;
  position: string;
  minQty: number;
  stopType: string;
  stopPrice: number;
  tPlus1: boolean;
  userID: string;
  stopOrder: boolean;
  auctionOrder: boolean;
}
export interface IKisModifyDerEnquiryOrderResponse {
  orderId: string;
  orderGroupId: string;
}
export interface IKisGetDerMaxLongShortEnquiryParams {
  accountNumber: string;
  symbolCode: string;
  sellBuyType: string;
  price: number;
}
export interface IKisGetDerMaxLongShortEnquiryResponse {
  maxLong: number;
  maxShort: number;
}

export interface IKisGetDerEnquiryClientStockStatementParams {
  accountNo: string;
  fromDate: string;
  toDate: string;
}

export interface IKisGetDerEnquiryClientStockStatementResponse {
  seriesID: string;
  date: string;
  netoffLong: number;
  netoffShort: number;
  expiredLong: number;
  expiredShort: number;
  balanceLong: number;
  balanceShort: number;
  balanceClosingPrice: number;
  totalPL: number;
}
