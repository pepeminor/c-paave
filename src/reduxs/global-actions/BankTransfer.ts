import { generateAction } from '../../utils';
import { RESET } from '../action-type-utils';
import {
  queryGenFundTransferParams,
  querySubAccountRetrieveParams,
  queryBankInfoParams,
  doFundTransferParams,
  cashTransactionHistoryParams,
  ICashStatementParams,
  IDerCashDWEnquiryParams,
  IDerCashTransferParams,
  IDerClientCashBalanceShortverParams,
  IDerCpCashDWParams,
  IDerCashDWParams,
  IDerCpCashDWEnquiryParams,
  ICashStatementDerParams,
} from '../../interfaces/bankTransfer';
import {
  BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE,
  BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER,
  BANK_TRANSFER_QUERY_BANK_INFO,
  BANK_TRANSFER_DO_FUND_TRANSFER,
  BANK_TRANSFER_CHECK_TRADE_DATE,
  BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY,
  CASH_STATEMENT_DER_QUERY_DATA,
  CASH_STATEMENT_EQT_QUERY_DATA,
  BANK_TRANSFER_POST_CASH_TRANSFER,
  BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER,
  BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY,
  BANK_TRANSFER_POST_CP_CASH_DW,
  BANK_TRANSFER_POST_CASH_DW,
  BANK_TRANSFER_QUERY_BANK_INFO_DER,
  BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY,
} from '../actions';

export const querySubAccountRetrieve = generateAction<querySubAccountRetrieveParams>(
  BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE
);

export const resetSubAccountRetrieve = generateAction(RESET(BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE));

export const queryGenFundTransfer = generateAction<queryGenFundTransferParams>(BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER);

export const resetGenFundTransfer = generateAction(RESET(BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER));

export const queryBankInfo = generateAction<queryBankInfoParams>(BANK_TRANSFER_QUERY_BANK_INFO);

export const resetBankInfo = generateAction(RESET(BANK_TRANSFER_QUERY_BANK_INFO));

export const postDoFundTransfer = generateAction<doFundTransferParams>(BANK_TRANSFER_DO_FUND_TRANSFER);

export const resetDoFundTransferState = generateAction(RESET(BANK_TRANSFER_DO_FUND_TRANSFER));

export const checkTradeDate = generateAction(BANK_TRANSFER_CHECK_TRADE_DATE);

export const resetCheckTime = generateAction(RESET(BANK_TRANSFER_CHECK_TRADE_DATE));

export const queryCashTransactionHistory = generateAction<cashTransactionHistoryParams>(
  BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY
);

export const resetCashTransactionHistory = generateAction(RESET(BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY));

export const queryDerCashStatement = generateAction<ICashStatementDerParams>(CASH_STATEMENT_DER_QUERY_DATA);

export const resetDerCashStatement = generateAction(RESET(CASH_STATEMENT_EQT_QUERY_DATA));

export const queryEqtCashStatement = generateAction<ICashStatementParams>(CASH_STATEMENT_EQT_QUERY_DATA);

export const resetEqtCashStatement = generateAction(RESET(CASH_STATEMENT_EQT_QUERY_DATA));

export const postDerCashTransfer = generateAction<IDerCashTransferParams>(BANK_TRANSFER_POST_CASH_TRANSFER);

export const queryDerClientCashBalanceShortver = generateAction<IDerClientCashBalanceShortverParams>(
  BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER
);

export const queryDerCashDWEnquiry = generateAction<IDerCashDWEnquiryParams>(BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY);

export const postDerCpCashDW = generateAction<IDerCpCashDWParams>(BANK_TRANSFER_POST_CP_CASH_DW);

export const postDerCashDW = generateAction<IDerCashDWParams>(BANK_TRANSFER_POST_CASH_DW);

export const queryBankInfoDer = generateAction<queryBankInfoParams>(BANK_TRANSFER_QUERY_BANK_INFO_DER);

export const resetBankInfoDer = generateAction(RESET(BANK_TRANSFER_QUERY_BANK_INFO_DER));

export const queryDerCpCashDWEnquiry = generateAction<IDerCpCashDWEnquiryParams>(
  BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY
);
