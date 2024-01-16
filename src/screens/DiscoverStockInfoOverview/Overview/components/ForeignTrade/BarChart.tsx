import React, { useCallback, useMemo } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack } from 'victory-native';
import { Colors, scaleSize } from 'styles';
import { IFormatDataChart } from 'interfaces/common';
import { formatTickNumber } from 'utils';
import withMemo from 'HOC/withMemo';

type IBarChartProps = {
  readonly data: IFormatDataChart[];
  readonly colors: string[];
};

const CHART_CONFIG = {
  axisStyle: {
    axis: { stroke: 'grey', strokeWidth: 1 },
    ticks: { stroke: 'grey', size: 4 },
    grid: { stroke: Colors.LIGHTTextDisable, opacity: 0.1 },
    tickLabels: { fontSize: 10, padding: 5, fontFamily: 'Roboto' },
  },
  paddingChart: {
    top: scaleSize(10),
    bottom: scaleSize(30),
    left: scaleSize(60),
    right: scaleSize(10),
  },
  domainPadding: {
    x: 0,
    y: scaleSize(20),
  },
  width: scaleSize(360),
  height: scaleSize(213),
  barWidth: scaleSize(21),
  labelStyles: { fontSize: scaleSize(8), textAlign: 'center' },
};

const BarChartTwoCol = ({ data, colors }: IBarChartProps) => {
  const tickValues = useMemo(() => data?.map((_, i) => i), [data]);
  const tickFormatter = useCallback(
    (tick: number) => {
      if (tick === data.length - 2) return data?.[tick]?.xLabel ?? '';

      if (tick % 2 !== 0) return '';

      return data?.[tick]?.xLabel ?? '';
    },
    [data]
  );

  const stylesBarChart = useMemo(() => {
    return {
      labels: { fill: 'black', fontSize: scaleSize(10) },
      data: { fill: (args: any) => (args.datum.y > 0 ? colors[0] : colors[1]) },
    };
  }, [colors]);

  const labels = useCallback(({ datum }) => (datum.y === 0 ? '' : formatTickNumber(datum.y)), []);

  const dyLabel = useCallback(args => {
    const { datum } = args;
    return datum.y >= 0 ? -4 : 4;
  }, []);

  return (
    <>
      <VictoryChart
        padding={CHART_CONFIG.paddingChart}
        height={CHART_CONFIG.height}
        width={CHART_CONFIG.width}
        domainPadding={CHART_CONFIG.domainPadding}
      >
        <VictoryStack>
          <VictoryBar
            data={data}
            style={stylesBarChart}
            barWidth={CHART_CONFIG.barWidth}
            labelComponent={<VictoryLabel dy={dyLabel} />}
            labels={labels}
          />
        </VictoryStack>

        <VictoryAxis
          crossAxis={false}
          standalone={false}
          style={CHART_CONFIG.axisStyle}
          tickValues={tickValues}
          tickFormat={tickFormatter}
          orientation="bottom"
          offsetY={scaleSize(30)}
        />
        <VictoryAxis
          dependentAxis
          crossAxis={false}
          standalone={false}
          style={CHART_CONFIG.axisStyle}
          tickFormat={(tick: number) => formatTickNumber(tick)}
        />
      </VictoryChart>
    </>
  );
};

export default withMemo(BarChartTwoCol);
