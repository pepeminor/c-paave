// 1890 - contest
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { memo } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { closeJoinNowLeaderBoardModal, postJoinNow } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { navigate } from 'utils';

const JoinNowModalContent = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const showJoinNowLeaderBoardModal = useAppSelector(state => state.showJoinNowLeaderBoardModal);

  const closeModal = async () => {
    dispatch(closeJoinNowLeaderBoardModal({}));
  };

  const handleJoinNowButton = () => {
    dispatch(postJoinNow({}));
  };

  const goToTermAndCondition = () => {
    closeModal();
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0 },
    });
  };

  return (
    <Modal visible={showJoinNowLeaderBoardModal} onRequestClose={closeModal}>
      <View style={[styles.modalBackground, globalStyles.modalBackground2]}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.leaderBoardJoinContent}>
            {t('Please read the following notices before entering the contest')}:
          </Text>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignStart]}>
            <Text style={styles.dot}>{'\u2022'}</Text>
            <Text style={[styles.leaderBoardJoinContent, styles.paddingLeft12]}>
              {t('Your account will be reset to be qualified joining the KIS Contest')}.
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignStart]}>
            <Text style={styles.dot}>{'\u2022'}</Text>
            <Text style={[styles.leaderBoardJoinContent, styles.paddingLeft12]}>
              {t('After the KIS contest is ended, your account will be restored to its pre-contest state')}.
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignStart]}>
            <Text style={styles.dot}>{'\u2022'}</Text>
            <Text style={[styles.leaderBoardJoinContent, styles.paddingLeft12]}>
              {t(
                'During the KIS Contest, all of your trading activities and history will be utilized for the purposes of the competition'
              )}
              .
            </Text>
          </View>
          <Text style={[styles.leaderBoardJoinContent, styles.paddingBottom25]}>
            {t('For more details about the contest, please refer to')}{' '}
            <Text onPress={goToTermAndCondition} style={styles.leaderBoardJoinContent2}>
              {t('here')}.
            </Text>
          </Text>
          <TouchableOpacity onPress={handleJoinNowButton} style={styles.leaderBoardJoinContainer}>
            <Text style={styles.leaderBoardJoinText}>{t('Join Now')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={globalStyles.invisibleBackground} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default memo(JoinNowModalContent);
