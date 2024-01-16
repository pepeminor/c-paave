import { call, put, takeLeading } from 'redux-saga/effects';
import { FINANCE_GET_FINANCIAL_STATEMENT } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IFinanceStatementParams, IFinanceStatementResponse } from 'interfaces/finance';
import { query } from 'utils';
import APIList from 'config/api';

function* queryFinanceStatement(action: IAction<IFinanceStatementParams>) {
  try {
    const response: IResponse<IFinanceStatementResponse[]> = yield call(
      query,
      APIList.getFinanceStatement,
      action.payload
    );

    const revenueData = [] as unknown[];
    const costOfGoodsSoldData = [] as unknown[];
    const grossProfitData = [] as unknown[];
    const cashAndCashEquivalentsData = [] as unknown[];
    const netCashFlowFromOperatingActivitiesData = [] as unknown[];
    const netInterestIncomeData = [] as unknown[];
    const netInventoriesData = [] as unknown[];
    const netProfitAfterTaxData = [] as unknown[];
    const netProfitAfterTaxOfParentCompanyData = [] as unknown[];
    const operatingProfitData = [] as unknown[];
    const provisionForCreditRiskData = [] as unknown[];
    const quarter = [] as unknown[];
    const year = [] as unknown[];
    const totalAssetsData = [] as unknown[];
    const totalLiabilitiesData = [] as unknown[];
    const totalEquityData = [] as unknown[];

    for (const data of response.data) {
      revenueData.push(data.revenue);
      costOfGoodsSoldData.push(data.costOfGoodsSold);
      grossProfitData.push(data.grossProfit);
      cashAndCashEquivalentsData.push(data.cashAndCashEquivalents);
      netCashFlowFromOperatingActivitiesData.push(data.netCashFlowFromOperatingActivities);
      netInterestIncomeData.push(data.netInterestIncome);
      netInventoriesData.push(data.netInventories);
      netProfitAfterTaxData.push(data.netProfitAfterTax);
      netProfitAfterTaxOfParentCompanyData.push(data.netProfitAfterTaxOfParentCompany);
      operatingProfitData.push(data.operatingProfit);
      provisionForCreditRiskData.push(data.provisionForCreditRisk);
      totalAssetsData.push(data.totalAssets);
      totalLiabilitiesData.push(data.totalLiabilities);
      totalEquityData.push(data.totalEquity);
      quarter.push(`Q${data.quarter}/`);
      year.push(data.year);
    }

    const quarterData = quarter.map((item, index) => [item, year[index]]);

    yield put({
      type: action.response?.success,
      payload: {
        revenueData,
        costOfGoodsSoldData,
        grossProfitData,
        cashAndCashEquivalentsData,
        netCashFlowFromOperatingActivitiesData,
        netInterestIncomeData,
        netInventoriesData,
        netProfitAfterTaxData,
        netProfitAfterTaxOfParentCompanyData,
        operatingProfitData,
        provisionForCreditRiskData,
        quarterData,
        totalAssetsData,
        totalLiabilitiesData,
        totalEquityData,
      },
    });
  } catch (e) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchQueryFinanceStatement() {
  yield takeLeading(FINANCE_GET_FINANCIAL_STATEMENT, queryFinanceStatement);
}
