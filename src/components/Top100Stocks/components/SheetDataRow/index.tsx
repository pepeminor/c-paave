import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import withMemo from 'HOC/withMemo';
import { useStyles } from './styles';
import RankingBlock from '../RankingBlock';
import { RowComponentProps } from 'components/SheetData3';
import { FinancialRatioRankingItem, SymbolDataSelector } from 'reduxs';
import { useAppSelector } from 'hooks/useAppSelector';
import {
  formatNumber,
  getColor,
  getIconColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  navigateToSymbolInfoOverview,
} from 'utils';
import { useDispatch } from 'react-redux';
import FlashColorText from 'components/FlashColorText';
import IconIncrease from 'assets/icon/IconIncreaseSymbol.svg';
import IconDecrease from 'assets/icon/IconDecreaseSymbol.svg';
import IconReference from 'assets/icon/IconFreezeSymbol.svg';
import IconCeiling from 'assets/icon/IconCeilingSymbol.svg';
import IconFloor from 'assets/icon/IconFloorSymbol.svg';
import Animated from 'react-native-reanimated';
import { FinancialRatioConfig } from 'components/Top100Stocks/Top100Stocks.type';

const BIL = 1000000000;

const SheetDataRow_formatRatioValue = (value: number, selectedFinancialRatio: FinancialRatioConfig) => {
  if (selectedFinancialRatio === 'earnings_per_share') {
    return formatNumber(value);
  }
  if (value > BIL) {
    return formatNumber(value / BIL);
  }
  const numberOfDecimal = (() => {
    const suffix = FinancialRatioConfig[selectedFinancialRatio].suffix;
    if (suffix === '') return 2;
    if (value >= 100) return 0;
    return 2;
  })();
  return formatNumber(value, numberOfDecimal, undefined, true);
};

const SheetDataRow = ({ data, frozenStyle }: RowComponentProps<FinancialRatioRankingItem>) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(data.code), {
    currentPrice: true,
    expectedPrice: true,
    session: true,
    floorPrice: true,
    referencePrice: true,
    ceilingPrice: true,
  });
  const selectedFinancialRatio = useAppSelector(state => state.top100Stocks.financialRatio);

  const goToSymbol = useCallback(() => navigateToSymbolInfoOverview(data.code, dispatch), [data.code]);
  const sessionPrice = getSessionPrice(
    symbolData?.session,
    symbolData?.expectedPrice,
    symbolData?.currentPrice,
    symbolData?.referencePrice
  );

  const sessionPriceColor =
    symbolData &&
    getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false).textStyle
      .color;

  return (
    <TouchableOpacity style={styles.container} onPress={goToSymbol}>
      <Animated.View style={[styles.col1, frozenStyle]}>
        <RankingBlock rank={data.ranking} />
      </Animated.View>
      <Animated.View style={[styles.col2, frozenStyle]}>
        <Text allowFontScaling={false} style={styles.text}>
          {data.code}
        </Text>
      </Animated.View>
      <View style={styles.col3}>
        <Text allowFontScaling={false} style={styles.number}>
          {SheetDataRow_formatRatioValue(data.valueRatio, selectedFinancialRatio)}
          {FinancialRatioConfig[selectedFinancialRatio].suffix}
        </Text>
      </View>
      <View style={styles.col4}>
        {symbolData != null && sessionPriceColor != null ? (
          <FlashColorText
            changeNumber={sessionPrice}
            displayValue={
              symbolData.symbolType === 'FUTURES'
                ? formatNumber(sessionPrice, 1, undefined, true)
                : formatNumber(sessionPrice / 1000, 2, undefined, true)
            }
            textStyles={styles.priceText}
            colorConfig={{
              start: {
                bgColor: hexToRgba(sessionPriceColor, 0.5),
                txtColor: sessionPriceColor,
              },
              steady: {
                bgColor: hexToRgba(sessionPriceColor, 0.5),
                txtColor: sessionPriceColor,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: sessionPriceColor,
              },
            }}
          />
        ) : (
          <Text>-</Text>
        )}
        <View style={styles.containerPL}>
          <Text
            allowFontScaling={false}
            style={[
              styles.numberPL,
              symbolData != null &&
                getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false)
                  .textStyle,
            ]}
          >
            {symbolData != null && symbolData.changePrice != null
              ? symbolData.symbolType === 'FUTURES'
                ? `${formatNumber(
                    getSessionBasedValue(
                      symbolData.session?.match(/^(ATO|ATC)$/) != null,
                      symbolData.expectedChange,
                      symbolData.changePrice
                    ),
                    1,
                    undefined,
                    true
                  )}`
                : `${formatNumber(
                    getSessionBasedValue(
                      symbolData.session?.match(/^(ATO|ATC)$/) != null,
                      symbolData.expectedChange,
                      symbolData.changePrice
                    ) / 1000,
                    2,
                    undefined,
                    true
                  )}`
              : '-'}
          </Text>

          {symbolData != null &&
            getIconColor(
              sessionPrice,
              symbolData.referencePrice,
              symbolData.ceilingPrice,
              symbolData.floorPrice,
              <IconIncrease />,
              <IconDecrease />,
              <IconReference />,
              <IconCeiling />,
              <IconFloor />
            )}

          <Text
            allowFontScaling={false}
            style={[
              styles.numberPL,
              symbolData != null &&
                getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false)
                  .textStyle,
            ]}
          >
            {symbolData != null && symbolData.changeRate != null
              ? `${formatNumber(
                  getSessionBasedValue(
                    symbolData.session?.match(/^(ATO|ATC)$/) != null,
                    symbolData.expectedRate,
                    symbolData.changeRate
                  ),
                  2,
                  undefined,
                  true
                )}%`
              : '-%'}
          </Text>
        </View>
      </View>

      <View style={styles.col5}>
        {symbolData?.tradingVolume != null ? (
          <FlashColorText
            changeNumber={symbolData.tradingVolume}
            displayValue={formatNumber(symbolData.tradingVolume)}
            textStyles={styles.textTradingVolume}
            colorConfig={{
              start: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              steady: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: dynamicColors.BLACK_1,
              },
            }}
          />
        ) : (
          <Text style={styles.priceText}>-</Text>
        )}
        {symbolData?.tradingValue != null ? (
          <FlashColorText
            changeNumber={symbolData.tradingValue}
            displayValue={formatNumber(symbolData.tradingValue / 1000000000, 2, undefined, true)}
            textStyles={styles.textTradingValue}
            colorConfig={{
              start: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              steady: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: dynamicColors.BLACK_1,
              },
            }}
          />
        ) : (
          <Text style={styles.priceText}>-</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default withMemo(SheetDataRow);
