import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from 'interfaces/common';
import { query } from 'utils';
import { FinanceBusinessResponse, FinancialInfoState } from '../FinancialInfo.type';
import { select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';

export function* handleGetRevenueIncome(action: PayloadAction<string>) {
  try {
    const period: string = yield select((state: IState) => state.FinancialInfo.period.slice(0, -2));
    const { data }: IResponse<FinanceBusinessResponse> = yield query(APIList.getFinanceBusiness, {
      code: action.payload,
      sortAsc: true,
      period,
    });

    const {
      quarterlyRevenues,
      yearlyRevenues,
      quarterlyOperatingProfits,
      yearlyOperatingProfits,
      quarterlyNetProfitAfterTax,
      yearlyNetProfitAfterTax,
      quarterlyGrossProfitMargin,
      yearlyGrossProfitMargin,
      quarterlyNetProfitMargin,
      yearlyNetProfitMargin,
      quarterlyTotalLiabilities,
      yearlyTotalLiabilities,
      quarterlyTotalEquity,
      yearlyTotalEquity,
      quarterlyTotalAssets,
      yearlyTotalAssets,
      quarterlyDebtEquity,
      yearlyDebtEquity,
      quarterlyDebtAsset,
      yearlyDebtAsset,
    } = data;

    return {
      QUARTERLY: quarterlyRevenues?.map(item => {
        const operatingProfit = quarterlyOperatingProfits?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const netProfit = quarterlyNetProfitAfterTax?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const grossProfitMargin = quarterlyGrossProfitMargin?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const netProfitMargin = quarterlyNetProfitMargin?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const totalLiabilities = quarterlyTotalLiabilities?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const totalEquity = quarterlyTotalEquity?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const totalAssets = quarterlyTotalAssets?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const debtEquity = quarterlyDebtEquity?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        const debtAsset = quarterlyDebtAsset?.find(
          profit => profit.quarter === item.quarter && profit.year === item.year
        );
        return {
          quarter: item.quarter,
          year: item.year,
          revenues: item.quarterlyRevenueValue,
          operatingProfits: operatingProfit?.quarterlyOperatingProfitValue,
          netProfitsAfterTax: netProfit?.quarterlyNetProfitAfterTaxValue,
          grossProfitMargin: grossProfitMargin?.quarterlyGrossProfitMarginRatio,
          netProfitMargin: netProfitMargin?.quarterlyNetProfitMarginRatio,
          totalLiabilities: totalLiabilities?.quarterlyTotalLiabilitiesValue,
          totalEquity: totalEquity?.quarterlyTotalEquityValue,
          totalAssets: totalAssets?.quarterlyTotalAssetsValue,
          debtEquity: debtEquity?.quarterlyDebtEquityRatio,
          debtAsset: debtAsset?.quarterlyDebtAssetRatio,
        };
      }),
      YEARLY: yearlyRevenues?.map(item => {
        const operatingProfit = yearlyOperatingProfits?.find(profit => profit.year === item.year);
        const netProfit = yearlyNetProfitAfterTax?.find(profit => profit.year === item.year);
        const grossProfitMargin = yearlyGrossProfitMargin?.find(profit => profit.year === item.year);
        const netProfitMargin = yearlyNetProfitMargin?.find(profit => profit.year === item.year);
        const totalLiabilities = yearlyTotalLiabilities?.find(profit => profit.year === item.year);
        const totalEquity = yearlyTotalEquity?.find(profit => profit.year === item.year);
        const totalAssets = yearlyTotalAssets?.find(profit => profit.year === item.year);
        const debtEquity = yearlyDebtEquity?.find(profit => profit.year === item.year);
        const debtAsset = yearlyDebtAsset?.find(profit => profit.year === item.year);
        return {
          year: item.year,
          revenues: item.yearlyRevenueValue,
          operatingProfits: operatingProfit?.yearlyOperatingProfitValue,
          netProfitsAfterTax: netProfit?.yearlyNetProfitAfterTaxValue,
          grossProfitMargin: grossProfitMargin?.yearlyGrossProfitMarginRatio,
          netProfitMargin: netProfitMargin?.yearlyNetProfitMarginRatio,
          totalLiabilities: totalLiabilities?.yearlyTotalLiabilitiesValue,
          totalEquity: totalEquity?.yearlyTotalEquityValue,
          totalAssets: totalAssets?.yearlyTotalAssetsValue,
          debtEquity: debtEquity?.yearlyDebtEquityRatio,
          debtAsset: debtAsset?.yearlyDebtAssetRatio,
        };
      }),
    } as FinancialInfoState['info'];
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('Error in handleGetRevenueIncome: ', error);
    return { QUARTERLY: [], YEARLY: [] };
  }
}
