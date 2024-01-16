import React, { useMemo } from 'react';
import withMemo from 'HOC/withMemo';
import { IFormatDataChart } from 'interfaces/common';
import { formatNumber, mapV2 } from 'utils';
import { t } from 'i18next';
import { CustomGrid, MultiLineChart, PointWhenTouch, Tooltip, TooltipLine } from 'components/Chart/SVGChart';
import { useColors } from 'hooks/useStyles';

type MultiLineChartForPortfolioProps = {
  line1Data: IFormatDataChart[];
  line2Data: IFormatDataChart[];
  accProfitData: IFormatDataChart[];
  onChangeEnableScroll: (enable: boolean) => void;
};

const PortfolioScreen_MultiLineYAxisFormatLabel = (value: number) => {
  return `${value}%`;
};

const PortfolioScreen_line1TooltipText = (value: unknown) => {
  return `${t('NAV')}:  ${Number(value).toFixed(2)}%`;
};

const PortfolioScreen_line2TooltipText = (value: unknown) => {
  return `${t('Vnindex')}:  ${Number(value).toFixed(2)}%`;
};

const PortfolioScreen_line3TooltipText = (value: unknown) => {
  return `${t('Accumulated Profit')}:  ${formatNumber(Number(value).valueOf(), 0, undefined, true)}`;
};

const MultiLineChartForPortfolio = (props: MultiLineChartForPortfolioProps) => {
  const dynamicColors = useColors();
  const { line1DataY, line2DataY, accProfitData, maxY, minY, xLabelList, dateLabelList } = useMemo(() => {
    const line1DataY = mapV2(props.line1Data, item => item.y * 100);
    const line2DataY = mapV2(props.line2Data, item => item.y);
    return {
      line1DataY,
      line2DataY,
      accProfitData: mapV2(props.accProfitData, item => item.y),
      maxY: Math.max(...line1DataY, ...line2DataY),
      minY: Math.min(...line1DataY, ...line2DataY),
      xLabelList: mapV2(props.line1Data, item => `${item.xLabel}`),
      dateLabelList: mapV2(props.line1Data, item => `${item.date}`),
    };
  }, [props.line1Data, props.line2Data]);

  const lineData = useMemo(() => {
    return [
      {
        data: line1DataY,
        svg: { stroke: dynamicColors.DARK_GREEN, strokeWidth: 1.5 },
      },
      {
        data: line2DataY,
        svg: { stroke: dynamicColors.LIGHTRed, strokeWidth: 1.5 },
      },
    ];
  }, [line1DataY, line2DataY, dynamicColors]);

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
      <Tooltip tooltipWidth={210} tooltipHeight={80} borderColor={dynamicColors.DARK_GREEN}>
        <TooltipLine listData={dateLabelList} distanceFromTop={-20} />
        <TooltipLine
          formatter={PortfolioScreen_line2TooltipText}
          distanceFromTop={0}
          fontWeight={'bold'}
          color={dynamicColors.LIGHTRed}
          listData={line2DataY}
        />
        <TooltipLine
          formatter={PortfolioScreen_line1TooltipText}
          distanceFromTop={15}
          listData={line1DataY}
          fontWeight={'bold'}
          color={dynamicColors.DARK_GREEN}
        />
        <TooltipLine
          formatter={PortfolioScreen_line3TooltipText}
          distanceFromTop={30}
          fontWeight={'bold'}
          listData={accProfitData}
        />
      </Tooltip>
    </MultiLineChart>
  );
};

export default withMemo(MultiLineChartForPortfolio);
