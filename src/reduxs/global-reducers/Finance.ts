import { IFinancialRatioResponse, IForeignTradeResponse } from 'interfaces/finance';
import { IAction } from 'interfaces/common';
import { ReducerStatus, ILoadingReducer } from 'interfaces/reducer';
import { FINANCE_GET_FINANCIAL_RATIO, FINANCE_GET_FINANCIAL_STATEMENT, OVERVIEW_FOREIGN_TRADE } from '../actions';
import { SUCCESS, FAILURE, RESET } from '../action-type-utils';

type IFinanceStatement = {
  revenueData: number[];
  costOfGoodsSoldData: number[];
  grossProfitData: number[];
  cashAndCashEquivalentsData: number[];
  netCashFlowFromOperatingActivitiesData: number[];
  netInterestIncomeData: number[];
  netInventoriesData: number[];
  netProfitAfterTaxData: number[];
  netProfitAfterTaxOfParentCompanyData: number[];
  operatingProfitData: number[];
  provisionForCreditRiskData: number[];
  quarterData: string[];
  totalAssetsData: number[];
  totalLiabilitiesData: number[];
  totalEquityData: number[];
};

export function GetFinancialRatioData(
  state: ILoadingReducer<IFinancialRatioResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IFinancialRatioResponse>
): ILoadingReducer<IFinancialRatioResponse | null> {
  switch (action.type) {
    case FINANCE_GET_FINANCIAL_RATIO:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(FINANCE_GET_FINANCIAL_RATIO):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(FINANCE_GET_FINANCIAL_RATIO):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(FINANCE_GET_FINANCIAL_RATIO): {
      return { data: null, status: ReducerStatus.LOADING };
    }
    default:
      return state;
  }
}

export function ForeignTrade(
  state: ILoadingReducer<IForeignTradeResponse> = {
    data: { foreignTradeDtoList: [], foreignTradeDtoListForLast29Days: [] },
    status: ReducerStatus.LOADING,
  },
  action: IAction<IForeignTradeResponse>
): ILoadingReducer<IForeignTradeResponse> {
  switch (action.type) {
    case OVERVIEW_FOREIGN_TRADE:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(OVERVIEW_FOREIGN_TRADE):
      return { ...state, data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(OVERVIEW_FOREIGN_TRADE):
      return { data: { foreignTradeDtoList: [], foreignTradeDtoListForLast29Days: [] }, status: ReducerStatus.FAILED };
    case RESET(OVERVIEW_FOREIGN_TRADE):
      return { data: { foreignTradeDtoList: [], foreignTradeDtoListForLast29Days: [] }, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetFinanceStatement(
  state: ILoadingReducer<IFinanceStatement | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IFinanceStatement>
): ILoadingReducer<IFinanceStatement | null> {
  switch (action.type) {
    case FINANCE_GET_FINANCIAL_STATEMENT:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(FINANCE_GET_FINANCIAL_STATEMENT):
      return { data: action.payload ?? null, status: ReducerStatus.SUCCESS };
    case FAILURE(FINANCE_GET_FINANCIAL_STATEMENT):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
