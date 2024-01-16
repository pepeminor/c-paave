import { View, Text, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import { useDispatch } from 'react-redux';
import { openJoinNowLeaderBoardModal } from 'reduxs/global-actions';
import { REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL } from 'reduxs/actions';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { openKycKisModal } from 'reduxs/global-actions';
import { navigate, formatDateStringWithTimezone } from 'utils';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import { ContestResultItemData } from 'interfaces/File';
import { IProps } from './Top.type';
import { DATE_FORMAT_DISPLAY_MOMENT, TIME_FORMAT_DISPLAY } from 'constants/main';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import useStyles from './styles';
import globalStyles, { Colors } from 'styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { convertTextSubAccChoosedToOptIn } from 'screens/LeaderboardSetting/LeaderboardSetting.logic';
import { IconWithBackground } from 'components/Icon';

type LeaderboardAccountProps = {
  data?: ILeaderBoardInvestingResponse[];
  updatedDateTime?: string;
  selectTabLeaderBoard: boolean;
  periodFilter: ILeaderBoardInvestingPeriod | string;
  tradingContestFilter?: string;
  dataTopPeopleLastWeek?: ContestResultItemData[];
  currentWeek?: number;
  eachWeek?: number;
};

const useTopLogic = (props: LeaderboardAccountProps & IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const {
    accountContestRegistered,
    currentTime,
    lastJoinableFromJson,
    getVirtualCoreContestListed,
    subMenuContest,
    isHaveKISAccount,
    leaderboardAccountSelector,
    isKisLeaderboardSelected,
    isDemoSelected,
    isOptBoardLeaderboard,
    subAccountJoinLeaderboard,
  } = props;

  const { data, tradingContestFilter, selectTabLeaderBoard, currentWeek, eachWeek, updatedDateTime } = props;

  const isLastWeek = !selectTabLeaderBoard && currentWeek != null && eachWeek != null && currentWeek > eachWeek;

  const isPassedTheFinals = subMenuContest != null && currentTime > subMenuContest.endAt; // time show list: the current time passes the end time of the contest

  const checkAccountBeforeJoin = () => {
    if (isDemoSelected) {
      dispatch(showNonLoginModal());
      return;
    }
    return dispatch(openKycKisModal({}));
  };

  const openJoinNowModal = () => {
    if (isHaveKISAccount) return dispatch(openJoinNowLeaderBoardModal({}));
    return checkAccountBeforeJoin();
  };

  const openJoinRealLeaderBoard = () => {
    if (isHaveKISAccount) return dispatch({ type: REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL });
    return checkAccountBeforeJoin();
  };

  const goToTermAndCondition = () => {
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0 },
    });
  };

  const goToLeaderboardSetting = () => {
    navigate({
      key: ScreenNames.LeaderboardSetting,
    });
  };

  const isShowJoinNowButton = useMemo(() => {
    if (isLastWeek) return;
    if (currentTime == null) return;
    if (selectTabLeaderBoard) return;
    if (leaderboardAccountSelector === ACCOUNT_TYPE.KIS) return;
    const isLastJoinAbleAt =
      getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length !== 0
        ? getVirtualCoreContestListed.data[0].lastJoinAbleAt
        : lastJoinableFromJson;
    const isContestTimeout = isLastJoinAbleAt ? Number(isLastJoinAbleAt) > Number(currentTime) : false;
    // case non login
    const isNonLogin = isDemoSelected && !selectTabLeaderBoard;
    // case login
    const isLogined =
      accountContestRegistered === ESubAccountJoinedContest.NOT_JOIN && isContestTimeout && !selectTabLeaderBoard;
    return isNonLogin || isLogined;
  }, [
    isLastWeek,
    accountContestRegistered,
    selectTabLeaderBoard,
    getVirtualCoreContestListed.data,
    leaderboardAccountSelector,
    currentTime,
    currentWeek,
    eachWeek,
  ]);

  const isShowRealJoinNowButton = useMemo(() => {
    return isKisLeaderboardSelected && isOptBoardLeaderboard;
  }, [isKisLeaderboardSelected, isOptBoardLeaderboard]);

  const descriptionContest = useMemo(() => {
    // All-User Tab
    if (!selectTabLeaderBoard && subMenuContest != null && tradingContestFilter === subMenuContest.name[0].tab) {
      return (
        <Text allowFontScaling={false} style={styles.note}>
          (*){' '}
          {t(
            'All Users leaderboard includes virtual accounts that have enrolled in the contest and have at least one fully filled order'
          )}
          .
        </Text>
      );
    }

    // Qualified-User Tab
    if (!selectTabLeaderBoard && subMenuContest != null && tradingContestFilter !== subMenuContest.name[0].tab) {
      return (
        <View style={[globalStyles.flexDirectionRow]}>
          <Text allowFontScaling={false} style={styles.note}>
            (*) {t('Qualified Users leaderboard includes virtual accounts that meet the contest eligibility criteria')}{' '}
            <Text allowFontScaling={false} style={styles.textBold} onPress={goToTermAndCondition}>
              {t('here')}.
            </Text>
          </Text>
        </View>
      );
    }

    return (
      <Text allowFontScaling={false} style={styles.note}>
        {t('Leaderboard currently is ranked by Virtual account only')}
      </Text>
    );
  }, [data, subMenuContest, tradingContestFilter, selectTabLeaderBoard]);

  const descriptionKisLeaderboard = useMemo(() => {
    return (
      <Text allowFontScaling={false} style={styles.note}>
        {t('Kis_Leaderboard_Message')}
      </Text>
    );
  }, []);

  const lastUpdateTime = useMemo(() => {
    if (data == null) return;
    return updatedDateTime != null && data != null && data.length > 0 ? (
      <Text allowFontScaling={false} style={[styles.note]}>
        {t('Last Updated')}:{' '}
        {formatDateStringWithTimezone(
          updatedDateTime != null ? updatedDateTime : '',
          `${TIME_FORMAT_DISPLAY} ${DATE_FORMAT_DISPLAY_MOMENT}`,
          `HH:mm ${DATE_FORMAT_DISPLAY_MOMENT}`
        )}
      </Text>
    ) : null;
  }, [data, updatedDateTime]);

  const ButtonJoinNowForRealLeaderboard = () => {
    return (
      <TouchableOpacity onPress={openJoinRealLeaderBoard} style={styles.realLeaderBoardJoinContainer}>
        <Text style={styles.leaderBoardJoinText}>{t('Join Now')}</Text>
      </TouchableOpacity>
    );
  };

  const ButtonJoinNowVirtualLeaderboard = () => {
    return (
      <TouchableOpacity onPress={openJoinNowModal} style={styles.leaderBoardJoinContainer}>
        <Text style={styles.leaderBoardJoinText}>{t('Join Now')}</Text>
      </TouchableOpacity>
    );
  };

  const ButtonSwitchAccount = () => {
    if (!subAccountJoinLeaderboard) return null;
    return (
      <View style={styles.wrapSwitch}>
        <Text style={styles.leaderBoardChangeAccountText}>
          (*) {t('Join by ' + convertTextSubAccChoosedToOptIn(subAccountJoinLeaderboard))} ({subAccountJoinLeaderboard})
        </Text>
        <TouchableOpacity onPress={goToLeaderboardSetting}>
          <Text style={styles.leaderBoardChangeAccountEdit}>
            <IconWithBackground name="edit" iconColor={Colors.Blue5} size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const buttonJoinRealLeaderboard = useMemo(() => {
    if (!isKisLeaderboardSelected) return null;
    if (!isHaveKISAccount) return <ButtonJoinNowForRealLeaderboard />;
    return isOptBoardLeaderboard ? <ButtonSwitchAccount /> : <ButtonJoinNowForRealLeaderboard />;
  }, [isShowRealJoinNowButton, isKisLeaderboardSelected]);

  const buttonJoinNowVirtual = useMemo(() => {
    if (isKisLeaderboardSelected) return null;
    if (isShowJoinNowButton) return <ButtonJoinNowVirtualLeaderboard />;
    return null;
  }, [isShowJoinNowButton, isKisLeaderboardSelected]);

  return {
    logic: {
      isLastWeek,
      isPassedTheFinals,
      isShowJoinNowButton,
      isShowRealJoinNowButton,
      openJoinNowModal,
      openJoinRealLeaderBoard,
    },
    ui: {
      buttonJoinRealLeaderboard,
      buttonJoinNowVirtual,
      descriptionContest,
      descriptionKisLeaderboard,
      lastUpdateTime,
    },
  };
};

export { useTopLogic };
