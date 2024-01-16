import React, { memo, useMemo } from 'react';
import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { formatNumber } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { CHART_SECTION_TAB, CHART_DATA_CONFIG, PeriodOptions } from '../../constants';

export function getValueFormatter(maxValue: number, indicator: CHART_SECTION_TAB) {
  if (indicator === 'ROA' || indicator === 'ROE' || indicator === 'ProfitMargin') {
    return {
      formatter: (value: number | undefined) => (value ? value.toFixed(1) : '-'),
      unit: '%',
    };
  }
  if (indicator === 'EPS' || indicator === 'BVPS') {
    return {
      formatter: (value: number | undefined) => (value ? formatNumber(value) : '-'),
      unit: '',
    };
  }
  const FixedPrecision =
    indicator === 'RevenueProfit' ||
    indicator === 'OperatingIncome' ||
    indicator === 'DebtEquity' ||
    indicator === 'DebtAsset'
      ? 0
      : 1;
  if (isNaN(Number(maxValue)))
    return {
      formatter: () => '0',
      unit: '',
    };
  if (Math.abs(maxValue) < 10)
    return {
      formatter: (value: number | undefined) => (value ? value.toFixed(FixedPrecision) : '-'),
      unit: '',
    };
  if (Math.abs(maxValue) < 1000)
    return {
      formatter: (value: number | undefined) => (value ? value.toFixed(FixedPrecision) : '-'),
      unit: '',
    };
  if (Math.abs(maxValue) < 1000000)
    return {
      formatter: (value: number | undefined) => (value ? (value / 1000).toFixed(FixedPrecision) : '-'),
      unit: 'K',
    };
  if (Math.abs(maxValue) < 1000000000)
    return {
      formatter: (value: number | undefined) => (value ? (value / 1000000).toFixed(FixedPrecision) : '-'),
      unit: 'Mil',
    };
  return {
    formatter: (value: number | undefined) =>
      value ? formatNumber(value / 1000000000, FixedPrecision, undefined, true) : '-',
    unit: 'Bil',
  };
}
export function getLineValueFormatter(maxValue: number, indicator: CHART_SECTION_TAB, separateLineScale?: boolean) {
  if (!separateLineScale) return getValueFormatter(maxValue, indicator);
  return {
    formatter: (value: number | undefined) => (value ? value.toFixed(1) : '-'),
    unit: '%',
  };
}

type Props = {
  indicator: CHART_SECTION_TAB;
  period: PeriodOptions;
};

const FinancialTable = ({ indicator, period }: Props) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const { column = [], line = [], separateLineScale } = CHART_DATA_CONFIG[indicator];

  const data = useAppSelector(state => state.FinancialInfo.info[period]);

  const maxValue = useMemo(
    () =>
      Math.max(
        ...data.flatMap(item => {
          return [...column, ...line].map(val => item[val.field] ?? 0);
        })
      ),
    [data]
  );

  const { formatter, unit } = getValueFormatter(maxValue, indicator);
  const lineFormatter = getLineValueFormatter(maxValue, indicator, separateLineScale);

  if (data.length === 0) return null;

  return (
    <View style={styles.revenueIncomeContainer}>
      <View style={styles.revenueIncomeTableHeader}>
        <View style={styles.headerFirstCell} />
        {data.map((item, index) => (
          <View
            style={styles.revenueIncomeTableHeaderCell}
            key={`RevenueIncomeTable_${item.quarter}/${item.year}_${index}`}
          >
            <Text allowFontScaling={false} style={styles.titleHeaderText}>
              {item.quarter ? `Q${item.quarter}/${item.year}` : item.year}
            </Text>
          </View>
        ))}
      </View>
      {column.map(rowItem => (
        <View style={styles.revenueIncomeTableRow} key={`Revenue_Row_${rowItem.label}`}>
          <View style={styles.itemFirstCell}>
            <Text allowFontScaling={false} style={[styles.titleTableText, { color: rowItem.color }]}>
              {t(rowItem.label)} {unit ? `(${t(unit)})` : ''}
            </Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.revenueIncomeTableCell} key={`Revenue_${item.quarter}/${item.year}_${index}`}>
              <Text allowFontScaling={false} style={styles.itemCellText} adjustsFontSizeToFit numberOfLines={1}>
                {formatter(item[rowItem.field])}
              </Text>
            </View>
          ))}
        </View>
      ))}
      {line.map(rowItem => (
        <View style={styles.revenueIncomeTableRow} key={`Revenue_Row_${rowItem.label}`}>
          <View style={styles.itemFirstCell}>
            <Text allowFontScaling={false} style={[styles.titleTableText, { color: rowItem.color }]}>
              {t(rowItem.label)} {lineFormatter.unit ? `(${t(lineFormatter.unit)})` : ''}
            </Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.revenueIncomeTableCell} key={`Revenue_${item.quarter}/${item.year}_${index}`}>
              <Text allowFontScaling={false} style={styles.itemCellText} adjustsFontSizeToFit numberOfLines={1}>
                {lineFormatter.formatter(item[rowItem.field])}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default memo(FinancialTable);

const useStyles = getStylesHook({
  revenueIncomeContainer: {
    marginTop: 10,
    width: 375,
  },
  revenueIncomeTableHeader: {
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    flex: 1,
  },
  headerFirstCell: {
    width: 75,
    height: 44,
    borderColor: lightColors.BORDER,
    borderWidth: 1,
  },
  revenueIncomeTableHeaderCell: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: lightColors.BORDER,
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  titleHeaderText: {
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  revenueIncomeTableRow: {
    flex: 1,
    flexDirection: 'row',
  },
  titleTableText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
    width: 60,
    lineHeight: 18,
  },
  itemFirstCell: {
    width: 75,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderLeftColor: lightColors.BORDER,
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  itemCellText: {
    ...textStyles.fontSize12,
    color: lightColors.LIGHTTextContent,
  },
  revenueIncomeTableCell: {
    flex: 1,
    height: 44,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableValueLineBlue: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: lightColors.Blue1,
  },
  tableValueLineGreen: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: lightColors.Green1,
  },
});
