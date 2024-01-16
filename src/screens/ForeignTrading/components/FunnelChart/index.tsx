import { View, Text, ActivityIndicator } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { FunnelRow } from './FunnelRow';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { ForeignTradingActions, ForeignTradingMarket } from 'reduxs';
import TabSelector from 'components/TabSelector';

export const FunnelChart = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedMarket = useAppSelector(state => state.foreignTrading.selectedMarket);
  const buyData = useAppSelector(state => state.foreignTrading.foreignBuy[state.foreignTrading.selectedMarket]);
  const sellData = useAppSelector(state => state.foreignTrading.foreignSell[state.foreignTrading.selectedMarket]);

  const setSelectedMarket = useCallback((market: ForeignTradingMarket) => {
    dispatch(ForeignTradingActions.setSelectedMarket(market));
    dispatch(
      ForeignTradingActions.getData({
        marketType: market,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      ForeignTradingActions.getData({
        marketType: 'ALL',
      })
    );
  }, []);

  const maxBuyValue = buyData?.[0]?.fnv || 1;
  const maxSellValue = Math.abs(sellData?.[0]?.fnv || 1);

  return (
    <View>
      <TabSelector
        value={selectedMarket}
        setValue={setSelectedMarket}
        listValue={ForeignTradingMarket}
        type="SOLID_WITH_HIGHLIGHT"
      />
      <View style={styles.legendsContainer}>
        <View style={styles.legendItem}>
          <View style={styles.firstLegend} />
          <Text style={styles.legendText}>
            {t('top_buy')} ({t('Bil')})
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.secondLegend} />
          <Text style={styles.legendText}>
            {t('top_sell')} ({t('Bil')})
          </Text>
        </View>
      </View>
      {buyData != null && sellData != null ? (
        <View style={styles.chartContainer}>
          <View style={styles.firstColumn}>
            {buyData?.map((item, index) => (
              <FunnelRow label={item.s} value={item.fnv} maxValue={maxBuyValue} key={index} />
            ))}
          </View>
          <View style={styles.secondColumn}>
            {sellData?.map((item, index) => (
              <FunnelRow label={item.s} value={item.fnv} maxValue={maxSellValue} key={index} column="SECOND" />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
});
