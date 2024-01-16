import { StyleProp, View, ViewStyle } from 'react-native';
import React, { memo, useEffect } from 'react';
import { VictoryAxis, VictoryBar, VictoryCandlestick, VictoryChart, VictoryGroup, VictoryTheme } from 'victory-native';
import { VictoryStyleObject, VictoryLabelStyleObject, VictoryTickStyleObject } from 'victory-core';

interface ICandlestick {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface IBar {
  x: number;
  y: number;
}

type AxisStyle = {
  parent?: VictoryStyleObject;
  axis?: VictoryStyleObject;
  axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  grid?: VictoryStyleObject;
  ticks?: VictoryTickStyleObject;
  tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
};

type ICandleStickChartProps = {
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
    readonly XAxisStyle?: AxisStyle;
    readonly YAxisStyle?: AxisStyle;
    readonly data?: { x: number | string; y: number; y0?: number }; // Use demoData at that moment
  };
  readonly chartData?: {
    readonly candlestickData: ICandlestick[];
    readonly barData: IBar[];
  };
};

const CandleStickChart = (props: ICandleStickChartProps) => {
  useEffect(() => {}, []);

  return (
    <View style={props.containerStyle}>
      <VictoryChart
        theme={VictoryTheme.material}
        padding={props.chartStyle?.padding ?? 30}
        height={props.chartStyle?.height ?? 300}
      >
        <VictoryGroup offset={40}>
          <VictoryCandlestick
            candleColors={{ negative: '#c43a31' }}
            data={
              props.chartData?.candlestickData || [
                { x: 1, open: 5, close: 10, high: 15, low: 0 },
                { x: 2, open: 10, close: 15, high: 20, low: 5 },
                { x: 3, open: 15, close: 20, high: 22, low: 10 },
                { x: 4, open: 20, close: 10, high: 25, low: 7 },
                { x: 5, open: 10, close: 8, high: 15, low: 5 },
              ]
            }
          />
          <VictoryBar
            data={
              props.chartData?.barData || [
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 4 },
                { x: 4, y: 3 },
                { x: 5, y: 5 },
              ]
            }
            style={{ data: { fill: '#2F80ED' } }}
          />
          {!props.chartConfig?.hideXAxis && <VictoryAxis crossAxis style={props.chartConfig?.XAxisStyle} />}
          {!props.chartConfig?.hideYAxis && <VictoryAxis dependentAxis style={props.chartConfig?.YAxisStyle} />}
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};

export default memo(CandleStickChart);
