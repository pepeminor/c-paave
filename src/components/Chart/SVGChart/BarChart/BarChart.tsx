import React, { PropsWithChildren, memo, useCallback, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { AccessorFunction, BarChart as BarChartOrigin } from 'react-native-svg-charts';
import globalStyles, { scaleSize } from 'styles';
import { ChartContentInset, SVGChartData } from '../type';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type IBarChartProps = {
  chartData: SVGChartData[];
  yMax: number;
  yMin: number;
  extraSpaceForYAxisFromYMax?: number;
  extraSpaceForYAxisFromYMin?: number;
  chartWidth: number;
  chartHeight: number;
  onDisableScroll?: (enabledScroll: boolean) => void;
  contentInset?: ChartContentInset;
  yAccessor?: AccessorFunction<unknown, number>;
  spacingInner?: number;
  spacingOuter?: number;
  animate?: boolean;
};

const DefaultChartContentInset = {
  top: scaleSize(20),
  bottom: scaleSize(20),
  left: scaleSize(50),
  right: scaleSize(15),
};

export const BarChart = memo(
  ({
    spacingInner = 0.5,
    spacingOuter = 1,
    extraSpaceForYAxisFromYMax = 0,
    extraSpaceForYAxisFromYMin = 0,
    contentInset = DefaultChartContentInset,
    ...props
  }: PropsWithChildren<IBarChartProps>) => {
    const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

    const columnWidth = useMemo(() => {
      if (props.chartData == null) {
        return 0;
      }
      const virtualColumn =
        props.chartData[0].data.length * (1 + spacingInner * 2) + // "* 2" is Padding left and right 0.5 width of each column
        2 * spacingOuter; // "+ 2" The first and last columns are padded with full width
      return (scaleSize(props.chartWidth) - contentInset.left - contentInset.right) / virtualColumn;
    }, [props.chartData, props.chartWidth, contentInset]);

    const dataLength = props.chartData[0].data.length;

    const updatePosition = useCallback(
      (x: number) => {
        if (dataLength == null) {
          return;
        }
        const x0 = contentInset.left + columnWidth * 2; //x0 position
        const innerChartWidth = scaleSize(props.chartWidth) - contentInset.right - x0;
        const xLastPoint = x0 + innerChartWidth; //x last point position
        const xDistance = innerChartWidth / dataLength; // The width of each coordinate point
        if (x <= x0) {
          x = x0;
        }
        if (x >= xLastPoint) {
          x = xLastPoint;
        }
        let value = Number(((x - x0) / xDistance).toFixed(0));
        if (value > dataLength - 1) {
          value = dataLength - 1; // Out of chart range, automatic correction
        }

        setPositionX(value);
      },
      [dataLength, props.chartWidth, contentInset, columnWidth]
    );
    const gesture = useMemo(
      () =>
        Gesture.Pan()
          .activeOffsetX(8)
          .onTouchesDown(e => {
            runOnJS(updatePosition)(e.allTouches[0]?.absoluteX);
          })
          .onTouchesMove(e => {
            runOnJS(updatePosition)(e.allTouches[0]?.absoluteX);
          })
          .onTouchesUp(() => {
            runOnJS(setPositionX)(-1);
          })
          .onTouchesCancelled(() => {
            runOnJS(setPositionX)(-1);
          }),
      [updatePosition]
    );

    const xAxisAndChartContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
      return {
        width: scaleSize(props.chartWidth),
        height: scaleSize(props.chartHeight),
      };
    }, [props.chartWidth, props.chartHeight]);

    return (
      <GestureDetector gesture={gesture}>
        <View style={xAxisAndChartContainerStyle}>
          <BarChartOrigin
            style={globalStyles.container}
            data={props.chartData}
            contentInset={contentInset}
            gridMax={props.yMax + extraSpaceForYAxisFromYMax}
            gridMin={props.yMin - extraSpaceForYAxisFromYMin}
            spacingInner={spacingInner}
            spacingOuter={spacingOuter}
            yAccessor={props.yAccessor}
            animate={props.animate}
          >
            {React.Children.map(props.children, child => {
              if (child && typeof child !== 'string' && typeof child !== 'number' && typeof child !== 'boolean') {
                return React.cloneElement(child as React.ReactElement, {
                  positionX,
                  contentInset,
                  yAccessor: props.yAccessor,
                  xPosOffset: columnWidth / 2,
                });
              }
              return null;
            })}
          </BarChartOrigin>
        </View>
      </GestureDetector>
    );
  }
);
