import React, { useCallback } from 'react';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { Colors, lightColors, textStyles } from 'styles';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ChartFilterGroup from 'components/ChartFilterGroup';
import { IFormatDataChart } from 'interfaces/common';
import { chartFilterData } from 'constants/profitloss';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE } from 'global';
import { AdvisorSelectors, IFollowingDailyProfitLoss } from 'reduxs';
import { isNilOrEmpty } from 'ramda-adjunct';
import ItemRow from './ItemRow.component';
import AreaChartForLeaderboard from './AreaChartForLeaderboard';
import MultiLineChartForLeaderboard from './MultiLineChartForLeaderboard';
import { ChartType } from '../UserWall.type';
import Icon from 'components/Icon';
import IconLineChart from 'assets/icon/IconLineChart.svg';
import AccumulatedChart from 'screens/Portfolio/components/Chart/components/AccumulatedChart';

type IAccProfitProps = {
  VNIndexReturnData: IFormatDataChart[];
  vnindexReturn: IFormatDataChart[];
  NetAssetValue: IFormatDataChart[];
  accumulatedProfit: IFormatDataChart[];
  accumulatedProfitRatio: IFormatDataChart[];
  followingDailyProfitLoss: IFollowingDailyProfitLoss[];
  sample: number;
  onSetSample: (sample: number) => void;
  onChangeEnableScrollView: (value: boolean) => void;
  isFromSearch?: boolean;
  isFromKis?: boolean;
  userId: number;
  accNAVProfitValue?: number;
  accNAVProfitRatio?: number;
  stockAllocation?: number;
  cashAllocation?: number;
};

