import React, { memo, useCallback, useMemo, useState } from 'react';
import { ColorValue, PanResponder, StyleProp, View, ViewStyle } from 'react-native';
import { Circle, FontWeight, G, Line, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { BarChart as BarChartOrigin } from 'react-native-svg-charts';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';

type IBarChartProps = {
  barData: number[];
  barLineUpColor: string;
  barLineDownColor: string;
  xLabelList: string[];
  yAxisFormatLabel: (value: number) => string;
  yMax: number;
  extraSpaceForYAxisFromyMax: number;
  yMin: number;
  extraSpaceForYAxisFromyMin: number;
  yAxisWidth: number;
  extraXAxisWidth: number;
  chartWidth: number;
  chartHeight: number;
  tooltipWidth: number;
  tooltipHeight: number;
  tooltipBorderRadius: number;
  barTooltipPointSize: number;
  barPointColor: ColorValue;
  tooltipBorderColor: ColorValue;
  tooltipBackgroundColor: ColorValue;
  tooltipPaddingLeft: number;
  toolTipDateDistanceFromTop: number;
  toolTipDistanceFromTop: number;
  barTooltipText: (passValue: number) => string;
  tooltipDateColor: ColorValue;
  tooltipDateOpacity: number;
  tooltipDateFontSize: number;
  tooltipDateFontWeight: FontWeight;
  tooltipDataOpacity: number;
  tooltipDataFontSize: number;
  tooltipDataFontWeight: FontWeight;
  tooltipDataColor: ColorValue;
  xAxisLabelFontSize: number;
  xAxisLabelColor: ColorValue;
  xAxisLabelDistance: number;
  yAxisLabelFontSize: number;
  yAxisLabelPaddingLeft: number;
  yAxisLabelColor: ColorValue;
  xAxisLabelContainerHeight: number;
  numberOfTicksYAxis: number;
  numberOfTicksXAxis: number;
  onDisableScroll?: (enabledScroll: boolean) => void;
  extraSpaceForYAxis: number;
  extraSpaceForInnerChartRight: number;
  showXAxis: boolean;
  dateLabelList?: string[];
};

const BarChart = (props: IBarChartProps) => {
  const { styles } = useStyles();

  const BarChart_ContentInset = useMemo(() => {
    return {
      top: scaleSize(20),
      bottom: scaleSize(20),
      left: scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth),
      right: scaleSize(props.extraSpaceForInnerChartRight),
    };
  }, [props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight, props.yAxisWidth]);

  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

  const updatePosition = useCallback(
    (x: number) => {
      if (props.barData == null) {
        return;
      }
      const x0 = scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth); // x0 position
      const innerChartWidth = scaleSize(props.chartWidth) - scaleSize(props.extraSpaceForInnerChartRight) - x0;
      const xLastPoint = x0 + innerChartWidth; //x last point position
      const xDistance = innerChartWidth / props.barData.length; // The width of each coordinate point
      if (x <= x0) {
        x = x0;
      }
      if (x >= xLastPoint) {
        x = xLastPoint;
      }
      // The selected coordinate x :
      // (x - x0)/ xDistance = value
      let value = Number(((x - x0) / xDistance).toFixed(0));
      if (value > props.barData.length - 1) {
        value = props.barData.length - 1; // Out of chart range, automatic correction
      }

      setPositionX(value);
    },
    [props.yAxisWidth, props.barData, props.chartWidth, props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (_evt, _gestureState) => true,
        onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
        onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
        onPanResponderTerminationRequest: (_evt, _gestureState) => true,

        onPanResponderGrant: (evt, _gestureState) => {
          updatePosition(evt.nativeEvent.locationX);
          props?.onDisableScroll?.(false);
          return true;
        },
        onPanResponderMove: (evt, _gestureState) => {
          updatePosition(evt.nativeEvent.locationX);
          return true;
        },
        onPanResponderRelease: () => {
          props?.onDisableScroll?.(true);
          setPositionX(-1);
        },
        onPanResponderTerminate: () => {
          props?.onDisableScroll?.(true);
          setPositionX(-1);
        },
      }),
    [updatePosition]
  );

  const Gradient = useCallback(
    ({ index }: any) => (
      <Defs key={`Gradient-${index}`}>
        <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'#000000'} stopOpacity={1} />
          <Stop
            offset={`${(scaleSize(props.extraSpaceForYAxis) * 100) / scaleSize(props.chartWidth)}%`}
            stopColor={'#000000'}
            stopOpacity={1}
          />
          <Stop
            offset={`${(scaleSize(props.extraSpaceForYAxis) * 100) / scaleSize(props.chartWidth)}%`}
            stopColor={'#EEF3F6'}
            stopOpacity={1}
          />
          <Stop offset={'100%'} stopColor={'#EEF3F6'} stopOpacity={1} />
        </LinearGradient>
      </Defs>
    ),
    [props.chartWidth, props.extraSpaceForYAxis]
  );

  const Gradient2 = useCallback(
    ({ index }: any) => (
      <Defs key={`Gradient2-${index}`}>
        <LinearGradient id={'gradient2'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'#EEF3F6'} stopOpacity={1} />
          <Stop
            offset={`${
              (scaleSize(props.chartHeight - props.extraSpaceForYAxis) * 100) / scaleSize(props.chartHeight)
            }%`}
            stopColor={'#EEF3F6'}
            stopOpacity={1}
          />
          <Stop
            offset={`${
              (scaleSize(props.chartHeight - props.extraSpaceForYAxis) * 100) / scaleSize(props.chartHeight)
            }%`}
            stopColor={'#000000'}
            stopOpacity={1}
          />
          <Stop offset={'100%'} stopColor={'#000000'} stopOpacity={1} />
        </LinearGradient>
      </Defs>
    ),
    [props.chartHeight, props.extraSpaceForYAxis]
  );

  const CustomGrid = useCallback(
    ({ x, y, ticks }: any) => {
      const xPosOffset = x(1) == undefined ? (x(0) - BarChart_ContentInset.left) / 4 : (x(1) - x(0)) / 4;
      return (
        <G>
          <Line
            x1={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
            x2="100%"
            y1={y(props.yMin - props.extraSpaceForYAxisFromyMin)}
            y2={y(props.yMin - props.extraSpaceForYAxisFromyMin)}
            stroke="#000000"
            strokeWidth={1.5}
          />
          {
            // Horizontal grid
            ticks.map((tick: any, index: number) => {
              // case a grid same line position with xAxis
              return (
                index % 2 === 0 &&
                (index !== 0 || tick !== props.yMin - props.extraSpaceForYAxisFromyMin ? (
                  <G key={`${tick}G`}>
                    <Line
                      key={tick}
                      x1={`${(scaleSize(props.yAxisWidth) * 100) / scaleSize(props.chartWidth)}%`}
                      x2="100%"
                      y1={y(tick)}
                      y2={y(tick)}
                      stroke="url(#gradient)"
                    />
                    <SvgText
                      x={scaleSize(props.yAxisLabelPaddingLeft)}
                      y={y(tick) + props.yAxisLabelFontSize / 2 - 2}
                      fontSize={props.yAxisLabelFontSize}
                      fill={props.yAxisLabelColor}
                    >
                      {props.yAxisFormatLabel(tick)}
                    </SvgText>
                  </G>
                ) : (
                  <Line
                    key={tick}
                    x1={`${(scaleSize(props.yAxisWidth) * 100) / scaleSize(props.chartWidth)}%`}
                    x2={`${
                      ((scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)) * 100) /
                      scaleSize(props.chartWidth)
                    }%`}
                    y1={y(tick)}
                    y2={y(tick)}
                    stroke="#000000"
                  />
                ))
              );
            })
          }
          {
            // Vertical grid
            props.showXAxis === true &&
              props.barData.map((_, index) => {
                return (
                  (Math.floor(props.barData.length / props.numberOfTicksXAxis) === 0 ||
                    index % Math.floor(props.barData.length / props.numberOfTicksXAxis) === 0) && (
                    <G key={`${index}VerticalG`}>
                      <Line
                        y1="0%"
                        y2={y(props.yMin - props.extraSpaceForYAxisFromyMin) + scaleSize(props.extraSpaceForYAxis)}
                        x1={x(index) + xPosOffset}
                        x2={x(index) + xPosOffset}
                        stroke="url(#gradient2)"
                      />
                      <SvgText
                        x={x(index) + xPosOffset}
                        y={'100%'}
                        fontSize={props.yAxisLabelFontSize}
                        fill={props.yAxisLabelColor}
                        textAnchor={'middle'}
                      >
                        {props.xLabelList[index]}
                      </SvgText>
                    </G>
                  )
                );
              })
          }
          <Line
            y1="0%"
            y2={y(props.yMin - props.extraSpaceForYAxisFromyMin)}
            x1={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
            x2={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
            stroke="#000000"
            strokeWidth={1.5}
          />
        </G>
      );
    },
    [
      props.yMin,
      Gradient,
      Gradient2,
      props.extraSpaceForYAxisFromyMin,
      props.yAxisWidth,
      props.yAxisLabelPaddingLeft,
      props.yAxisLabelFontSize,
      props.yAxisLabelColor,
      props.yAxisFormatLabel,
      props.barData,
      props.numberOfTicksXAxis,
      props.xLabelList,
      props.extraSpaceForYAxis,
      props.showXAxis,
    ]
  );

  const ToolTip = useCallback(
    ({ x }: any) => {
      if (positionX < 0) {
        return null;
      }

      return (
        <G x={x(0)} key="tooltip">
          <G
            x={
              props.barData.length > 10
                ? positionX > props.barData.length / 2
                  ? x(0) - scaleSize(props.yAxisWidth)
                  : x(Math.ceil(props.barData.length / 2)) - scaleSize(props.yAxisWidth)
                : x(0) - scaleSize(props.yAxisWidth)
            }
            y={scaleSize(props.tooltipHeight) / 2 + 2} // + 2 pixel để khỏi bị che
          >
            <Rect
              y={-scaleSize(props.tooltipHeight) / 2}
              rx={scaleSize(props.tooltipBorderRadius)}
              ry={scaleSize(props.tooltipBorderRadius)}
              width={scaleSize(props.tooltipWidth)}
              height={scaleSize(props.tooltipHeight)}
              stroke={props.tooltipBorderColor}
              fill={props.tooltipBackgroundColor}
            />

            <SvgText
              x={props.tooltipPaddingLeft}
              y={props.toolTipDateDistanceFromTop}
              fill={props.tooltipDateColor}
              opacity={props.tooltipDateOpacity}
              fontSize={props.tooltipDateFontSize}
              fontWeight={props.tooltipDateFontWeight}
            >
              {props.dateLabelList != null ? props.dateLabelList[positionX] : props.xLabelList[positionX]}
            </SvgText>

            <SvgText
              x={props.tooltipPaddingLeft}
              y={props.toolTipDistanceFromTop}
              fontSize={props.tooltipDataFontSize}
              fontWeight={props.tooltipDataFontWeight}
              fill={props.tooltipDataColor}
              opacity={props.tooltipDataOpacity}
            >
              {props.barTooltipText(props.barData[positionX])}
            </SvgText>
          </G>
        </G>
      );
    },
    [
      positionX,
      props.barData,
      props.tooltipHeight,
      props.tooltipWidth,
      props.tooltipBorderRadius,
      props.tooltipBorderColor,
      props.tooltipBackgroundColor,
      props.tooltipPaddingLeft,
      props.toolTipDateDistanceFromTop,
      props.tooltipDateColor,
      props.tooltipDateOpacity,
      props.tooltipDateFontSize,
      props.xLabelList,
      props.toolTipDistanceFromTop,
      props.tooltipDataFontSize,
      props.tooltipDataFontWeight,
      props.tooltipDataColor,
      props.tooltipDataOpacity,
      props.barTooltipText,
      props.tooltipDateFontWeight,
      props.dateLabelList,
    ]
  );

  const PointWhenTouch = useCallback(
    ({ x, y }: any) => {
      if (positionX < 0) {
        return null;
      }
      const xPosOffset = x(1) == undefined ? (x(0) - BarChart_ContentInset.left) / 4 : (x(1) - x(0)) / 4;
      return (
        <G x={x(positionX) + xPosOffset} key="pointWhenTouch">
          <Circle
            cy={y(props.barData[positionX])}
            r={props.barTooltipPointSize}
            stroke="#fff"
            strokeWidth={1}
            fill={props.barPointColor}
          />
        </G>
      );
    },
    [positionX, props.barData, props.barTooltipPointSize, props.barPointColor]
  );

  const xAxisAndChartContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      flexDirection: 'row',
      width: scaleSize(props.chartWidth),
      height: scaleSize(props.chartHeight),
      alignSelf: 'stretch',
    };
  }, [props.chartWidth, props.chartHeight]);

  const chartData = useMemo(() => {
    return props.barData.map(value => {
      if (value < 0) {
        return {
          value,
          svg: {
            fill: props.barLineDownColor,
          },
        };
      } else {
        return {
          value,
          svg: {
            fill: props.barLineUpColor,
          },
        };
      }
    });
  }, [props.barData]);

  return (
    <View style={styles.container}>
      <View style={xAxisAndChartContainerStyle}>
        <View style={globalStyles.container} {...panResponder.panHandlers}>
          <BarChartOrigin
            style={globalStyles.container}
            data={chartData}
            contentInset={BarChart_ContentInset}
            gridMax={props.yMax + props.extraSpaceForYAxisFromyMax}
            gridMin={props.yMin - props.extraSpaceForYAxisFromyMin}
            spacingInner={0.5}
            spacingOuter={1}
            yAccessor={BarChart2_yAncestor}
          >
            <CustomGrid belowChart={true} />
            <PointWhenTouch />
            <ToolTip />
            <Gradient />
            <Gradient2 />
          </BarChartOrigin>
        </View>
      </View>
    </View>
  );
};

export default memo(BarChart);

const BarChart2_yAncestor = ({ item }: any) => item.value;
