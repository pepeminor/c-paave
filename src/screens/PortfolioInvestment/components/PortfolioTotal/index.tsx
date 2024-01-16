import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import useStyles from './styles';
import { formatNumber, getColor, getIconColor } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProfitLossItems } from 'interfaces/equity';
import { MergeMarketSymbol } from 'reduxs/SymbolData';
import { getProfitLossData } from 'components/StockList/components/StockRow';
import { InvestmentSelectors } from 'reduxs';
import { ReducerStatus } from 'interfaces/reducer';
import Icon from 'components/Icon';

const getData = (
  data: IProfitLossItems[] | undefined,
  mergeSymbolMap: {
    [s: string]: MergeMarketSymbol | undefined;
  }
) => {
  const profitLossList =
    data?.map(item => {
      const stockData = mergeSymbolMap[item.stockCode];
      const { currentValue, profitLoss } = getProfitLossData(item, stockData);
      return { currentValue, profitLoss };
    }) ?? [];
  const totalMarketValue = profitLossList.reduce((a, b) => a + b.currentValue, 0);
  const totalProfitLoss = profitLossList.reduce((a, b) => a + b.profitLoss, 0);
  return {
    totalMarketValue,
    totalProfitLoss,
    totalProfitLossRate: totalMarketValue ? (totalProfitLoss * 100) / (totalMarketValue - totalProfitLoss) : 0,
  };
};

const PortfolioTotal = () => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const profitLossItems = useAppSelector(InvestmentSelectors.selectedProfitLossItems(false));
  const mergeSymbolMap = useAppSelector(state => state.SymbolData.mergeSymbolMap);
  const status = useAppSelector(InvestmentSelectors.selectedProfitLossStatus(false));

  const { totalMarketValue, totalProfitLoss, totalProfitLossRate } = getData(profitLossItems, mergeSymbolMap);

  if (status === ReducerStatus.LOADING) return null;

  return profitLossItems != null ? (
    <View style={styles.container}>
      <View style={styles.blockContainer}>
        {/* Total Market Value */}
        <View style={styles.childBlockContainer}>
          <Text style={styles.textTitle}>{t('Total Market Value')}</Text>
          <Text style={styles.textTotalMarketValue}>
            {totalMarketValue != null ? formatNumber(totalMarketValue) : '-'}
          </Text>
        </View>

        <View style={styles.border} />

        {/* Total Profit/ Loss */}
        <View style={styles.childBlockContainer}>
          <Text style={styles.textTitle}>{t('Total Profit/ Loss')}</Text>
          <View style={styles.blockTextTotalProfitLostContainer}>
            <Text
              style={[
                styles.textTotalProfitLossValue,
                getColor(totalProfitLoss, 0, undefined, undefined, true).textStyle,
              ]}
            >
              {totalProfitLoss != null ? formatNumber(totalProfitLoss) : '-'}
            </Text>
            {getIconColor(
              totalProfitLoss,
              0,
              undefined,
              undefined,
              <Icon name={'arrow-up-2'} size={16} color={dynamicColors.DARK_GREEN} />,
              <Icon name={'arrow-down-2'} size={16} color={dynamicColors.LIGHTRed2} />
            )}
            <Text
              style={[
                styles.textTotalProfitLossValue,
                getColor(totalProfitLossRate, 0, undefined, undefined, true).textStyle,
              ]}
            >
              {`${totalProfitLoss === 0 ? ' ' : ''}(${
                totalProfitLossRate != null ? formatNumber(totalProfitLossRate, 2) + '%' : '-'
              })`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};

export default memo(PortfolioTotal);
