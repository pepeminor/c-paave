import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { getStylesHook, useAppSelector } from 'hooks';
import { lightColors, textStyles } from 'styles';
import { useTranslation } from 'react-i18next';
import LeaderboardComponent from './Leaderboard.component';

const LeaderboardRanking = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const getCurrentInvestingInfo = useAppSelector(state => state.getCurrentInvestingInfo.data);
  const currentInvestingInfoPeriodData =
    getCurrentInvestingInfo != null && getCurrentInvestingInfo?.currentInvestingInfo?.length > 0
      ? getCurrentInvestingInfo.currentInvestingInfo.find(ele => ele.period === 'DAY')
      : null;

  if (currentInvestingInfoPeriodData == null) return null;

  return (
    <View style={styles.container}>
      <LeaderboardComponent />
      <View style={styles.containerText}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('Rank')}
        </Text>
        <Text allowFontScaling={false} style={styles.rankingValue}>
          {currentInvestingInfoPeriodData.ranking}
          <Text allowFontScaling={false} style={styles.baseRank}>
            /{currentInvestingInfoPeriodData.totalUsers}
          </Text>
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('Top')}
        </Text>
        <Text allowFontScaling={false} style={styles.rankingValue}>
          {currentInvestingInfoPeriodData.percentile}%
        </Text>
      </View>
    </View>
  );
};

export default memo(LeaderboardRanking);

const useStyles = getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 8,
    padding: 8,

    // borderColor: lightColors.BORDER,
    // borderWidth: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    width: 40,
  },
  rankingValue: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt500,
    color: lightColors.Yellow2,
    flex: 1,
  },
  baseRank: {
    ...textStyles.dinOt500,
    ...textStyles.fontSize14,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between',
  },
});
