import React, { memo, useCallback, useMemo, useState } from 'react';
import { ColorValue, PanResponder, StyleProp, View, ViewStyle } from 'react-native';
import lodash from 'lodash';
import { Circle, FontWeight, G, Line, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart } from 'react-native-svg-charts';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';

// amount of element of line data 1 2 3 4 and xLabelList have to be the same to use this component

type IMultiLineChartProps = {
  line1Data: number[];
  line2Data: number[];
  line3Data?: number[];
  line4Data?: number[];
  line1Color: string;
  line2Color: string;
  line3Color?: string;
  line4Color?: string;
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
  line1TooltipPointSize: number;
  line2TooltipPointSize: number;
  line3TooltipPointSize?: number;
  line4TooltipPointSize?: number;
  line1PointColor: ColorValue;
  line2PointColor: ColorValue;
  line3PointColor?: ColorValue;
  line4PointColor?: ColorValue;
  tooltipBorderColor: ColorValue;
  tooltipBackgroundColor: ColorValue;
  tooltipPaddingLeft: number;
  toolTipDateDistanceFromTop: number;
  toolTip1DistanceFromTop: number;
  toolTip2DistanceFromTop: number;
  toolTip3DistanceFromTop?: number;
  toolTip4DistanceFromTop?: number;
  line1TooltipText: (passValue: string) => string;
  line2TooltipText: (passValue: string) => string;
  line3TooltipText?: (passValue: string) => string;
  line4TooltipText?: (passValue: string) => string;
  tooltipDateColor: ColorValue;
  tooltipDateOpacity: number;
  tooltipDateFontSize: number;
  tooltipDateFontWeight: FontWeight;
  tooltipData1Opacity: number;
  tooltipData1FontSize: number;
  tooltipData1FontWeight: FontWeight;
  tooltipData1Color: ColorValue;
  tooltipData2Opacity: number;
  tooltipData2FontSize: number;
  tooltipData2FontWeight: FontWeight;
  tooltipData2Color: ColorValue;
  tooltipData3Opacity?: number;
  tooltipData3FontSize?: number;
  tooltipData3FontWeight?: FontWeight;
  tooltipData3Color?: ColorValue;
  tooltipData4Opacity?: number;
  tooltipData4FontSize?: number;
  tooltipData4FontWeight?: FontWeight;
  tooltipData4Color?: ColorValue;
  xAxisLabelFontSize: number;
  xAxisLabelColor: ColorValue;
  xAxisLabelDistance: number;
  yAxisLabelFontSize: number;
  yAxisLabelPaddingLeft: number;
  yAxisLabelColor: ColorValue;
  xAxisLabelContainerHeight: number;
  numberOfTicksYAxis: number;
  numberOfTicksXAxis: number;
  onDisableScroll: (enabledScroll: boolean) => void;
  extraSpaceForYAxis: number;
  extraSpaceForInnerChartRight: number;
  showXAxis: boolean;
  dateLabelList?: string[];
};

// const MultiLineChart_verticalContentInset = { top: scaleSize(20), bottom: scaleSize(20) };

