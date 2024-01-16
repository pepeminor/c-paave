import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import withMemo from 'HOC/withMemo';
import { BidOffer } from 'reduxs/SymbolData';
import { getStylesHook, useColors } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { hexToRgba } from 'utils';
import FlashColorBackground from 'components/FlashColorBackground';
import { ItemHeight } from '../../PriceBoardFullScreen.type';
import { PriceBoardFormatter } from 'screens/Discover/PriceBoard/PriceBoard.view';
import { SymbolType } from 'constants/enum';
import { CellTextProps } from 'screens/PriceBoardFullScreen/constants';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

type PriceBoardBidOfferCell = {
  data?: BidOffer;
  symbolType?: keyof typeof SymbolType;
  containerStyles?: StyleProp<ViewStyle>;

  getColor: (comparePrice?: number) => { color: string };
};

export const PriceBoardBidOfferCell = withMemo(({ data, symbolType, getColor }: PriceBoardBidOfferCell) => {
  const { styles } = useStyles();
  const Colors = useColors();

  const textColor = useMemo(() => getColor(data?.price), [data?.price]);
  const { numberText, smolText, smolVolume } = useMemoizedStyles({
    numberText: [styles.numberText, textColor],
    smolText: [styles.smolNumber, textColor],
    smolVolume: [styles.smolSmolText, textColor],
  });

  if (!data)
    return (
      <View style={styles.container}>
        <View style={styles.bidAskPrice} />
        <View style={styles.bidAskVolume} />
      </View>
    );

  const MAX_FUTURES_PRICE = symbolType === 'FUTURES' ? 1000 : 100000;

  return (
    <View style={styles.container}>
      <View style={styles.bidAskPrice}>
        <FlashColorBackground
          changeNumber={data.price}
          displayValue={PriceBoardFormatter.formatPrice(data.price, symbolType)}
          textStyles={data.price >= MAX_FUTURES_PRICE ? smolText : numberText}
          containerStyles={styles.flashTextContainer}
          allowFontScaling={false}
          startColor={Colors.Transparent}
          endColor={Colors.Transparent}
          textProps={CellTextProps}
        />
      </View>
      <View style={styles.bidAskVolume}>
        <FlashColorBackground
          changeNumber={data.volume}
          displayValue={PriceBoardFormatter.formatVolume(data.volume)}
          textStyles={data.volume >= 1000000 ? smolVolume : numberText}
          containerStyles={styles.flashTextContainer}
          allowFontScaling={false}
          startColor={Colors.Transparent}
          endColor={Colors.Transparent}
          steadyColor={hexToRgba(textColor.color, 0.3)}
          textProps={CellTextProps}
        />
      </View>
    </View>
  );
});

const useStyles = getStylesHook({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  stringText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
  },
  numberText: {
    ...textStyles.fontSize10,
    ...textStyles.dinOt500,
    fontSize: 9,
    textAlign: 'right',
  },
  smolNumber: {
    ...textStyles.fontSize10,
    ...textStyles.dinOt500,
    textAlign: 'right',
    fontSize: 8,
  },
  smolSmolText: {
    ...textStyles.fontSize10,
    ...textStyles.dinOt500,
    textAlign: 'right',
    fontSize: 7,
  },
  emptyRow: {
    height: ItemHeight,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  flashTextContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  bidAskPrice: {
    flex: 6,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    paddingHorizontal: 1,
  },
  bidAskVolume: {
    flex: 7,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    paddingHorizontal: 1,
  },
});
