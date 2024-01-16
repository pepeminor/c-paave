import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize } from 'styles';
import KisEKYCStepFinal from 'assets/icon/KisEKYCStepFinal.svg';
import EKYCDoneFinalIcon from 'assets/icon/EKYCDoneFinalIcon.svg';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { CONNECT_SEC_FLOW } from 'global';
import { OneSignalUtils, alertMessage, navigateClean, navigationRef } from 'utils';
import { INavigationAction } from 'interfaces/common';
import { RealAccountSec } from 'screens/AccountTrading';
import { AuthType } from 'constants/AuthType';
import { onCloseModalOTPKIS, setAuthToken } from 'reduxs/global-actions';
import { CommonActions } from '@react-navigation/native';

const KisEKYCFinalStep = (props: StackScreenProps<'KisEKYCFinalStep'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [isVisibleModal, setIsVisibeModal] = useState<boolean>(false);
  const autoSignupOTP = useSelector((state: IState) => state.autoSignupOTP);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const DoneEkyc = async () => {
    if (props.route.params.sec === RealAccountSec.KIS) {
      if (autoSignupOTP.data != null) {
        const authToken = {
          accessToken: autoSignupOTP.data.loginResult.accessToken,
          refreshToken: autoSignupOTP.data.loginResult.refreshToken,
          accExpiredTime: autoSignupOTP.data.loginResult.accExpiredTime,
          refExpiredTime: autoSignupOTP.data.loginResult.refExpiredTime,
        };
        dispatch(setAuthToken(authToken));
      }
      setIsVisibeModal(true);
    } else if (props.route.params.flow === CONNECT_SEC_FLOW.AUTH && props.route.params.sec === AuthType.PAAVE) {
      props.navigation.navigate(ScreenNames.AccountTrading);
    } else {
      navigateClean({ key: ScreenNames.SignupCongratulation, clean: true } as INavigationAction);
    }
  };

  const onConfirmModal = () => {
    if (props.route.params.flow === CONNECT_SEC_FLOW.SIGNUP) {
      if (autoSignupOTP.data != null) {
        if (autoSignupOTP.data.loginResult.accessToken != null && autoSignupOTP.data.loginResult.accessToken !== '') {
          const paaveUserInfo = autoSignupOTP.data.loginResult.userInfo;

          if (paaveUserInfo != null) {
            OneSignalUtils.sendLoginTag({
              userid: paaveUserInfo.id != null ? paaveUserInfo.id.toString() : '',
              username: paaveUserInfo.username != null ? paaveUserInfo.username : '',
              // status: 'signin-partner',
            });
          }
          setIsVisibeModal(false);
          navigateClean({ key: ScreenNames.HomeTab, clean: true } as INavigationAction);
        } else if (autoSignupOTP.data.loginResult.error === 'GET_TOKEN_FAILED') {
          props.navigation.navigate(ScreenNames.SignIn);
          setIsVisibeModal(false);
          alertMessage('danger', 'auto Signup', 'GET_TOKEN_FAILED');
        }
      }
    }
    if (props.route.params.flow === CONNECT_SEC_FLOW.LEADERBOARD) {
      // reset to LeaderBoard and can goback to HomeTab
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [{ name: 'HomeTab' }, { name: ScreenNames.LeaderBoard, params: { tabLeaderBoard: false } }],
      });
      navigationRef.dispatch(resetAction);
      dispatch(onCloseModalOTPKIS({}));
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={false}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStepFinal height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
      />
      <EKYCDoneFinalIcon height={scaleSize(72)} width={scaleSize(72)} style={styles.iDCardContainer} />
      <Text style={styles.titleText} allowFontScaling={false}>
        {t('We have received your information')}
      </Text>
      <Text style={styles.titleText2} allowFontScaling={false}>
        {t(
          'Please checking your email to complete the account opening request and receiveing instructions on completing the securities account opening contract'
        )}
      </Text>
      <View style={[globalStyles.centered, styles.executeButtonContainer]}>
        <TouchableOpacity
          style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
          onPress={DoneEkyc}
        >
          <Text style={styles.executeButtonText} allowFontScaling={false}>
            {t('Finish')}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={isVisibleModal}>
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={[styles.modalContent, globalStyles.centered]}>
                <Text style={styles.content1}>{t('Open account profile is received')}</Text>
                <Text style={[styles.content, styles.marginTop16]}>
                  {t("Now you can enjoy Paave service with Paave account's information sent to your email.")}
                </Text>
                <View style={globalStyles.fillWidth}>
                  <TouchableOpacity
                    onPress={onConfirmModal}
                    style={[globalStyles.centered, styles.executeFormButton2, styles.marginTop30]}
                  >
                    <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                      {t('OK')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default KisEKYCFinalStep;
