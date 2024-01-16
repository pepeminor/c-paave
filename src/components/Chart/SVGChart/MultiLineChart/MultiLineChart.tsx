import React, { PropsWithChildren, memo, useCallback, useMemo, useState } from 'react';
import { PanResponder, StyleProp, View, ViewStyle } from 'react-native';
import lodash from 'lodash';
import { LineChart } from 'react-native-svg-charts';
import globalStyles, { scaleSize } from 'styles';
import { ChartContentInset, SVGChartData } from '../type';

type IMultiLineChartProps = {
  lineData: SVGChartData<number>[];
  yMax: number;
  yMin: number;
  extraSpaceForYAxisFromYMax: number;
  extraSpaceForYAxisFromYMin: number;
  chartWidth: number;
  chartHeight: number;
  onDisableScroll?: (enabledScroll: boolean) => void;
  contentInset?: ChartContentInset;
  xPosOffset?: number;
};

const DefaultChartContentInset = {
  top: scaleSize(20),
  bottom: scaleSize(20),
  left: scaleSize(43),
  right: scaleSize(20),
};

export const MultiLineChart = memo((props: PropsWithChildren<IMultiLineChartProps>) => {
  const { contentInset = DefaultChartContentInset } = props;

  const extraSpaceForYAxisFromYMin = useMemo(() => {
    if (props.extraSpaceForYAxisFromYMin != null) {
      return props.extraSpaceForYAxisFromYMin;
    }
    if (props.yMax !== props.yMin) {
      return Math.ceil((props.yMax - props.yMin) * 0.1);
    }
    if (lodash.inRange(Math.abs(props.yMax), 1000, 1000000)) {
      return 1000;
    } else if (lodash.inRange(Math.abs(props.yMax), 1000000, 1000000000)) {
      return 1000000;
    } else if (props.yMax >= 1000000000) {
      return 1000000000;
    } else {
      return 1;
    }
  }, [props.yMax, props.yMin, props.extraSpaceForYAxisFromYMin]);

  const extraSpaceForYAxisFromYMax = useMemo(() => {
    if (props.extraSpaceForYAxisFromYMax != null) {
      return props.extraSpaceForYAxisFromYMax;
    }
    if (props.yMax !== props.yMin) {
      return Math.ceil((props.yMax - props.yMin) * 0.05);
    }
    if (lodash.inRange(Math.abs(props.yMax), 1000, 1000000)) {
      return 1000;
    } else if (lodash.inRange(Math.abs(props.yMax), 1000000, 1000000000)) {
      return 1000000;
    } else if (props.yMax >= 1000000000) {
      return 1000000000;
    } else {
      return 1;
    }
  }, [props.yMax, props.yMin, props.extraSpaceForYAxisFromYMax]);

  const dataLength = props.lineData[0]?.data?.length;

  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

  const updatePosition = useCallback(
    (x: number) => {
      // just use line 1 data because position depend on x, then amount and position of x of all the line is the same
      if (dataLength == null && dataLength === 0) {
        return;
      }
      const x0 = contentInset.left; // x0 position
      const xLastPoint = scaleSize(props.chartWidth) - contentInset.right; // x last point position
      const innerChartWidth = xLastPoint - x0;
      const xDistance = innerChartWidth / dataLength; // The width of each coordinate point
      if (x <= x0) {
        x = x0;
      }
      if (x >= xLastPoint) {
        x = xLastPoint;
      }

      // The selected coordinate x :
      // (x - x0)/ xDistance = value
      let value = Number(((x - x0) / xDistance).toFixed(0));
      if (value > dataLength - 1) {
        value = dataLength - 1; // Out of chart range, automatic correction
      }

      setPositionX(value);
    },
    [dataLength, props.chartWidth, contentInset]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => true,

        onPanResponderGrant: evt => {
          updatePosition(evt.nativeEvent.locationX);
          props.onDisableScroll?.(false);
          return true;
        },
        onPanResponderMove: evt => {
          updatePosition(evt.nativeEvent.locationX);
          return true;
        },
        onPanResponderRelease: () => {
          props.onDisableScroll?.(true);
          setPositionX(-1);
        },
        onPanResponderTerminate: () => {
          props.onDisableScroll?.(true);
          setPositionX(-1);
        },
      }),
    [updatePosition] // just use line 1 data because position depend on x, then amount and position of x of all the line is the same
  );

  const xAxisAndChartContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      width: scaleSize(props.chartWidth),
      height: scaleSize(props.chartHeight),
      paddingLeft: props.xPosOffset ?? 0,
      paddingRight: props.xPosOffset ?? 0,
    };
  }, [props.chartWidth, props.chartHeight, props.xPosOffset]);

  return (
    <View style={xAxisAndChartContainerStyle} {...panResponder.panHandlers}>
      <LineChart
        style={globalStyles.container}
        data={props.lineData}
        contentInset={contentInset}
        gridMax={props.yMax + extraSpaceForYAxisFromYMax}
        gridMin={props.yMin - extraSpaceForYAxisFromYMin}
      >
        {React.Children.map(props.children, child => {
          if (child && typeof child !== 'string' && typeof child !== 'number' && typeof child !== 'boolean') {
            return React.cloneElement(child as React.ReactElement, {
              positionX,
              contentInset,
            });
          }
          return null;
        })}
      </LineChart>
    </View>
  );
});
