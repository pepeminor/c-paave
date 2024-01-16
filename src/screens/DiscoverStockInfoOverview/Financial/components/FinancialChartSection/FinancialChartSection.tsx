import React, { memo, useState } from 'react';
import { CHART_SECTION, CHART_SECTION_CONFIG, CHART_SECTION_TAB, PeriodOptions } from '../../constants';
import { Text, View } from 'react-native';
import FinancialChart from './FinancialChart';
import FinancialTable from './FinancialTable';
import { useTranslation } from 'react-i18next';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import TabSelector from 'components/TabSelector';
import { FinancialInfoActions } from 'reduxs';
import { store } from 'screens/App';

type Props = {
  section: CHART_SECTION;
  period: PeriodOptions;
};

const FinancialInfo_Chart_SetPeriod = (period: PeriodOptions) => {
  store.dispatch(FinancialInfoActions.setPeriod(period));
};

export const FinancialChartSection = memo(({ section, period }: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const sectionConfig = CHART_SECTION_CONFIG[section];
  const [indicator, setIndicator] = useState<string>(Object.keys(sectionConfig.listValue)[0]);

  return (
    <View style={styles.container}>
      <View style={styles.topChartContainer}>
        <Text allowFontScaling={false} style={styles.textTitle}>
          {t(CHART_SECTION[section])}
        </Text>
        <TabSelector
          value={period}
          setValue={FinancialInfo_Chart_SetPeriod}
          listValue={PeriodOptions}
          style={styles.periodSelectorContainer}
          selectedContainer={styles.periodSelectorItemContainer}
          unSelectedContainer={styles.periodSelectorItemContainer}
        />
      </View>
      <TabSelector
        value={indicator}
        setValue={setIndicator}
        listValue={sectionConfig.listValue}
        style={styles.tabContainer}
        selectedContainer={styles.selectedContainer}
        unSelectedContainer={styles.unSelectedContainer}
        selectedText={styles.selectedText}
        unSelectedText={styles.unSelectedText}
      />
      <FinancialChart indicator={indicator as CHART_SECTION_TAB} period={period} />
      <FinancialTable indicator={indicator as CHART_SECTION_TAB} period={period} />
    </View>
  );
});

const useStyles = getStylesHook({
  container: {
    marginBottom: 24,
  },
  textTitle: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    paddingLeft: 8,
  },
  periodSelectorContainer: {
    width: 150,
  },
  periodSelectorItemContainer: {
    paddingVertical: 1,
  },
  tabContainer: {
    backgroundColor: lightColors.WHITE,
    marginTop: 4,
    marginHorizontal: 8,
    paddingHorizontal: -3,
  },
  selectedContainer: {
    borderRadius: 7,
    backgroundColor: lightColors.BlueNewColor,
    paddingHorizontal: 4,
    margin: 3,
    paddingVertical: 6,
  },
  unSelectedContainer: {
    borderRadius: 7,
    backgroundColor: lightColors.LIGHTBackground,
    paddingHorizontal: 4,
    margin: 3,
    paddingVertical: 6,
  },
  selectedText: {
    ...textStyles.fontSize12,
    color: lightColors.WHITE,
    textAlign: 'center',
  },
  unSelectedText: {
    ...textStyles.fontSize12,
    color: lightColors.LIGHTTextTitle,
    textAlign: 'center',
  },
  topChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  itemSelector: {
    maxWidth: 200,
    minWidth: 100,
    marginVertical: 8,
  },
});
