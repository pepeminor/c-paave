import React, { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { SymbolType } from 'constants/enum';
import { onEnterFinance } from './action';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { queryFinanceStatement } from 'reduxs/global-actions';
import TabSelector from 'components/TabSelector';
import SheetData3 from 'components/SheetData3';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { ACCOUNT_TYPE } from 'global';
import { BUSINESS_PERFORMANCE_FINANCE_TITLE, FinanceTab, IFinancialStatementRow } from './constants';
import { FinancialRatio, FinancialStatement } from './components';
import LoginRequired from 'components/LoginRequired';
import { FinancialInfoActions } from 'reduxs';
import { FinancialChartSection } from './components/FinancialChartSection';
import useUpdateEffect from 'hooks/useUpdateEffect';

const DiscoverStockInfoOverview_financialListExtractKey = (item: IFinancialStatementRow, index: number) => {
  return `Financial_FinancialList_${index}_${item.value}`;
};

const Financial = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();

  const period = useAppSelector(state => state.FinancialInfo.period);
  const getFinanceStatement = useAppSelector(state => state.getFinanceStatement);
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    market: true,
    symbolType: true,
  });
  const isDemoAccount = useAppSelector(state => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);

  const [financeRatioTab, setFinanceRatioTab] = useState<FinanceTab>('RATIO');

  useEffect(() => {
    dispatch(onEnterFinance(currentSymbol?.symbolCode ?? '-'));
    dispatch(FinancialInfoActions.getFinancialInfo({ payload: currentSymbol?.symbolCode }));
    return () => {
      dispatch(FinancialInfoActions.resetFinancialInfo());
    };
  }, [currentSymbol?.symbolCode]);

  useUpdateEffect(() => {
    dispatch(FinancialInfoActions.getFinancialInfo({ payload: currentSymbol?.symbolCode }));
  }, [period]);

  useEffect(() => {
    if (currentSymbol != null && !isDemoAccount) {
      dispatch(queryFinanceStatement({ code: currentSymbol.symbolCode }));
    }
  }, []);

  const businessPerformanceData: IFinancialStatementRow[] = useMemo(
    () => [
      {
        name: 'Name',
        value: getFinanceStatement.data?.quarterData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.REVENUE,
        value: getFinanceStatement.data?.revenueData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.COST_OF_GOODS_SOLD,
        value: getFinanceStatement.data?.costOfGoodsSoldData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.GROSS_PROFIT,
        value: getFinanceStatement.data?.grossProfitData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.OPERATING_PROFIT,
        value: getFinanceStatement.data?.operatingProfitData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.NET_INTEREST_INCOME,
        value: getFinanceStatement.data?.netInterestIncomeData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.PROVISION_FOR_CREDIT_RISK,
        value: getFinanceStatement.data?.provisionForCreditRiskData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.NET_PROFIT_AFTER_TAX,
        value: getFinanceStatement.data?.netProfitAfterTaxData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.NET_PROFIT_AFTER_TAX_OF_PARENT_COMPANY,
        value: getFinanceStatement.data?.netProfitAfterTaxOfParentCompanyData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.NET_CRASH_FLOW,
        value: getFinanceStatement.data?.netCashFlowFromOperatingActivitiesData,
      },
    ],
    [getFinanceStatement.data]
  );

  const balanceSheetData: IFinancialStatementRow[] = useMemo(
    () => [
      {
        name: 'Name',
        value: getFinanceStatement.data?.quarterData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.CASH_AND_CASH_EQUIVALENTS,
        value: getFinanceStatement.data?.cashAndCashEquivalentsData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.NET_INVENTORIES,
        value: getFinanceStatement.data?.netInventoriesData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.TOTAL_ASSET,
        value: getFinanceStatement.data?.totalAssetsData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.TOTAL_LIABILITIES,
        value: getFinanceStatement.data?.totalLiabilitiesData,
      },
      {
        name: BUSINESS_PERFORMANCE_FINANCE_TITLE.TOTAL_EQUITY,
        value: getFinanceStatement.data?.totalEquityData,
      },
    ],
    [getFinanceStatement.data]
  );

  const hideSheetData =
    currentSymbol?.symbolType === SymbolType.ETF ||
    currentSymbol?.symbolType === SymbolType.FUTURES ||
    currentSymbol?.symbolType === SymbolType.CW ||
    isDemoAccount;

  return (
    <View style={globalStyles.container}>
      <FinancialChartSection section="IncomeStatement" period={period} />
      <FinancialChartSection section="DebtRatio" period={period} />
      <FinancialChartSection section="KeyIndicators" period={period} />
      <FinancialChartSection section="ValuationRatio" period={period} />
      <View style={styles.grayLine} />
      <TabSelector value={financeRatioTab} setValue={setFinanceRatioTab} listValue={FinanceTab} type="UNDERLINE" />
      {financeRatioTab === 'RATIO' && <FinancialRatio />}
      {financeRatioTab === 'FINANCIAL_REPORT' && (
        <View style={globalStyles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleTable}>{t('Business Performance')}</Text>
            <Text style={styles.titleTable2}>{t('unit_bil_vnd')}</Text>
          </View>
          {hideSheetData ? (
            <View style={styles.noDataTextContainer}>
              <EmptySymbol />
              <Text allowFontScaling={false} style={styles.noDataText}>
                {t('There is no data')}
              </Text>
            </View>
          ) : (
            <SheetData3
              data={businessPerformanceData}
              RowComponent={FinancialStatement}
              columnWidth={scaleSize(930)}
              horizontalScroll
              keyExtractor={DiscoverStockInfoOverview_financialListExtractKey}
            />
          )}
          <View style={styles.grayLine} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleTable}>{t('Balance Sheet')}</Text>
            <Text style={styles.titleTable2}>{t('unit_bil_vnd')}</Text>
          </View>
          {hideSheetData ? (
            <View style={styles.noDataTextContainer}>
              <EmptySymbol />
              <Text allowFontScaling={false} style={styles.noDataText}>
                {t('There is no data')}
              </Text>
            </View>
          ) : (
            <SheetData3
              data={balanceSheetData}
              RowComponent={FinancialStatement}
              columnWidth={scaleSize(930)}
              horizontalScroll
              keyExtractor={DiscoverStockInfoOverview_financialListExtractKey}
            />
          )}
          <LoginRequired />
        </View>
      )}
    </View>
  );
};

export default memo(Financial);
