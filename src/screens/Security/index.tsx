/* eslint-disable no-console */
import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import SettingItemArrow from 'assets/icon/SettingItemArrow.svg';
import Switch from 'components/Switch';
import { BIOMETRIC_TYPE } from 'global';
// import Switch from 'components/Switch';
// import { getKey, removeKey, setKey } from 'utils';
// import { BIOMETRIC_TYPE, PUBLIC_KEY_BIOMETRIC, USERNAME_BIOMETRIC } from 'global';
import globalStyles, { scaleSize, Colors } from 'styles';
import useStyles from './styles';
// import IconSupport from 'assets/icon/IconSupport.svg';
import HeaderScreen from 'components/HeaderScreen';
import { Global } from 'constants/main';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import Modal from 'components/Modal';
import { rnBiometrics } from 'screens/App';
import { registerBiometric, unregisterBiometric, registerBiometricKis, queryBiometricStatus } from './actions';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ACCOUNT_TYPE } from 'global';
import PlatformWrapperScrollView from 'components/PlatformWrapperScrollView';
import TextInputComponent from 'components/TextInput';
import ModalOTP from 'components/ModalOTPKIS';
import { IBiometricRegisterKisParams, IQueryBiometricStatusRequest } from '../../interfaces/common';
import { logOutAction } from '../UserInfo/AlreadyLogin/actions';
import PasswordIcon from 'assets/icon/Lock.svg';
import { updateCurrentUserSetting, updateUsersSetting } from '../../reduxs/global-actions/UserInfo';
import { localColors } from '../SignIn/components/Form/styles';
import config from 'config';
import {
  generateNewKisCard,
  generateKisCardFrom,
  onCloseModalOTPKIS,
} from '../../reduxs/global-actions/Authentication';
import { AuthenticationActions } from 'reduxs';
import ModalRequestCreatePassword from 'components/ModalRequestCreatePassword';
import { SESSION_TIMEOUT } from 'constants/sessionTimeout';

