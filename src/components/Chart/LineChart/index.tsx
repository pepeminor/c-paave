import React, { useCallback } from 'react';
import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
import { lightColors, scaleSize } from 'styles';
import { ArrayItem, IFormatDataChart } from 'interfaces/common';
import withMemo from 'HOC/withMemo';
import { View } from 'react-native';
import { formatNumber } from 'utils';
import { useTranslation } from 'react-i18next';

type ILineChartProps = {
  readonly NAVReturnData: IFormatDataChart[];
  readonly VNIndexReturnData: IFormatDataChart[];
  readonly offOffSet?: boolean;
  onChangeEnableScroll?: (enable: boolean) => void;
  notRenderChart?: boolean;
  notShowTooltip?: boolean;
};

const LineChart = (props: ILineChartProps) => {
  const minY = Math.min(...props.NAVReturnData.map(x => x.y), ...props.VNIndexReturnData.map(x => x.y));
  const maxY = Math.max(...props.NAVReturnData.map(x => x.y), ...props.VNIndexReturnData.map(x => x.y));
  const tickValues = props.NAVReturnData.length < 8 ? props.NAVReturnData.map((_, i) => i) : undefined;
  const { t } = useTranslation();

  const offsetYValue = minY <= 0 ? 30 : 20;
  const axisStyle = {
    axis: { stroke: 'grey', strokeWidth: 1 },
    ticks: { stroke: 'grey', size: 4 },
    grid: { stroke: lightColors.LIGHTTextDisable, opacity: 0.1 },
    tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Roboto' },
  };

  const lineAnimate = {
    duration: 1000,
    onLoad: { duration: 1200 },
    animationWhitelist: ['NAVReturnData', 'VNIndexReturnData'],
  };

  const paddingChart = {
    top: scaleSize(10),
    bottom: scaleSize(30),
    left: scaleSize(52),
    right: scaleSize(20),
  };

  const heightChart = scaleSize(200);

  const widthChart = scaleSize(360);
  const offsetY = props.offOffSet ? scaleSize(30) : scaleSize(offsetYValue);

  const getLabels = useCallback(({ datum }) => {
    if (datum?.childName === 'ScatterNAVReturnData') {
      return `${datum?.date}`;
    }

    if (datum?.childName === 'ScatterVNIndexReturnData') {
      return '';
    }

    if (datum?.childName === 'NAVReturnData')
      return `${t('NAV Return')}: ${formatNumber(datum?.y, 2, undefined, true)}%`;

    return `${t('VNIndex Return')}: ${formatNumber(datum?.y, 2, undefined, true)}%`;
  }, []);

  const onTouchStart = useCallback(() => {
    props.onChangeEnableScroll?.(false);
  }, []);

  const onTouchEnd = useCallback(() => {
    props.onChangeEnableScroll?.(true);
  }, []);

  if (props.notRenderChart) return <View style={{ height: heightChart, width: widthChart }} />;

  return (
    <VictoryChart
      padding={paddingChart}
      height={heightChart}
      width={widthChart}
      domainPadding={{
        y: [scaleSize(25), scaleSize(25)],
        x: [scaleSize(50), scaleSize(25)],
      }}
      containerComponent={
        props.notShowTooltip ? undefined : (
          <VictoryVoronoiContainer
            labels={getLabels}
            mouseFollowTooltips
            labelComponent={
              <VictoryTooltip
                cornerRadius={12}
                flyoutStyle={{ fill: lightColors.WHITE, stroke: lightColors.Green2, strokeWidth: 2 }}
                flyoutWidth={170}
                flyoutHeight={70}
                center={{ x: 100, y: 40 }}
                style={[
                  { textAnchor: 'start', fill: lightColors.BLACK },
                  { textAnchor: 'start', fill: lightColors.DARK_GREEN },
                  { textAnchor: 'start', fill: lightColors.BLACK },
                  { textAnchor: 'start', fill: lightColors.LIGHTRed },
                ]}
                flyoutPadding={{ top: 20, bottom: 10, left: 10, right: 10 }}
                x={100}
              />
            }
            voronoiDimension="x"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        )
      }
    >
      <VictoryAxis
        standalone={false}
        crossAxis={false}
        style={axisStyle}
        offsetY={offsetY}
        tickValues={tickValues}
        tickFormat={(tick: ArrayItem<typeof tickValues>) =>
          props.NAVReturnData[tick] != null && props.NAVReturnData[tick].xLabel != null
            ? props.NAVReturnData[tick].xLabel
            : ''
        }
        orientation="bottom"
      />

      <VictoryAxis
        standalone={false}
        crossAxis={false}
        dependentAxis
        style={axisStyle}
        tickFormat={tick => (minY === 0 && maxY === 0 ? '' : `${tick}%`)}
      />

      <VictoryGroup color={lightColors.DARK_GREEN} data={props.NAVReturnData}>
        <VictoryScatter name="ScatterNAVReturnData" size={({ active }) => (active ? 4 : 0)} />
        <VictoryLine name="NAVReturnData" animate={lineAnimate} />
      </VictoryGroup>

      <VictoryGroup color={lightColors.LIGHTRed} data={props.VNIndexReturnData}>
        <VictoryScatter name="ScatterVNIndexReturnData" size={({ active }) => (active ? 4 : 0)} />
        <VictoryLine name="VNIndexReturnData" animate={lineAnimate} />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default withMemo(LineChart);
