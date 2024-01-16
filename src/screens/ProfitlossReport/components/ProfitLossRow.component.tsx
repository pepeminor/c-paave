import React, { memo } from 'react';
import { View, Text, Platform } from 'react-native';
import { formatNumber, getColor, getIconColor, formatStringToDateString } from 'utils';
import globalStyles, { lightColors, scaleSize, textStyles } from 'styles';
import { IDailyProfitLosses } from 'interfaces/equity';

// Icons
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import { getStylesHook } from 'hooks/useStyles';
import { RowComponentProps } from 'components/SheetData3';

const ProfitLossReport = ({ data }: RowComponentProps<IDailyProfitLosses>) => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <Text allowFontScaling={false} style={styles.dateText}>
          {formatStringToDateString(data.date, 'dd/MM/yyyy')}
        </Text>
      </View>
      <View style={styles.col2}>
        <Text
          allowFontScaling={false}
          style={[styles.quantity, styles.mr8, getColor(data.navProfit, 0, undefined, undefined, true).textStyle]}
        >
          {formatNumber(data.navProfit, 2)}
        </Text>
        <View style={globalStyles.flexDirectionRow}>
          {getIconColor(
            data.navProfit,
            0,
            undefined,
            undefined,
            <IconIncrease width={scaleSize(12)} height={scaleSize(10)} style={styles.mr6} />,
            <IconDecrease width={scaleSize(12)} height={scaleSize(10)} style={styles.mr6} />
          )}
        </View>
        <Text
          allowFontScaling={false}
          style={[styles.quantity2, styles.mr16, getColor(data.navProfit, 0, undefined, undefined, true).textStyle]}
        >
          {`${formatNumber(data.navProfitRatio, 2, undefined, true)}%`}
        </Text>
      </View>
    </View>
  );
};

export default memo(ProfitLossReport);

const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  col1: {
    width: 130,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },
  col2: {
    flexDirection: 'row',
    width: 243,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextContent,
  },
  quantity: {
    ...textStyles.fontSize16,
    ...textStyles.dinOt500,
    color: lightColors.LIGHTTextContent,
    width: 120,
    textAlign: 'right',
    paddingRight: 30,
  },
  quantity2: {
    ...textStyles.fontSize16,
    ...textStyles.dinOt400,
    flex: 1,
    color: lightColors.LIGHTTextContent,
    width: 50,
    textAlign: 'right',
    paddingTop: Platform.OS === 'ios' ? 3 : 1,
  },
  mr6: {
    marginRight: 6,
  },
  mr8: {
    marginRight: 8,
  },
  mr16: {
    marginRight: 16,
  },
});
