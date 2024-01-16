import { StackScreenProps } from 'screens/RootNavigation';
import { useTranslation } from 'react-i18next';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import React, { memo, ReactElement, useCallback, useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from 'react-native-paper';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import BottomDeco from 'assets/icon/BottomDeco.svg';
import Logo from 'assets/logo-paave-light.svg';
import LanguagePicker from '../../components/LanguagePicker';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import SignInForm from './components/Form';
import useStyles from './styles';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import config from 'config';
import { ACCOUNT_TYPE } from 'global';
import { loginNonUser } from 'reduxs/global-actions';
import GoogleAuthentication from './components/GoogleAuthentication';
import FacebookAuthentication from './components/FacebookAuthentication';
import AppleAuthentication from './components/AppleAuthentication';
import { getPathUrlDeepLink } from 'screens/RootNavigation/DeepLink';
import { Global } from 'constants/main';
import { HIDE_MODAL_OTP_PORTFOLIO } from 'reduxs/actions';
import { sendLogEventAppFlyers } from 'utils/appFlyers';
import { AuthType } from 'constants/AuthType';

type ISignInProps = StackScreenProps<ScreenNames.SignIn>;

const SignIn = (props: ISignInProps) => {
  const [errorBiometricModalVisible, setErrorBiometricModalVisible] = useState<boolean>(false);
  const [errorBiometricModalContent] = useState<ReactElement>(<View />);
  const [modalTitle] = useState<string>('');
  const [authType, setAuthType] = useState<AuthType>(AuthType.PAAVE);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const onRadioBtnPress = useCallback((value: string) => {
    setAuthType(value as AuthType);
  }, []);

  const onAccountTypeBtnPress = useCallback((value: AuthType) => () => onRadioBtnPress(value), []);

  const goToSignUp = useCallback(() => {
    switch (authType) {
      case AuthType.KIS:
        props.navigation.navigate(ScreenNames.KisEKYCVerifyEmail, { sec: authType });
        break;
      default:
        props.navigation.navigate(ScreenNames.SignUp);
        break;
    }
  }, [authType]);

  const continueWithDemoAccount = useCallback(() => {
    track(AMPLITUDE_EVENT.LOGIN_NON_USER);
    dispatch(loginNonUser(null));
    sendLogEventAppFlyers('af_login', {
      af_account_type: ACCOUNT_TYPE.DEMO,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (Global.urlGoToAfterLogin) {
        getPathUrlDeepLink(Global.urlGoToAfterLogin!, true, dispatch);
        dispatch({
          type: HIDE_MODAL_OTP_PORTFOLIO,
        });
        Global.urlGoToAfterLogin = undefined;
      }
    };
  }, []);

  const closeModal = useCallback(() => {
    setErrorBiometricModalVisible(false);
  }, []);

  const renderScreen = () => {
    return (
      <View style={globalStyles.container}>
        <Image source={require('assets/component/SignInBG.png')} style={styles.bgImageStyle} resizeMode="cover" />
        <View style={styles.logoContainer}>
          <Logo width={scaleSize(144)} height={scaleSize(62)} />
        </View>
        <View style={styles.signUpForm}>
          <RadioButton.Group onValueChange={onRadioBtnPress} value={authType as string}>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                onPress={onAccountTypeBtnPress(AuthType.PAAVE)}
                style={[styles.option, authType === AuthType.PAAVE && styles.optionSelected]}
              >
                <RadioButton.Android
                  value={AuthType.PAAVE}
                  color={Colors.SecondColorsLogo}
                  uncheckedColor={Colors.WHITE}
                />
                <Text allowFontScaling={false} style={styles.optionText}>
                  {t('Paave Account')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onAccountTypeBtnPress(AuthType.KIS)}
                style={[styles.option, authType === AuthType.KIS && styles.optionSelected]}
              >
                <RadioButton.Android
                  value={AuthType.KIS}
                  color={Colors.SecondColorsLogo}
                  uncheckedColor={Colors.WHITE}
                />
                <Text allowFontScaling={false} style={styles.optionText}>
                  {t('KIS Account')}
                </Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
          <SignInForm authType={authType} loading={loading} setLoading={setLoading} />

          <Text allowFontScaling={false} style={styles.optionalExecuteFormText}>
            {t('or sign in with')}
          </Text>

          <View style={styles.optionalExecuteFormContainer}>
            <GoogleAuthentication setLoading={setLoading} />

            <FacebookAuthentication setLoading={setLoading} />

            {Platform.OS === 'ios' && <AppleAuthentication setLoading={setLoading} />}
          </View>

          <View style={styles.optionalSwitchStateContainer}>
            <Text allowFontScaling={false} style={styles.optionalSwitchStateText}>
              {t('Not a member?')}
            </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text allowFontScaling={false} style={styles.optionalSwitchState}>
                {t('Sign Up')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
            <Text allowFontScaling={false} style={styles.optionalSwitchStateText}>
              {t('Or View Demo?')}
            </Text>
            <TouchableOpacity onPress={continueWithDemoAccount}>
              <Text allowFontScaling={false} style={styles.optionalSwitchState}>
                {t('Get Started Now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.centered}>
          <BottomDeco fill={Colors.WHITE015} />
        </View>
      </View>
    );
  };

  return (
    <View style={[globalStyles.container, styles.backgroundColorDeepBlue]}>
      <HeaderScreen
        headerTitle={''}
        rightButtonListIcon={[<LanguagePicker textStyles={styles.langPicker} />]}
        background={true}
        backgroundStyle={styles.backgroundColorDeepBlue}
      />
      {Platform.OS === 'android' ? (
        <ScrollView keyboardDismissMode={'interactive'}>{renderScreen()}</ScrollView>
      ) : (
        <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>{renderScreen()}</KeyboardAwareScrollView>
      )}
      <View style={styles.versionContainer}>
        <Text allowFontScaling={false} style={styles.versionText}>
          {t('Version')} {`${config.appVersion} (${config.appBuildNo})`}
        </Text>
      </View>
      <Modal
        visible={errorBiometricModalVisible}
        onRequestClose={closeModal}
        childrenContent={
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={[globalStyles.centered, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                  {t(modalTitle)}
                </Text>
              </View>
              {errorBiometricModalContent}
              <TouchableOpacity onPress={closeModal} style={[globalStyles.centered, styles.modalOKButton]}>
                <Text allowFontScaling={false} style={styles.modalOKButtonText}>
                  {t('OK')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        }
      />
    </View>
  );
};

export default memo(SignIn);