const AccProfit = ({
  VNIndexReturnData,
  vnindexReturn,
  NetAssetValue,
  accumulatedProfit,
  accumulatedProfitRatio,
  sample,
  onSetSample,
  followingDailyProfitLoss,
  onChangeEnableScrollView,
  isFromSearch,
  isFromKis,
  userId,
  accNAVProfitValue,
  accNAVProfitRatio,
  stockAllocation,
  cashAllocation,
}: IAccProfitProps) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const selectedAccountLeaderBoard = useAppSelector(state => state.leaderboardAccountSelector);
  const isKis = (selectedAccountLeaderBoard === ACCOUNT_TYPE.KIS && !isFromSearch) || isFromKis;

  const [chartType, setChartType] = React.useState<ChartType>(isKis ? 'LINE' : 'LINE2');
  const { isBot, viewsAndFollows } = useAppSelector(state => {
    const advisorData = AdvisorSelectors.selectAdvisorInfo(userId)(state);
    const viewsAndFollows = AdvisorSelectors.selectAdvisorViewsAndFollows(userId)(state) ?? {};
    return {
      isBot: advisorData != null,
      viewsAndFollows,
    };
  });

  const todayProfit =
    (followingDailyProfitLoss.length && followingDailyProfitLoss[followingDailyProfitLoss.length - 1]) ||
    ({} as IFollowingDailyProfitLoss);

  const vnIndexReturn = todayProfit?.normalisedVnIndex;

  const onChangeEnableScroll = useCallback((value: boolean) => {
    onChangeEnableScrollView(value);
  }, []);

  const onChangePeriod = useCallback((period: number) => {
    onSetSample(period);
  }, []);

  const onPressLine2 = useCallback(() => {
    setChartType(ChartType.LINE2);
  }, []);

  const onPressLine = useCallback(() => {
    setChartType(ChartType.LINE);
  }, []);

  const onPressDollard = useCallback(() => {
    setChartType(ChartType.ACCUMULATE);
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.chartHeader}>
        <Text style={styles.titleStyle}>{t('Investment Performance')}</Text>
        <View style={globalStyles.flexDirectionRow}>
          {!isKis && (
            <TouchableOpacity
              onPress={onPressLine2}
              style={chartType === 'LINE2' ? styles.buttonLineChartSelected : styles.buttonLineChart}
            >
              <Icon name="dollard" size={24} color={dynamicColors.LIGHTIconDisable} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onPressLine}
            style={chartType === 'LINE' ? styles.buttonLineChartSelected : styles.buttonLineChart}
          >
            <IconLineChart />
          </TouchableOpacity>
          {isKis && (
            <TouchableOpacity
              onPress={onPressDollard}
              style={chartType === 'ACCUMULATE' ? styles.buttonLineChartSelected : styles.buttonLineChart}
            >
              <Icon name="dollard" size={24} color={dynamicColors.LIGHTIconDisable} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isNilOrEmpty(followingDailyProfitLoss) ? (
        <View style={isKis ? styles.kisChartContainer : styles.containerEmpty}>
          <ActivityIndicator size={'large'} color={dynamicColors.Gray2} />
        </View>
      ) : (
        <View style={styles.chartContainer}>
          {chartType === 'LINE' && (
            <AreaChartForLeaderboard data={NetAssetValue} onChangeEnableScroll={onChangeEnableScroll} />
          )}
          {chartType === 'LINE2' && (
            <>
              <MultiLineChartForLeaderboard
                line1Data={accumulatedProfitRatio}
                line2Data={VNIndexReturnData}
                accProfitData={accumulatedProfit}
                onChangeEnableScroll={onChangeEnableScroll}
              />
              <View style={styles.chartValueContainer}>
                <View style={styles.containerLine}>
                  <View style={styles.chartValueLine} />
                  <Text style={styles.noteText}>{t('VNIndex Return')}</Text>
                </View>
                <View style={styles.containerLine}>
                  <View style={styles.chartValueLineGreen} />
                  <Text style={styles.noteText}>{t('NAV Return')}</Text>
                </View>
              </View>
            </>
          )}
          {chartType === 'ACCUMULATE' && (
            <AccumulatedChart
              line1Data={accumulatedProfitRatio}
              line2Data={accumulatedProfit}
              line3Data={vnindexReturn}
              onChangeEnableScroll={onChangeEnableScroll}
            />
          )}
          <ChartFilterGroup data={chartFilterData} sample={sample} onSetSample={onChangePeriod} />
        </View>
      )}
      <View style={styles.borderBottom} />
      <Text allowFontScaling={false} style={styles.hotStockNoteText}>
        {t('Leaderboard return note')}
      </Text>
      <View style={styles.grayLine} />
      {/* OverView */}
      <View style={globalStyles.container}>
        <View style={styles.borderBottom}>
          <Text allowFontScaling={false} style={styles.overviewTitle}>
            {t('Overview')}
          </Text>
        </View>

        <ItemRow data={accNAVProfitRatio} label={t('User Profit')} hasDynamicColor={true} />

        {!isKis && <ItemRow data={vnIndexReturn} label={t('Vnindex Return')} hasDynamicColor={true} />}
        <ItemRow data={accNAVProfitValue} label={t('Profit Value')} hasDynamicColor={true} isPercent={false} />

        <ItemRow data={stockAllocation} label={t('% Stock')} />

        <ItemRow data={cashAllocation} label={t('% Cash')} />

        {isBot && (
          <>
            <ItemRow data={viewsAndFollows.totalViews ?? 0} label={t('Views')} isPercent={false} />
            <ItemRow data={viewsAndFollows.totalFollowers ?? 0} label={t('Followers')} isPercent={false} />
          </>
        )}
      </View>
      {isKis && <Text style={styles.kisNote}>(*) {t('Kis_Leaderboard_Profit_Note')}</Text>}
    </View>
  );
};

const useStyles = getStylesHook({
  containerEmpty: {
    flex: 1,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /////
  overviewTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: '#303E67',
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
  },
  chartContainer: {
    flex: 1,
    paddingHorizontal: 9,
    paddingBottom: 8,
    minHeight: 260,
  },
  hotStockNoteText: {
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    lineHeight: 18,
    padding: 8,
  },

  chartValueContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
    paddingTop: 8,
  },
  containerLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartValueLine: {
    backgroundColor: lightColors.LIGHTRed2,
    width: 30,
    height: 2,
    marginRight: 5,
  },
  chartValueLineGreen: {
    backgroundColor: lightColors.DARK_GREEN,
    width: 30,
    height: 2,
    marginRight: 5,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  kisNote: { fontStyle: 'italic', padding: 15 },
  kisChartContainer: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextTitle,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  buttonLineChart: {
    ...globalStyles.centered,
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: lightColors.LIGHTBGTab,
  },
  buttonLineChartSelected: {
    ...globalStyles.centered,
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: lightColors.BlueNewColor,
  },
});

export default withMemo(AccProfit);
