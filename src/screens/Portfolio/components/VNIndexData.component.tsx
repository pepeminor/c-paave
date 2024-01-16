import React from 'react';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { View, Text, Platform } from 'react-native';
import { formatNumber, getColor, getIconColor } from 'utils';
import globalStyles, { lightColors, scaleSize } from 'styles';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconFreeze from 'assets/icon/IconCircleFreeze.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import useSubAccountSelector from 'hooks/useSubAccountSelector';

const VNIndexData = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const { isSubD } = useSubAccountSelector();

  useSubscribeSymbol(['VN'], ['QUOTE', 'BID_OFFER']);
  const vnIndexChangeRate = useAppSelector(
    state => SymbolDataSelector.selectSymbol(isSubD ? 'VN30' : 'VN')(state)?.changeRate
  );

  const chartTitle = isSubD ? t('VN30') : t('VNIndex');

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleStyle}>{chartTitle}</Text>
      {vnIndexChangeRate != null ? (
        getIconColor(
          vnIndexChangeRate,
          0,
          undefined,
          undefined,
          <IconIncrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
          <IconDecrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
          <IconFreeze width={scaleSize(24)} height={scaleSize(24)} style={styles.iconStyle} />
        )
      ) : (
        <View style={styles.iconStyle} />
      )}

      {vnIndexChangeRate != null && (
        <Text style={[styles.titleValue, getColor(vnIndexChangeRate, 0, undefined, undefined, undefined).textStyle]}>
          {formatNumber(vnIndexChangeRate, 2, undefined, true)}%
        </Text>
      )}
    </View>
  );
};

const useStyles = getStylesHook({
  titleContainer: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  titleValue: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
});

export default withMemo(VNIndexData);
