import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { memo } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { closeKycKisModal } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { RealAccountSec } from 'screens/AccountTrading';
import { CONNECT_SEC_FLOW } from 'global';

const KycKisModalContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const showKycKISModal = useAppSelector(state => state.showKycKISModal);
  const loginData = useAppSelector(state => state.loginData);

  const closeModal = () => {
    dispatch(closeKycKisModal({}));
  };

  const goToConnectNow = () => {
    closeModal();
    navigate({
      key: ScreenNames.LoginRealAccount,
      params: {
        sec: RealAccountSec.KIS,
        flow: CONNECT_SEC_FLOW.LEADERBOARD,
      },
    });
  };

  const goToEKycNow = () => {
    closeModal();
    navigate({
      key: ScreenNames.KisEKYCAbout,
      params: {
        email: loginData?.userInfo?.email,
        flow: CONNECT_SEC_FLOW.LEADERBOARD,
        sec: RealAccountSec.KIS,
      },
    });
  };

  return (
    <Modal visible={showKycKISModal} onRequestClose={closeModal}>
      <View style={[styles.modalBackground, globalStyles.modalBackground2]}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.leaderBoardJoinContent}>
            {t(
              'To be eligible for this contest, your Paave account must be connected to your KIS Real Trading Account. Follow the instructions below to ensure that you are ready to participate.'
            )}
            :
          </Text>
          <Text style={[styles.leaderBoardJoinContent]}>{t('You already have KIS account?')}</Text>
          <Text
            onPress={goToConnectNow}
            style={[styles.leaderBoardJoinContent, styles.paddingBottom8, styles.leaderBoardJoinContent2]}
          >
            {t('Connect now')}
          </Text>
          <View style={[styles.line]}></View>
          <Text style={[styles.leaderBoardJoinContent, styles.paddingTop8]}>{t('Not yet owned an KIS account?')}</Text>
          <Text
            onPress={goToEKycNow}
            style={[styles.leaderBoardJoinContent, styles.paddingBottom25, styles.leaderBoardJoinContent2]}
          >
            {t('Open now with eKYC')}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={globalStyles.invisibleBackground} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default memo(KycKisModalContent);
