import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useChartLogic } from './Chart.logic';
import useStyles from './Chart.style';
import { IProps } from './Chart.type';
import withMemo from 'HOC/withMemo';

import { useTranslation } from 'react-i18next';
import IconRefresh from 'assets/icon/IconRefresh2.svg';
import { ACCOUNT_TYPE } from 'global';
import ChartFilterGroup from 'components/ChartFilterGroup';
import ProfitLossChart from './components/ProfitLossChart.component';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { ReducerStatus } from 'interfaces/reducer';

const Chart = (props: IProps) => {
  const { handlers, state, chartFilterData, dataChart, vnindexReturn } = useChartLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const { selectedAccountType, dailyProfitLossStatus } = props;

  if (dailyProfitLossStatus === ReducerStatus.LOADING) {
    return (
      <View style={styles.chartContainerEmpty}>
        <ActivityIndicator color={dynamicColors.BLACK} size={'large'} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.chartContainer}>
        {isNotNilOrEmpty(dataChart) || selectedAccountType === ACCOUNT_TYPE.DEMO ? (
          <ProfitLossChart
            chartStyle={props.chartStyle}
            dataChart={dataChart}
            vnindexReturn={vnindexReturn}
            onChangeEnableScroll={props.onChangeEnableScroll}
            notRenderChart={state.notRenderChart}
          />
        ) : (
          <View style={styles.noChartDataContainer}>
            <View style={styles.noChartData}>
              <IconRefresh />
              <Text style={styles.noChartDataText}>
                {t('Cannot fetch data.\nPlease pull down to')}
                <Text style={styles.noChartDataTextBlue}> {t('refresh')}</Text>
              </Text>
            </View>
          </View>
        )}
      </View>

      <ChartFilterGroup data={chartFilterData} onSetSample={handlers.changeSample} sample={state.sample} />
    </>
  );
};

export default withMemo(Chart);
