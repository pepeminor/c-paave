import React, { memo, useCallback, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles from 'styles';
import PriceBoardCellComponent from '../PriceBoardCell.component';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { useDispatch } from 'react-redux';
import { PriceBoardFormatter } from 'screens/Discover/PriceBoard/PriceBoard.view';
import { IndexBoardStyles } from './IndexBoard.style';
import { navigateToSymbolInfoOverview } from 'utils';

type Props = {
  symbolCode: string;
};

export const IndexRow = withMemo(({ symbolCode }: Props) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode), {
    currentPrice: true,
    changePrice: true,
    changeRate: true,
    tradingVolume: true,
    tradingValue: true,
    // indexChange: true,
  });

  const goToStockDetail = useCallback(() => {
    navigateToSymbolInfoOverview(symbolCode, dispatch);
  }, [symbolCode]);

  const getSymbolColor = useCallback(
    (comparePrice?: number) => {
      if (!symbolData) return globalStyles.noData;
      const { referencePrice, floorPrice, ceilingPrice } = symbolData;
      if (comparePrice == null) return globalStyles.noData;
      switch (comparePrice) {
        case ceilingPrice:
          return globalStyles.colorCeiling;
        case floorPrice:
          return globalStyles.colorFloor;
        case referencePrice:
          return globalStyles.colorReference;
        default:
          if (comparePrice > referencePrice) {
            return globalStyles.colorUp;
          } else {
            return globalStyles.colorDown;
          }
      }
    },
    [symbolData?.referencePrice, symbolData?.floorPrice, symbolData?.ceilingPrice]
  );

  const priceColor = useMemo(() => {
    if (!symbolData) return globalStyles.noData;
    const { session, expectedPrice, currentPrice } = symbolData;
    return getSymbolColor((session?.match(/ATO|ATC/) != null && expectedPrice) || currentPrice);
  }, [symbolData?.currentPrice, symbolData?.expectedPrice, symbolData?.session]);

  if (!symbolData) return <EmptyRow />;

  return (
    <TouchableWithoutFeedback onPress={goToStockDetail}>
      <View style={styles.rowContainer}>
        <PriceBoardCellComponent cellData={symbolCode} containerStyles={styles.symbolCode} />
        <PriceBoardCellComponent
          cellData={symbolData.currentPrice}
          textColor={priceColor}
          containerStyles={styles.price}
          formatter={PriceBoardFormatter.formatIndexPrice}
        />
        <PriceBoardCellComponent
          cellData={symbolData.changePrice}
          textColor={priceColor}
          containerStyles={styles.priceChange}
          formatter={PriceBoardFormatter.formatIndexPrice}
        />
        <PriceBoardCellComponent
          cellData={symbolData.changeRate}
          textColor={priceColor}
          containerStyles={styles.priceChange}
          formatter={PriceBoardFormatter.formatPercent}
        />
        <PriceBoardCellComponent
          cellData={symbolData.tradingVolume}
          containerStyles={styles.volumeValue}
          formatter={PriceBoardFormatter.formatVolume}
        />
        <PriceBoardCellComponent
          cellData={symbolData.tradingValue}
          containerStyles={styles.volumeValue}
          formatter={PriceBoardFormatter.formatVolume}
        />
        {/* <PriceBoardCellComponent cellData={symbolData.indexChange?.upCount} containerStyles={styles.stocksChanged} />
        <PriceBoardCellComponent cellData={symbolData.indexChange?.downCount} containerStyles={styles.stocksChanged} />
        <PriceBoardCellComponent
          cellData={symbolData.indexChange?.unChangeCount}
          containerStyles={styles.stocksChanged}
        /> */}
      </View>
    </TouchableWithoutFeedback>
  );
});

export const EmptyRow = memo(() => {
  const { styles } = useStyles();
  return <View style={styles.rowContainer} />;
});

const useStyles = getStylesHook({
  rowContainer: {
    flexDirection: 'row',
    height: 20,
  },
  ...IndexBoardStyles,
});
