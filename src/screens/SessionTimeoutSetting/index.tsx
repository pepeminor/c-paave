import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import Chooese from 'assets/icon/Chooese.svg';
import UnChooese2 from 'assets/icon/UnChooese2.svg';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SESSION_TIMEOUT, SESSION_TIMEOUT_ENUM } from 'constants/sessionTimeout';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { setKISSessionTimeOut } from './action';
import { StackScreenProps } from 'screens/RootNavigation';
import { useTypedSelector } from 'hooks';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import PaaveText from 'components/PaaveText';
import PaaveButton from 'components/PaaveButton';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { rnBiometrics, store } from 'screens/App';
import { reLoginBiometric } from 'reduxs/global-actions';
import { alertMessage } from 'utils';

interface IOptionProps {
  value: SESSION_TIMEOUT_ENUM;
  setReLoginModal: (value: boolean) => void;
}

const Option = withMemo(({ value, setReLoginModal }: IOptionProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const kisSessionTimeout = useTypedSelector(state => state.kisSessionTimeout.current.value);

  const onPress = () => {
    dispatch(setKISSessionTimeOut(value));
    setReLoginModal(true);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.settingContainer} disabled={kisSessionTimeout === value}>
      <Text allowFontScaling={false} style={styles.settingItemText}>
        {t(SESSION_TIMEOUT[value]!.label)}
      </Text>
      {kisSessionTimeout === value ? (
        <Chooese height={scaleSize(24)} width={scaleSize(24)} />
      ) : (
        <UnChooese2 height={scaleSize(24)} width={scaleSize(24)} />
      )}
    </TouchableOpacity>
  );
});

const SessionTimeoutSetting = (props: StackScreenProps<'SessionTimeoutSetting'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const [reLoginModal, setReLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoginWithBiometric = useTypedSelector(state => state.isLoginWithBiometric);
  const currentUserSetting = useTypedSelector(state => state.currentUserSetting);

  const onRequestClose = () => {
    setReLoginModal(false);
  };

  const onConfirmReLogin = async () => {
    if (isLoginWithBiometric && currentUserSetting != null) {
      try {
        const { keysExist } = await rnBiometrics.biometricKeysExist();
        if (!keysExist) {
          setReLoginModal(false);
          dispatch(
            logOutAction({
              userLogout: true,
              version: store.getState().authToken.version || 0,
            })
          );
          return;
        }
        const { success, signature } = await rnBiometrics.createSignature({
          promptMessage: t('Sign in'),
          cancelButtonText: t('Cancel'),
          payload: currentUserSetting.paaveUsername.toUpperCase(),
        });
        if (!success || signature == null) {
          onCancelBiometric();
          return;
        }
        setLoading(true);
        dispatch(
          reLoginBiometric({
            payload: { signature: signature, username: currentUserSetting.paaveUsername },
            callBack: {
              handleSuccess: () => {
                onDoneBiometric();
              },
              handleFail: () => {
                onCancelBiometric();
              },
            },
          })
        );
      } catch (e) {
        onCancelBiometric();
      }
      return;
    }
    setReLoginModal(false);
    dispatch(
      logOutAction({
        userLogout: true,
        version: store.getState().authToken.version || 0,
      })
    );
  };

  const onDoneBiometric = () => {
    setReLoginModal(false);
    setLoading(false);
    alertMessage('success', t('session_timeout_setting.re_login_success'));
  };

  const onCancelBiometric = () => {
    setLoading(false);
    alertMessage('warning', t('session_timeout_setting.re_login_fail'));
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Session Timeout'} />
      {Object.keys(SESSION_TIMEOUT).map(key => (
        <Option key={key} value={key as SESSION_TIMEOUT_ENUM} setReLoginModal={setReLoginModal} />
      ))}
      <Modal visible={reLoginModal} onRequestClose={onRequestClose}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.modalContainer}>
            {loading ? (
              <ActivityIndicator size={'large'} color={dynamicColors.BlueNewColor} />
            ) : (
              <View style={styles.modalContent}>
                <View style={globalStyles.centered}>
                  <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />
                </View>
                <PaaveText type={TEXT_TYPE.REGULAR_16} style={styles.modalTitle}>
                  {t('session_timeout_setting.re_login_modal_title')}
                </PaaveText>
                <PaaveButton
                  onPress={onConfirmReLogin}
                  type="SOLID"
                  color={dynamicColors.BlueNewColor}
                  style={styles.btnContainer}
                >
                  <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.WHITE}>
                    {t('session_timeout_setting.re_login')}
                  </PaaveText>
                </PaaveButton>
                <PaaveButton
                  onPress={onRequestClose}
                  type="SOLID"
                  color={dynamicColors.AirCraftWhite}
                  style={styles.btnContainer}
                >
                  <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
                    {t('session_timeout_setting.stay_logged_in')}
                  </PaaveText>
                </PaaveButton>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default withMemo(SessionTimeoutSetting);
