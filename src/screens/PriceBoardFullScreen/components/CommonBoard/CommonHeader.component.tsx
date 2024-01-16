import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { PriceChangeType, TotalType } from 'screens/Discover/PriceBoard/PriceBoard.type';
import OutlineUp from 'assets/icon/OutlineUp.svg';
import { CommonBoardStyles } from './CommonBoard.style';
import { useTranslation } from 'react-i18next';

type Props = {
  priceChangeType: PriceChangeType;
  totalType: TotalType;
  togglePriceChangeType: () => void;
  toggleTotalType: () => void;
};

export const CommonHeader = withMemo(
  ({ priceChangeType, togglePriceChangeType, totalType, toggleTotalType }: Props) => {
    const { t } = useTranslation();
    const { styles } = useStyles();

    return (
      <View style={styles.headerContainer}>
        <View style={styles.symbolCode}>
          <Text style={styles.textStyle} allowFontScaling={false}>
            {t('Symbol')}
          </Text>
        </View>
        <View style={styles.bidAskGroup}>
          <View style={styles.headerGroup}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Bid')}
            </Text>
          </View>
          <View style={styles.subHeaderGroup}>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P3
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V3
              </Text>
            </View>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P2
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V2
              </Text>
            </View>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P1
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V1
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.matchingInfoGroup}>
          <View style={styles.headerGroup}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Matching Info')}
            </Text>
          </View>
          <View style={styles.subHeaderGroup}>
            <View style={styles.matchingInfo}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                {t('PRICE')}
              </Text>
            </View>
            <TouchableOpacity style={styles.matchingVol} onPress={toggleTotalType}>
              <View style={styles.changeTypeBtnLeft}>
                <OutlineUp />
              </View>
              <Text style={styles.textStyle} allowFontScaling={false}>
                {t(totalType === 'Volume' ? 'Total Vol' : 'Total Val')}
              </Text>
              <View style={styles.changeTypeBtnRight}>
                <OutlineUp />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.matchingInfo} onPress={togglePriceChangeType}>
              <View style={styles.changeTypeBtnLeft}>
                <OutlineUp />
              </View>
              <Text style={styles.textStyle} allowFontScaling={false}>
                {priceChangeType === 'Percent' ? '%' : '+/-'}
              </Text>
              <View style={styles.changeTypeBtnRight}>
                <OutlineUp />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bidAskGroup}>
          <View style={styles.headerGroup}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Ask')}
            </Text>
          </View>
          <View style={styles.subHeaderGroup}>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P1
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V1
              </Text>
            </View>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P2
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V2
              </Text>
            </View>
            <View style={styles.bidAskPrice}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                P3
              </Text>
            </View>
            <View style={styles.bidAskVolume}>
              <Text style={styles.textStyle} allowFontScaling={false}>
                V3
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.stockInfoGroup}>
          <View style={styles.stockPrice}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Ceil')}
            </Text>
          </View>
          <View style={styles.stockPrice}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Floor')}
            </Text>
          </View>
          <View style={styles.stockPrice}>
            <Text style={styles.textStyle} allowFontScaling={false}>
              {t('Ref')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

const useStyles = getStylesHook({
  headerContainer: {
    flexDirection: 'row',
    height: 40,
  },
  headerGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BORDER,
    margin: 0.5,
  },
  subHeaderGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  ...CommonBoardStyles,
  bidAskGroup: {
    ...CommonBoardStyles.bidAskGroup,
    flexDirection: 'column',
  },
  matchingInfoGroup: {
    ...CommonBoardStyles.matchingInfoGroup,
    flexDirection: 'column',
  },
  symbolCode: {
    ...CommonBoardStyles.symbolCode,
    backgroundColor: lightColors.BORDER2,
  },
  stockPrice: {
    ...CommonBoardStyles.stockPrice,
    alignItems: 'center',
    backgroundColor: lightColors.BORDER2,
  },
  bidAskPrice: {
    ...CommonBoardStyles.bidAskPrice,
    alignItems: 'center',
    backgroundColor: lightColors.BORDER2,
  },
  bidAskVolume: {
    ...CommonBoardStyles.bidAskVolume,
    flex: 7,
    alignItems: 'center',
    backgroundColor: lightColors.BORDER2,
  },
  matchingInfo: {
    ...CommonBoardStyles.matchingInfo,
    alignItems: 'center',
    backgroundColor: lightColors.BORDER2,
  },
  matchingVol: {
    ...CommonBoardStyles.matchingVol,
    flex: 2,
    alignItems: 'center',
    backgroundColor: lightColors.BORDER2,
  },
  textStyle: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
  changeTypeBtnLeft: {
    position: 'absolute',
    top: -2,
    left: -6,
    transform: [{ rotateZ: '-90deg' }, { scaleX: 0.5 }, { scaleY: 0.5 }],
  },
  changeTypeBtnRight: {
    position: 'absolute',
    top: -2,
    right: -6,
    transform: [{ rotateZ: '90deg' }, { scaleX: 0.5 }, { scaleY: 0.5 }],
  },
});
