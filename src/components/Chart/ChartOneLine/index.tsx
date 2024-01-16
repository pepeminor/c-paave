import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryArea,
} from 'victory-native';
import { lightColors, scaleSize } from 'styles';
import { ArrayItem, IFormatDataChart } from 'interfaces/common';
import { formatNumber, mapV2 } from 'utils';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

type ILineChartProps = {
  readonly NAVAsset: IFormatDataChart[];
  readonly animate?: boolean;
  onChangeEnableScroll?: (enable: boolean) => void;
  notRenderChart?: boolean;
};

const Gradient = () => (
  <Defs>
    <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset="0" stopColor={'rgba(113 ,214 ,148, 1)'} />
      <Stop offset="1" stopColor={lightColors.WHITE} />
    </LinearGradient>
  </Defs>
);

const LineOneChart = (props: ILineChartProps) => {
  const minY = Math.min(...mapV2(props.NAVAsset, x => x.y));
  const maxY = Math.max(...mapV2(props.NAVAsset, x => x.y));
  const tickValues = props?.NAVAsset?.length < 8 ? mapV2(props.NAVAsset, (_, i) => i) : undefined;
  const axisStyle = {
    axis: { stroke: 'grey', strokeWidth: 1 },
    ticks: { stroke: 'grey', size: 4 },
    grid: { stroke: lightColors.LIGHTTextDisable, opacity: 0.1 },
    tickLabels: { fontSize: maxY - minY < 500000 ? 10 : 12, padding: 5, fontFamily: 'Roboto' },
  };
  // const fontSizeLabel = { fontSize: 8 }

  const lineStyleGreen = { data: { stroke: lightColors.DARK_GREEN } };

  const { t } = useTranslation();

  const lineAnimate = {
    duration: 1000,
    onLoad: { duration: 2000 },
  };

  // const fillColor = { fill: Colors.WHITE }
  const paddingChart = {
    top: scaleSize(10),
    bottom: scaleSize(30),
    left: scaleSize(55),
    right: scaleSize(20),
  };

  const heightChart = scaleSize(213);

  const widthChart = scaleSize(360);

  const getLabels = useCallback(({ datum }) => {
    if (datum?.childName === 'ScatterNAVAssetData') {
      return `${datum?.date}`;
    }
    if (datum?.childName === 'NAVAssetArea') {
      return '';
    }
    return `${t('NAV Asset')}: ${formatNumber(datum?.y)}`;
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
        y: 0 < maxY - minY && maxY - minY < 500000 ? [scaleSize(20), scaleSize(20)] : [scaleSize(50), scaleSize(50)],
      }}
      containerComponent={
        <VictoryVoronoiContainer
          labels={getLabels}
          mouseFollowTooltips
          labelComponent={
            <VictoryTooltip
              cornerRadius={12}
              flyoutStyle={{ fill: lightColors.WHITE, stroke: lightColors.Green2, strokeWidth: 2 }}
              flyoutWidth={190}
              flyoutHeight={50}
              center={{ x: 100, y: 40 }}
              style={[
                { textAnchor: 'start', fill: lightColors.BLACK },
                { textAnchor: 'start', fill: lightColors.BLACK },
                { textAnchor: 'start', fill: lightColors.DARK_GREEN },
              ]}
              flyoutPadding={{ top: 0, bottom: 10, left: -10, right: 10 }}
              x={100}
            />
          }
          voronoiDimension="x"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      }
    >
      <VictoryArea
        name={'NAVAssetArea'}
        style={{ data: { fill: 'url(#gradient)' } }}
        data={props.NAVAsset.map(ele => ({ ...ele, y0: minY }))}
        // animate={props.animate && areaAnimate}
      />
      <VictoryAxis
        standalone={false}
        crossAxis={false}
        style={axisStyle}
        tickValues={tickValues}
        tickFormat={(tick: ArrayItem<typeof tickValues>) =>
          props.NAVAsset[tick] != null && props.NAVAsset[tick].xLabel != null
            ? (props.NAVAsset[tick].xLabel as string)
            : ''
        }
        orientation="bottom"
      />
      <VictoryAxis
        standalone={false}
        crossAxis={false}
        dependentAxis
        style={axisStyle}
        tickFormat={tick =>
          `${(tick / 1000000).toLocaleString('en-IN', {
            minimumFractionDigits: 0 < maxY - minY && maxY - minY < 500000 ? 2 : 0,
          })}M`
        }
      />
      <VictoryGroup color={lightColors.DARK_GREEN} data={props.NAVAsset}>
        <VictoryScatter name="ScatterNAVAssetData" size={({ active }) => (active ? 4 : 0)} />
        <VictoryLine name={'NAVAsset'} animate={props.animate && lineAnimate} style={lineStyleGreen} />
      </VictoryGroup>
      <Gradient />
    </VictoryChart>
  );
};

export default memo(LineOneChart);
