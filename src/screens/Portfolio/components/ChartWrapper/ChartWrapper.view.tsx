import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useChartLogic } from './ChartWrapper.logic';
import useStyles from './ChartWrapper.style';
import { IProps } from './ChartWrapper.type';
import withMemo from 'HOC/withMemo';

import IconLineChart from 'assets/icon/IconLineChart.svg';
import { ACCOUNT_TYPE } from 'global';
import { ChartStyle } from 'constants/enum';
import Chart from '../Chart';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';

const ChartWrapper = (props: IProps) => {
  const { t } = useTranslation();
  const { handlers, state } = useChartLogic(props);
  const { styles, dynamicColors } = useStyles();

  const { selectedAccount } = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerVNIndex}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('Performance')}
        </Text>
        <View style={styles.containerTypeChart}>
          {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && (
            <TouchableOpacity
              onPress={handlers.changeChartStyle(ChartStyle.LINE2)}
              style={state.chartStyle === ChartStyle.LINE2 ? styles.buttonLineChartSelected : styles.buttonLineChart}
            >
              <Icon name="dollard" size={24} color={dynamicColors.LIGHTIconDisable} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handlers.changeChartStyle(ChartStyle.LINE)}
            style={state.chartStyle === ChartStyle.LINE ? styles.buttonLineChartSelected : styles.buttonLineChart}
          >
            <IconLineChart />
          </TouchableOpacity>
          {selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL && (
            <TouchableOpacity
              onPress={handlers.changeChartStyle(ChartStyle.ACCUMULATE)}
              style={
                state.chartStyle === ChartStyle.ACCUMULATE ? styles.buttonLineChartSelected : styles.buttonLineChart
              }
            >
              <Icon name="dollard" size={24} color={dynamicColors.LIGHTIconDisable} />
            </TouchableOpacity>
          )}

          {selectedAccount.type !== ACCOUNT_TYPE.DEMO && (
            <TouchableOpacity
              onPress={handlers.changeChartStyle(ChartStyle.BAR)}
              style={state.chartStyle === ChartStyle.BAR ? styles.buttonLineChartSelected : styles.buttonLineChart}
            >
              <Icon name="chart" size={24} color={dynamicColors.LIGHTIconDisable} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Chart chartStyle={state.chartStyle} onChangeEnableScroll={props.onChangeEnableScroll} />
    </View>
  );
};

export default withMemo(ChartWrapper);
