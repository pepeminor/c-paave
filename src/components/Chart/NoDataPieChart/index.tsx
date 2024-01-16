import { View } from 'react-native';
import React, { memo } from 'react';
import { VictoryPie, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
import { scaleSize } from 'styles';
import useStyles from './styles';
import { lightColors as Colors } from '../../../styles/index';
import { useTranslation } from 'react-i18next';

const CHART_CONFIG = {
  height: scaleSize(215),
  width: scaleSize(215),
  innerRadius: scaleSize(40),
  labelRadius: scaleSize(90),
  radius: scaleSize(95),
  axisStyle: {
    axis: { stroke: 'none' },
    ticks: { stroke: 'none' },
    tickLabels: { fill: 'none' },
    grid: { stroke: 'none' },
  },
  fontSizeStyle: { fontSize: scaleSize(12), fill: Colors.LIGHTTextDisable, fontFamily: 'Roboto' },
  labelStyle: scaleSize(107.5),
  colorScaleNoData: ['#E8E7E7'],
  noData: [{ x: 1, y: 360 }],
};

const NoDataPieChart = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={styles.containerChartPie}>
      <View style={styles.chartContainer}>
        <VictoryChart theme={VictoryTheme.material} height={CHART_CONFIG.height} width={CHART_CONFIG.width}>
          <VictoryPie
            standalone={false}
            data={CHART_CONFIG.noData}
            innerRadius={CHART_CONFIG.innerRadius}
            colorScale={CHART_CONFIG.colorScaleNoData}
            radius={CHART_CONFIG.radius}
          />
          <VictoryAxis style={CHART_CONFIG.axisStyle} standalone={false} />
          <VictoryLabel
            textAnchor="middle"
            style={CHART_CONFIG.fontSizeStyle}
            x={CHART_CONFIG.labelStyle}
            y={CHART_CONFIG.labelStyle}
            text={t('NO DATA')}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default memo(NoDataPieChart);
