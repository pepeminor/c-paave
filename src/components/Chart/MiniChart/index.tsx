import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleProp, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import IconRefresh from 'assets/icon/IconRefresh2.svg';
import { ReducerStatus } from 'interfaces/reducer';
import globalStyles, { scaleSize, Colors, lightColors } from 'styles';
import moment from 'moment';
import { Line, Defs, LinearGradient, Stop, Svg } from 'react-native-svg';
import { getDifferentColorOffsetChart } from './functions';
import { lineChartStyles } from './styles';
import withMemo from 'HOC/withMemo';
import { Global } from 'constants/main';
import { WS } from 'constants/enum';
import { SCChannel } from 'sc-channel';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { IChartProps, Wrapper } from './type';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { DataChartSymbolActions, DataChartSymbolSelectors } from 'reduxs/DataChartSymbol';

const MINUTE = 60000;
const CONTENT_INSET = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5,
};

const MiniChart_LineStrokeDashArray = [5, 5];

const Chart = (props: IChartProps) => {
  const dispatch = useDispatch();
  const { resolution = '10', symbolCode, ignoreLunchTime = false } = props;

  const symbolDataChartResolution = useAppSelector(DataChartSymbolSelectors.selectDataChart(symbolCode, resolution));

  const referencePrice = useAppSelector(SymbolDataSelector.selectReferencePriceSymbol(symbolCode));
  const { chartData, minValue, maxValue, status } = useMemo(() => {
    return {
      chartData: symbolDataChartResolution?.dataPoint ?? [],
      maxValue: symbolDataChartResolution?.maxValue ?? referencePrice,
      minValue: symbolDataChartResolution?.minValue ?? referencePrice,
      status: symbolDataChartResolution?.status ?? ReducerStatus.LOADING,
    };
  }, [symbolDataChartResolution, resolution, referencePrice]);

  const intervalHandler = useRef<Wrapper<number>>({});
  const hasQuote = useRef(false);
  const currentPriceRef = useRef(referencePrice);
  const subscribedChannel = useRef<Wrapper<SCChannel>>({});

  useEffect(() => {
    setTimeout(() => loadDataForChart(), 1000);

    return cleanUp;
  }, []);

  useUpdateEffect(() => {
    cleanUp();
    loadDataForChart();
  }, [props.reload, symbolCode]);

  const cleanUp = useCallback(() => {
    subscribedChannel.current?.v?.unwatch();
    subscribedChannel.current?.v?.unsubscribe();
    subscribedChannel.current?.v?.destroy();
    if (intervalHandler.current?.v != null) {
      clearInterval(intervalHandler.current.v);
    }
  }, []);

  const handleUpdateChart = useCallback(() => {
    if (hasQuote.current) {
      dispatch(
        DataChartSymbolActions.insertDataChart({
          symbolCode,
          dataPoint: parseFloat(currentPriceRef.current?.toFixed(2) ?? referencePrice),
          resolution,
        })
      );
      hasQuote.current = false;
    }
  }, []);

  const loadDataForChart = useCallback(() => {
    dispatch(
      DataChartSymbolActions.getDataChartSymbol({
        symbol: symbolCode,
        resolution,
        ignoreLunchTime,
        callback: error => {
          if (error) {
            return;
          }

          if (moment().hour() > 14) return;

          // subscribe realtime data
          subscribedChannel.current.v = Global.sockets[WS.PRICE_BOARD]?.subscribe(`market.quote.${symbolCode}`);
          subscribedChannel.current.v?.watch((res: { c: number }) => {
            const price = res?.c ?? 0;
            currentPriceRef.current = price;
            hasQuote.current = true;
            dispatch(
              DataChartSymbolActions.updateLastPointDataChart({
                symbolCode,
                lastPoint: parseFloat(price.toFixed(2)),
                resolution,
              })
            );
          });

          const timeTick = parseInt(resolution, 10);
          const timeOut =
            (timeTick - ((moment().minutes() % timeTick) + 1)) * MINUTE + MINUTE - moment().seconds() * 1000;

          setTimeout(() => {
            handleUpdateChart();
            intervalHandler.current.v = setInterval(handleUpdateChart, MINUTE * timeTick) as any as number;
          }, timeOut);
          //Calculate how much time is left until the next tenth minute
        },
      })
    );
  }, [symbolCode, resolution]);

  const HorizontalLine = useCallback(
    ({ y }: any) => (
      <Line
        key={'zero-axis'}
        x1={'0%'}
        x2={'100%'}
        y1={y(referencePrice)}
        y2={y(referencePrice)}
        stroke={'#BECAE5'}
        strokeDasharray={[5, 5]}
        strokeWidth={0.5}
      />
    ),
    [referencePrice]
  );

  const Gradient = useCallback(
    ({ index }: any) => (
      <Defs key={index}>
        <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={Colors.DARK_GREEN} stopOpacity={1} />
          <Stop
            offset={`${getDifferentColorOffsetChart(maxValue - referencePrice, minValue - referencePrice)}%`}
            stopColor={Colors.DARK_GREEN}
            stopOpacity={1}
          />
          <Stop
            offset={`${getDifferentColorOffsetChart(maxValue - referencePrice, minValue - referencePrice)}%`}
            stopColor={Colors.LIGHTRed}
            stopOpacity={1}
          />
          <Stop offset={'100%'} stopColor={Colors.LIGHTRed} stopOpacity={1} />
        </LinearGradient>
      </Defs>
    ),
    [referencePrice, maxValue, minValue]
  );

  const chartContainerStyle = useMemo(() => {
    return {
      height: props.chartStyle?.height ?? 300,
      width: props.chartStyle?.width ?? 150,
      padding: props.chartStyle?.padding ?? 0,
    };
  }, []);

  const lineChartSvg = useMemo(
    () => ({
      stroke:
        maxValue > referencePrice
          ? minValue > referencePrice
            ? Colors.DARK_GREEN
            : 'url(#gradient)'
          : Colors.LIGHTRed,
      strokeWidth: 1,
    }),
    [minValue, maxValue, referencePrice]
  );

  return (
    <View style={props.containerStyle}>
      {status === ReducerStatus.SUCCESS && referencePrice != null ? (
        chartData.length > 0 ? (
          <View style={chartContainerStyle as StyleProp<ViewStyle>}>
            <LineChart
              style={lineChartStyles}
              data={chartData}
              contentInset={CONTENT_INSET}
              yMin={maxValue > referencePrice && minValue > referencePrice ? referencePrice : undefined}
              yMax={maxValue < referencePrice && minValue < referencePrice ? referencePrice : undefined}
              svg={lineChartSvg}
            >
              <HorizontalLine />
              <Gradient />
            </LineChart>
          </View>
        ) : (
          <View style={chartContainerStyle as StyleProp<ViewStyle>}>
            <View style={globalStyles.container} />
            <Svg width={'100%'} height={1}>
              <Line
                key={'zero-axis1'}
                x1={'0%'}
                x2={'100%'}
                y1={0}
                y2={0}
                stroke={'#BECAE5'}
                strokeDasharray={MiniChart_LineStrokeDashArray}
                strokeWidth={1}
              />
            </Svg>
            <View style={globalStyles.container} />
          </View>
        )
      ) : status === ReducerStatus.LOADING || referencePrice == null ? (
        <View style={props.placeHolderStyle as ViewProps}></View>
      ) : (
        <TouchableOpacity
          onPress={loadDataForChart}
          style={[
            globalStyles.centered,
            { backgroundColor: lightColors.BACKGROUND_MODAL },
            props.placeHolderStyle as ViewProps,
          ]}
        >
          <IconRefresh height={scaleSize(32)} width={scaleSize(32)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withMemo(Chart, (prevProps, nextProps) => {
  if (prevProps.symbolCode !== nextProps.symbolCode) return false;

  if (prevProps.reload !== nextProps.reload) return false;

  return true;
});