const Security = (props: StackScreenProps<'Security'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const accountList = useAppSelector(state => state.accountList);
  const registerBiometricSuccessTrigger = useAppSelector(state => state.registerBiometricSuccessTrigger);
  const registerBiometricFailedTrigger = useAppSelector(state => state.registerBiometricFailedTrigger);
  const kisSessionTimeout = useAppSelector(state => state.kisSessionTimeout.current.value);
  const dispatch = useDispatch();
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisAuthToken = useAppSelector(state => state.kisAuthToken);
  const userInfoFromLogin = useAppSelector(state => state.userInfoFromLogin);
  const sessionVersion = useAppSelector(state => state.authToken.version);
  const currentBiometricUsername = useAppSelector(state => state.usersSetting.currentBiometricUsername);
  const biometricStatus = useAppSelector(state => state.queryBiometricStatus);
  const isAvailablePassword = useAppSelector(state => !!state.getUserAccountInfo.data?.isPasswordCreated);

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [biometricSwitch, setBiometricSwitch] = useState<boolean | null>(null);
  const [warningModalVisible, setWarningModalVisible] = useState<boolean>(false);
  const [registeredWarningVisible, setRegisteredWarningVisible] = useState<boolean>(false);
  const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorContent, setPasswordErrorContent] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const inputRef = React.useRef<TextInput>(null);
  const isDisable = password === '';

  const isPasswordCreated = useMemo(() => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) return true;

    return isAvailablePassword;
  }, [isAvailablePassword, selectedAccount.type]);

  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const goToChangePassword = () => {
    isPasswordCreated ? props.navigation.navigate('ChangePassword') : props.navigation.navigate('CreatePassword');
  };

  const goToChangePIN = () => {
    props.navigation.navigate('ChangePIN');
  };

  const goToSessionTimeoutSetting = () => {
    props.navigation.navigate('SessionTimeoutSetting');
  };

  // DO NOT DELETE THIS COMMENT
  const onChangeBiometricSwitch = async () => {
    if (biometricSwitch === false) {
      if (!isAvailablePassword && selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        dispatch(AuthenticationActions.showModalRequestPassword());

        return;
      }

      if (Global.biometricType !== BIOMETRIC_TYPE.None) {
        rnBiometrics
          .simplePrompt({ promptMessage: 'Confirm fingerprint' })
          .then(resultObject => {
            const { success } = resultObject;
            if (success) {
              __DEV__ && console.log('successful biometrics provided');
              setPasswordFormVisible(true);
              setOtpError(false);
              setOtpErrorContent('');
              setPasswordError(false);
              setPasswordErrorContent('');
            } else {
              __DEV__ && console.log('user cancelled biometric prompt');
            }
          })
          .catch(() => {
            __DEV__ && console.log('biometrics failed');
          });
      } else {
        setWarningModalVisible(true);
      }
    } else {
      rnBiometrics
        .deleteKeys()
        .then(async resultObject => {
          const { keysDeleted } = resultObject;
          if (keysDeleted) {
            __DEV__ && console.log('Successful deletion');
            dispatch(unregisterBiometric({}));
            setBiometricSwitch(false);
            dispatch(updateCurrentUserSetting({ isBiometric: false }));
          } else {
            __DEV__ && console.log('Unsuccessful deletion because there were no keys to delete');
          }
        })
        .catch(() => {
          console.log('delete key failed');
        });
    }
  };

  const closeWarningModal = () => {
    setWarningModalVisible(false);
  };

  const closeRegisteredWarningModal = () => {
    setRegisteredWarningVisible(false);
  };

  const closePasswordFormModal = (isModalOTPKis: boolean) => () => {
    isModalOTPKis && dispatch(onCloseModalOTPKIS({}));
    setPasswordFormVisible(false);
    setDisableButton(false);
    setOtpError(false);
    setOtpErrorContent('');
    setPasswordError(false);
    setPasswordErrorContent('');
    setPassword('');
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const queryBiometricStatusFunction = () => {
    // for case user already use with oldVersion - update field kisUsername + paaveUsername
    // check once
    if (userInfoFromLogin == null) {
      dispatch(
        logOutAction({
          version: sessionVersion || 0,
        })
      );
      return;
    }
    const params: IQueryBiometricStatusRequest = {
      userId: userInfoFromLogin.userId,
      deviceId: config.uniqueId,
    };
    dispatch(queryBiometricStatus(params));
  };

  const confirmPasswordFormModal = () => {
    setDisableButton(true);
    rnBiometrics
      .createKeys()
      .then(async resultObject => {
        const { publicKey: publicKeyResult } = resultObject;
        if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
          const params = {
            password: password,
            publicKey: publicKeyResult,
            deviceId: config.uniqueId,
          };
          dispatch(
            registerBiometric(params, undefined, undefined, undefined, undefined, {
              handleSuccess() {
                queryBiometricStatusFunction();
              },
            })
          );
        } else if (selectedAccount.type === ACCOUNT_TYPE.KIS && generateKisCardResult != null) {
          const params: IBiometricRegisterKisParams = {
            wordMatrixId: generateKisCardResult.wordMatrixId.toString(),
            wordMatrixValue: password,
            kisToken: kisAuthToken.accessToken,
            publicKey: publicKeyResult,
            deviceId: config.uniqueId,
          };
          dispatch(
            registerBiometricKis(params, undefined, undefined, undefined, undefined, {
              handleSuccess() {
                dispatch(onCloseModalOTPKIS({}));
                queryBiometricStatusFunction();
              },
            })
          );
        }
      })
      .catch(error => {
        __DEV__ && console.log('confirmPasswordError', error);
      });
  };

  const handleOpenWarningRegisteredBiometric = useCallback(() => {
    setBiometricSwitch(false);
    setRegisteredWarningVisible(true);
    dispatch(
      updateUsersSetting({
        paaveUsername: '',
        kisUsername: '',
        email: '',
      })
    );
  }, []);

  useUpdateEffect(() => {
    accountList?.KIS?.username != null &&
      generateKisCardResult == null &&
      passwordFormVisible &&
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      dispatch(
        generateNewKisCard(
          { username: accountList.KIS.username, from: generateKisCardFrom.TRADE },
          undefined,
          undefined,
          true
        )
      );
  }, [accountList, generateKisCardResult, passwordFormVisible, selectedAccount.type]);

  useUpdateEffect(() => {
    // TODO: Transfer to callback
    setPasswordFormVisible(false);
    setDisableButton(false);
    setOtpError(false);
    setOtpErrorContent('');
    setPasswordError(false);
    setPasswordErrorContent('');
    setBiometricSwitch(true);
    setPassword('');
    dispatch(updateCurrentUserSetting({ isBiometric: true }));
    dispatch(
      updateUsersSetting({
        paaveUsername: userInfoFromLogin?.paaveUsername ?? '',
        kisUsername: userInfoFromLogin?.kisUsername ?? '',
        email: userInfoFromLogin?.email ?? '',
      })
    );
  }, [registerBiometricSuccessTrigger]);

  useUpdateEffect(() => {
    setDisableButton(false);
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      setOtpError(true);
      setOtpErrorContent(t('VERIFY_MATRIX_ID_FAIL'));
    } else {
      setPasswordError(true);
      setPasswordErrorContent(t('INCORRECT_PASSWORD'));
    }
  }, [registerBiometricFailedTrigger, selectedAccount.type]);

  useEffect(() => {
    if (biometricStatus == null) return;
    currentBiometricUsername != null &&
    userInfoFromLogin != null &&
    currentBiometricUsername.paaveUsername !== '' &&
    currentBiometricUsername.paaveUsername === userInfoFromLogin.paaveUsername
      ? biometricStatus
        ? setBiometricSwitch(true)
        : handleOpenWarningRegisteredBiometric()
      : setBiometricSwitch(false);
  }, [currentBiometricUsername, userInfoFromLogin, biometricStatus, handleOpenWarningRegisteredBiometric]);

  useEffect(() => {
    dispatch(onCloseModalOTPKIS({}));
  }, []);

  useEffect(() => {
    queryBiometricStatusFunction();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Security'} />
      <View style={styles.container}>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.settingContainer2,
            styles.borderBottom5,
          ]}
        >
          <View style={[globalStyles.container]}>
            <Text allowFontScaling={false} style={[styles.notificationText]}>
              {t(`Biometric Login`)}
            </Text>
            <Text allowFontScaling={false} style={[styles.notificationText2]}>
              {t(`You can login by Fingerprint/FaceID`)}
            </Text>
          </View>
          <View style={[styles.switchContainer]}>
            {biometricSwitch != null ? (
              <Switch
                value={biometricSwitch}
                onValueChange={onChangeBiometricSwitch}
                disabled={false}
                // activeText={''}
                // inActiveText={''}
                circleSize={scaleSize(16)}
                barHeight={scaleSize(22)}
                circleBorderWidth={0}
                backgroundActive={Colors.BlueNewColor}
                backgroundInactive={Colors.LIGHTBGTab}
                circleActiveColor={Colors.WHITE}
                circleInActiveColor={Colors.WHITE}
                circleBorderActiveColor={Colors.WHITE}
                circleBorderInactiveColor={Colors.WHITE}
                // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={globalStyles.centered} // style for inner animated circle for what you (may) be rendering inside the circle
                // outerCircleStyle={{}} // style for outer animated circle
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                // switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            ) : (
              <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
            )}
          </View>
        </View>

        {/* // Ẩn các phần chưa launch PAAVE-527
        <TouchableOpacity
          onPress={goToSecurityLevel}
          // onPress={() => onPressSettingItem(item.label)}
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.settingContainer,
            styles.borderBottom1,
          ]}
          // key={index}
        >
          <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
            Sercurity Level
          </Text>
          <Text allowFontScaling={false} style={[styles.settingItemText2]}>
            Email Verification
          </Text>
          <SettingItemArrow width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={goToChangePassword}
          // onPress={() => onPressSettingItem(item.label)}
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.settingContainer,
            styles.borderBottom1,
          ]}
          // key={index}
        >
          <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
            {t(isPasswordCreated ? 'Change Password' : 'Create Password')}
          </Text>
          <SettingItemArrow width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity>
        {selectedAccount.type === ACCOUNT_TYPE.KIS && (
          <TouchableOpacity
            onPress={goToChangePIN}
            // onPress={() => onPressSettingItem(item.label)}
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.settingContainer,
              styles.borderBottom1,
            ]}
            // key={index}
          >
            <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
              {t('Change PIN')}
            </Text>
            <SettingItemArrow width={scaleSize(24)} height={scaleSize(24)} />
          </TouchableOpacity>
        )}
        {Object.keys(accountList).length > 1 && (
          <TouchableOpacity
            onPress={goToSessionTimeoutSetting}
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.settingContainer,
              styles.borderBottom1,
            ]}
          >
            <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
              {t('Session Timeout')}
            </Text>
            <Text allowFontScaling={false} style={[styles.settingItemText2]}>
              {t(SESSION_TIMEOUT[kisSessionTimeout]?.label ?? '')}
            </Text>
            <SettingItemArrow width={scaleSize(24)} height={scaleSize(24)} />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={warningModalVisible}
        onRequestClose={closeWarningModal}
        childrenContent={
          <View
            style={[globalStyles.container, styles.modalBackground, styles.modalBackground2, globalStyles.centered]}
          >
            <View style={[styles.modalContainerSetting, globalStyles.overflowHidden]}>
              <View style={styles.headerModalSetting}>
                <Text style={styles.headerModalSettingTitle}>{t('Enable Biometric')}</Text>
              </View>
              <View style={styles.sectionModalSetting}>
                <Text style={styles.textSection}>
                  {t('Your biometric system settings are currently turned off or not supported')}
                </Text>
              </View>
              <View style={styles.sectionModalSetting}>
                <Text style={styles.textSection}>
                  {t('You can enable biometric in setting if your device supports it')}
                </Text>
              </View>
              <TouchableOpacity onPress={closeWarningModal} style={styles.goToSettingButton}>
                <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                  {t('OK')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <Modal
        visible={registeredWarningVisible}
        onRequestClose={closeRegisteredWarningModal}
        childrenContent={
          <View
            style={[globalStyles.container, styles.modalBackground, styles.modalBackground2, globalStyles.centered]}
          >
            <View style={[styles.modalContainerSetting, globalStyles.overflowHidden]}>
              <View style={styles.headerModalSetting}>
                <Text style={styles.headerModalSettingTitle}>{t('Registered Biometric')}</Text>
              </View>
              <View style={styles.sectionModalSetting}>
                <Text style={styles.textSection}>{t('Your account have been registered in another device')}</Text>
              </View>
              <TouchableOpacity onPress={closeRegisteredWarningModal} style={styles.goToSettingButton}>
                <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                  {t('OK')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <Modal
        visible={passwordFormVisible}
        onRequestClose={closePasswordFormModal(selectedAccount.type === ACCOUNT_TYPE.KIS ? true : false)}
        childrenContent={
          selectedAccount.type === ACCOUNT_TYPE.KIS ? (
            <View style={styles.containerOTP}>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
                <View style={styles.modalContainerOTP}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitleText2}>{t('Please enter OTP code to confirm')}</Text>
                  </View>
                  <View style={styles.containerBody}>
                    <ModalOTP
                      valueOTP={password}
                      onChangeValueOTP={onChangePassword}
                      generateKisCardResult={generateKisCardResult}
                      ListContentModal={true}
                      valueOTPError={otpError}
                      valueOTPErrorContent={otpErrorContent}
                    />

                    <TouchableOpacity
                      onPress={confirmPasswordFormModal}
                      style={[styles.button, isDisable || disableButton ? styles.disableButton : styles.enableButton]}
                      disabled={isDisable || disableButton}
                    >
                      <Text
                        allowFontScaling={false}
                        style={isDisable || disableButton ? styles.disableText : styles.enableText}
                      >
                        {t('Confirm')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closePasswordFormModal(true)} style={styles.cancelExecuteFormButton}>
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          ) : (
            <PlatformWrapperScrollView style={[styles.modalContainer]}>
              <View style={[globalStyles.justifyCenter, styles.modalEditFullNameContainer]}>
                <View style={[globalStyles.centered, styles.modalTitleCon]}>
                  <Text allowFontScaling={false} style={styles.modalTitleText}>
                    {t('Password')}
                  </Text>
                </View>
                <View style={styles.modalContent}>
                  <View>
                    <TextInputComponent
                      value={password}
                      onChangeText={onChangePassword}
                      wholeContainerStyle={styles.wholeContainerStyle}
                      labelTextStyle={styles.wlNameText}
                      labelText={'Password'}
                      textInputContainerStyle={[
                        globalStyles.flexDirectionRow,
                        globalStyles.alignCenter,
                        passwordError ? styles.textInputContainerStyleError : styles.textInputContainerStyle,
                      ]}
                      placeholder={'Enter your Password'}
                      placeholderTextColor={localColors.DARKTextBigTitle}
                      textInputStyle={styles.textInputStyle}
                      autoFocus
                      ref1={inputRef}
                      onLayout={showKeyboard}
                      icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
                      secureTextEntry={true}
                      eyeIconHeight={scaleSize(14)}
                      eyeIconWidth={scaleSize(19)}
                      eyeIconStyle={styles.eyeIconStyle}
                      autoCapitalize={'none'}
                      error={passwordError}
                      errorContent={passwordErrorContent}
                    />
                  </View>
                  <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                    <TouchableOpacity
                      onPress={confirmPasswordFormModal}
                      style={[
                        globalStyles.centered,
                        styles.executeFormButton,
                        (isDisable || disableButton) && styles.executeFormButtonDisable,
                      ]}
                      disabled={isDisable || disableButton}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.executeFormButtonText,
                          (isDisable || disableButton) && styles.executeFormButtonTextDisable,
                        ]}
                      >
                        {t('OK')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[globalStyles.fillWidth]}>
                    <TouchableOpacity
                      onPress={closePasswordFormModal(false)}
                      style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                    >
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </PlatformWrapperScrollView>
          )
        }
      />
      <ModalRequestCreatePassword />
      {/* // Ẩn các phần chưa launch PAAVE-527
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport]}>
        <IconSupport width={scaleSize(106)} height={scaleSize(106)} />
      </TouchableOpacity> */}
    </View>
  );
};

export default memo(Security);
