import React, { memo, useCallback, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors } from 'styles';
import { PriceBoardFormatter } from 'screens/Discover/PriceBoard/PriceBoard.view';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { useDispatch } from 'react-redux';
import { PriceChangeType, TotalType } from 'screens/Discover/PriceBoard/PriceBoard.type';
import PriceBoardCellComponent from '../PriceBoardCell.component';
import { PriceBoardBidOfferCell } from './BidOfferCell.component';
import { CommonBoardStyles } from './CommonBoard.style';
import { navigateToSymbolInfoOverview } from 'utils';

type Props = {
  symbolCode: string;
  priceChangeType: PriceChangeType;
  totalType: TotalType;
};

export const CommonRow = withMemo(({ symbolCode, priceChangeType, totalType }: Props) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode));

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

  const priceChange = useMemo(() => {
    if (!symbolData) return null;
    const { session, changePrice, changeRate, expectedChange, expectedRate } = symbolData;
    if (priceChangeType === 'Value') {
      return (session?.match(/ATO|ATC/) != null && expectedChange) || changePrice;
    } else {
      return (session?.match(/ATO|ATC/) != null && expectedRate) || changeRate;
    }
  }, [
    symbolData?.changePrice,
    symbolData?.changeRate,
    symbolData?.expectedChange,
    symbolData?.expectedRate,
    symbolData?.session,
    priceChangeType,
  ]);

  if (!symbolData) return <EmptyRow />;
  return (
    <TouchableWithoutFeedback onPress={goToStockDetail}>
      <View style={styles.rowContainer}>
        <PriceBoardCellComponent cellData={symbolCode} containerStyles={styles.symbolCode} />
        <View style={styles.bidAskGroup}>
          <PriceBoardBidOfferCell
            data={symbolData.bestBid?.[0]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
          <PriceBoardBidOfferCell
            data={symbolData.bestBid?.[1]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
          <PriceBoardBidOfferCell
            data={symbolData.bestBid?.[2]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
        </View>
        <View style={styles.matchingInfoGroup}>
          <PriceBoardCellComponent
            cellData={
              (symbolData.session?.match(/ATO|ATC/) != null && symbolData.expectedPrice) || symbolData.currentPrice
            }
            symbolType={symbolData.symbolType}
            textColor={priceColor}
            formatter={PriceBoardFormatter.formatPrice}
            containerStyles={styles.matchingInfo}
            smolTextThreshold={1000000}
          />
          <PriceBoardCellComponent
            cellData={totalType === 'Volume' ? symbolData.tradingVolume : symbolData.tradingValue}
            formatter={PriceBoardFormatter.formatVolume}
            containerStyles={styles.matchingVol}
            smolTextThreshold={1000000000}
          />
          <PriceBoardCellComponent
            cellData={priceChange}
            symbolType={symbolData.symbolType}
            textColor={priceColor}
            formatter={
              priceChangeType === 'Value' ? PriceBoardFormatter.formatPrice : PriceBoardFormatter.formatPercent
            }
            containerStyles={styles.matchingInfo}
            smolTextThreshold={10}
          />
        </View>
        <View style={styles.bidAskGroup}>
          <PriceBoardBidOfferCell
            data={symbolData.bestOffer?.[0]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
          <PriceBoardBidOfferCell
            data={symbolData.bestOffer?.[0]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
          <PriceBoardBidOfferCell
            data={symbolData.bestOffer?.[0]}
            symbolType={symbolData.symbolType}
            getColor={getSymbolColor}
            containerStyles={styles.bidAskPrice}
          />
        </View>
        <View style={styles.stockInfoGroup}>
          <PriceBoardCellComponent
            cellData={symbolData.ceilingPrice}
            symbolType={symbolData.symbolType}
            textColor={globalStyles.colorCeiling}
            formatter={PriceBoardFormatter.formatPrice}
            containerStyles={styles.stockPrice}
            smolTextThreshold={100000}
          />
          <PriceBoardCellComponent
            cellData={symbolData.floorPrice}
            symbolType={symbolData.symbolType}
            textColor={globalStyles.colorFloor}
            formatter={PriceBoardFormatter.formatPrice}
            containerStyles={styles.stockPrice}
            smolTextThreshold={100000}
          />
          <PriceBoardCellComponent
            cellData={symbolData.referencePrice}
            symbolType={symbolData.symbolType}
            textColor={globalStyles.colorReference}
            formatter={PriceBoardFormatter.formatPrice}
            containerStyles={styles.stockPrice}
            smolTextThreshold={100000}
          />
        </View>
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
  ...CommonBoardStyles,
  matchingVol: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    margin: 0.5,
    paddingHorizontal: 2,
  },
});
