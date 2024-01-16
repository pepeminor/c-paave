import React, { memo, useCallback, useMemo } from 'react';
import { lightColors, scaleSize } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { useAppSelector } from 'hooks/useAppSelector';
import { CHART_SECTION_TAB, CHART_DATA_CONFIG, PeriodOptions } from '../../constants';
import {
  BarChart,
  CustomGrid,
  MultiLineChart,
  SVGChartData,
  StaticPoint,
  Tooltip,
  TooltipLine,
} from 'components/Chart/SVGChart';
import { formatNumber, formatTickNumber } from 'utils';
import { useTranslation } from 'react-i18next';
import { getLineValueFormatter, getValueFormatter } from './FinancialTable';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  indicator: CHART_SECTION_TAB;
  period: PeriodOptions;
};

const ChartConfig = {
  contentInset: {
    top: scaleSize(20),
    bottom: scaleSize(20),
    left: scaleSize(70),
    right: scaleSize(0),
  },
  onDisableScroll: () => false,
  getColor: (value: unknown) => ((value as number) >= 0 ? lightColors.DARK_GREEN : lightColors.LIGHTRed),
};

const FinancialChart = ({ indicator, period }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const { column = [], line = [], notFormatYAxis, separateLineScale } = CHART_DATA_CONFIG[indicator];
  const numberOfData = column.length + line.length;

  const data = useAppSelector(state => state.FinancialInfo.info[period]);

  const xLabelList = useMemo(
    () => data.map(item => (item.quarter && item.quarter != 0 ? `Q${item.quarter}/${item.year}` : `${item.year}`)),
    [data]
  );

  const barData = useMemo(
    () =>
      column.map(indicator =>
        data.filter(item => item[indicator.field] != null).map(item => item[indicator.field] ?? 0)
      ),
    [data, column]
  );
  const lineData = useMemo(
    () =>
      line.map(indicator => data.filter(item => item[indicator.field] != null).map(item => item[indicator.field] ?? 0)),
    [data, line]
  );

  const { barDataY, lineDataY, maxY, minY, maxYLine, minYLine } = useMemo(() => {
    const dataArray = [...barData.flatMap(item => item), ...lineData.flatMap(item => item)];
    return {
      barDataY: barData.map(
        (data, index) =>
          ({
            data,
            svg: {
              fill: column[index].color,
            },
          } as SVGChartData)
      ),
      lineDataY: lineData.map((data, index) => ({
        data,
        svg: {
          stroke: line[index].color,
          strokeWidth: lineData.length === 1 && !separateLineScale ? 2 : 1.5,
        },
      })),
      maxY: Math.max(...dataArray),
      minY: Math.min(...dataArray, 0),
      maxYLine: Math.max(...lineData.flatMap(item => item)),
      minYLine: Math.min(...lineData.flatMap(item => item), 0),
    };
  }, [barData, lineData]);

  const { formatter, unit } = getValueFormatter(maxY, indicator);
  const lineFormatter = getLineValueFormatter(maxY, indicator, separateLineScale);

  const formatTooltips = useCallback(
    (label: string) => (value: unknown) => {
      return `${t(label)}: ${formatter(value as number)} ${t(unit)}`;
    },
    [formatter, unit, t]
  );

  const formatTooltipsLine = useCallback(
    (label: string) => (value: unknown) => {
      return `${t(label)}: ${lineFormatter.formatter(value as number)} ${t(lineFormatter.unit)}`;
    },
    [lineFormatter, t]
  );

  const yAxisFormatLabel = useCallback(
    (value: number) => (notFormatYAxis ? formatNumber(value) : formatTickNumber(value, undefined, ' ', '')),
    [indicator, notFormatYAxis]
  );

  if (column.length === 0) {
    return (
      <MultiLineChart
        lineData={lineDataY}
        yMax={maxY}
        yMin={minY}
        extraSpaceForYAxisFromYMin={(maxY - minY) * 0.1}
        extraSpaceForYAxisFromYMax={(maxY - minY) * 0.1}
        chartWidth={350}
        chartHeight={200}
        onDisableScroll={ChartConfig.onDisableScroll}
      >
        <CustomGrid
          belowChart
          xLabelList={xLabelList}
          labelColor={dynamicColors.BLACK}
          yAxisLabelPaddingLeft={16}
          labelFontSize={10}
          numberOfTicksXAxis={5}
          yAxisFormatLabel={yAxisFormatLabel}
          yLabel={unit ? `(${t(unit)})` : undefined}
        />
        <StaticPoint pointColors={line.map(item => item.color)} />
        <Tooltip tooltipWidth={160} tooltipHeight={15 * (numberOfData + 2)} borderColor={dynamicColors.DARK_GREEN}>
          <TooltipLine listData={xLabelList} distanceFromTop={-5 * (numberOfData + 1)} />
          {column.map((item, index) => (
            <TooltipLine
              formatter={formatTooltips(item.label)}
              distanceFromTop={-5 * (numberOfData + 1) + index * 15 + 20}
              fontWeight={'bold'}
              color={item.color}
              listData={barData[index]}
              key={`TooltipLineColumn${item.label}-${index}`}
            />
          ))}
          {line.map((item, index) => (
            <TooltipLine
              formatter={formatTooltipsLine(item.label)}
              distanceFromTop={-5 * (numberOfData + 1) + (index + column.length) * 15 + 20}
              fontWeight={'bold'}
              color={item.color}
              listData={lineData[index]}
              key={`TooltipLineLine${item.label}-${index}`}
            />
          ))}
        </Tooltip>
      </MultiLineChart>
    );
  }

  if (barDataY[0]?.data.length == null || barDataY[0]?.data.length === 0) {
    return (
      <View style={styles.skeletonContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  const lineMaxY = separateLineScale ? maxYLine : maxY;
  const lineMinY = separateLineScale ? minYLine : minY;

  return (
    <BarChart
      chartData={barDataY}
      yMax={maxY}
      yMin={minY}
      onDisableScroll={ChartConfig.onDisableScroll}
      extraSpaceForYAxisFromYMin={(maxY - minY) * 0.1}
      extraSpaceForYAxisFromYMax={(maxY - minY) * 0.1}
      chartWidth={350}
      chartHeight={200}
      contentInset={ChartConfig.contentInset}
      spacingInner={barDataY.length === 1 ? 0.6 : 0.1}
      spacingOuter={0.5}
    >
      <View style={styles.multiLineChartContainer}>
        <MultiLineChart
          lineData={lineDataY}
          yMax={lineMaxY}
          yMin={lineMinY}
          extraSpaceForYAxisFromYMin={(lineMaxY - lineMinY) * 0.1}
          extraSpaceForYAxisFromYMax={(lineMaxY - lineMinY) * 0.1}
          chartWidth={250}
          chartHeight={200}
        >
          <StaticPoint pointColors={line.map(item => item.color)} />
        </MultiLineChart>
      </View>
      <CustomGrid
        belowChart
        xLabelList={xLabelList}
        labelColor={dynamicColors.BLACK}
        yAxisLabelPaddingLeft={16}
        labelFontSize={10}
        numberOfTicksXAxis={5}
        yAxisFormatLabel={yAxisFormatLabel}
        yLabel={unit ? `(${t(unit)})` : undefined}
      />
      {lineData.length === 0 && (
        <Tooltip tooltipWidth={160} tooltipHeight={15 * (numberOfData + 2)} borderColor={dynamicColors.DARK_GREEN}>
          <TooltipLine listData={xLabelList} distanceFromTop={-5 * (numberOfData + 1)} />
          {column.map((item, index) => (
            <TooltipLine
              formatter={formatTooltips(item.label)}
              distanceFromTop={-5 * (numberOfData + 1) + index * 15 + 20}
              fontWeight={'bold'}
              color={item.color}
              listData={barData[index]}
              key={`TooltipLineColumn${item.label}-${index}`}
            />
          ))}
          {line.map((item, index) => (
            <TooltipLine
              formatter={formatTooltipsLine(item.label)}
              distanceFromTop={-5 * (numberOfData + 1) + (index + column.length) * 15 + 20}
              fontWeight={'bold'}
              color={item.color}
              listData={lineData[index]}
              key={`TooltipLineLine${item.label}-${index}`}
            />
          ))}
        </Tooltip>
      )}
    </BarChart>
  );
};

export default memo(FinancialChart);

const useStyles = getStylesHook({
  skeletonContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiLineChartContainer: {
    paddingLeft: 75,
  },
});
