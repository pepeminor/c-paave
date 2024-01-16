import { Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { RowComponentProps } from 'components/SheetData3';
import { ForeignTradingResponse, SymbolDataSelector } from 'reduxs';
import { getStylesHook, useAppSelector } from 'hooks';
import { lightColors, scaleSize, textStyles } from 'styles';
import { formatNumber, getColor, getIconColor, getSessionPrice, navigateToSymbolInfoOverview } from 'utils';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconFreeze from 'assets/icon/IconCircleFreeze.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import { useDispatch } from 'react-redux';

const Bil = 1000000000;

const Row = ({ data }: RowComponentProps<ForeignTradingResponse>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(data.s), {
    session: true,
    currentPrice: true,
    expectedPrice: true,
    changePrice: true,
    expectedChange: true,
    changeRate: true,
    expectedRate: true,
    referencePrice: true,
    floorPrice: true,
    ceilingPrice: true,
  });

  const price = getSessionPrice(
    symbolData?.session,
    symbolData?.expectedPrice,
    symbolData?.currentPrice,
    symbolData?.referencePrice
  );
  const priceChange = getSessionPrice(symbolData?.session, symbolData?.expectedChange, symbolData?.changePrice);
  const priceChangeRate = getSessionPrice(symbolData?.session, symbolData?.expectedRate, symbolData?.changeRate);
  const { textStyle: priceColor } = getColor(
    price,
    symbolData?.referencePrice,
    symbolData?.ceilingPrice,
    symbolData?.floorPrice
  );
  const icon = getIconColor(
    priceChangeRate,
    0,
    undefined,
    undefined,
    <IconIncrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
    <IconDecrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
    <IconFreeze width={scaleSize(20)} height={scaleSize(20)} />
  );

  const goToStockDetail = useCallback(() => {
    navigateToSymbolInfoOverview(data.s, dispatch);
  }, [data.s]);

  return (
    <TouchableOpacity style={styles.container} onPress={goToStockDetail}>
      <View style={styles.col1}>
        <Text allowFontScaling={false} style={styles.stockCodeText}>
          {data.s}
        </Text>
      </View>
      <View style={styles.col2}>
        <Text allowFontScaling={false} style={[styles.priceText, priceColor]}>
          {formatNumber(price / 1000, 2, undefined, true)}
        </Text>
        <View style={styles.changeContainer}>
          <Text allowFontScaling={false} style={[styles.priceText, priceColor]}>
            {formatNumber(priceChange / 1000, 2, undefined, true)}
          </Text>
          {icon}
          <Text allowFontScaling={false} style={[styles.percentText, priceColor]}>
            {formatNumber(priceChangeRate, 2, undefined, true)}%
          </Text>
        </View>
      </View>
      <View style={styles.col3}>
        <Text allowFontScaling={false} style={styles.buySellValue}>
          {formatNumber(data.fbv / Bil, 2, undefined, true)}
        </Text>
        <Text allowFontScaling={false} style={styles.buySellValue}>
          {formatNumber(data.fsv / Bil, 2, undefined, true)}
        </Text>
      </View>
      <View style={styles.col4}>
        <Text allowFontScaling={false} style={data.fnv > 0 ? styles.netBuyText : styles.netSellText}>
          {formatNumber(data.fnv / Bil, 2, undefined, true)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Row);

const useStyles = getStylesHook({
  container: {
    height: 40,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  col1: {
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  col3: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  col4: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  stockCodeText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  percentText: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    textAlign: 'right',
  },
  buySellValue: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
  },
  netBuyText: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    color: lightColors.DARK_GREEN,
    paddingRight: 10,
  },
  netSellText: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    color: lightColors.LIGHTRed,
    paddingRight: 10,
  },
});
