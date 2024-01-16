import React, { memo, useCallback, useMemo } from 'react';
import { IFormatDataChart } from 'interfaces/common';
import { formatNumber, mapV2 } from 'utils';
import { t } from 'i18next';
import { useColors } from 'hooks/useStyles';
import { BarChart, CustomGrid, PointWhenTouch, SVGChartData, Tooltip, TooltipLine } from 'components/Chart/SVGChart';
import { AccessorFunction } from 'react-native-svg-charts';

type IBarChartForPortfolioProps = {
  data: IFormatDataChart[];
  onChangeEnableScroll?: (enable: boolean) => void;
};

const ChartConfig = {
  barTooltipText: (value: unknown) => {
    return `${t('NAV Asset')}: ${formatNumber(value as number, 2, undefined, true)} %`;
  },
  yAxisFormatLabel: (value: number) => {
    return `${formatNumber(value, 3, undefined, false)}%`;
  },
  yAccessor: (({ item }) => item.data) as AccessorFunction<any, number>,
};

const BarChartForPortfolio = (props: IBarChartForPortfolioProps) => {
  const dynamicColors = useColors();
  const { barDataY, maxY, minY, xLabelList, dateLabelList } = useMemo(() => {
    const barDataY = mapV2(props.data, item => item.y);
    return {
      barDataY: [
        {
          data: barDataY.map(data => {
            if (data < 0) {
              return {
                data,
                svg: {
                  fill: dynamicColors.LIGHTRed,
                },
              };
            } else {
              return {
                data,
                svg: {
                  fill: dynamicColors.DARK_GREEN,
                },
              };
            }
          }),
        },
      ] as SVGChartData[],
      maxY: Math.max(...barDataY),
      minY: Math.min(...barDataY, 0),
      xLabelList: mapV2(props.data, item => `${item.xLabel}`),
      dateLabelList: mapV2(props.data, item => `${item.date}`),
    };
  }, [props.data, dynamicColors]);

  const getTooltipColor = useCallback(
    (value: unknown) => ((value as number) >= 0 ? dynamicColors.DARK_GREEN : dynamicColors.LIGHTRed),
    [dynamicColors]
  );

  const getPointColors = useCallback(
    (value: number) => {
      return (value as number) >= 0 ? dynamicColors.DARK_GREEN : dynamicColors.LIGHTRed;
    },
    [dynamicColors]
  );

  return (
    <BarChart
      chartData={barDataY}
      yMax={maxY}
      yMin={minY}
      onDisableScroll={props.onChangeEnableScroll}
      extraSpaceForYAxisFromYMin={(maxY - minY) * 0.1}
      extraSpaceForYAxisFromYMax={(maxY - minY) * 0.05}
      chartWidth={350}
      chartHeight={200}
      yAccessor={ChartConfig.yAccessor}
    >
      <CustomGrid
        belowChart={true}
        xLabelList={xLabelList}
        labelColor={dynamicColors.BLACK}
        yAxisLabelPaddingLeft={5}
        labelFontSize={11}
        numberOfTicksXAxis={5}
        yAxisFormatLabel={ChartConfig.yAxisFormatLabel}
      />
      <PointWhenTouch getPointColors={getPointColors} />
      <Tooltip tooltipWidth={180} tooltipHeight={50} borderColor={dynamicColors.DARK_GREEN}>
        <TooltipLine listData={dateLabelList} distanceFromTop={-5} />
        <TooltipLine
          formatter={ChartConfig.barTooltipText}
          distanceFromTop={10}
          fontWeight={'bold'}
          getColor={getTooltipColor}
        />
      </Tooltip>
    </BarChart>
  );
};

export default memo(BarChartForPortfolio);
