import React from 'react';
import { Text, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { IndexBoardStyles } from './IndexBoard.style';
import { useTranslation } from 'react-i18next';

export const IndexHeader = withMemo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.symbolCode}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          {t('Symbol')}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          {t('Point')}
        </Text>
      </View>
      <View style={styles.priceChange}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          +/-
        </Text>
      </View>
      <View style={styles.priceChange}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          %
        </Text>
      </View>
      <View style={styles.volumeValue}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          {t('Total Vol')}
        </Text>
      </View>
      <View style={styles.volumeValue}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          {t('Total Val')}
        </Text>
      </View>
      {/* <View style={styles.stocksChanged}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          Up
        </Text>
      </View>
      <View style={styles.stocksChanged}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          Down
        </Text>
      </View>
      <View style={styles.stocksChanged}>
        <Text style={styles.textStyle} allowFontScaling={false}>
          -
        </Text>
      </View> */}
    </View>
  );
});

const useStyles = getStylesHook({
  headerContainer: {
    flexDirection: 'row',
    height: 20,
  },
  symbolCode: {
    ...IndexBoardStyles.symbolCode,
    backgroundColor: lightColors.BORDER2,
  },
  price: {
    ...IndexBoardStyles.price,
    backgroundColor: lightColors.BORDER2,
  },
  priceChange: {
    ...IndexBoardStyles.priceChange,
    backgroundColor: lightColors.BORDER2,
  },
  volumeValue: {
    ...IndexBoardStyles.volumeValue,
    backgroundColor: lightColors.BORDER2,
  },
  stocksChanged: {
    ...IndexBoardStyles.stocksChanged,
    backgroundColor: lightColors.BORDER2,
  },
  textStyle: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
});
