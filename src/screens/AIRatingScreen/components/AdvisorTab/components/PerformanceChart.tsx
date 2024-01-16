import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea } from 'victory-native';
import globalStyles, { Colors, lightColors, scaleSize } from 'styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { AdvisorSelectors } from 'reduxs';
import { AdvisorChartData } from 'interfaces/Advisor';
import { IFormatDataChart } from 'interfaces/common';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';

type PerformanceChartProps = {
  data: AdvisorChartData;
};

const CHART_CONFIG = {
  padding: {
    top: scaleSize(6),
    bottom: scaleSize(5),
    left: scaleSize(55),
    right: scaleSize(0),
  },
  width: scaleSize(210),
  height: scaleSize(60),
  lineAnimate: {
    duration: 1000,
    onLoad: { duration: 2000 },
  },
  lineColor: {
    green: { data: { stroke: Colors.DARK_GREEN, strokeWidth: 1 } },
    red: { data: { stroke: Colors.LIGHTRed, strokeWidth: 1 } },
  },
  hideAxisStyle: {
    axis: { stroke: 'grey', strokeWidth: 0 },
    ticks: { stroke: 'transparent' },
    grid: { stroke: Colors.LIGHTTextDisable, opacity: 0 },
    tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Roboto' },
  },
  showAxisStyle: {
    axis: { stroke: 'grey', strokeWidth: 1, strokeDasharray: '4' },
    ticks: { stroke: 'transparent' },
    grid: { stroke: Colors.LIGHTTextDisable, opacity: 0 },
    tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Roboto' },
  },
  totalTick: 2,
  areaStyles: { data: { fill: 'url(#gradient)' } },
};

export const processData = (chartData: IFormatDataChart[]) => {
  const min = Math.min(...chartData.map(item => item.y)) * 0.8;
  const max = Math.max(...chartData.map(item => item.y)) * 0.8;
  const range = Math.floor((max - min) / CHART_CONFIG.totalTick);
  if (range <= 0) return { tickValues: [Math.floor(min), Math.ceil(max)], min };
  const tickValues = [];
  if (min > 0) {
    let current = Math.ceil(min);
    tickValues.push(current);
    while (current < max) {
      current += range;
      tickValues.push(current);
    }
  } else {
    let current = 0;
    tickValues.push(current);
    while (current > min) {
      current -= range;
      tickValues.push(current);
    }
    current = 0;
    while (current < max) {
      current += range;
      tickValues.push(current);
    }
    tickValues.sort((a, b) => a - b);
  }
  return { tickValues, min };
};

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = useMemo(
    () =>
      data.date.map(
        (value, index) =>
          ({
            x: index,
            xLabel: value,
            y: data.normalizedNAV[index],
            date: value,
          } as IFormatDataChart)
      ),
    [data]
  );

  return chartData.length > 0 ? (
    <VictoryChart padding={CHART_CONFIG.padding} height={CHART_CONFIG.height} width={CHART_CONFIG.width}>
      <VictoryArea
        name={'NAVAssetArea'}
        style={CHART_CONFIG.areaStyles}
        data={chartData}
        // animate={props.animate && areaAnimate}
      />
      <Gradient />
      <VictoryLine data={chartData} style={CHART_CONFIG.lineColor.green} />

      <VictoryAxis
        standalone={false}
        crossAxis={false}
        dependentAxis
        style={CHART_CONFIG.hideAxisStyle}
        // tickValues={tickValues}
        tickFormat={() => ''}
      />
      <VictoryAxis
        standalone={false}
        crossAxis={false}
        style={CHART_CONFIG.showAxisStyle}
        // offsetY={scaleSize(5)}
        tickFormat={() => ''}
        // orientation="bottom"
      />
    </VictoryChart>
  ) : (
    <View style={globalStyles.container} />
  );
};

type Props = {
  userId: number;
};

export default memo((props: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const chartData = useAppSelector(AdvisorSelectors.selectAdvisorChartData(props.userId));
  if (chartData == null) return null;
  return (
    <>
      <Text allowFontScaling={false} style={styles.performanceChartNote}>
        {t('1 Month Performance')}
      </Text>
      <PerformanceChart data={chartData} />
    </>
  );
});

const Gradient = () => (
  <Defs>
    <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset="0" stopColor={'rgba(113 ,214 ,148, 1)'} />
      <Stop offset="1" stopColor={lightColors.WHITE} />
    </LinearGradient>
  </Defs>
);
