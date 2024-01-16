import withMemo from 'HOC/withMemo';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReducerStatus } from 'interfaces/reducer';
import { ActivityIndicator, Text, View } from 'react-native';
import { formatNumber, formatDateToString } from 'utils';
import TimePicker from '../../TimePicker';
import useStyles from '../ScoreTab.style';
import { useTranslation } from 'react-i18next';
import { ITimePicker, ITopNumber } from 'screens/AIRatingScreen/constants';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { AIRatingActions, AiRatingSelectors } from 'reduxs';
import { useFocusEffect } from '@react-navigation/native';
import MultiLineChart from 'components/Chart/MultiLineChart';
import { isNotNilOrEmpty } from 'ramda-adjunct';

interface IProps {
  optionSelecting: ITopNumber;
  onChangeEnabledScroll: (enabledScroll: boolean) => void;
  currentDate: Date;
}

const AIRatingScreen_yAxisFormatLabel = (value: number) => {
  return `${value}%`;
};

const AIRatingScreen_line1TooltipText = (value: string) => {
  return `VNIndex: ${value}%`;
};

const AIRatingScreen_line2TooltipText = (value: string) => {
  return `AI Rating: ${value}%`;
};

const ChartAIRating = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [timeSelecting, setTimeSelecting] = useState(ITimePicker.THREE_MONTHS);

  const { isRefresh, status, dataIndex, dataRating } = useAppSelector(
    AiRatingSelectors.selectAIRatingDataChart(props.optionSelecting)
  );
  const { optionSelecting, currentDate } = props;
  const yMaxChart = useMemo(() => {
    return Math.max(dataIndex.yMax, dataRating.yMax);
  }, [dataIndex.yMax, dataRating.yMax]);
  const yMinChart = useMemo(() => {
    return Math.min(dataIndex.yMin, dataRating.yMin);
  }, [dataIndex.yMin, dataRating.yMin]);

  const onChangeTimeFrame = useCallback(
    (time: ITimePicker) => {
      setTimeSelecting(time);
      const paramsChart = {
        top: optionSelecting,
        period: time,
        isInit: false,
      };
      dispatch(AIRatingActions.getAIRating(paramsChart));
    },
    [optionSelecting]
  );

  useFocusEffect(() => {
    if (isRefresh === false) return;
    const params = {
      top: optionSelecting,
      period: ITimePicker.THREE_MONTHS,
      date: formatDateToString(currentDate, 'yyyyMMdd') || '',
      isInit: optionSelecting === ITopNumber.TOP5,
    };
    dispatch(AIRatingActions.getAIRating(params));
    setTimeSelecting(ITimePicker.THREE_MONTHS);
  });

  useEffect(() => {
    const params = {
      top: optionSelecting,
      period: timeSelecting,
      date: formatDateToString(currentDate, 'yyyyMMdd') || '',
      isInit: optionSelecting === ITopNumber.TOP5,
    };
    dispatch(AIRatingActions.getAIRating(params));
  }, []);

  return (
    <View style={styles.container}>
      <TimePicker selectedTime={timeSelecting} setSelectedTime={onChangeTimeFrame} />

      <Text style={styles.textSection1} allowFontScaling={true}>
        {t(`Cumulative profit of trading strategies based on top AI Rating stocks and hold at least 3 days`, {
          top: optionSelecting,
        })}
      </Text>

      <View style={styles.containerReturnRate}>
        {dataIndex?.dataLine?.length > 0 && (
          <View>
            <Text allowFontScaling={true} style={styles.returnRateVNIndex}>
              {formatNumber(dataIndex?.dataLine?.[dataIndex?.dataLine?.length - 1])}%
            </Text>
            <Text allowFontScaling={true} style={styles.returnRateTitle}>
              {timeSelecting} VNIndex
            </Text>
          </View>
        )}
        {dataRating?.dataLine?.length > 0 && (
          <View>
            <Text allowFontScaling={true} style={styles.returnRateAIRating}>
              {formatNumber(dataRating?.dataLine?.[dataRating?.dataLine?.length - 1])}%
            </Text>
            <Text allowFontScaling={true} style={styles.returnRateTitle}>
              {timeSelecting} AI Rating
            </Text>
          </View>
        )}
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        {status === ReducerStatus.SUCCESS && isNotNilOrEmpty(dataIndex) && isNotNilOrEmpty(dataRating) ? (
          <MultiLineChart
            onDisableScroll={props.onChangeEnabledScroll}
            line1Data={dataIndex.dataLine}
            line2Data={dataRating.dataLine}
            line1Color={dynamicColors.LIGHTRed}
            line2Color={dynamicColors.DARK_GREEN}
            xLabelList={dataIndex.labelList}
            yAxisFormatLabel={AIRatingScreen_yAxisFormatLabel}
            yMax={yMaxChart}
            extraSpaceForYAxisFromyMax={1}
            yMin={yMinChart}
            extraSpaceForYAxisFromyMin={yMaxChart - yMinChart > 20 ? 3 : 1}
            yAxisWidth={50}
            extraXAxisWidth={20}
            chartWidth={350}
            chartHeight={200}
            tooltipWidth={120}
            tooltipHeight={60}
            toolTipDateDistanceFromTop={-10}
            tooltipBorderRadius={10}
            line1TooltipPointSize={5}
            line2TooltipPointSize={5}
            line1PointColor={dynamicColors.LIGHTRed}
            line2PointColor={dynamicColors.DARK_GREEN}
            tooltipBorderColor={dynamicColors.DARK_GREEN}
            tooltipBackgroundColor={dynamicColors.WHITE}
            tooltipPaddingLeft={5}
            toolTip1DistanceFromTop={10}
            toolTip2DistanceFromTop={25}
            line1TooltipText={AIRatingScreen_line1TooltipText}
            line2TooltipText={AIRatingScreen_line2TooltipText}
            tooltipDateColor={dynamicColors.BLACK}
            tooltipDateOpacity={1}
            tooltipDateFontSize={12}
            tooltipData1Opacity={1}
            tooltipData1FontSize={12}
            tooltipData1FontWeight={'bold'}
            tooltipData1Color={dynamicColors.LIGHTRed}
            tooltipData2Opacity={1}
            tooltipData2FontSize={12}
            tooltipData2FontWeight={'bold'}
            tooltipData2Color={dynamicColors.DARK_GREEN}
            xAxisLabelFontSize={12}
            xAxisLabelColor={dynamicColors.BLACK}
            xAxisLabelDistance={0}
            yAxisLabelFontSize={12}
            yAxisLabelPaddingLeft={15}
            yAxisLabelColor={dynamicColors.BLACK}
            xAxisLabelContainerHeight={60}
            numberOfTicksYAxis={5}
            numberOfTicksXAxis={5}
            extraSpaceForYAxis={3}
            extraSpaceForInnerChartRight={20}
            tooltipDateFontWeight={'bold'}
            showXAxis={true}
          />
        ) : (
          <View style={styles.heightChart}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <View style={styles.chartValueContainer}>
          <View style={styles.chartValueItem}>
            <View style={styles.chartValueLineRed} />
            <Text allowFontScaling={false} style={styles.noteText}>
              VN Index
            </Text>
          </View>
          <View style={styles.chartValueItem}>
            <View style={styles.chartValueLineGreen} />
            <Text allowFontScaling={false} style={styles.noteText}>
              AI Rating
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default withMemo(ChartAIRating);