const MultiLineChart = (props: IMultiLineChartProps) => {
  const { styles } = useStyles();

  const extraSpaceForYAxisFromyMin = useMemo(() => {
    if (props.extraSpaceForYAxisFromyMin != null) {
      return props.extraSpaceForYAxisFromyMin;
    } else {
      if (props.yMax === props.yMin) {
        if (lodash.inRange(Math.abs(props.yMax), 1000, 1000000)) {
          return 1000;
        } else if (lodash.inRange(Math.abs(props.yMax), 1000000, 1000000000)) {
          return 1000000;
        } else if (props.yMax >= 1000000000) {
          return 1000000000;
        } else {
          return 1;
        }
      } else {
        return Math.ceil((props.yMax - props.yMin) * 0.1);
      }
    }
  }, [props.yMax, props.yMin, props.extraSpaceForYAxisFromyMin]);

  const extraSpaceForYAxisFromyMax = useMemo(() => {
    if (props.extraSpaceForYAxisFromyMax != null) {
      return props.extraSpaceForYAxisFromyMax;
    } else {
      if (props.yMax === props.yMin) {
        if (lodash.inRange(Math.abs(props.yMax), 1000, 1000000)) {
          return 1000;
        } else if (lodash.inRange(Math.abs(props.yMax), 1000000, 1000000000)) {
          return 1000000;
        } else if (props.yMax >= 1000000000) {
          return 1000000000;
        } else {
          return 1;
        }
      } else {
        return Math.ceil((props.yMax - props.yMin) * 0.05);
      }
    }
  }, [props.yMax, props.yMin, props.extraSpaceForYAxisFromyMax]);

  const MultiLineChart_ContentInset = useMemo(() => {
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
      // just use line 1 data because posotion depend on x, then amount and position of x of all the line is the same
      if (props.line1Data == null) {
        return;
      }
      const x0 = scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth); // x0 position
      const innerChartWidth = scaleSize(props.chartWidth) - scaleSize(props.extraSpaceForInnerChartRight) - x0;
      const xLastPoint = x0 + innerChartWidth; //x last point position
      const xDistance = innerChartWidth / props.line1Data.length; // The width of each coordinate point
      if (x <= x0) {
        x = x0;
      }
      if (x >= xLastPoint) {
        x = xLastPoint;
      }

      // console.log((x - x0) )

      // The selected coordinate x :
      // (x - x0)/ xDistance = value
      let value = Number(((x - x0) / xDistance).toFixed(0));
      if (value > props.line1Data.length - 1) {
        value = props.line1Data.length - 1; // Out of chart range, automatic correction
      }

      setPositionX(value);
    },
    [props.yAxisWidth, props.line1Data, props.chartWidth, props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight]
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
          props.onDisableScroll(false);
          return true;
        },
        onPanResponderMove: (evt, _gestureState) => {
          updatePosition(evt.nativeEvent.locationX);
          return true;
        },
        onPanResponderRelease: () => {
          props.onDisableScroll(true);
          setPositionX(-1);
        },
        onPanResponderTerminate: () => {
          props.onDisableScroll(true);
          setPositionX(-1);
        },
      }),
    [updatePosition] // just use line 1 data because posotion depend on x, then amount and position of x of all the line is the same
  );

  const Gradient = useCallback(
    ({ index }: any) => (
      <Defs key={index}>
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
      <Defs key={index}>
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
    ({ x, y, ticks }: any) => (
      <G>
        <Line
          x1={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
          x2="100%"
          y1={y(props.yMin - extraSpaceForYAxisFromyMin)}
          y2={y(props.yMin - extraSpaceForYAxisFromyMin)}
          stroke="#000000"
          strokeWidth={1.5}
        />
        {
          // Horizontal grid
          ticks.map((tick: any, index: number) => {
            // case a grid same line position with xAxis
            return (
              index % 2 === 0 &&
              (index !== 0 || tick !== props.yMin - extraSpaceForYAxisFromyMin ? (
                <G key={`${tick}G`}>
                  <Line
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
                <G key={`${tick}G`}>
                  <Line
                    x1={`${(scaleSize(props.yAxisWidth) * 100) / scaleSize(props.chartWidth)}%`}
                    x2={`${
                      ((scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)) * 100) /
                      scaleSize(props.chartWidth)
                    }%`}
                    y1={y(tick)}
                    y2={y(tick)}
                    stroke="#000000"
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
              ))
            );
          })
        }
        {
          // Vertical grid
          props.showXAxis === true &&
            props.line1Data.map((_, index) => {
              return (
                (props.line1Data.length <= props.numberOfTicksXAxis ||
                  index % Math.floor(props.line1Data.length / props.numberOfTicksXAxis) === 0) && (
                  <G key={`${index}VerticalG`}>
                    {index !== 0 ? (
                      <Line
                        y1="0%"
                        y2={y(props.yMin - extraSpaceForYAxisFromyMin) + scaleSize(props.extraSpaceForYAxis)}
                        x1={x(index)}
                        x2={x(index)}
                        stroke="url(#gradient2)"
                      />
                    ) : (
                      <Line
                        y1={y(props.yMin - extraSpaceForYAxisFromyMin)}
                        y2={y(props.yMin - extraSpaceForYAxisFromyMin) + scaleSize(props.extraSpaceForYAxis)}
                        x1={x(index)}
                        x2={x(index)}
                        stroke="#000000"
                      />
                    )}
                    <SvgText
                      x={x(index)}
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
          y2={y(props.yMin - extraSpaceForYAxisFromyMin)}
          x1={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
          x2={scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth)}
          stroke="#000000"
          strokeWidth={1.5}
        />
      </G>
    ),
    [
      props.yMin,
      Gradient,
      Gradient2,
      extraSpaceForYAxisFromyMin,
      props.yAxisWidth,
      props.yAxisLabelPaddingLeft,
      props.yAxisLabelFontSize,
      props.yAxisLabelColor,
      props.yAxisFormatLabel,
      props.line1Data,
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
              props.line1Data.length > 10
                ? positionX > props.line1Data.length / 2
                  ? x(0) - scaleSize(props.yAxisWidth)
                  : x(Math.ceil(props.line1Data.length / 2)) - scaleSize(props.yAxisWidth)
                : x(0) - scaleSize(props.yAxisWidth)
            }
            // y={y(props.line1Data[positionX]) - scaleSize(10)}
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
              y={props.toolTip1DistanceFromTop}
              fontSize={props.tooltipData1FontSize}
              fontWeight={props.tooltipData1FontWeight}
              fill={props.tooltipData1Color}
              opacity={props.tooltipData1Opacity}
            >
              {props.line1TooltipText(props.line1Data[positionX].toFixed(2))}
            </SvgText>

            <SvgText
              x={props.tooltipPaddingLeft}
              y={props.toolTip2DistanceFromTop}
              fontSize={props.tooltipData2FontSize}
              fontWeight={props.tooltipData2FontWeight}
              fill={props.tooltipData2Color}
              opacity={props.tooltipData2Opacity}
            >
              {props.line2TooltipText(props.line2Data[positionX].toFixed(2))}
            </SvgText>

            {props.line3TooltipText != null &&
              props.line3Data != null &&
              props.tooltipData3FontSize != null &&
              props.tooltipData3FontWeight != null &&
              props.tooltipData3Color != null &&
              props.toolTip3DistanceFromTop != null && (
                <SvgText
                  x={props.tooltipPaddingLeft}
                  y={props.toolTip3DistanceFromTop}
                  fontSize={props.tooltipData3FontSize}
                  fontWeight={props.tooltipData3FontWeight}
                  fill={props.tooltipData3Color}
                  opacity={props.tooltipData3Opacity}
                >
                  {props.line3TooltipText(props.line3Data[positionX].toFixed(2))}
                </SvgText>
              )}

            {props.line4TooltipText != null &&
              props.line4Data != null &&
              props.tooltipData4FontSize != null &&
              props.tooltipData4FontWeight != null &&
              props.tooltipData4Color != null &&
              props.toolTip4DistanceFromTop != null && (
                <SvgText
                  x={props.tooltipPaddingLeft}
                  y={props.toolTip4DistanceFromTop}
                  fontSize={props.tooltipData4FontSize}
                  fontWeight={props.tooltipData4FontWeight}
                  fill={props.tooltipData4Color}
                  opacity={props.tooltipData4Opacity}
                >
                  {props.line4TooltipText(props.line4Data[positionX].toFixed(2))}
                </SvgText>
              )}
          </G>
        </G>
      );
    },
    [
      positionX,
      props.line1Data,
      props.line2Data,
      props.line3Data,
      props.line4Data,
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
      props.toolTip1DistanceFromTop,
      props.tooltipData1FontSize,
      props.tooltipData1FontWeight,
      props.tooltipData1Color,
      props.tooltipData1Opacity,
      props.toolTip2DistanceFromTop,
      props.tooltipData2FontSize,
      props.tooltipData2FontWeight,
      props.tooltipData2Color,
      props.tooltipData2Opacity,
      props.toolTip3DistanceFromTop,
      props.tooltipData3FontSize,
      props.tooltipData3FontWeight,
      props.tooltipData3Color,
      props.tooltipData3Opacity,
      props.toolTip4DistanceFromTop,
      props.tooltipData4FontSize,
      props.tooltipData4FontWeight,
      props.tooltipData4Color,
      props.tooltipData4Opacity,
      props.line1TooltipText,
      props.line2TooltipText,
      props.line3TooltipText,
      props.line4TooltipText,
      props.tooltipDateFontWeight,
      props.dateLabelList,
    ]
  );

  const PointWhenTouch = useCallback(
    ({
      x,
      // ticks
      y,
    }: any) => {
      if (positionX < 0) {
        return null;
      }
      return (
        <G x={x(positionX)} key="pointWhenTouch">
          {/* <G
            x={positionX > props.line1Data.length / 2 ? -scaleSize(props.tooltipWidth + 10) : scaleSize(10)}
            y={y(props.line1Data[positionX]) - scaleSize(10)}
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
            >
              {props.xLabelList[positionX]}
            </SvgText>

            <SvgText
              x={props.tooltipPaddingLeft}
              y={props.toolTip1DistanceFromTop}
              fontSize={props.tooltipData1FontSize}
              fontWeight={props.tooltipData1FontWeight}
              fill={props.tooltipData1Color}
              opacity={props.tooltipData1Opacity}
            >
              {props.line1TooltipText(props.line1Data[positionX].toFixed(2))}
            </SvgText>

            <SvgText
              x={props.tooltipPaddingLeft}
              y={props.toolTip2DistanceFromTop}
              fontSize={props.tooltipData2FontSize}
              fontWeight={props.tooltipData2FontWeight}
              fill={props.tooltipData2Color}
              opacity={props.tooltipData1Opacity}
            >
              {props.line2TooltipText(props.line2Data[positionX].toFixed(2))}
            </SvgText>

            {props.line3TooltipText != null &&
              props.line3Data != null &&
              props.tooltipData3FontSize != null &&
              props.tooltipData3FontWeight != null &&
              props.tooltipData3Color != null &&
              props.toolTip3DistanceFromTop != null && (
                <SvgText
                  x={props.tooltipPaddingLeft}
                  y={props.toolTip3DistanceFromTop}
                  fontSize={props.tooltipData3FontSize}
                  fontWeight={props.tooltipData3FontWeight}
                  fill={props.tooltipData3Color}
                  opacity={props.tooltipData1Opacity}
                >
                  {props.line3TooltipText(props.line3Data[positionX].toFixed(2))}
                </SvgText>
              )}

            {props.line4TooltipText != null &&
              props.line4Data != null &&
              props.tooltipData4FontSize != null &&
              props.tooltipData4FontWeight != null &&
              props.tooltipData4Color != null &&
              props.toolTip4DistanceFromTop != null && (
                <SvgText
                  x={props.tooltipPaddingLeft}
                  y={props.toolTip4DistanceFromTop}
                  fontSize={props.tooltipData4FontSize}
                  fontWeight={props.tooltipData4FontWeight}
                  fill={props.tooltipData4Color}
                  opacity={props.tooltipData1Opacity}
                >
                  {props.line4TooltipText(props.line4Data[positionX].toFixed(2))}
                </SvgText>
              )}
          </G> */}

          <G x={x}>
            {/* <Line
            y1={ticks[0]}
            y2={ticks[Number(ticks.length)]}
            stroke="#FEBE18"
            strokeWidth={apx(4)}
            strokeDasharray={[6, 3]}
          /> */}

            <Circle
              cy={y(props.line1Data[positionX])}
              r={props.line1TooltipPointSize}
              stroke="#fff"
              strokeWidth={1}
              fill={props.line1PointColor}
            />

            <Circle
              cy={y(props.line2Data[positionX])}
              r={props.line2TooltipPointSize}
              stroke="#fff"
              strokeWidth={1}
              fill={props.line2PointColor}
            />

            {props.line3Data != null && props.line3TooltipPointSize != null && props.line3PointColor != null && (
              <Circle
                cy={y(props.line3Data[positionX])}
                r={props.line3TooltipPointSize}
                stroke="#fff"
                strokeWidth={1}
                fill={props.line3PointColor}
              />
            )}

            {props.line4Data != null && props.line4TooltipPointSize != null && props.line4PointColor != null && (
              <Circle
                cy={y(props.line4Data[positionX])}
                r={props.line4TooltipPointSize}
                stroke="#fff"
                strokeWidth={1}
                fill={props.line4PointColor}
              />
            )}
          </G>
        </G>
      );
    },
    [
      positionX,
      props.line1Data,
      props.line2Data,
      props.line3Data,
      props.line4Data,
      props.line1TooltipPointSize,
      props.line1PointColor,
      props.line2TooltipPointSize,
      props.line2PointColor,
      props.line3TooltipPointSize,
      props.line3PointColor,
      props.line4TooltipPointSize,
      props.line4PointColor,
    ]
  );

  const xAxisAndChartContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      flexDirection: 'row',
      width: scaleSize(props.chartWidth),
      height: scaleSize(props.chartHeight),
      alignSelf: 'stretch',
    };
  }, [props.chartWidth, props.chartHeight]);

  // const yAxisContainerStyle = useMemo(() => {
  //   return { width: scaleSize(props.yAxisWidth) };
  // }, [props.yAxisWidth]);

  // const yAxisData = useMemo(
  //   () => [props.yMax + props.extraSpaceForYAxisFromyMax, props.yMin - extraSpaceForYAxisFromyMin],
  //   [props.yMax, props.yMin, extraSpaceForYAxisFromyMin, props.extraSpaceForYAxisFromyMax]
  // );

  // const yAxisSvg = useMemo(() => {
  //   return { fontSize: props.yAxisLabelFontSize, fill: props.yAxisLabelColor };
  // }, [props.yAxisLabelFontSize, props.yAxisLabelColor]);

  const lineChartData = useMemo(
    () => [
      {
        data: props.line1Data,
        svg: { stroke: props.line1Color, strokeWidth: 1.5 },
      },
      {
        data: props.line2Data,
        svg: { stroke: props.line2Color, strokeWidth: 1.5 },
      },
    ],
    [
      props.line1Data,
      props.line1Color,
      props.line2Data,
      props.line2Color,
      props.line3Data,
      props.line3Color,
      props.line4Data,
      props.line4Color,
    ]
  );

  // const xAxisContainerStyle = useMemo(() => {
  //   return {
  //     alignSelf: 'stretch',
  //     // marginLeft: scaleSize(props.yAxisWidth),
  //     width: scaleSize(props.chartWidth + props.extraXAxisWidth),
  //     height: scaleSize(props.xAxisLabelContainerHeight),
  //   };
  // }, [props.chartWidth, props.xAxisLabelContainerHeight, props.extraXAxisWidth]);

  // const xAxisFormatLabel = useCallback((value: number) => props.xLabelList[value], [props.xLabelList]);

  // const xAxisContentInset = useMemo(() => {
  //   return {
  //     left: scaleSize(props.yAxisWidth) + scaleSize(props.extraSpaceForYAxis),
  //     // right: scaleSize(props.yAxisWidth),
  //     right: scaleSize(props.extraXAxisWidth) + scaleSize(props.extraSpaceForInnerChartRight),
  //   };
  // }, [props.yAxisWidth, props.extraXAxisWidth, props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight]);

  // const xAxisSvg = useMemo(() => {
  //   return {
  //     fontSize: props.xAxisLabelFontSize,
  //     fill: props.xAxisLabelColor,
  //     y: props.xAxisLabelDistance,
  //     // overflow: 'visible',
  //     // originY: 30,
  //   };
  // }, [props.xAxisLabelFontSize, props.xAxisLabelColor, props.xAxisLabelDistance]);

  return (
    <View style={styles.container}>
      <View style={xAxisAndChartContainerStyle}>
        {/* <YAxis
          style={yAxisContainerStyle}
          data={yAxisData}
          formatLabel={props.yAxisFormatLabel}
          contentInset={MultiLineChart_verticalContentInset}
          svg={yAxisSvg}
          numberOfTicks={props.numberOfTicksYAxis}
        /> */}
        <View style={globalStyles.container} {...panResponder.panHandlers}>
          <LineChart
            style={globalStyles.container}
            data={lineChartData}
            // curve={shape.curveNatural}
            // curve={shape.curveMonotoneX}
            contentInset={MultiLineChart_ContentInset}
            gridMax={props.yMax + extraSpaceForYAxisFromyMax}
            gridMin={props.yMin - extraSpaceForYAxisFromyMin}
          >
            <CustomGrid belowChart={true} />
            <PointWhenTouch />
            <ToolTip />
            <Gradient />
            <Gradient2 />
          </LineChart>
        </View>
      </View>
      {/* {props.showXAxis === true && (
        <XAxis
          style={xAxisContainerStyle}
          numberOfTicks={props.numberOfTicksXAxis}
          data={props.line1Data}
          formatLabel={xAxisFormatLabel}
          contentInset={xAxisContentInset}
          svg={xAxisSvg}
        />
      )} */}
    </View>
  );
};

export default memo(MultiLineChart);
