import { View, Text } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { useAppSelector } from 'hooks';
import { StockThemeSelector } from 'reduxs';
import { useStyles } from './styles';
import { BarChart, CustomGrid, PointWhenTouch, SVGChartData, Tooltip, TooltipLine } from 'components/Chart/SVGChart';
import { ThemeRatioDetailItem } from 'interfaces/stockTheme';
import { formatNumber, mapV2 } from 'utils';
import { AccessorFunction } from 'react-native-svg-charts';
import { useTranslation } from 'react-i18next';
import { scaleSize } from 'styles';

type Props = {
  themeCode: string;
  chartType: ChartType;
  highlightStockCode?: string;
};

type ChartType = 'PE' | 'PB';

type ChartConfig = {
  [key in ChartType]: {
    title: string;
    field: keyof ThemeRatioDetailItem;
  };
};
const ChartConfig: ChartConfig = {
  PE: {
    title: 'P/ E',
    field: 'pe',
  },
  PB: {
    title: 'P/ B',
    field: 'pb',
  },
};
const ChartFunction = {
  yAxisFormatLabel: (value: number) => {
    return `${formatNumber(value, 3, undefined, false)}`;
  },
  yAccessor: (({ item }) => item.data) as AccessorFunction<any, number>,
};
const ChartContentInset = {
  top: scaleSize(20),
  bottom: scaleSize(20),
  left: scaleSize(40),
  right: scaleSize(-10),
};

export const Chart = memo(({ themeCode, chartType, highlightStockCode }: Props) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const rawData = useAppSelector(StockThemeSelector.selectCurrentRatio(themeCode));
  const avgRatio = useAppSelector(StockThemeSelector.selectAvgRatio(themeCode));
  const horizontalLine = chartType === 'PE' ? avgRatio?.avgPE : avgRatio?.avgPB;

  const chartConfig = ChartConfig[chartType];
  const filteredData = useMemo(
    () => rawData.filter(item => item[chartConfig.field] && (item[chartConfig.field] as number) > 0),
    [rawData, chartConfig]
  );
  const sortedData = useMemo(
    () =>
      [...filteredData]
        .sort((a, b) => {
          if (highlightStockCode) {
            if (a.code === highlightStockCode) {
              return -1;
            }
            if (b.code === highlightStockCode) {
              return 1;
            }
          }
          return (a[chartConfig.field] as number) - (b[chartConfig.field] as number);
        })
        .slice(0, 10),
    [filteredData, chartConfig, highlightStockCode]
  );

  const { chartData, maxY, minY, xLabelList } = useMemo(() => {
    const chartData = mapV2(sortedData, item => (item[chartConfig.field] ?? 0) as number);

    return {
      chartData: [
        {
          data: chartData.map((data, index) => {
            if (highlightStockCode && sortedData[index].code === highlightStockCode) {
              return {
                data,
                svg: {
                  fill: dynamicColors.Yellow2,
                },
              };
            }
            return {
              data,
              svg: {
                fill: dynamicColors.BlueNewColor,
              },
            };
          }),
        },
      ] as SVGChartData[],
      maxY: Math.max(...chartData, horizontalLine),
      minY: Math.min(...chartData, 0),
      xLabelList: mapV2(sortedData, item => `${item.code}`),
    };
  }, [sortedData, dynamicColors, horizontalLine]);

  const formatTooltipText = useCallback(
    (value: unknown) => {
      return `${t(chartConfig.title)}: ${formatNumber(value as number, 2, undefined, true)}`;
    },
    [chartType]
  );

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.chartTitle}>
        {t(chartConfig.title)}
      </Text>
      <BarChart
        chartData={chartData}
        yMax={maxY}
        yMin={minY}
        extraSpaceForYAxisFromYMin={(maxY - minY) * 0.1}
        extraSpaceForYAxisFromYMax={(maxY - minY) * 0.05}
        chartWidth={350}
        chartHeight={200}
        yAccessor={ChartFunction.yAccessor}
        contentInset={ChartContentInset}
        spacingOuter={1.5}
      >
        <CustomGrid
          belowChart={true}
          xLabelList={xLabelList}
          labelColor={dynamicColors.BLACK}
          yAxisLabelPaddingLeft={5}
          labelFontSize={11}
          numberOfTicksXAxis={10}
          yAxisFormatLabel={ChartFunction.yAxisFormatLabel}
          horizontalLine={horizontalLine}
        />
        <PointWhenTouch pointColors={[dynamicColors.BlueNewColor]} />
        <Tooltip tooltipWidth={100} tooltipHeight={50} borderColor={dynamicColors.DARK_GREEN}>
          <TooltipLine listData={xLabelList} distanceFromTop={-5} />
          <TooltipLine
            formatter={formatTooltipText}
            distanceFromTop={10}
            fontWeight={'bold'}
            color={dynamicColors.BlueNewColor}
          />
        </Tooltip>
      </BarChart>
    </View>
  );
});
