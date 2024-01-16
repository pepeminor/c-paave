import { ActivityIndicator, View } from 'react-native';
import React, { ComponentProps, memo } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup } from 'victory-native';
import useStyles from './styles';
import globalStyles, { lightColors, scaleSize } from 'styles';
import { formatNumber, formatTickNumber } from 'utils';
import { IFormatDataChart } from 'interfaces/common';

type IBarChartProps = {
  readonly revenueData: IFormatDataChart[];
  readonly operatingIncomeData: IFormatDataChart[];
  readonly noteText?: Element;
  readonly color1: string;
  readonly color2: string;
  unit?: string;
  notFormat?: boolean;
};

const paddingChart = {
  top: scaleSize(10),
  bottom: scaleSize(30),
  left: scaleSize(60),
  right: scaleSize(10),
};

const heightChart = scaleSize(213);
const widthChart = scaleSize(360);
const offSetBar = scaleSize(21);
const barWidth = scaleSize(21);
const domainPadding = { y: [scaleSize(20), scaleSize(20)] } as ComponentProps<typeof VictoryChart>['domainPadding'];

const axisStyle = {
  axis: { stroke: 'grey', strokeWidth: 1 },
  ticks: { stroke: 'grey', size: 4 },
  grid: { stroke: lightColors.LIGHTTextDisable, opacity: 0.1 },
  tickLabels: { fontSize: scaleSize(10), padding: 5, fontFamily: 'Roboto' },
};

const BarChartTwoCol = ({ notFormat = false, ...props }: IBarChartProps) => {
  const { styles } = useStyles();

  // bỏ data vào để set điều kiện offset cho thanh x-axis xuống bottom
  const minValue = Math.min(...props.revenueData.map(x => x.y), ...props.operatingIncomeData.map(x => x.y));
  // handle x-axis position to bottom
  const offsetY = minValue <= 0 ? 30 : 0;

  const offsetYValue = scaleSize(offsetY);

  const color1 = { data: { fill: props.color1 } };

  const color2 = { data: { fill: props.color2 } };

  const styleNoteText = [styles.chartValueContainer, globalStyles.centered, globalStyles.flexDirectionRow];

  if (props.revenueData.length < 3) {
    return (
      <View style={styles.chartSkeleton}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <VictoryChart padding={paddingChart} height={heightChart} width={widthChart} domainPadding={domainPadding}>
        <VictoryGroup offset={offSetBar}>
          <VictoryBar data={props.revenueData} style={color1} barWidth={barWidth} />
          <VictoryBar data={props.operatingIncomeData} style={color2} barWidth={barWidth} />
        </VictoryGroup>
        <VictoryAxis
          offsetY={offsetYValue}
          crossAxis={false}
          standalone={false}
          style={axisStyle}
          tickFormat={(tick: number) => props.revenueData[Math.round(tick)].xLabel as string}
          orientation="bottom"
        />
        <VictoryAxis
          dependentAxis
          crossAxis={false}
          standalone={false}
          style={axisStyle}
          tickFormat={
            notFormat
              ? (tick: number) => formatNumber(tick)
              : (tick: number) => formatTickNumber(tick, undefined, ' ', props.unit)
          }
        />
      </VictoryChart>
      {props.noteText && <View style={styleNoteText}>{props.noteText}</View>}
    </>
  );
};

export default memo(BarChartTwoCol);
