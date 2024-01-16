import React, { memo, useCallback, useMemo } from 'react';
import { IFormatDataChart } from 'interfaces/common';
import { formatNumber, mapV2 } from 'utils';
import { inRange } from 'lodash';
import { t } from 'i18next';
import { BarChart, CustomGrid, PointWhenTouch, SVGChartData, Tooltip, TooltipLine } from 'components/Chart/SVGChart';
import { useColors } from 'hooks/useStyles';
import { AccessorFunction } from 'react-native-svg-charts';

type IBarChartForLeaderBoardProps = {
  data: IFormatDataChart[];
  onChangeEnableScroll?: (enable: boolean) => void;
};

const ChartConfig = {
  barTooltipText: (value: unknown) => {
    return `${t('P/L')}: ${formatNumber(value as number, 0, undefined, true)}`;
  },
  yAxisFormatLabel: (value: number) => {
    if (inRange(Math.abs(value), 1000, 1000000)) {
      return `${parseFloat((value / 1000).toFixed(1))}K`;
    } else if (inRange(Math.abs(value), 1000000, 1000000000)) {
      return `${parseFloat((value / 1000000).toFixed(1))}M`;
    } else if (value >= 1000000000) {
      return `${parseFloat((value / 1000000000).toFixed(1))}B`;
    } else {
      return `${value}`;
    }
  },
  yAccessor: (({ item }) => item.data) as AccessorFunction<any, number>,
};

const BarChartForLeaderBoard = (props: IBarChartForLeaderBoardProps) => {
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
  }, [props.data]);

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
        yAxisLabelPaddingLeft={10}
        labelFontSize={12}
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
          color={dynamicColors.DARK_GREEN}
          getColor={getTooltipColor}
        />
      </Tooltip>
    </BarChart>
  );
};

export default memo(BarChartForLeaderBoard);
