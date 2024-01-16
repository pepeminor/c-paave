import { StyleProp, View, ViewStyle } from 'react-native';
import React, { memo, useCallback } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryVoronoiContainer, VictoryTooltip } from 'victory-native';
import { lightColors, scaleSize } from 'styles/index';
import useStyles from './styles';
import globalStyles from 'styles';
import { ArrayItem, IFormatDataChart } from 'interfaces/common';
import { formatNumber, formatTickNumber } from 'utils';
import { useTranslation } from 'react-i18next';

type IBarChartProps = {
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly chartStyle?: {
    readonly height?: number; // default 300
    readonly padding?: // default 10
    | {
          readonly top?: number;
          readonly bottom?: number;
          readonly left?: number;
          readonly right?: number;
        }
      | number;
  };
  readonly chartConfig?: {
    readonly hideXAxis?: boolean;
    readonly hideYAxis?: boolean;
    readonly data?: { x: number | string; y: number; y0?: number }; // Use demoData at that moment
  };
  readonly NAVReturnData: IFormatDataChart[];
  readonly noteText?: Element;
  readonly color1: string;
  readonly color2: string;
  onChangeEnableScroll?: (enable: boolean) => void;
  notRenderChart?: boolean;
  readonly isTickFormat?: boolean;

  isPercent?: boolean;
  textToolTip?: string;
};

const BarChart = (props: IBarChartProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  // bỏ data vào để set điều kiện offset cho thanh x-axis xuống bottom
  const minValue = Math.min(...props.NAVReturnData.map(x => x.y));
  const maxValue = Math.max(...props.NAVReturnData.map(x => x.y));
  const tickValues = props.NAVReturnData.length < 8 ? [0, ...props.NAVReturnData.map((_, i) => i + 1)] : undefined;
  const offsetY = minValue <= 0 ? 30 : 25;

  const axisStyle = {
    axis: { stroke: 'grey', strokeWidth: 1 },
    ticks: { stroke: 'grey', size: 4 },
    grid: { stroke: lightColors.LIGHTTextDisable, opacity: 0.1 },
    tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Roboto' },
  };
  const offsetYValue = scaleSize(offsetY);

  const styleNoteText = [styles.chartValueContainer, globalStyles.centered, globalStyles.flexDirectionRow];

  const getLabels = useCallback(
    ({ datum }) => {
      const { textToolTip = 'NAV Return', isPercent = true } = props;
      if (isPercent) {
        return `${datum?.date}\n${t(textToolTip)}: ${formatNumber(datum?.y, 2, undefined, true)}%`;
      }

      return `${datum?.date}\n${t(textToolTip)}: ${formatNumber(datum?.y)}`;
    },
    [props.isPercent, props.textToolTip]
  );

  const onTouchStart = useCallback(() => {
    props.onChangeEnableScroll?.(false);
  }, []);

  const onTouchEnd = useCallback(() => {
    props.onChangeEnableScroll?.(true);
  }, []);

  if (props.notRenderChart) return <View style={{ height: props.chartStyle?.height ?? scaleSize(243) }} />;

  return (
    <View style={props.containerStyle}>
      <VictoryChart
        padding={props.chartStyle?.padding}
        height={props.chartStyle?.height ?? scaleSize(243)}
        domainPadding={{
          y: [scaleSize(20), scaleSize(45)],
          x: [scaleSize(20), scaleSize(10)],
        }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={getLabels}
            mouseFollowTooltips
            labelComponent={
              <VictoryTooltip
                cornerRadius={12}
                flyoutStyle={{ fill: lightColors.WHITE, stroke: lightColors.Green2, strokeWidth: 2 }}
                flyoutWidth={180}
                flyoutHeight={50}
                center={{ x: 100, y: 40 }}
                style={[
                  { textAnchor: 'start', fill: lightColors.BLACK },
                  { textAnchor: 'start', fill: lightColors.DARK_GREEN },
                ]}
                flyoutPadding={{ top: 10, bottom: 5, left: 0, right: 10 }}
                x={100}
              />
            }
            voronoiDimension="x"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        }
      >
        <VictoryBar
          // khi truyền data vào nhớ tạo x0 và xLast với giá trị y = 0 r` kẹp data ở giữa
          name={'barChart'}
          data={props.NAVReturnData}
          style={{ data: { fill: ({ datum }) => (datum.y >= 0 ? props.color1 : props.color2) } }}
          animate={{ duration: 1000, onLoad: { duration: 1200 } }}
        />
        <VictoryAxis
          offsetY={offsetYValue}
          crossAxis={false}
          standalone={false}
          style={axisStyle}
          tickValues={tickValues}
          tickFormat={(tick: ArrayItem<typeof tickValues>) =>
            tick === 0 ? '' : (props.NAVReturnData[tick - 1]?.xLabel as string)
          }
          orientation="bottom"
        />
        <VictoryAxis
          dependentAxis
          crossAxis={false}
          standalone={false}
          style={axisStyle}
          tickFormat={tick =>
            maxValue === 0 && minValue === 0 ? '' : props.isTickFormat ? formatTickNumber(tick) : `${tick}%`
          }
        />
      </VictoryChart>
      <View style={styleNoteText}>{props.noteText}</View>
    </View>
  );
};

export default memo(BarChart);
