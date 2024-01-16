/* eslint-disable no-console */
import React, { memo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import CongratulationLogo from 'assets/CongratulationLogo.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import {
  generateKisCardFrom,
  generateNewKisCard,
  onCloseModalOTPKIS,
  suggestBiometric,
  updateCurrentUserSetting,
  updateUsersSetting,
} from 'reduxs/global-actions';
import ModalSuggestBiometricComponent from './component/ModalSuggestBiometric.component';
import { Global } from 'constants/main';
import { ACCOUNT_TYPE, BIOMETRIC_TYPE } from 'global';
import { navigateClean } from 'utils';
import { IBiometricRegisterKisParams, INavigationAction } from 'interfaces/common';
import Modal from 'components/Modal';
import { rnBiometrics } from 'screens/App';
import PlatformWrapperScrollView from 'components/PlatformWrapperScrollView';
import TextInputComponent from 'components/TextInput';
import PasswordIcon from 'assets/icon/Lock.svg';
import { registerBiometric, registerBiometricKis } from 'screens/Security/actions';
import config from 'config';
import { useAppSelector } from 'hooks/useAppSelector';
import { localColors } from 'screens/SignIn/styles';
import ModalOTPKIS from 'components/ModalOTPKIS';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { AUTHENTICATION_LOGIN_BY_BIOMETRIC, SUGGEST_BIOMETRIC } from 'reduxs/actions';
import { RESET } from 'reduxs/action-type-utils';

const SIGN_UP_CONGRATULATION_IMG_CONTAINER_STYLES = [globalStyles.container, globalStyles.alignCenter];

