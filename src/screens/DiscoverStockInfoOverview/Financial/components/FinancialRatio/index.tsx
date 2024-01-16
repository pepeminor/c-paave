import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './styles';
import { FINANCIAL_RATIO_TITLE } from 'constants/enum';
import FinancialRatioRow, { FinancialRatioRowProps } from './FinancialRatioRow';
import { useAppSelector } from 'hooks/useAppSelector';
import { ReducerStatus } from 'interfaces/reducer';
import { RatioQuestionModal, FinancialRankModal } from './components';
import { SymbolDataSelector } from 'reduxs';
import { useTranslation } from 'react-i18next';

const TURN_AROUND_VALUE = 'TurnAround';
const NA_VALUE = 'N/A';

export const FinancialRatio = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const financialRatioData = useAppSelector(state => {
    const data = state.getFinancialRatioData;
    return data.status === ReducerStatus.SUCCESS ? data.data : null;
  });
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    market: true,
    symbolType: true,
  });

  const rowConfigs = useMemo(() => {
    if (financialRatioData == null) return [];
    const configs = [] as FinancialRatioRowProps[];
    configs.push({
      title: FINANCIAL_RATIO_TITLE.MARKET_CAP,
      value: financialRatioData.marketCap?.valueRatio
        ? financialRatioData.marketCap.valueRatio / 1000000000
        : undefined,
      ranking: financialRatioData.marketCap?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.EPS,
      value: financialRatioData.earningsPerShare?.valueRatio,
      ranking: financialRatioData.earningsPerShare?.ranking,
      minFractionDigits: 0,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.ROE,
      value: financialRatioData.returnOnEquity?.valueRatio,
      ranking: financialRatioData.returnOnEquity?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.ROA,
      value: financialRatioData.returnOnAssets?.valueRatio,
      ranking: financialRatioData.returnOnAssets?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.PE,
      value: financialRatioData.priceToEarningsRatio?.valueRatio,
      ranking: financialRatioData.priceToEarningsRatio?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.PS,
      value: financialRatioData.priceToSalesRatio?.valueRatio,
      ranking: financialRatioData.priceToSalesRatio?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.PC,
      value: financialRatioData.priceToCashFlowRatio?.valueRatio,
      ranking: financialRatioData.priceToCashFlowRatio?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.PB,
      value: financialRatioData.priceToBookRatio?.valueRatio,
      ranking: financialRatioData.priceToBookRatio?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.GROSS_PROFIT_MARGIN,
      value: financialRatioData.grossProfitMargin?.valueRatio,
      ranking: financialRatioData.grossProfitMargin?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.NET_PROFIT_MARGIN,
      value: financialRatioData.netProfitMargin?.valueRatio,
      ranking: financialRatioData.netProfitMargin?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.REVENUE_GROWTH_YOY,
      value: financialRatioData.revenueGrowthYOY?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.revenueGrowthYOY?.notGiven
        ? NA_VALUE
        : financialRatioData.revenueGrowthYOY?.valueRatio,
      ranking:
        financialRatioData.revenueGrowthYOY?.turnAround || financialRatioData.revenueGrowthYOY?.notGiven
          ? undefined
          : financialRatioData.revenueGrowthYOY?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.GROSS_PROFIT_GROWTH_YOY,
      value: financialRatioData.grossProfitGrowthYOY?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.grossProfitGrowthYOY?.notGiven
        ? NA_VALUE
        : financialRatioData.grossProfitGrowthYOY?.valueRatio,
      ranking:
        financialRatioData.grossProfitGrowthYOY?.turnAround || financialRatioData.grossProfitGrowthYOY?.notGiven
          ? undefined
          : financialRatioData.grossProfitGrowthYOY?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.NET_PROFIT_GROWTH_YOY,
      value: financialRatioData.netProfitGrowthYOY?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.netProfitGrowthYOY?.notGiven
        ? NA_VALUE
        : financialRatioData.netProfitGrowthYOY?.valueRatio,
      ranking:
        financialRatioData.netProfitGrowthYOY?.turnAround || financialRatioData.netProfitGrowthYOY?.notGiven
          ? undefined
          : financialRatioData.netProfitGrowthYOY?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.NET_PROFIT_GROWTH_QOQ,
      value: financialRatioData.netProfitGrowthQOQ?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.netProfitGrowthQOQ?.notGiven
        ? NA_VALUE
        : financialRatioData.netProfitGrowthQOQ?.valueRatio,
      ranking:
        financialRatioData.netProfitGrowthQOQ?.turnAround || financialRatioData.netProfitGrowthQOQ?.notGiven
          ? undefined
          : financialRatioData.netProfitGrowthQOQ?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.REVENUE_GROWTH_QOQ,
      value: financialRatioData.revenueProfitGrowthQOQ?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.revenueProfitGrowthQOQ?.notGiven
        ? NA_VALUE
        : financialRatioData.revenueProfitGrowthQOQ?.valueRatio,
      ranking:
        financialRatioData.revenueProfitGrowthQOQ?.turnAround || financialRatioData.revenueProfitGrowthQOQ?.notGiven
          ? undefined
          : financialRatioData.revenueProfitGrowthQOQ?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.GROSS_PROFIT_GROWTH_QOQ,
      value: financialRatioData.grossProfitGrowthQOQ?.turnAround
        ? TURN_AROUND_VALUE
        : financialRatioData.grossProfitGrowthQOQ?.notGiven
        ? NA_VALUE
        : financialRatioData.grossProfitGrowthQOQ?.valueRatio,
      ranking:
        financialRatioData.grossProfitGrowthQOQ?.turnAround || financialRatioData.grossProfitGrowthQOQ?.notGiven
          ? undefined
          : financialRatioData.grossProfitGrowthQOQ?.ranking,
      type: 'percent',
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.DEBT_EQUITY_RATIO,
      value: financialRatioData.debtEquityRatio?.valueRatio,
      ranking: financialRatioData.debtEquityRatio?.ranking,
    });
    configs.push({
      title: FINANCIAL_RATIO_TITLE.DEBT_ASSET_RATIO,
      value: financialRatioData.debtAssetRatio?.valueRatio,
      ranking: financialRatioData.debtAssetRatio?.ranking,
    });
    return configs;
  }, [financialRatioData]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.cellTitle}>
          <Text allowFontScaling={false} style={styles.textTitle}>
            {t('Financial Ratio')}
          </Text>
          <RatioQuestionModal />
        </View>
        <View style={styles.cellHeader}>
          <Text allowFontScaling={false} style={styles.textTitle}>
            {t('Value')}
          </Text>
        </View>
        <View style={styles.cellHeader}>
          <View>
            <Text allowFontScaling={false} style={styles.textTitle}>
              {t('Rank')}
            </Text>
            <Text allowFontScaling={false} style={styles.textTitle}>
              ({currentSymbol != null ? t('x to ' + currentSymbol.market) : ''})
            </Text>
          </View>
          <FinancialRankModal />
        </View>
      </View>
      {rowConfigs.map((item, index) => (
        <FinancialRatioRow key={`FinancialRatio_${item.title}_${index}`} {...item} />
      ))}
    </View>
  );
});
