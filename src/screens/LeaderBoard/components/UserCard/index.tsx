import React, { ComponentType, memo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import BotUser from 'assets/icon/BotUser.svg';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import globalStyles, { scaleSize, lightColors as Colors } from 'styles';
import { formatNumber, generateAvatarBG, generateNameAbbreviations, getColor, navigate, navigationRef } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { addAvatar } from 'reduxs/global-actions/LeaderBoard';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import UpArrowIcon from 'assets/icon/UpArrowIcon.svg';
import DownArrowIcon from 'assets/icon/DownArrowIcon.svg';
import CrownIcon from 'assets/icon/CrownIcon.svg';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useAppSelector } from 'hooks/useAppSelector';
import { setCurrentUserSubAccount } from 'reduxs/global-actions';
import { ContestResultItemData } from 'interfaces/File';
import { AdvisorSelectors } from 'reduxs';
import Icon from 'components/Icon';
import Domain from 'screens/LeaderBoard/domain';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';

type LeaderboardAccountProps = {
  data?: ILeaderBoardInvestingResponse;
  dataTopPeopleLastWeek?: ContestResultItemData;
  periodFilter: ILeaderBoardInvestingPeriod | string;
  rank: number;
  width: number;
  height: number;
  top: number;
  topLeaderBoard: boolean;
  selectTabLeaderBoard: boolean;
};

const withLoadingUserCard =
  (Component: ComponentType<Required<LeaderboardAccountProps>>) => (props: LeaderboardAccountProps) => {
    if (props.data == null && props.dataTopPeopleLastWeek == null) return <LoadingUserCard {...props} />;
    return <Component {...(props as Required<LeaderboardAccountProps>)} />;
  };

const LoadingUserCard = memo(({ rank, width, height, top }: LeaderboardAccountProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <View
      style={[
        styles.container,
        {
          width: scaleSize(width),
          height: scaleSize(height),
          marginTop: scaleSize(top),
        },
      ]}
    >
      <View style={styles.userInfo}>
        <View style={{ ...styles.avatarImg, backgroundColor: Colors.LIGHTTitleTable }}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{rank}</Text>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1}></Text>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>-</Text>
        </View>
      </View>
      <View style={styles.bottomInfo}>
        <Text allowFontScaling={false} style={styles.followerText}>
          {t('Return')}
        </Text>
        <Text numberOfLines={1} style={[styles.returnRateText]}>
          0%
        </Text>
      </View>
    </View>
  );
});

