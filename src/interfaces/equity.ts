import { IOrderType, ISpecialPriceType, SymbolType } from 'constants/enum';
import { ALL_ORDER_STATUS_FILTER_VALUE, RightType, SELL_BUY_TYPE, SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import { MARKET } from '../global/index';
import { ISymbolData } from './market';
import { ReducerStatus } from './reducer';

export enum INotiType {
  SUCCESS = 'Order has been placed successfully',
  WARNING = 'System error. Please try again',
}

export interface IEquityLOParams {
  orderId: number;
  newPrice?: number;
  newQuantity?: number;
}

export interface IEquityModifyResponse {
  readonly orderDto: {
    orderId: number;
    code: string;
    quantity: number;
    message: string;
    price: number;
  };
  readonly message: string;
}

export interface ICancelLOResponse {
  readonly message: string;
  readonly orderId: number;
}

/* ORDER */
export interface ICancelLOParams {
  readonly orderId: number;
}

export interface IEquityOrderParams {
  readonly code: string;
  readonly quantity: number;
  readonly price?: number;
  readonly orderCommand: ISpecialPriceType;
  readonly action: SELL_BUY_TYPE;
  macAddress: string;
}

export interface IEquityOrderResponse {
  orderDto: {
    orderId: number;
    code: string;
    quantity: number;
    price: number;
    message: string;
  };
  message: string;
}

export interface IEquityOrderStopParams {
  toDate: string;
  fromDate: string;
  orderType: IOrderType;
  stockCode: string;
  stopPrice: number;
  sellBuyType: SELL_BUY_TYPE;
  orderQuantity: number;
  securitiesType: keyof typeof SymbolType;
  orderPrice?: number;
  macAddress: string;
}

export interface IEquityOrderStopResponse {
  readonly message: string;
  readonly stopOrderId: number;
}

export interface IEquityOrderStopResponseKIS {
  readonly success: boolean;
}

export interface IEquityOrderStopCancel {
  readonly stopOrderId: number;
}

export interface IEquityOrderStopCancelMulti {
  readonly stopOrderIds: number[];
}

export interface IEquityOrderStopModify {
  readonly stopOrderId: number;
  readonly newStopPrice: number;
  readonly newOrderQuantity: number;
  readonly newFromDate: string;
  readonly newToDate: string;
  readonly orderPrice?: number;
}

export interface IEquityOrderStopCancelMultiResponse {
  readonly message: string;
}

/* DAILY PROFIT LOSS */
export interface IGetDailyProfitLossParams {
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  pageNumber?: number;
  days?: string;
}

export interface IKisGetDailyProfitLossParams {
  subAccount: string;
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  pageNumber?: number;
  days: string;
}

export interface IKisProfitLossParams {
  subAccount: string;
  forced: boolean; // auto clean cache and get new data (if false then cache will update every 5 mins)
}

export interface IGetRealizedProfitLossParams {
  fromDate: string;
  toDate: string;
}

export interface IGetRealizedProfitLossResponse {
  date: string;
  realizedPLValue: number;
  profitLossDetails: IGetRealizedProfitLossDetailItem[];
}

export interface IGetRealizedProfitLossDetailItem {
  stockCode: string;
  sellingQuantity: number;
  averageSellingPrice: number;
  averageBuyingPrice: number;
  realizedPLValue: number;
  realizedPLReturn: number;
  date?: string;
  buyingDate?: string;
}

export interface IGetCashAndStockBalanceParams {
  accountNumber: string;
  clientID?: string;
}

export interface IGetCashAndStockBalanceResponse {
  fee: { pendingFee: number };
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

export interface IGetAccountBalanceResponse {
  marginCallByCash: number;
  marginCallByStockMainAmount: number;
  buyingPower: number;
  withdrawable: number;
  availableAdvance: number;
  holdForPendingPurchase: number;
  holdForExecutedPurchase: number;
  outstandingLoan: number;
  marginCall: number;
  deposit: number;
  sellingStockOutMarginPortfolio: number;
  availablePowerToExerciseRight: number;
}

export interface IGetLocalAdvanceCreationParams {
  accountNo: string;
}

export interface IGetLocalAdvanceCreationResponse {
  availableCashAdvance: number;
  maxFee: number;
  t2AdvAvailable: number;
  t1AdvAvailable: number;
  t0AdvAvailable: number;
  t2Days: number;
  t1Days: number;
  t0Days: number;
  interestRate: number;
}

export interface ICheckAdvancePaymentTimeParams {
  accountNo: string;
}

export interface ICheckAdvancePaymentTimeResponse {
  result: boolean;
}

export interface ISubmitAdvancePaymentCreationParams {
  accountNo: string;
  submitAmount: number;
}

export interface ISubmitAdvancePaymentCreationResponse {
  success: boolean;
}

export interface IGetCashAdvanceHistoryParams {
  accountNo: string;
  fromDate?: string;
  toDate?: string;
}

export interface IGetCashAdvanceHistoryResponse {
  date: string | null;
  requestTime: string;
  requireAdvanceAmount: number;
  advanceFee: number;
  tax: number;
  soldAmountInAdvance: number;
  status: string;
  channel: string | null;
  remark: string | null;
}

export interface IGetAllRightListParams {
  accountNo: string;
  symbol: string;
  rightType?: RightType;
  fromDate: string;
  toDate: string;
  offset?: number;
  fetchCount?: number;
}

export interface IGetAllRightListResponse {
  symbol: string;
  rightType: string;
  closedDate: string;
  exerciseDate: string;
  qtyAtClosedDate: number;
  ratio: string;
  receivableCash: number;
  rightStock: number;
  receivableQty: number;
  status: string;
}

export interface IGetEntitlementHistoryParams {
  accountNumber: string;
  symbol?: string;
  status?: string;
  fromDate: string;
  toDate: string;
  offset?: number;
  fetchCount?: number;
}

export interface IGetEntitlementHistoryResponse {
  registeredTime: string;
  symbol: string;
  lastRegistrationDate: string;
  registeredQty: number;
  status: string;
  // ratio: number;
  // offeringPrice: number;
  // closedDate: string;
  // rightStock: string;
  // purchasedAmount: number;
  // executeDate: string;
  // remark: string;
}

export interface IGetEntitlementStockListParams {
  accountNumber: string;
  entitlementID: string;
}

export interface IGetEntitlementStockListResponse {
  accountName: string;
  bankAccountNumber: string;
  symbolCode: string;
  cashAvailable: number;
  companyName: string;
  // securitiesType: string;
  closedDate: string;
  ratio: string;
  offeringPrice: number;
  rightQty: number;
  entitlementId: string;
  marketId: string;
  locationId: string;
  interfaceSeq: string;
}

export interface IRegisterExerciseParams {
  accountNumber: string;
  entitlementId: string;
  locationId: string;
  marketId: string;
  registerQuantity: string;
  bankAccountNumber: string;
  symbolCode: string;
  interfaceSeq: string;
}

export interface IRegisterExerciseResponse {
  message: string;
  mvResult: string;
  mvReturnCode: string;
  savedAuthen: string;
}

export interface IGetAdditionIssueShareInfoParams {
  accountNumber: string;
  offset?: number;
  fetchCount?: number;
}

export interface IGetAdditionIssueShareInfoResponse {
  symbol: string;
  ratioLeft: string;
  ratioRight: string;
  offeringPrice: number;
  lastTransferDateLeft: string;
  lastTransferDateRight: string;
  closedDate: string;
  lastRegistrationDate: string;
  qtyAtClosedDate: number;
  initialRightQty: number;
  availableRightQty: number;
  amount: number;
  registeredQty: number;
  purchaseAmount: number;
  status: number;
  marketID: string;
  entitlementId: string;
  locationID: string;
}

export interface IGetEnquirySignOrderParams {
  accountNo: string;
  offset?: number;
  fetchCount?: number;
  fromDate: string;
  toDate: string;
  stockSymbol: '';
}

export interface IGetEnquirySignOrderResponse {
  date: string;
  accountNo: string;
  orderType: SELL_BUY_TYPE;
  stockSymbol: string;
  volume: number;
  price: number;
  status: string;
  orderNo: string;
  refID: string;
  isHistory: string;
}

export interface ISubmitEnquirySignOrderParams {
  accountNo: string;
  mvOrderList: [
    string, // orderNo
    string, // isHistory
    string // refID
  ][]; // From IGetEnquirySignOrderResponse
}

export interface ISubmitEnquirySignOrderResponse {
  result: string | null;
  success: string; // "true"
  returnCode: string | null;
  message: string | null;
}

export interface IDailyProfitLosses {
  date: string;
  netAssetValue: number;
  vnIndex: number;
  navProfit: number;
  navProfitRatio: number;
  vnIndexReturn: number;
  accNAVProfit: number;
  normalisedNAV: number;
  normalisedVNINDEX: number;
}

export interface IDailyProfitLossResponse {
  accountCreatedDate?: string;
  accountLinkedDate?: string;
  dailyProfitLosses: IDailyProfitLosses[];
}

export interface IAccumulativeProfitLossParams {
  subAccount: string;
  fromDate: string;
  toDate: string;
}

export interface IFollowingAccumulativeProfitLossParams {
  followingUserId: number;
  fromDate: string;
  toDate: string;
}

export interface IAccumulativeProfitLossResponse {
  accNAVProfitValue: number;
  accNAVProfitRatio: number;
  accNetCashDeposit?: number;
  accNetStockDeposit?: number;
  cashAllocation?: number;
  stockAllocation?: number;
  maxDrawdown: number;
}

export interface IDailyProfitLoss {
  accountCreatedDate?: string;
  accountLinkedDate?: string;
  dailyProfitLosses: {
    [s: string]: IDailyProfitLosses[] | null;
  };
}

export interface IFollowingProfitLossItemResponse {
  stockCode: string;
  profitLossRate: number;
  sectorName: string;
  stockWeight: number;
  holdingDays?: number;
  currentPrice?: number;
  buyingPrice?: number;
  profitLoss?: number;
}
export interface IProfitLossItems extends IFollowingProfitLossItemResponse, ISymbolData {
  profitLoss: number;
  buyingPrice: number;
  buyingAmount?: number;
  currentPrice: number;
  buyingQuantity?: number;
  balanceQuantity: number;
  stockDividend?: number;
  rightOffering?: number;
  currentValue: number;
  sellableQuantity: number;
}

export interface IProfitLossTotal {
  totalBuyValue: number;
  totalMarketValue: number;
  totalProfitLoss: number;
  totalProfitLossRate: number;
}

export interface ISectorWeightItem {
  industry: string;
  sectorWeight: number;
}

// will add ? to field that not always have value - dif between paave-kis - waiting for doc
export interface IProfitLossResponse extends IFollowingProfitLossResponse {
  profitLossItems: IProfitLossItems[];
  sectorWeight: ISectorWeightItem[];
  stockBalance: number;
  navProfit: number;
  navProfitRatio: number;
  netAssetValue: number;

  totalProfitLoss?: number;
  totalProfitLossRate?: number;
  netAsset?: number;
  previousNetAsset?: number;
  netAssetReturn?: number;
  navProfitLoss?: number;
  cashBalance?: number;
  buyingPower?: number;
  cashT0?: number;
  cashT1?: number;
  totalAwaitCash?: number;
}

export interface IDrAccountOpenPositionItem {
  seriesID: string;
  long: number;
  short: number;
  averageBid: number;
  averageAsk: number;
  marketPrice: number;
  floatingPL: number;
}

export interface IKisClientPortfolioResponse {
  openPositionList: IDrAccountOpenPositionItem[];
  accountNo: string;
}

/* FOLLOWING PROFITLOSS */
export interface IFollowingProfitLossResponse {
  profitLossItems: IFollowingProfitLossItemResponse[];
  sectorWeight: ISectorWeightItem[];
}

export interface IFollowingProfitLossParams {
  followingUserId: number;
  followingSubAccount?: string;
}

/* FOLLOWING DAILY PROFITLOSS */
export interface IFollowingDailyProfitLossParams {
  followingUserId: number;
  fromDate?: string;
  toDate?: string;
  followingSubAccount?: string;
  partnerId?: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface IFollowingDailyProfitLossResponse {
  accountCreatedDate?: string;
  accountLinkedDate?: string;
  followingDailyProfits: IFollowingDailyProfitLoss[];
  errorMessage?: string;
}
export interface IFollowingDailyProfitLoss {
  date: string;
  normalisedNav: number;
  normalisedVnIndex: number;
  stockBalance: number;
  cashBalance: number;
  netAssetValue: number;
  navProfit: number;
  navProfitRatio: number;
  totalAwaitCash: number;
}

/* ORDER HISTORY */
export interface IOrderHistoryParams {
  fromDate: string;
  toDate: string;
  sellBuyType?: SELL_BUY_TYPE_FILTER_VALUE;
  status?: ALL_ORDER_STATUS_FILTER_VALUE;
  pageSize: number;
  pageNumber: number;
}

export interface IOrderHistoryResponse {
  orderID: string;
  orderDateTime: string;
  stockCode: string;
  sellBuyType: string;
  orderType: string;
  orderStatus: string;
  orderPrice: number;
  orderQuantity: number;
  matchedPrice: number;
  matchedQuantity: number;
  matchedValue: number;
  tradingValue: number;
  tradingFee: number;
  sellingTax: number;
  modifiable: boolean;
  cancellable: boolean;
  channel: string;
  marketType: MARKET;
}

/* CANCEL MULTI */
export interface ICancelMultiLOParams {
  orderIds: number[];
}

export interface ICancelMultiLOResponse {
  message: string;
}
export interface IOrderStopHistoryParams {
  fromDate: string;
  toDate: string;
  sellBuyType?: SELL_BUY_TYPE_FILTER_VALUE;
  status?: ALL_ORDER_STATUS_FILTER_VALUE;
  sequence?: number;
  fetchCount?: number;
  pageSize: number;
  pageNumber: number;
}

export interface IOrderStopHistoryResponse {
  stopOrderID: number;
  orderDateTime: string;
  stockCode: string;
  sellBuyType: SELL_BUY_TYPE;
  orderType: string;
  stopPrice: number;
  orderPrice?: number;
  orderQuantity: number;
  fromDate: string;
  toDate: string;
  status: string;
  errorMessage: string;
  modifiable: boolean;
  cancellable: boolean;
  channel: string;
}

export interface IOrderBook<T> {
  data: T;
  status: ReducerStatus;
  previous: T;
}
export interface IMostBoughtStockParams {
  period: string;
  option: string;
  pageNumber: number | null;
  pageSize: number | null;
}

export interface IMostBoughtStockResponse {
  rankingType: string;
  boughtStockRanks: IBoughtStockRanks[];
}

export interface IBoughtStockRanks {
  rank: number;
  stockCode: string;
  totalTradingValue: number;
  totalTradingVolume: number;
}

export interface IMostSoldStockParams {
  period: string;
  optionRankStock: string;
  pageNumber: number | null;
  pageSize: number | null;
}

export interface IMostSoldStockResponse {
  rankingType: string;
  soldStockRanks: ISoldStockRanks[];
}

export interface ISoldStockRanks {
  ranking: number;
  stockCode: string;
  totalTradingValue: number;
  totalTradingVolume: number;
}

// Stock Info Event
export interface IEventByStockParams {
  stockCode: string[];
}
export interface IEventByStockResponse {
  code: string;
  type: string;
  note: string;
  noteEn: string;
  effectiveDate: string;
}
