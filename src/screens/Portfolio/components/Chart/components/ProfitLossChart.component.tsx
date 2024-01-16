import React from 'react';
import withMemo from 'HOC/withMemo';
import { ChartStyle } from 'constants/enum';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import MultiLineChartForPortFolio from './MultiLineChartForPortFolio';
import AreaChartForPortfolio from './AreaChartForPortfolio';
import NoDataLineChart from 'components/Chart/NoDataLineChart';
import { IDataChartProfitLoss } from 'reduxs';
import AccumulatedChart from './AccumulatedChart';
import BarChartForPortfolio from './BarChartForPortfolio';
import { useStyles } from './ChartLegendStyles';
import { IFormatDataChart } from 'interfaces/common';

interface IProps {
  chartStyle: ChartStyle;
  dataChart: IDataChartProfitLoss;
  onChangeEnableScroll?: (enable: boolean) => void;
  notRenderChart: boolean;
  vnindexReturn: IFormatDataChart[];
}

const ProfitLossChart = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { chartStyle, dataChart, vnindexReturn } = props;
  const { NAVAsset, NAVProfitRatio, VNIndexReturnData, accumulatedProfit, accumulatedProfitRatio } = dataChart;

  switch (chartStyle) {
    case ChartStyle.NO_DATA:
      return <NoDataLineChart />;
    case ChartStyle.LINE2:
      return (
        <>
          {props.onChangeEnableScroll != null && (
            <MultiLineChartForPortFolio
              line1Data={accumulatedProfitRatio}
              line2Data={VNIndexReturnData}
              accProfitData={accumulatedProfit}
              onChangeEnableScroll={props.onChangeEnableScroll}
            />
          )}

          <View style={styles.chartValueContainer}>
            <View style={styles.containerItem}>
              <View style={styles.chartValueVNIndex}></View>
              <Text style={styles.noteText}>{t('VNIndex Return')}</Text>
            </View>
            <View style={styles.containerItem}>
              <View style={styles.chartValueLineNAV}></View>
              <Text style={styles.noteText}>{t('NAV Return')}</Text>
            </View>
          </View>
        </>
      );
    case ChartStyle.LINE:
      return (
        <>
          {props.onChangeEnableScroll != null && (
            <AreaChartForPortfolio data={NAVAsset} onChangeEnableScroll={props.onChangeEnableScroll} />
          )}
        </>
      );
    case ChartStyle.BAR:
      return <BarChartForPortfolio data={NAVProfitRatio} onChangeEnableScroll={props.onChangeEnableScroll} />;
    case ChartStyle.ACCUMULATE:
      return props.onChangeEnableScroll != null ? (
        <AccumulatedChart
          line1Data={accumulatedProfitRatio}
          line2Data={accumulatedProfit}
          line3Data={vnindexReturn}
          onChangeEnableScroll={props.onChangeEnableScroll}
        />
      ) : null;
    default:
      return null;
  }
};

export default withMemo(ProfitLossChart);
