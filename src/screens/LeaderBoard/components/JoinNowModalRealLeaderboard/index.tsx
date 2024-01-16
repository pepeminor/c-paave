// 1890 - contest
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles, { Colors } from 'styles';
import Modal from 'components/Modal';
import Icon, { IconWithBackground } from 'components/Icon';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppSelector';
import { REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL } from 'reduxs/actions';
import { convertTextSubAccChoosedToOptIn } from 'screens/LeaderboardSetting/LeaderboardSetting.logic';
import { ReducerStatus } from 'interfaces/reducer';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { changeLeaderboardSetting } from 'screens/LeaderboardSetting/action';
import { isArray } from 'lodash';
import BottomButton from 'components/BottomButton';
import { isNilOrEmpty } from 'ramda-adjunct';

const JoinNowModalRealLeaderboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const showJoinNowRealLeaderBoardModal = useAppSelector(state => state.showJoinNowRealLeaderBoardModal);
  const subAccounts = useAppSelector(state =>
    state.accountList?.KIS?.subAccounts?.filter(i => i.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES)
  );

  const leaderboardSetting = useAppSelector(state => state.leaderboardSetting);
  const leaderBoardInvesting = useAppSelector(state => state.leaderBoardInvesting);
  const prevWhichAccountJoin = leaderboardSetting.data?.subAccount ?? '';

  const [whichAccountJoin, setWhichAccountJoin] = useState(prevWhichAccountJoin);
  const disableConfirmButton = isNilOrEmpty(whichAccountJoin);

  const closeModal = () => {
    dispatch({ type: REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL });
  };

  const handleJoinWhichAccount = (subAccountNumber: string) => {
    if (leaderboardSetting.status === ReducerStatus.LOADING || leaderBoardInvesting.status === ReducerStatus.LOADING) {
      return;
    }

    setWhichAccountJoin(subAccountNumber);
  };

  const handleConfirm = useCallback(() => {
    if (leaderboardSetting.status === ReducerStatus.LOADING) return;
    if (whichAccountJoin === prevWhichAccountJoin) {
      closeModal();

      return;
    }
    const param = {
      partnerId: ACCOUNT_TYPE.KIS.toString().toLocaleLowerCase(),
      optBoard: true,
      subAccount: whichAccountJoin as string,
    };
    dispatch(
      changeLeaderboardSetting({ ...param }, undefined, undefined, undefined, undefined, {
        handleSuccess: () => {
          closeModal();
        },
      })
    );
  }, [dispatch, whichAccountJoin, prevWhichAccountJoin, disableConfirmButton, leaderboardSetting.status]);

  const getBorderBottomStyle = (indexItem: number) => {
    if (isArray(subAccounts) && subAccounts.length - 1 === indexItem) return { borderBottomColor: 'transparent' };
    return null;
  };

  return (
    <Modal visible={showJoinNowRealLeaderBoardModal} onRequestClose={closeModal}>
      <View style={[styles.modalBackground, globalStyles.modalBackground2]}>
        <View style={styles.modalContentContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <IconWithBackground name="close" />
          </TouchableOpacity>
          <Text style={styles.titleModal}>{t('Leaderboard Setting')}</Text>
          <Text style={styles.textDesc2}>{t('Leaderboard_Join_By')}</Text>
          <View style={styles.wrapJoinBy}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={subAccounts}
              style={styles.wrapChooseAccount}
              keyExtractor={(item, idx) => `${item.accountNumber + idx}`}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        handleJoinWhichAccount(item.accountNumber);
                      }}
                      style={styles.touchJoinText}
                    >
                      <Text style={styles.joinText}>
                        {t('Join by ' + convertTextSubAccChoosedToOptIn(item.accountNumber))} ({item.accountNumber})
                      </Text>
                      {whichAccountJoin !== item.accountNumber && <View style={styles.circleShape} />}
                      {leaderboardSetting.status === ReducerStatus.SUCCESS &&
                        whichAccountJoin === item.accountNumber && (
                          <Icon name={'check'} color={Colors.Green1} size={24} />
                        )}
                      {leaderboardSetting.status === ReducerStatus.LOADING &&
                        whichAccountJoin === item.accountNumber && (
                          <ActivityIndicator size={'small'} color={Colors.BLACK} />
                        )}
                    </TouchableOpacity>
                    <View style={[styles.touchBorder, getBorderBottomStyle(index)]} />
                  </View>
                );
              }}
              ListEmptyComponent={
                <TouchableWithoutFeedback style={styles.touchJoinText}>
                  <Text style={styles.joinText}>{t('No_KIS_Account')}</Text>
                </TouchableWithoutFeedback>
              }
            />
          </View>
          <Text style={styles.textDesc}>(*) {t('Leaderboard_Setting_Note')}</Text>
          <BottomButton
            backgroundButton={
              disableConfirmButton
                ? [Colors.BACKGROUND_MODAL, Colors.BACKGROUND_MODAL]
                : [Colors.Yellow5, Colors.Yellow5]
            }
            containerStyle={styles.buttonBottom}
            text={'Join Now'}
            onPress={handleConfirm}
            disabled={disableConfirmButton}
          />
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={globalStyles.invisibleBackground} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default memo(JoinNowModalRealLeaderboard);
