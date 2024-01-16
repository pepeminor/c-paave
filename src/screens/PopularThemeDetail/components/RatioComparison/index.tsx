import { ScrollView, Text, View } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import { RatioComparisonProps } from './type';
import { Chart } from './components';
import { useTranslation } from 'react-i18next';

export const RatioComparison = memo(({ themeCode, highlightStockCode }: RatioComparisonProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Chart themeCode={themeCode} chartType={'PE'} highlightStockCode={highlightStockCode} />
      <Chart themeCode={themeCode} chartType={'PB'} highlightStockCode={highlightStockCode} />
      <View style={styles.noteContainer}>
        <View style={styles.chartLegend}>
          <Text allowFontScaling={false} style={styles.legendTextLine}>
            - - -{'   '}
          </Text>
          <Text allowFontScaling={false} style={styles.legendText}>
            {t('chart_legend_avg')}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.basedOnText}>
          (*) {t('ratio_comparison_note')}
        </Text>
      </View>
    </ScrollView>
  );
});
