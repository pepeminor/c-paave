import { Text, View } from 'react-native';
import React, { memo, useMemo } from 'react';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { useTranslation } from 'react-i18next';
import { formatNumber } from 'utils';

export type FinancialRatioRowProps = {
  title: string;
  value: number | string | undefined;
  ranking: number | undefined;
  type?: 'number' | 'percent';
  minFractionDigits?: number;
};

const FinancialRatioRow = ({
  title,
  value,
  ranking,
  type = 'number',
  minFractionDigits = 2,
}: FinancialRatioRowProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const formattedValue = useMemo(() => {
    if (value == null) return '-';
    if (typeof value === 'string') return value;
    return formatNumber(value, minFractionDigits, undefined, true) + (type === 'percent' ? '%' : '');
  }, [value, type]);

  return (
    <View style={styles.container}>
      <View style={styles.cellTitle}>
        <Text allowFontScaling={false} style={styles.textCell}>
          {t(title)}
        </Text>
      </View>
      <View style={styles.cellValue}>
        <Text allowFontScaling={false} style={styles.textCell}>
          {formattedValue}
        </Text>
      </View>
      <View style={styles.cellValue}>
        {ranking != null ? (
          <Text allowFontScaling={false} style={ranking >= 1 && ranking <= 40 ? styles.textCellGreen : styles.textCell}>
            {ranking}
          </Text>
        ) : (
          <Text allowFontScaling={false} style={styles.textCell}>
            -
          </Text>
        )}
      </View>
    </View>
  );
};

export default memo(FinancialRatioRow);

const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cellTitle: {
    paddingLeft: 5,
    width: 180,
    height: 38,
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCell: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  textCellGreen: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.Green1,
  },
  cellValue: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'flex-end',
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    height: 38,
    justifyContent: 'center',
  },
});
