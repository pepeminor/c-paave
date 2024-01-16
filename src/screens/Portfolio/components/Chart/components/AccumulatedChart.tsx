import React, { useMemo } from 'react';
import withMemo from 'HOC/withMemo';
import { IFormatDataChart } from 'interfaces/common';
import { formatNumber, mapV2 } from 'utils';
import { t } from 'i18next';
import { CustomGrid, MultiLineChart, PointWhenTouch, Tooltip, TooltipLine } from 'components/Chart/SVGChart';
import { useColors } from 'hooks/useStyles';

type AccumulatedChartProps = {
  line1Data: IFormatDataChart[];
  line2Data: IFormatDataChart[];
  line3Data: IFormatDataChart[];
  onChangeEnableScroll: (enable: boolean) => void;
};

const PortfolioScreen_MultiLineYAxisFormatLabel = (value: number) => {
  return `${value}%`;
};

const PortfolioScreen_line1TooltipText = (value: unknown) => {
  return `${t('Accumulated Rate')}:  ${new Number(value).toFixed(2)}%`;
};

const PortfolioScreen_line2TooltipText = (value: unknown) => {
  return `${t('Accumulated Profit')}:  ${formatNumber(new Number(value).valueOf(), 0, undefined, true)}`;
};

const PortfolioScreen_line3TooltipText = (value: unknown) => {
  return `${t('Vnindex')}:  ${new Number(value).toFixed(2)}%`;
};

const AccumulatedChart = (props: AccumulatedChartProps) => {
  const dynamicColors = useColors();
  const { line1DataY, line2DataY, line3DataY, maxY, minY, xLabelList, dateLabelList } = useMemo(() => {
    const paddingDays = props.line3Data.length - props.line1Data.length;
    const line1DataY = [
      ...new Array(paddingDays > 0 ? paddingDays : 0).fill(0),
      ...mapV2(props.line1Data, item => item.y * 100),
    ];
    const line2DataY = [
      ...new Array(paddingDays > 0 ? paddingDays : 0).fill(0),
      ...mapV2(props.line2Data, item => item.y),
    ];
    const line3DataY = mapV2(props.line3Data, item => item.y);
    return {
      line1DataY,
      line2DataY,
      line3DataY,
      maxY: Math.max(...line1DataY, ...line3DataY),
      minY: Math.min(...line1DataY, ...line3DataY),
      xLabelList: mapV2(paddingDays > 0 ? props.line3Data : props.line1Data, item => `${item.xLabel}`),
      dateLabelList: mapV2(paddingDays > 0 ? props.line3Data : props.line1Data, item => `${item.date}`),
    };
  }, [props.line1Data, props.line2Data, props.line3Data]);

  const lineData = useMemo(() => {
    return [
      {
        data: line1DataY,
        svg: { stroke: dynamicColors.DARK_GREEN, strokeWidth: 1.5 },
      },
      {
        data: line3DataY,
        svg: { stroke: dynamicColors.LIGHTRed, strokeWidth: 1.5 },
      },
    ];
  }, [line1DataY, line3DataY, dynamicColors]);

  const pointColors = useMemo(() => [dynamicColors.DARK_GREEN, dynamicColors.LIGHTRed], [dynamicColors]);

  return (
    <MultiLineChart
      lineData={lineData}
      yMax={maxY}
      yMin={minY}
      onDisableScroll={props.onChangeEnableScroll}
      extraSpaceForYAxisFromYMin={maxY - minY > 20 ? 3 : 1}
      extraSpaceForYAxisFromYMax={1}
      chartWidth={350}
      chartHeight={200}
    >
      <CustomGrid
        belowChart={true}
        xLabelList={xLabelList}
        labelColor={dynamicColors.BLACK}
        yAxisLabelPaddingLeft={5}
        labelFontSize={12}
        numberOfTicksXAxis={5}
        yAxisFormatLabel={PortfolioScreen_MultiLineYAxisFormatLabel}
      />
      <PointWhenTouch pointColors={pointColors} />
      <Tooltip tooltipWidth={160} tooltipHeight={75} borderColor={dynamicColors.DARK_GREEN}>
        <TooltipLine listData={dateLabelList} distanceFromTop={-20} />
        <TooltipLine
          formatter={PortfolioScreen_line3TooltipText}
          distanceFromTop={0}
          fontWeight={'bold'}
          listData={line3DataY}
          color={dynamicColors.LIGHTRed}
        />
        <TooltipLine
          formatter={PortfolioScreen_line1TooltipText}
          distanceFromTop={15}
          listData={line1DataY}
          fontWeight={'bold'}
          color={dynamicColors.DARK_GREEN}
        />
        <TooltipLine
          formatter={PortfolioScreen_line2TooltipText}
          distanceFromTop={30}
          fontWeight={'bold'}
          listData={line2DataY}
        />
      </Tooltip>
    </MultiLineChart>
  );
};

export default withMemo(AccumulatedChart);
