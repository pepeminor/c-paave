import { SymbolSession } from 'constants/enum';
import { IForeignTradeDto } from 'interfaces/finance';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useAppSelector } from 'hooks';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import globalStyles, { width } from 'styles';
import { formatNumber, formatDateToString, formatStringToDateString } from 'utils';
import ForeignTradeChart from './ForeignTradeChart';
import useStyles from './styles';
import RenderHTML from 'react-native-render-html';
import { getLastTradingDay } from './helper';

export const ForeignTrade = memo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const currentForeignTrade = useCurrentForeignTrade();
  const holidays = useAppSelector(state => state.holidays);

  const foreignTrade = useAppSelector(state => state.foreignTrade);
  const lastTradingDate = useAppSelector(state => state.lastTradingDate);

  const getTotalNetBuy = useMemo(() => {
    const totalNetBuyForLast10Days =
      foreignTrade.data.foreignTradeDtoList?.reduce((prev, curr) => prev + curr.netBuyForeignValue, 0) +
      currentForeignTrade.netBuyForeignValue;
    const totalNetBuyForLast30Days =
      foreignTrade.data.foreignTradeDtoListForLast29Days?.reduce((prev, curr) => prev + curr.netBuyForeignValue, 0) +
      currentForeignTrade.netBuyForeignValue;
    return { totalNetBuyForLast10Days, totalNetBuyForLast30Days };
  }, [currentForeignTrade.netBuyForeignValue, foreignTrade.data]);

  const getColor = (value = 0) => {
    if (value > 0) {
      return styles.textGreen;
    }
    if (value < 0) {
      return styles.textRed;
    }
    return;
  };

  return (
    <View style={globalStyles.container}>
      <Text allowFontScaling={false} style={styles.titleText}>
        {t('Foreigners Trading')}
      </Text>
      <View style={globalStyles.borderBottom1}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.headerCell}>
            {currentForeignTrade.date != null &&
              formatStringToDateString(lastTradingDate.data?.lastTradingDate || '', 'dd/MM/yyyy') ===
                currentForeignTrade.date && (
                <Text allowFontScaling={false} style={[styles.headerDateText]}>
                  {t('Date')} {formatDateToString(getLastTradingDay(holidays), 'dd/MM')}
                </Text>
              )}
          </View>
          <View style={styles.headerCell}>
            <Text allowFontScaling={false} style={styles.headerText}>
              {t('Volume')}
            </Text>
          </View>
          <View style={styles.headerCell}>
            <Text allowFontScaling={false} style={styles.headerText}>
              {t('Value')}
            </Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={styles.firstCell}>
              {t('Buy')}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={[styles.numberCell, styles.textGreen]}>
              {currentForeignTrade?.buyForeignQuantity != null
                ? formatNumber(currentForeignTrade.buyForeignQuantity)
                : '-'}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={[styles.numberCell, styles.textGreen]}>
              {currentForeignTrade?.buyForeignValue != null ? formatNumber(currentForeignTrade.buyForeignValue) : '-'}
            </Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={styles.firstCell}>
              {t('Sell')}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={[styles.numberCell, styles.textRed]}>
              {currentForeignTrade?.sellForeignQuantity != null
                ? formatNumber(currentForeignTrade.sellForeignQuantity)
                : '-'}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={[styles.numberCell, styles.textRed]}>
              {currentForeignTrade?.sellForeignValue != null ? formatNumber(currentForeignTrade.sellForeignValue) : '-'}
            </Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.cell}>
            <Text allowFontScaling={false} style={styles.firstCell}>
              {t('Net Buy')}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              allowFontScaling={false}
              style={[styles.numberCell, getColor(currentForeignTrade?.netBuyForeignQuantity)]}
            >
              {currentForeignTrade?.netBuyForeignQuantity != null
                ? formatNumber(currentForeignTrade.netBuyForeignQuantity)
                : '-'}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text
              allowFontScaling={false}
              style={[styles.numberCell, getColor(currentForeignTrade?.netBuyForeignValue)]}
            >
              {currentForeignTrade?.netBuyForeignValue != null
                ? formatNumber(currentForeignTrade.netBuyForeignValue)
                : '-'}
            </Text>
          </View>
        </View>
      </View>
      <ForeignTradeChart currentForeignTrade={currentForeignTrade} />
      <View style={styles.summaryContainer}>
        <Text allowFontScaling={false} style={styles.summaryTextTitle}>
          {t('*Summary')}
        </Text>
        <View style={styles.summaryText}>
          <RenderHTML
            source={{
              html: t('ForeignTradeSummary', {
                day: '10',
                value: formatNumber(getTotalNetBuy.totalNetBuyForLast10Days),
                fontSize: styles.summaryText.fontSize,
                lineHeight: styles.summaryText.lineHeight,
                color: getColor(getTotalNetBuy.totalNetBuyForLast10Days)?.color,
              }),
            }}
            contentWidth={width}
          />
          <View style={styles.pt12} />
          <RenderHTML
            source={{
              html: t('ForeignTradeSummary', {
                day: '30',
                value: formatNumber(getTotalNetBuy.totalNetBuyForLast30Days),
                fontSize: styles.summaryText.fontSize,
                lineHeight: styles.summaryText.lineHeight,
                color: getColor(getTotalNetBuy.totalNetBuyForLast30Days)?.color,
              }),
            }}
            contentWidth={width}
          />
        </View>
      </View>
    </View>
  );
});

export const useCurrentForeignTrade = () => {
  const currentQuote = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    foreignData: {
      buyVolume: true,
      sellVolume: true,
    },
    currentPrice: true,
    expectedPrice: true,
    session: true,
  });

  return useMemo(() => {
    if (currentQuote == null)
      return {
        date: formatDateToString(new Date(), 'dd/MM/yyyy') ?? '',
        buyForeignQuantity: 0,
        buyForeignValue: 0,
        sellForeignQuantity: 0,
        sellForeignValue: 0,
        netBuyForeignQuantity: 0,
        netBuyForeignValue: 0,
      };
    const { foreignData, currentPrice, expectedPrice, session } = currentQuote;
    if (foreignData == null) {
      return {
        date: formatDateToString(new Date(), 'dd/MM/yyyy') ?? '',
        buyForeignQuantity: 0,
        buyForeignValue: 0,
        sellForeignQuantity: 0,
        sellForeignValue: 0,
        netBuyForeignQuantity: 0,
        netBuyForeignValue: 0,
      };
    }
    const { buyVolume = 0, sellVolume = 0 } = foreignData;
    const price = (session === SymbolSession.CONTINUOUS ? currentPrice : expectedPrice ?? currentPrice) ?? 0;
    return {
      date: formatDateToString(new Date(), 'dd/MM/yyyy') ?? '',
      buyForeignQuantity: buyVolume,
      buyForeignValue: buyVolume * price,
      sellForeignQuantity: sellVolume,
      sellForeignValue: sellVolume * price,
      netBuyForeignQuantity: buyVolume - sellVolume,
      netBuyForeignValue: (buyVolume - sellVolume) * price,
    };
  }, [currentQuote]) as IForeignTradeDto;
};