const SignUpCongratulation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();
  const userName = useAppSelector(state => state.registerParams);
  const accountType = useAppSelector(state => state.selectedAccount.type);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisAuthToken = useAppSelector(state => state.kisAuthToken);
  const registerBiometricSuccessTrigger = useAppSelector(state => state.registerBiometricSuccessTrigger);
  const registerBiometricFailedTrigger = useAppSelector(state => state.registerBiometricFailedTrigger);
  const accountList = useAppSelector(state => state.accountList);
  const userInfoFromLogin = useAppSelector(state => state.userInfoFromLogin);
  const loginWithSocialAccount = useAppSelector(state => state.loginWithSocialAccount);

  const SIGN_UP_CONGRATULATION_CONTAINER_STYLES = [styles.container];
  const SIGN_UP_CONGRATULATION_LOGO_CONTAINER_STYLES = [globalStyles.centered, styles.logoContainer];
  const SIGN_UP_CONGRATULATION_BUTTON_STYLES = [globalStyles.centered, styles.executeFormButton];

  const [password, setPassword] = useState<string>('');
  const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorContent, setPasswordErrorContent] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');
  const isDisable = password === '';
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const inputRef = React.useRef<TextInput>(null);

  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const onLogin = () => {
    if (Global.biometricType !== BIOMETRIC_TYPE.None) {
      // login normal
      if (!loginWithSocialAccount) {
        dispatch(suggestBiometric({}));
      } else if (loginWithSocialAccount && accountType === ACCOUNT_TYPE.KIS) {
        // login social but link kis
        dispatch(suggestBiometric({}));
      } else {
        navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
      }
    } else {
      navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
    }
  };

  const handleBio = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then(resultObject => {
        const { success } = resultObject;
        if (success) {
          __DEV__ && console.log('successful biometrics provided');
          dispatch({ type: RESET(SUGGEST_BIOMETRIC) });
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
  };

  const closePasswordFormModal = () => {
    setPasswordFormVisible(false);
    navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
    accountType === ACCOUNT_TYPE.KIS && dispatch(onCloseModalOTPKIS({}));
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

  const confirmPasswordFormModal = () => {
    setDisableButton(true);
    rnBiometrics
      .createKeys()
      .then(async resultObject => {
        const { publicKey: publicKeyResult } = resultObject;
        if (accountType === ACCOUNT_TYPE.VIRTUAL) {
          const params = {
            password: password,
            publicKey: publicKeyResult,
            deviceId: config.uniqueId,
          };
          dispatch(
            registerBiometric(params, undefined, undefined, undefined, undefined, {
              handleSuccess: () => {
                dispatch({ type: AUTHENTICATION_LOGIN_BY_BIOMETRIC });
                navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
              },
            })
          );
        } else if (accountType === ACCOUNT_TYPE.KIS && generateKisCardResult != null) {
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
                dispatch({ type: AUTHENTICATION_LOGIN_BY_BIOMETRIC });
                dispatch(onCloseModalOTPKIS({}));
                navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
              },
            })
          );
        }
      })
      .catch(error => {
        __DEV__ && console.log('confirmPasswordError', error);
      });
  };

  useUpdateEffect(() => {
    accountList?.KIS?.username != null &&
      generateKisCardResult == null &&
      passwordFormVisible &&
      accountType === ACCOUNT_TYPE.KIS &&
      dispatch(
        generateNewKisCard(
          { username: accountList.KIS.username, from: generateKisCardFrom.TRADE },
          undefined,
          undefined,
          true
        )
      );
  }, [accountList, generateKisCardResult, passwordFormVisible, accountType]);

  useUpdateEffect(() => {
    setPasswordFormVisible(false);
    setDisableButton(false);
    setOtpError(false);
    setOtpErrorContent('');
    setPasswordError(false);
    setPasswordErrorContent('');
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
    if (accountType === ACCOUNT_TYPE.KIS) {
      setOtpError(true);
      setOtpErrorContent(t('VERIFY_MATRIX_ID_FAIL'));
    } else {
      setPasswordError(true);
      setPasswordErrorContent(t('INCORRECT_PASSWORD'));
    }
  }, [registerBiometricFailedTrigger, accountType]);

  return (
    <View style={SIGN_UP_CONGRATULATION_CONTAINER_STYLES}>
      <SafeAreaView style={SIGN_UP_CONGRATULATION_IMG_CONTAINER_STYLES}>
        <View style={SIGN_UP_CONGRATULATION_LOGO_CONTAINER_STYLES}>
          <CongratulationLogo width={scaleSize(128)} height={scaleSize(134)} />
          <Image
            style={styles.congratulationImage}
            source={require('assets/Congratulation.png')}
            resizeMethod={'resize'}
            resizeMode={'stretch'}
          />
          <Text style={styles.textTitle}>{t('Welcome to Paave')}!</Text>
          <Text style={styles.textName}>{userName.fullname}</Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity style={SIGN_UP_CONGRATULATION_BUTTON_STYLES} onPress={onLogin}>
        <Text style={styles.executeFormButtonText}>{t('Get Started')}</Text>
      </TouchableOpacity>
      <ModalSuggestBiometricComponent handleBio={handleBio} />
      <Modal
        visible={passwordFormVisible}
        onRequestClose={closePasswordFormModal}
        childrenContent={
          accountType === ACCOUNT_TYPE.KIS ? (
            <View style={styles.containerOTP}>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
                <View style={styles.modalContainerOTP}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitleText2}>{t('Please enter OTP code to confirm')}</Text>
                  </View>
                  <View style={styles.containerBody}>
                    <ModalOTPKIS
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
                    <TouchableOpacity onPress={closePasswordFormModal} style={styles.cancelExecuteFormButton}>
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          ) : (
            <PlatformWrapperScrollView style={styles.modalContainer}>
              <View style={styles.modalEditFullNameContainer}>
                <View style={styles.modalTitleCon}>
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
                  <View style={styles.buttonConfirm}>
                    <TouchableOpacity
                      onPress={confirmPasswordFormModal}
                      style={[
                        globalStyles.centered,
                        styles.executeFormButtonPassword,
                        (isDisable || disableButton) && styles.executeFormButtonDisable,
                      ]}
                      disabled={isDisable || disableButton}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.executeFormButtonTextPassword,
                          (isDisable || disableButton) && styles.executeFormButtonTextDisable,
                        ]}
                      >
                        {t('OK')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={globalStyles.fillWidth}>
                    <TouchableOpacity onPress={closePasswordFormModal} style={styles.cancelExecuteFormButton2}>
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
    </View>
  );
};

export default memo(SignUpCongratulation);
