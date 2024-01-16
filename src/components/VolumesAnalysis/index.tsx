import React, { memo, useEffect, useMemo } from 'react';
import StackedBarChart from 'components/StackedBarChart';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppSelector';
import { formatNumber } from 'utils';
import { SymbolDataSelector, getCurrentSymbolStatistic } from 'reduxs/SymbolData';
import { isEqual } from 'lodash';
import { useIsFocused } from '@react-navigation/native';

interface IVolumesAnalysisProp {
  containerStyle?: StyleProp<ViewStyle>;
  chartContainerStyle?: StyleProp<ViewStyle>;
}

const PAGE_NUMBER = 0;
const PAGE_SIZE = 10;

const VolumesAnalysis = ({ containerStyle, chartContainerStyle }: IVolumesAnalysisProp) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const isFocused = useIsFocused();

  const { currentSymbolCode, currentSymbolType, statisticData } = useAppSelector(
    state => {
      const currentSymbol = SymbolDataSelector.selectCurrentSymbol(state);
      return {
        currentSymbolCode: state.SymbolData.currentSymbolCode,
        currentSymbolType: currentSymbol?.symbolType,
        statisticData: state.SymbolData.statisticChannel.data,
      };
    },
    (prev, next) => isEqual(prev.statisticData, next.statisticData)
  );

  const scaleX = useMemo(() => {
    let scaleXValue = 0;

    if (statisticData != null) {
      const { priceStep } = statisticData;

      if (priceStep != null && priceStep.some(el => el.accumulatedRatio !== 100)) {
        let biggestStatisticIdx = 0;

        priceStep.forEach((el, idx) => {
          if (el.accumulatedRatio > priceStep[biggestStatisticIdx].accumulatedRatio) {
            biggestStatisticIdx = idx;
          }
        });

        scaleXValue = 100 - priceStep[biggestStatisticIdx].accumulatedRatio;
      }
    }

    return scaleXValue;
  }, [statisticData]);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getCurrentSymbolStatistic({
          payload: { symbol: currentSymbolCode, pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE },
        })
      );
    }
  }, [isFocused, currentSymbolCode]);

  return (
    <View style={[globalStyles.container, styles.container, containerStyle]}>
      {currentSymbolType === 'FUTURES' || statisticData == null || statisticData.priceStep == null ? null : (
        <View style={[styles.chartContainer, chartContainerStyle]}>
          {statisticData.priceStep.map((item, index) => (
            <View key={`${item.price}-${index}`} style={styles.rowContainer}>
              <View style={styles.priceColumn}>
                <Text style={styles.textStyle} allowFontScaling={false}>
                  {formatNumber(item.price / 1000, 2, undefined, true)}
                </Text>
              </View>
              <View style={styles.stackedBarChartColumn}>
                <StackedBarChart
                  containerStyles={styles.stackedBarChartContainer}
                  totalValue={
                    index === 0 ? item.accumulatedRatio + scaleX : (item.accumulatedRatio / (100 - scaleX)) * 100
                  }
                  buyValue={item.buyRatio}
                  sellValue={item.sellRatio}
                  unknownValue={item.unknownRatio}
                />
              </View>
              <View style={styles.PercentColumn}>
                <Text style={styles.textStyle} allowFontScaling={false}>
                  {formatNumber(item.accumulatedRatio, 2)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default memo(VolumesAnalysis);
