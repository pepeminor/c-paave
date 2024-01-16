import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useStyles from '../styles';
import { useTranslation } from 'react-i18next';
import ContestNotificationIcon from 'assets/icon/ContestNotification.svg';
import ArrowRightContestIcon from 'assets/icon/ArrowRightContestIcon.svg';
import { navigate } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import withMemo from 'HOC/withMemo';
import { ACCOUNT_TYPE } from 'global';
import { useDispatch } from 'react-redux';
import { LEADER_BOARD_CONTEST_MODAL } from 'reduxs/actions';

const ButtonContestHappening = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const [{ selectTabLeaderBoard }] = useContext(LeaderboardContext);

  const contests = useAppSelector(state => state.contests?.contests);
  const leaderboardAccountSelected = useAppSelector(state => state.leaderboardAccountSelector);

  const handleOnPress = () => {
    switch (leaderboardAccountSelected) {
      case ACCOUNT_TYPE.KIS:
        // open LEADER_BOARD_CONTEST_MODAL
        dispatch({ type: LEADER_BOARD_CONTEST_MODAL, payload: false });
        return;
      default:
        return navigate({
          key: 'Contest',
        });
    }
  };
  // check all contest Happen now
  const isContestsHapping = contests?.filter(ele => ele.status === 'Happen now');

  const TextContest = () => {
    switch (leaderboardAccountSelected) {
      case ACCOUNT_TYPE.KIS:
        return <Text style={[styles.contestText, styles.paddingLeft16]}>{t('Kis_Leaderboard_Notification')}</Text>;
      default:
        return (
          <Text style={[styles.contestText, styles.paddingLeft16]}>
            {isContestsHapping && isContestsHapping.length} {t('contest is happening')}
          </Text>
        );
    }
  };

  const RightIcon = () => {
    switch (leaderboardAccountSelected) {
      case ACCOUNT_TYPE.KIS:
        return <Text style={styles.contestIconInfo}>i</Text>;
      default:
        return <ArrowRightContestIcon style={styles.marginContent} />;
    }
  };

  if (!selectTabLeaderBoard) return null;
  return isContestsHapping != null && isContestsHapping.length > 0 ? (
    <TouchableOpacity onPress={handleOnPress} style={styles.btnContestHappen}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ContestNotificationIcon />
        <TextContest />
      </View>
      <RightIcon />
    </TouchableOpacity>
  ) : null;
};

export default withMemo(ButtonContestHappening);