const UserCard = memo(
  ({
    data,
    rank,
    width,
    height,
    top,
    periodFilter,
    topLeaderBoard,
    selectTabLeaderBoard,
  }: Required<LeaderboardAccountProps>) => {
    const { styles } = useStyles();
    const dispatch = useDispatch();
    const userAvatar = useAppSelector(state => state.usersAvatar[data.username]);
    const isBot = data.username.includes('advisor');
    const userFullName = useAppSelector(state => {
      if (!isBot) return data.fullname;
      const botData = AdvisorSelectors.selectAdvisorInfo(data.userId)(state);
      return botData?.fullname ?? data.fullname;
    });
    const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

    useEffect(() => {
      if (!userAvatar) {
        dispatch(
          addAvatar({
            [data.username]: generateAvatarBG(),
          })
        );
      }
    }, [userAvatar]);

    const goToUserWall = useCallback(() => {
      track(AMPLITUDE_EVENT.VIEW_USER_PROFILE, {
        username: data.username,
        fullname: data.fullname,
        rank: rank,
        periodFilter: periodFilter,
      });
      const geDefaultSample = () => {
        switch (periodFilter) {
          case ILeaderBoardInvestingPeriod.YEAR:
            return 365;
          case ILeaderBoardInvestingPeriod.MONTH:
            return 30;
          default:
            return 7;
        }
      };
      navigate({
        key: ScreenNames.UserWall,
        params: {
          userData: data,
          defaultSample: geDefaultSample(),
          selectTabLeaderBoard: selectTabLeaderBoard,
          isFromSearch: false,
        },
      });

      dispatch(setCurrentUserSubAccount(data.subAccount));
    }, [data, rank, periodFilter, selectTabLeaderBoard]);

    const requiredLogin = useCallback(() => {
      dispatch(showNonLoginModal());
    }, []);

    // 1890 - contest
    return (
      <TouchableOpacity
        onPress={Domain[selectedAccountType].goToUserWallScreen ? goToUserWall : requiredLogin}
        style={[
          styles.container,
          {
            width: scaleSize(width),
            height: scaleSize(height),
            marginTop: scaleSize(top),
          },
        ]}
        disabled={data.userId === 0 ? true : false}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatarImgContainer}>
            <View
              style={[
                {
                  ...styles.avatarImg,
                  backgroundColor: userAvatar ?? 'white',
                },
                topLeaderBoard
                  ? {
                      height: scaleSize(80),
                      width: scaleSize(80),
                    }
                  : {
                      height: scaleSize(60),
                      width: scaleSize(60),
                    },
              ]}
            >
              {isBot ? (
                <BotUser width={scaleSize(64)} height={scaleSize(64)} />
              ) : (
                <Text allowFontScaling={false} style={styles.avatarImgText}>
                  {generateNameAbbreviations(data.fullname)}
                </Text>
              )}
              <View
                style={[
                  styles.badge,
                  globalStyles.centered,
                  topLeaderBoard
                    ? {
                        height: scaleSize(34),
                        width: scaleSize(34),
                        borderRadius: 20,
                      }
                    : {
                        height: scaleSize(22),
                        width: scaleSize(22),
                        borderRadius: 15,
                      },
                ]}
              >
                {topLeaderBoard ? (
                  <CrownIcon
                    width={Platform.OS === 'ios' ? scaleSize(24) : scaleSize(22)}
                    height={Platform.OS === 'ios' ? scaleSize(24) : scaleSize(22)}
                  />
                ) : (
                  <Text style={styles.badgeText}>{rank}</Text>
                )}
              </View>
            </View>
          </View>

          <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1}>
            {userFullName}
          </Text>
          <Text allowFontScaling={false} style={styles.usernameText} numberOfLines={1}>
            @{data.username}
          </Text>
        </View>

        <View style={styles.bottomInfo}>
          {data.rankingChanged > 0 ? <Icon name="arrow-up" size={scaleSize(12)} color={Colors.LIGHTGreen} /> : null}
          {data.rankingChanged < 0 ? <Icon name="arrow-down" size={scaleSize(12)} color={Colors.LIGHTRed} /> : null}
          <Text style={[getColor(data.rankingChanged, 0, undefined, undefined, true).textStyle, styles.rankText]}>
            {data.rankingChanged === 0 ? '' : Math.abs(data.rankingChanged)}
          </Text>

          {data.investmentReturn > 0 ? <UpArrowIcon /> : null}
          {data.investmentReturn < 0 ? <DownArrowIcon /> : null}
          {data.investmentReturn === 0 && <View style={styles.empty} />}
          <Text
            numberOfLines={1}
            style={[
              data.investmentReturn > 0
                ? globalStyles.colorUp
                : data.investmentReturn === 0
                ? globalStyles.colorSteady
                : globalStyles.colorDown,
              styles.rankText,
            ]}
          >
            {`${formatNumber(data.investmentReturn, 2, undefined, true)}%`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const UserCardTopPeopleLastWeekComponent = ({
  dataTopPeopleLastWeek,
  rank,
  width,
  height,
  top,
  topLeaderBoard,
  periodFilter,
}: Required<LeaderboardAccountProps>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const userAvatar = useAppSelector(state => state.usersAvatar[dataTopPeopleLastWeek.username]);

  useEffect(() => {
    if (!userAvatar) {
      dispatch(
        addAvatar({
          [dataTopPeopleLastWeek.username]: generateAvatarBG(),
        })
      );
    }
  }, [userAvatar]);

  const goToUserWallScreen = () => {
    const geDefaultSample = () => {
      switch (periodFilter) {
        case ILeaderBoardInvestingPeriod.YEAR:
          return 365;
        case ILeaderBoardInvestingPeriod.MONTH:
          return 30;
        default:
          return 7;
      }
    };

    navigationRef.navigate(ScreenNames.UserWall, {
      userData: {
        ...dataTopPeopleLastWeek,
        fullname: dataTopPeopleLastWeek.fullName,
      } as unknown as ILeaderBoardInvestingResponse,
      defaultSample: geDefaultSample(),
    });
    dispatch(setCurrentUserSubAccount(dataTopPeopleLastWeek.subAccount));
  };

  // 1890 - contest
  return (
    <TouchableOpacity
      onPress={goToUserWallScreen}
      style={[
        styles.container,
        {
          width: scaleSize(width),
          height: scaleSize(height),
          marginTop: scaleSize(top),
        },
      ]}
      disabled={Number(dataTopPeopleLastWeek.userId) === 0 ? true : false}
    >
      <View style={styles.userInfo}>
        <View style={styles.avatarImgContainer}>
          <View
            style={[
              {
                ...styles.avatarImg,
                backgroundColor: userAvatar ?? 'white',
              },
              topLeaderBoard
                ? {
                    height: scaleSize(80),
                    width: scaleSize(80),
                  }
                : {
                    height: scaleSize(60),
                    width: scaleSize(60),
                  },
            ]}
          >
            <Text allowFontScaling={false} style={styles.avatarImgText}>
              {generateNameAbbreviations(dataTopPeopleLastWeek.fullName)}
            </Text>
            <View
              style={[
                styles.badge,
                globalStyles.centered,
                topLeaderBoard
                  ? {
                      height: scaleSize(34),
                      width: scaleSize(34),
                      borderRadius: 20,
                    }
                  : {
                      height: scaleSize(22),
                      width: scaleSize(22),
                      borderRadius: 15,
                    },
              ]}
            >
              {topLeaderBoard ? (
                <CrownIcon
                  width={Platform.OS === 'ios' ? scaleSize(24) : scaleSize(22)}
                  height={Platform.OS === 'ios' ? scaleSize(24) : scaleSize(22)}
                />
              ) : (
                <Text style={styles.badgeText}>{rank}</Text>
              )}
            </View>
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1}>
          {dataTopPeopleLastWeek.fullName}
        </Text>
        <Text allowFontScaling={false} style={styles.usernameText} numberOfLines={1}>
          @{dataTopPeopleLastWeek.username}
        </Text>
      </View>

      <View style={styles.bottomInfo}>
        {dataTopPeopleLastWeek.rankingChanged > 0 ? (
          <Icon name="arrow-up" size={scaleSize(12)} color={Colors.LIGHTGreen} />
        ) : null}
        {dataTopPeopleLastWeek.rankingChanged < 0 ? (
          <Icon name="arrow-down" size={scaleSize(12)} color={Colors.LIGHTRed} />
        ) : null}
        <Text
          style={[
            getColor(dataTopPeopleLastWeek.rankingChanged, 0, undefined, undefined, true).textStyle,
            styles.rankText,
          ]}
        >
          {dataTopPeopleLastWeek.rankingChanged === 0 ? '-' : Math.abs(dataTopPeopleLastWeek.rankingChanged)}
        </Text>
        {dataTopPeopleLastWeek.rankingChanged > 0 ? <UpArrowIcon /> : null}
        {dataTopPeopleLastWeek.rankingChanged < 0 ? <DownArrowIcon /> : null}
        <Text allowFontScaling={false} style={styles.followerText}>
          {t('LN')}:
        </Text>
        <Text numberOfLines={1} style={[getColor(dataTopPeopleLastWeek.returnRate, 0).textStyle, styles.rankText]}>
          {`${formatNumber(dataTopPeopleLastWeek.returnRate, 2, undefined, true)}%`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const UserCardTopPeopleLastWeek = memo(withLoadingUserCard(UserCardTopPeopleLastWeekComponent));

export default withLoadingUserCard(UserCard);
