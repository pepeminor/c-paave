import React, { memo, useCallback, useMemo, useState } from 'react';
import { ColorValue, PanResponder, StyleProp, View, ViewStyle } from 'react-native';
import lodash from 'lodash';
import { Circle, FontWeight, G, Path, Line, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart as AreaChart2 } from 'react-native-svg-charts';
import { formatNumber } from 'utils/common';
import globalStyles, { scaleSize } from 'styles';

type IAreaChartProps = {
  areaData: number[];
  areaLineColor: string;
  xLabelList: string[];
  yAxisFormatLabel: (value: number) => string;
  yMax: number;
  extraSpaceForYAxisFromyMax?: number;
  yMin: number;
  extraSpaceForYAxisFromyMin?: number;
  yAxisWidth: number;
  extraXAxisWidth: number;
  chartWidth: number;
  chartHeight: number;
  tooltipWidth: number;
  tooltipHeight: number;
  tooltipBorderRadius: number;
  areaTooltipPointSize: number;
  areaPointColor: ColorValue;
  tooltipBorderColor: ColorValue;
  tooltipBackgroundColor: ColorValue;
  tooltipPaddingLeft: number;
  toolTipDateDistanceFromTop: number;
  toolTipDistanceFromTop: number;
  areaTooltipText: (passValue: string) => string;
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
  onDisableScroll: (enabledScroll: boolean) => void;
  extraSpaceForYAxis: number;
  extraSpaceForInnerChartRight: number;
  showXAxis: boolean;
  dateLabelList?: string[];
};

const AreaChart_svg = { fill: 'url(#gradient3)' };

const AreaChart = (props: IAreaChartProps) => {
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
        return (props.yMax - props.yMin) * 0.1;
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
        return (props.yMax - props.yMin) * 0.05;
      }
    }
  }, [props.yMax, props.yMin, props.extraSpaceForYAxisFromyMax]);

  const AreaChart_ContentInset = useMemo(() => {
    return {
      top: scaleSize(4),
      bottom: scaleSize(20),
      left: scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth),
      right: scaleSize(props.extraSpaceForInnerChartRight),
    };
  }, [props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight, props.yAxisWidth]);

  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

  const Line2 = useCallback(
    ({ line }) => <Path key={'line'} d={line} stroke={props.areaLineColor} fill={'none'} />,
    [props.areaLineColor]
  );

  const updatePosition = useCallback(
    (x: number) => {
      if (props.areaData == null) {
        return;
      }
      const x0 = scaleSize(props.extraSpaceForYAxis) + scaleSize(props.yAxisWidth); // x0 position
      const innerChartWidth = scaleSize(props.chartWidth) - scaleSize(props.extraSpaceForInnerChartRight) - x0;
      const xLastPoint = x0 + innerChartWidth; //x last point position
      const xDistance = innerChartWidth / props.areaData.length; // The width of each coordinate point
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
      if (value > props.areaData.length - 1) {
        value = props.areaData.length - 1; // Out of chart range, automatic correction
      }

      setPositionX(value);
    },
    [props.yAxisWidth, props.areaData, props.chartWidth, props.extraSpaceForYAxis, props.extraSpaceForInnerChartRight]
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

  const Gradient3 = useCallback(
    ({ index }) => (
      <Defs key={`Gradient3-${index}`}>
        <LinearGradient
          id={'gradient3'}
          x1={'0%'}
          y1={'0%'}
          x2={'0%'}
          y2={`${((props.yMax - (props.yMin - extraSpaceForYAxisFromyMin)) / props.yMax) * 100}%`}
        >
          <Stop offset={'0%'} stopColor={props.areaLineColor} stopOpacity={0.7} />
          <Stop offset={'100%'} stopColor={props.areaLineColor} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    ),
    [props.yMax, extraSpaceForYAxisFromyMax, props.yMin, extraSpaceForYAxisFromyMin, props.areaLineColor]
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
          strokeWidth={2}
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
            props.areaData.map((_, index) => {
              return (
                (props.areaData.length <= props.numberOfTicksXAxis ||
                  index % Math.floor(props.areaData.length / props.numberOfTicksXAxis) === 0) && (
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
      props.areaData,
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
              props.areaData.length > 10
                ? positionX > props.areaData.length / 2
                  ? x(0) - scaleSize(props.yAxisWidth)
                  : x(Math.ceil(props.areaData.length / 2)) - scaleSize(props.yAxisWidth)
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
              y={props.toolTipDistanceFromTop}
              fontSize={props.tooltipDataFontSize}
              fontWeight={props.tooltipDataFontWeight}
              fill={props.tooltipDataColor}
              opacity={props.tooltipDataOpacity}
            >
              {props.areaTooltipText(formatNumber(props.areaData[positionX]))}
            </SvgText>
          </G>
        </G>
      );
    },
    [
      positionX,
      props.areaData,
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
      props.areaTooltipText,
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
              cy={y(props.areaData[positionX])}
              r={props.areaTooltipPointSize}
              stroke="#fff"
              strokeWidth={1}
              fill={props.areaPointColor}
            />
          </G>
        </G>
      );
    },
    [positionX, props.areaData, props.areaTooltipPointSize, props.areaPointColor]
  );

  const xAxisAndChartContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      flex: 1,
      width: scaleSize(props.chartWidth),
      height: scaleSize(props.chartHeight),
    };
  }, [props.chartWidth, props.chartHeight]);

  return (
    <View style={xAxisAndChartContainerStyle} {...panResponder.panHandlers}>
      <AreaChart2
        style={globalStyles.container}
        data={props.areaData}
        contentInset={AreaChart_ContentInset}
        gridMax={props.yMax + extraSpaceForYAxisFromyMax}
        gridMin={props.yMin - extraSpaceForYAxisFromyMin}
        svg={props.yMax !== 0 ? AreaChart_svg : undefined}
      >
        <CustomGrid belowChart={true} />
        <PointWhenTouch />
        <ToolTip />
        <Gradient />
        <Gradient2 />
        {props.yMax !== 0 && <Gradient3 />}
        <Line2 />
      </AreaChart2>
    </View>
  );
};

export default memo(AreaChart);
