import {
  IEquityLOParams,
  IEquityOrderStopCancel,
  IEquityOrderStopModify,
  IGetDailyProfitLossParams,
  IEquityOrderParams,
  ICancelMultiLOParams,
  IEquityOrderStopParams,
  ICancelLOParams,
  IEquityOrderStopCancelMulti,
  IMostBoughtStockParams,
  IMostSoldStockParams,
  IEventByStockParams,
  IGetCashAndStockBalanceParams,
  IGetLocalAdvanceCreationParams,
  ISubmitAdvancePaymentCreationParams,
  IGetCashAdvanceHistoryParams,
  IGetAllRightListParams,
  IGetEntitlementHistoryParams,
  IGetAdditionIssueShareInfoParams,
  IGetAdditionIssueShareInfoResponse,
  IRegisterExerciseParams,
  IGetEntitlementStockListParams,
  IGetEnquirySignOrderParams,
  ISubmitEnquirySignOrderParams,
  IGetRealizedProfitLossParams,
  IAccumulativeProfitLossParams,
} from 'interfaces/equity';
import { RESET } from 'reduxs/action-type-utils';
import {
  EQUITY_ORDER,
  EQUITY_MODIFY_LO,
  EQUITY_CANCEL_LO,
  EQUITY_ORDER_STOP,
  EQUITY_ORDER_STOP_CANCEL,
  EQUITY_ORDER_STOP_MODIFY,
  EQUITY_GET_PROFIT_LOSS,
  EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE,
  EQUITY_GET_ORDER_HISTORY,
  EQUITY_CANCEL_MULTI_LO,
  EQUITY_GET_ORDER_STOP_HISTORY,
  EQUITY_GET_ACTIVE_ORDER,
  EQUITY_ORDER_STOP_CANCEL_MULTI,
  EQUITY_GET_FOLLOWING_PROFIT_LOSS,
  EQUITY_GET_MOST_BOUGHT_STOCK,
  EQUITY_GET_MOST_SOLD_STOCK,
  EQUITY_GET_EVENT_BY_STOCK,
  EQUITY_GET_ACCOUNT_BALANCE,
  EQUITY_GET_NAV_CHANGE,
  EQUITY_GET_LOCAL_ADVANCE_CREATION,
  EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION,
  EQUITY_GET_CASH_ADVANCE_HISTORY,
  EQUITY_DO_FUND_TRANSFER,
  EQUITY_GET_ALL_RIGHT_LIST,
  EQUITY_GET_ENTITLEMENT_HISTORY,
  EQUITY_SET_ITEM_PURCHASE_RIGHT,
  EQUITY_ADDITION_ISSUE_SHARE_INFO,
  EQUITY_REGISTER_EXERCISE,
  EQUITY_GET_ENTITLEMENT_STOCK_LIST,
  EQUITY_GET_SIGN_ORDER,
  EQUITY_SUBMIT_SIGN_ORDER,
  EQUITY_RESET_DAILY_PROFIT_LOSS,
  EQUITY_GET_PROFIT_LOSS_VIRTUAL,
  EQUITY_GET_REALIZED_PROFIT_LOSS,
  EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE,
  EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE,
  EQUITY_GET_ACCUMULATIVE_NAV,
} from 'reduxs/actions';
import { generateAction } from 'utils/common';
import { doFundTransferParams } from '../../interfaces/bankTransfer';
import { EQUITY_ORDER_KIS_SUCCESS } from '../actions';

export const putOrderStopCancelEquity = generateAction<IEquityOrderStopCancel>(EQUITY_ORDER_STOP_CANCEL);

export const putOrderStopCancelMultiEquity =
  generateAction<IEquityOrderStopCancelMulti>(EQUITY_ORDER_STOP_CANCEL_MULTI);

export const putOrderStopModifyEquity = generateAction<IEquityOrderStopModify>(EQUITY_ORDER_STOP_MODIFY);

export const postOrderEquity = generateAction<IEquityOrderParams>(EQUITY_ORDER);

export const postModifyEquity = generateAction<IEquityLOParams>(EQUITY_MODIFY_LO);

export const postEquityCancelLO = generateAction<ICancelLOParams>(EQUITY_CANCEL_LO);

