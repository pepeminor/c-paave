import React, { memo, useCallback, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from 'hooks';
import globalStyles, { scaleSize } from 'styles';
import { navigate } from 'utils/rootNavigation';
import useStyles from './styles';
import BotUser from 'assets/icon/BotUser.svg';
import { useTranslation } from 'react-i18next';
import { formatNumber } from 'utils/common';
import PerformanceChart from '../PerformanceChart';
import { useDispatch } from 'react-redux';
import { setCurrentUserSubAccount } from 'reduxs/global-actions/UserInfo';
import { AdvisorActions, AdvisorSelectors } from 'reduxs';
import Heart from 'assets/icon/Heart.svg';
import NoHeart from 'assets/icon/NoHeart.svg';

type Props = {
  item: number;
  onHearted: (id: number) => void;
};

const HIT_SLOPE = { top: 10, bottom: 10, left: 10, right: 10 };

const AdvisorTab = ({ item, onHearted }: Props) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const { t } = useTranslation();
  const containerRef = useRef<TouchableOpacity>(null);

  const info = useAppSelector(AdvisorSelectors.selectAdvisorInfo(item));
  const profitLoss = useAppSelector(AdvisorSelectors.selectAdvisorProfitLoss(item));
  const viewsAndFollows = useAppSelector(AdvisorSelectors.selectAdvisorViewsAndFollows(item));
  const isFollowing = useAppSelector(AdvisorSelectors.isFollowing(item));
  const currentSubAccountSubscription = useAppSelector(state => {
    const subAccount = state.selectedAccount.selectedSubAccount?.accountNumber;
    if (subAccount == null) return null;
    return state.copyTrade.subscription[subAccount];
  });
  const isSubscribed =
    currentSubAccountSubscription != null && currentSubAccountSubscription.followingID === info?.username;

  const profitLossRatio =
    profitLoss != null
      ? {
          week: profitLoss.oneWeekProfitLoss.navProfitRatio,
          month: profitLoss.oneMonthProfitLoss.navProfitRatio,
          year: profitLoss.oneYearProfitLoss.navProfitRatio,
        }
      : null;

  const goToUserWall = useCallback(() => {
    dispatch(setCurrentUserSubAccount('000')); // bot wont join contest
    navigate({
      key: 'UserWall',
      params: {
        userData: info,
        headerTitle: 'AI Insights',
        defaultSample: 30,
        isFromSearch: true,
      },
    });
    dispatch(AdvisorActions.increaseViewsCount(item));
  }, [info, item]);

  const followRobo = useCallback(() => {
    onHearted(item);
    dispatch(
      AdvisorActions.followAdvisor({
        payload: item,
      })
    );
  }, [item]);

  const unFollowRobo = useCallback(() => {
    dispatch(
      AdvisorActions.unFollowAdvisor({
        payload: item,
      })
    );
  }, [item]);

  if (info == null) return null;

  return (
    <TouchableOpacity ref={containerRef} style={styles.advisorContainer} onPress={goToUserWall}>
      <View style={styles.cardHeaderContainer}>
        <View style={styles.avatarImg}>
          <BotUser width={scaleSize(42)} height={scaleSize(42)} />
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} allowFontScaling={false} style={styles.nameText}>
            {info.fullname}
          </Text>
          <Text numberOfLines={1} allowFontScaling={false} style={styles.usernameText}>
            ({info.username})
          </Text>
        </View>
        {isSubscribed && (
          <View style={styles.copyingContainer}>
            <Text numberOfLines={1} allowFontScaling={false} style={styles.copyingText}>
              {t('Copying')}!
            </Text>
          </View>
        )}
        {/* {showFollowButton ? (
          isFollowing ? (
            <View style={styles.followingContainer} hitSlop={HIT_SLOPE}>
              <Text numberOfLines={1} allowFontScaling={false} style={styles.followingText}>
                {t('Following')}
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.followContainer} onPress={followRobo} hitSlop={HIT_SLOPE}>
              <Text numberOfLines={1} allowFontScaling={false} style={styles.followText}>
                {t('Follow')}
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.unFollowContainer} onPress={unFollowRobo} hitSlop={HIT_SLOPE}>
            <Text numberOfLines={1} allowFontScaling={false} style={styles.unfollowText}>
              {t('Unfollow')}
            </Text>
          </TouchableOpacity>
        )} */}
        {isFollowing ? (
          <TouchableOpacity style={styles.followedIcon} hitSlop={HIT_SLOPE} onPress={unFollowRobo}>
            <Heart width={scaleSize(20)} height={scaleSize(19)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.followedIcon} hitSlop={HIT_SLOPE} onPress={followRobo}>
            <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.performanceContainer}>
        {profitLossRatio ? (
          <View style={styles.performanceInfo}>
            <PerformanceRow title="Week" value={profitLossRatio.week} />
            <PerformanceRow title="Month" value={profitLossRatio.month} />
            <PerformanceRow title="Year" value={profitLossRatio.year} />
          </View>
        ) : (
          <View style={styles.performanceInfoSkeleton} />
        )}
        <View style={globalStyles.container}>
          <PerformanceChart userId={item} />
        </View>
      </View>
      <View style={styles.viewsAndFollowsContainer}>
        <View style={styles.viewsAndFollows}>
          <Text allowFontScaling={false} style={styles.viewsAndFollowsTitle}>
            {t('Views')}:
          </Text>
          <Text allowFontScaling={false} style={styles.viewsAndFollowsValue}>
            {viewsAndFollows?.totalViews ?? '0'}
          </Text>
        </View>
        <View style={styles.viewsAndFollows}>
          <Text allowFontScaling={false} style={styles.viewsAndFollowsTitle}>
            {t('Followers')}:
          </Text>
          <Text allowFontScaling={false} style={styles.viewsAndFollowsValue}>
            {viewsAndFollows?.totalFollowers ?? '0'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AdvisorTab);

type PerformanceRowProps = {
  title: string;
  value: number;
};

const PerformanceRow = memo(({ title, value }: PerformanceRowProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.performanceInfoRow}>
      <Text allowFontScaling={false} style={styles.periodText}>
        {t(title)}
      </Text>
      <Text allowFontScaling={false} style={value > 0 ? styles.performanceUp : styles.performanceDown}>
        {formatNumber(value, 2, undefined, true)}%
      </Text>
    </View>
  );
});
