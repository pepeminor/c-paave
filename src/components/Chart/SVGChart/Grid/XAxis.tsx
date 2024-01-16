import React from 'react';
import { ColorValue } from 'react-native';
import { G, Line, Text as SvgText } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';
import { VerticalAxis } from './VerticalAxis';

type CustomGridProps = {
  xLabelList: string[];
  labelFontSize: number;
  labelColor: ColorValue;
  numberOfTicksXAxis: number;
  xTickLength?: number;
  yTickLength?: number;
  belowChart: boolean; // SVG Chart props: Show Grid below chart
};

export const XAxis = React.memo(
  withChartChildrenProps<CustomGridProps>(
    ({ x, y, ticks, data, height, contentInset, xPosOffset = 0, yTickLength = 2, ...props }) => {
      const chartData = data[0]?.data;
      if (x == null || y == null || ticks == null || chartData?.length === 0) return null;
      return (
        <G>
          {
            // Vertical grid
            chartData.map((_, index) => {
              return (
                (chartData.length <= props.numberOfTicksXAxis ||
                  index % Math.floor(chartData.length / props.numberOfTicksXAxis) === 0) && (
                  <G key={`${index}VerticalG`}>
                    <Line
                      y1="0%"
                      y2={`${(1 - contentInset.bottom / height) * 100 + yTickLength / 2}%`}
                      x1={x(index) + xPosOffset}
                      x2={x(index) + xPosOffset}
                      stroke="url(#gradient2)"
                    />
                    <SvgText
                      x={x(index) + xPosOffset}
                      y={'100%'}
                      fontSize={props.labelFontSize}
                      fill={props.labelColor}
                      textAnchor={'middle'}
                    >
                      {props.xLabelList[index]}
                    </SvgText>
                  </G>
                )
              );
            })
          }
          {/* X-Axis */}
          <Line
            x1={contentInset.left}
            x2="100%"
            y1={`${((height - contentInset.bottom) / height) * 100}%`}
            y2={`${((height - contentInset.bottom) / height) * 100}%`}
            stroke="#000000"
            strokeWidth={1.5}
          />
          <VerticalAxis tickLength={yTickLength} gridColor="white" />
        </G>
      );
    }
  )
);
