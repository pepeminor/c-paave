import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { useDispatch } from 'react-redux';
import { formatNumber, getColor, hexToRgba, navigateToSymbolInfoOverview } from 'utils';
import { useStyles } from './styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs';
import { RowComponentProps } from 'components/SheetData3';
import { SymbolType } from 'constants/enum';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import FlashColorBackground from 'components/FlashColorBackground';
import withInjectedProps from 'HOC/withInjectProps';
import { PriceChangeType, TotalType } from '../../PriceBoard.type';
import { EmptyCell } from '../EmptyCell';

export const PriceBoardFormatter = {
  formatPrice: (value: unknown, stockType?: keyof typeof SymbolType) => {
    if (typeof value !== 'number') return '-';
    if (stockType === 'FUTURES') return formatNumber(value, 1, undefined, true);
    if (stockType === 'INDEX') return formatNumber(value, 2, undefined, true);
    return formatNumber(value / 1000, 2, undefined, true);
  },
  formatIndexPrice: (value: unknown) => {
    if (typeof value !== 'number') return '-';
    return formatNumber(value, 2, undefined, true);
  },
  formatPercent: (value: unknown) => {
    if (typeof value !== 'number') return '';
    return formatNumber(value, 2, undefined, true) + '%';
  },
  formatVolume: (value: unknown) => {
    if (typeof value !== 'number') return '';
    return formatNumber(value, 0);
  },
};

type AdditionalProps = {
  priceChangeType: PriceChangeType;
  totalType: TotalType;
};

const PriceBoardRow = ({
  data: symbolCode,
  priceChangeType,
  totalType,
}: RowComponentProps<string> & AdditionalProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode));

  const goToStockDetail = useCallback(() => {
    navigateToSymbolInfoOverview(symbolCode, dispatch);
  }, [symbolCode]);

  const isATO_ATC = symbolData?.session?.match(/ATO|ATC/) != null;
  const currentPrice = (isATO_ATC && symbolData?.expectedPrice) || symbolData?.currentPrice;
  const changePrice = (isATO_ATC && symbolData?.expectedChange) || symbolData?.changePrice;
  const changeRate = (isATO_ATC && symbolData?.expectedRate) || symbolData?.changeRate;
  const textColor = getColor(
    currentPrice,
    symbolData?.currentPrice === 0 ? 0 : symbolData?.referencePrice,
    symbolData?.ceilingPrice,
    symbolData?.floorPrice
  ).textStyle;
  const cellForthValue = totalType === 'Value' ? symbolData?.tradingValue : symbolData?.tradingVolume;

  const memoizedStyles = useMemoizedStyles({
    secondCellText: [styles.secondCellText, textColor, (currentPrice ?? 0) >= 1000000000 && styles.smolText],
    forthCellText: [styles.forthCellText, (currentPrice ?? 0) >= 1000000000000 && styles.smolText],
  });

  return (
    <TouchableOpacity onPress={goToStockDetail} style={styles.container}>
      <View style={styles.firstCell}>
        <Text allowFontScaling={false} style={styles.firstCellText}>
          {symbolData?.symbolCode}
        </Text>
      </View>
      {currentPrice != null ? (
        <FlashColorBackground
          changeNumber={currentPrice}
          displayValue={PriceBoardFormatter.formatPrice(currentPrice, symbolData?.symbolType)}
          textStyles={memoizedStyles.secondCellText}
          allowFontScaling={false}
          style={styles.secondCell}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(textColor.color, 0.3)}
        />
      ) : (
        <EmptyCell containerStyles={styles.secondCell} />
      )}
      {priceChangeType === 'Value' ? (
        changePrice != null ? (
          <FlashColorBackground
            changeNumber={changePrice}
            displayValue={PriceBoardFormatter.formatPrice(changePrice, symbolData?.symbolType)}
            textStyles={memoizedStyles.secondCellText}
            allowFontScaling={false}
            style={styles.secondCell}
            startColor={dynamicColors.Transparent}
            endColor={dynamicColors.Transparent}
            steadyColor={hexToRgba(textColor.color, 0.3)}
          />
        ) : (
          <EmptyCell containerStyles={styles.secondCell} />
        )
      ) : changeRate != null ? (
        <FlashColorBackground
          changeNumber={changeRate}
          displayValue={PriceBoardFormatter.formatPercent(changeRate)}
          textStyles={memoizedStyles.secondCellText}
          allowFontScaling={false}
          style={styles.secondCell}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(textColor.color, 0.3)}
        />
      ) : (
        <EmptyCell containerStyles={styles.secondCell} />
      )}
      {currentPrice != null ? (
        <FlashColorBackground
          changeNumber={cellForthValue ?? 0}
          displayValue={PriceBoardFormatter.formatVolume(cellForthValue)}
          textStyles={memoizedStyles.forthCellText}
          allowFontScaling={false}
          style={styles.forthCell}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(dynamicColors.DARKTextBigTitle, 0.4)}
        />
      ) : (
        <EmptyCell containerStyles={styles.forthCell} />
      )}
    </TouchableOpacity>
  );
};

export default withInjectedProps<RowComponentProps<string>, AdditionalProps>(withMemo(PriceBoardRow));
