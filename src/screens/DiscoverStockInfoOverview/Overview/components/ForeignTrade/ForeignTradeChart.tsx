import TabSelector from 'components/TabSelector';
import { useAppSelector } from 'hooks/useAppSelector';
import { IFormatDataChart } from 'interfaces/common';
import { IForeignTradeDto } from 'interfaces/finance';
import React, { memo, useMemo, useState } from 'react';
import { View } from 'react-native';
import globalStyles, { Colors } from 'styles';
import { formatTimeToDisplay } from 'utils';
import BarChart from './BarChart';
import useStyles from './styles';
import { isHolidayOrWeekend } from './helper';

const ChartType = {
  Volume: 'Volume',
  Value: 'Value',
} as const;
type ChartType = keyof typeof ChartType;

const DUMMY_CHART_ITEM = { date: '', x: 0, xLabel: '', y: 0 };

type ForeignTradeChartProps = {
  currentForeignTrade: IForeignTradeDto;
};

const ForeignTradeChart = ({ currentForeignTrade }: ForeignTradeChartProps) => {
  const foreignTrade = useAppSelector(state => state.foreignTrade);
  const holidays = useAppSelector(state => state.holidays);
  const { styles } = useStyles();
  const [chartType, setChartType] = useState<ChartType>(ChartType.Value);
  const chartData = useMemo(() => {
    const data = foreignTrade.data.foreignTradeDtoList;

    const mappedData = data.reduce(
      (prev, curr, index) => {
        const date = formatTimeToDisplay(curr.date, 'dd/MM', 'dd/MM/yyyy');

        const value = chartType === 'Value' ? curr.netBuyForeignValue : curr.netBuyForeignQuantity;

        prev.push({
          date: index + 1,
          x: index + 1,
          xLabel: date,
          y: value,
        });

        return prev;
      },
      [DUMMY_CHART_ITEM] as IFormatDataChart[]
    );

    return mappedData;
  }, [foreignTrade.data.foreignTradeDtoList, chartType]);

  const chartWithRealTimeData = useMemo(() => {
    if (isHolidayOrWeekend(holidays)) return chartData;
    const lastColumnIndex = chartData.length - 1;
    if (lastColumnIndex <= 0) return chartData;
    const lastColumn = chartData[lastColumnIndex];
    const lastColumnDate = lastColumn.xLabel;
    const lastForeignTrade = foreignTrade.data.foreignTradeDtoList.slice(-1)[0];
    const lastColumnData =
      formatTimeToDisplay(currentForeignTrade?.date, 'dd/MM', 'dd/MM/yyyy') ===
      formatTimeToDisplay(lastForeignTrade?.date, 'dd/MM', 'dd/MM/yyyy')
        ? foreignTrade.data.foreignTradeDtoList.slice(-1)[0]
        : currentForeignTrade;
    const latestDate = formatTimeToDisplay(lastColumnData.date, 'dd/MM', 'dd/MM/yyyy');
    const value = chartType === 'Value' ? lastColumnData.netBuyForeignValue : lastColumnData.netBuyForeignQuantity;
    const newColumn = {
      date: lastColumnIndex + 1,
      x: lastColumnIndex + 1,
      xLabel: latestDate,
      y: value,
    };

    if (lastColumnDate !== latestDate) {
      return [...chartData, newColumn, DUMMY_CHART_ITEM];
    } else {
      return [...chartData, DUMMY_CHART_ITEM];
    }
  }, [chartData, currentForeignTrade, holidays]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.tabContainer}>
        <TabSelector value={chartType} setValue={setChartType} listValue={ChartType} style={styles.tabSelector} />
      </View>
      <BarChart data={chartWithRealTimeData} colors={[Colors.DARK_GREEN, Colors.LIGHTRed]} />
    </View>
  );
};

export default memo(ForeignTradeChart);