export const postOrderStopEquity = generateAction<IEquityOrderStopParams>(EQUITY_ORDER_STOP);

export const getProfitLoss = generateAction(EQUITY_GET_PROFIT_LOSS);

export const getVirtualProfitLoss = generateAction(EQUITY_GET_PROFIT_LOSS_VIRTUAL);

export const getRealizedProfitLoss = generateAction<IGetRealizedProfitLossParams>(EQUITY_GET_REALIZED_PROFIT_LOSS);

export const resetDailyProfitLossForKis = generateAction(EQUITY_RESET_DAILY_PROFIT_LOSS);

export const getNAVChange = generateAction<IGetDailyProfitLossParams>(EQUITY_GET_NAV_CHANGE);

export const getAccumulativeNAV = generateAction<IAccumulativeProfitLossParams>(EQUITY_GET_ACCUMULATIVE_NAV);

export const resetNAVChange = generateAction(RESET(EQUITY_GET_NAV_CHANGE));

export const getCashBalanceAndStockBalanceForKis = generateAction<IGetCashAndStockBalanceParams>(
  EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE
);

export const doFundTransfer = generateAction<doFundTransferParams>(EQUITY_DO_FUND_TRANSFER);

export const getAccountBalanceForKis = generateAction<IGetCashAndStockBalanceParams>(EQUITY_GET_ACCOUNT_BALANCE);

export const getActiveOrder = generateAction(EQUITY_GET_ACTIVE_ORDER);

export const getOrderHistory = generateAction(EQUITY_GET_ORDER_HISTORY);

export const getOrderStopHistory = generateAction(EQUITY_GET_ORDER_STOP_HISTORY);

export const postCancelMultiLO = generateAction<ICancelMultiLOParams>(EQUITY_CANCEL_MULTI_LO);

export const getFollowingProfitLoss = generateAction(EQUITY_GET_FOLLOWING_PROFIT_LOSS);

export const getFollowingDailyProfitLossByDate = generateAction(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE);

export const getFollowingDailyProfitLossKisByDate = generateAction(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE);

export const getMostBoughtStock = generateAction<IMostBoughtStockParams>(EQUITY_GET_MOST_BOUGHT_STOCK);

export const getMostSoldStock = generateAction<IMostSoldStockParams>(EQUITY_GET_MOST_SOLD_STOCK);

export const getEventByStock = generateAction<IEventByStockParams>(EQUITY_GET_EVENT_BY_STOCK);

export const getLocalAdvanceCreation = generateAction<IGetLocalAdvanceCreationParams>(
  EQUITY_GET_LOCAL_ADVANCE_CREATION
);

export const submitAdvancePaymentCreation = generateAction<ISubmitAdvancePaymentCreationParams>(
  EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION
);

export const getCashAdvanceHistory = generateAction<IGetCashAdvanceHistoryParams>(EQUITY_GET_CASH_ADVANCE_HISTORY);

export const getAllRightList = generateAction<IGetAllRightListParams>(EQUITY_GET_ALL_RIGHT_LIST);

export const getAdditionIssueShareInfo = generateAction<IGetAdditionIssueShareInfoParams>(
  EQUITY_ADDITION_ISSUE_SHARE_INFO
);

export const getEntitlementHistory = generateAction<IGetEntitlementHistoryParams>(EQUITY_GET_ENTITLEMENT_HISTORY);

export const setItemPurchaseRight = generateAction<IGetAdditionIssueShareInfoResponse | null>(
  EQUITY_SET_ITEM_PURCHASE_RIGHT
);

export const registerExercise = generateAction<IRegisterExerciseParams>(EQUITY_REGISTER_EXERCISE);

export const getEntitlementStockList = generateAction<IGetEntitlementStockListParams>(
  EQUITY_GET_ENTITLEMENT_STOCK_LIST
);

export const getOrderConfirmation = generateAction<IGetEnquirySignOrderParams>(EQUITY_GET_SIGN_ORDER);

export const submitOrderConfirmation = generateAction<ISubmitEnquirySignOrderParams>(EQUITY_SUBMIT_SIGN_ORDER);

export const handleOrderKisSuccess = generateAction(EQUITY_ORDER_KIS_SUCCESS);
