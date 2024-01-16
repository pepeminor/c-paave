import React from 'react';
import { ColorValue } from 'react-native';
import { G, Line, Text as SvgText } from 'react-native-svg';
import { scaleSize } from 'styles';
import { withChartChildrenProps } from '../withChartChildrenProps';
import { HorizontalAxis } from './HorizontalAxis';
import { VerticalAxis } from './VerticalAxis';
import { useColors } from 'hooks';

type CustomGridProps = {
  xLabelList: string[];
  yAxisLabelPaddingLeft: number;
  labelFontSize: number;
  labelColor: ColorValue;
  numberOfTicksXAxis: number;
  yAxisFormatLabel?: (value: number) => string;
  xTickLength?: number;
  yTickLength?: number;
  yLabel?: string;
  horizontalLine?: number;
  belowChart: boolean; // SVG Chart props: Show Grid below chart
};

export const CustomGrid = React.memo(
  withChartChildrenProps<CustomGridProps>(
    ({
      x,
      y,
      ticks,
      data,
      width,
      height,
      contentInset,
      xPosOffset = 0,
      xTickLength = 1,
      yTickLength = 2,
      yAxisFormatLabel = (value: number) => value.toString(),
      yLabel,
      horizontalLine,
      ...props
    }) => {
      const colors = useColors();
      const chartData = data[0]?.data;
      if (x == null || y == null || ticks == null || chartData?.length === 0) return null;
      return (
        <G>
          {
            // Horizontal grid
            ticks.map((tick, index) => {
              return (
                index % 2 === 0 && (
                  <G key={`${tick}HorizontalG`}>
                    <Line
                      x1={`${(contentInset.left * 100) / width - xTickLength}%`}
                      x2="100%"
                      y1={y(tick)}
                      y2={y(tick)}
                      stroke="url(#gradient)"
                    />
                    <SvgText
                      x={scaleSize(props.yAxisLabelPaddingLeft)}
                      y={y(tick) + props.labelFontSize / 2 - 2}
                      fontSize={props.labelFontSize}
                      fill={props.labelColor}
                    >
                      {yAxisFormatLabel(tick)}
                    </SvgText>
                  </G>
                )
              );
            })
          }
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
          <HorizontalAxis tickLength={xTickLength} />
          {/* Y-Axis */}
          <Line
            y1="0%"
            y2={`${((height - contentInset.bottom) / height) * 100}%`}
            x1={contentInset.left}
            x2={contentInset.left}
            stroke="#000000"
            strokeWidth={1.5}
          />
          <VerticalAxis tickLength={yTickLength} />
          {ticks.length > 0 && yLabel && (
            <SvgText
              x={scaleSize(props.yAxisLabelPaddingLeft)}
              y={props.labelFontSize + 2}
              fontSize={props.labelFontSize + 2}
              fill={props.labelColor}
            >
              {yLabel}
            </SvgText>
          )}
          {horizontalLine && (
            <Line
              x1={contentInset.left}
              x2="100%"
              y1={y(horizontalLine)}
              y2={y(horizontalLine)}
              stroke={colors.LIGHTRed}
              strokeWidth={1.5}
              strokeDasharray={3}
            />
          )}
        </G>
      );
    }
  )
);
