import { ILoadingReducer, ReducerStatus } from '../../interfaces/reducer';
import {
  queryBankInfoResponse,
  queryGenFundTransferResponse,
  querySubAccountRetrieveResponse,
  cashTransactionHistoryResponse,
  IDerCashStatementResponse,
  IEqtCashStatementResponse,
  IDerClientCashBalanceShortverResponse,
  IDerCashDWEnquiryResponse,
  IDerCpCashDWEnquiryResponse,
} from '../../interfaces/bankTransfer';
import {
  BANK_TRANSFER_QUERY_BANK_INFO,
  BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER,
  BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE,
  BANK_TRANSFER_CHECK_TRADE_DATE,
  BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY,
  CASH_STATEMENT_DER_QUERY_DATA,
  CASH_STATEMENT_EQT_QUERY_DATA,
  BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER,
  BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY,
  BANK_TRANSFER_QUERY_BANK_INFO_DER,
  BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY,
} from '../actions';
import { SUCCESS, FAILURE, RESET } from '../action-type-utils';
import { IAction } from 'interfaces/common';
import { BANK_TRANSFER_DO_FUND_TRANSFER } from '../actions';

export function GetBankInfo(
  state: ILoadingReducer<queryBankInfoResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<queryBankInfoResponse[]>
): ILoadingReducer<queryBankInfoResponse[] | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_BANK_INFO:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_BANK_INFO):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_BANK_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_BANK_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetSubAccountRetrieve(
  state: ILoadingReducer<querySubAccountRetrieveResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<querySubAccountRetrieveResponse[]>
): ILoadingReducer<querySubAccountRetrieveResponse[] | null> {
  switch (action.type) {
    case BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function CheckTradeDate(state: boolean | null = null, action: IAction<null>) {
  switch (action.type) {
    case BANK_TRANSFER_CHECK_TRADE_DATE:
      return null;
    case SUCCESS(BANK_TRANSFER_CHECK_TRADE_DATE):
      return true;
    case FAILURE(BANK_TRANSFER_CHECK_TRADE_DATE):
      return false;
    case RESET(BANK_TRANSFER_CHECK_TRADE_DATE):
      return null;
    default:
      return state;
  }
}

export function GetGenFundTransfer(
  state: ILoadingReducer<queryGenFundTransferResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<queryGenFundTransferResponse>
): ILoadingReducer<queryGenFundTransferResponse | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetCashTransactionHistory(
  state: ILoadingReducer<cashTransactionHistoryResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<cashTransactionHistoryResponse>
): ILoadingReducer<cashTransactionHistoryResponse | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function CheckDoFundTransfer(state: boolean | null = null, action: IAction<null>) {
  switch (action.type) {
    case BANK_TRANSFER_DO_FUND_TRANSFER:
      return null;
    case SUCCESS(BANK_TRANSFER_DO_FUND_TRANSFER):
      return true;
    case FAILURE(BANK_TRANSFER_DO_FUND_TRANSFER):
      return false;
    case RESET(BANK_TRANSFER_DO_FUND_TRANSFER):
      return null;
    default:
      return state;
  }
}

export function GetDerCashStatement(
  state: ILoadingReducer<IDerCashStatementResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IDerCashStatementResponse>
): ILoadingReducer<IDerCashStatementResponse | null> {
  switch (action.type) {
    case CASH_STATEMENT_DER_QUERY_DATA:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(CASH_STATEMENT_DER_QUERY_DATA):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(CASH_STATEMENT_DER_QUERY_DATA):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(CASH_STATEMENT_DER_QUERY_DATA):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetEqtCashStatement(
  state: ILoadingReducer<IEqtCashStatementResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IEqtCashStatementResponse>
): ILoadingReducer<IEqtCashStatementResponse | null> {
  switch (action.type) {
    case CASH_STATEMENT_EQT_QUERY_DATA:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(CASH_STATEMENT_EQT_QUERY_DATA):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(CASH_STATEMENT_EQT_QUERY_DATA):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(CASH_STATEMENT_EQT_QUERY_DATA):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetDerClientCashBalanceShortver(
  state: ILoadingReducer<IDerClientCashBalanceShortverResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IDerClientCashBalanceShortverResponse>
): ILoadingReducer<IDerClientCashBalanceShortverResponse | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetDerCashDWEnquiry(
  state: ILoadingReducer<IDerCashDWEnquiryResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IDerCashDWEnquiryResponse[]>
): ILoadingReducer<IDerCashDWEnquiryResponse[] | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetBankInfoDer(
  state: ILoadingReducer<queryBankInfoResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<queryBankInfoResponse[]>
): ILoadingReducer<queryBankInfoResponse[] | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_BANK_INFO_DER:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_BANK_INFO_DER):
      return { data: action.payload ?? null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_BANK_INFO_DER):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_BANK_INFO_DER):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetKisDerCpCashDWEnquiry(
  state: ILoadingReducer<IDerCpCashDWEnquiryResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IDerCpCashDWEnquiryResponse[]>
): ILoadingReducer<IDerCpCashDWEnquiryResponse[] | null> {
  switch (action.type) {
    case BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY):
      return { data: action.payload ?? null, status: ReducerStatus.SUCCESS };
    case FAILURE(BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}
