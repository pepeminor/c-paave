import { View, Text, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef, FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { lightColors as Colors, scaleSize } from '../../styles';
import TextInputComponent from '../../components/TextInput';
import BackIcon from 'assets/icon/IconTopBack.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginRealAccount, kisVerifyAndSaveOTP } from './actions';
import { RealAccountSec } from 'screens/AccountTrading';
import { SocketStatus as SocketStatusEnum } from 'constants/enum';
import { ILoginRealAccountRequest } from 'interfaces/common';
import { Global } from 'constants/main';
import { socketUtils } from 'utils';
import { IState } from 'reduxs/global-reducers';
import useStyles from './styles';
import useUpdateEffect from 'hooks/useUpdateEffect';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { CompaniesLogo, CONNECT_SEC_FLOW } from 'global';
import { usePreventGoBack } from 'hooks/usePreventGoBack';
import { reduceKisUsername } from 'reduxs/sagas/LoginRealAccount/LoginRealAccount';
import { AuthType } from 'constants/AuthType';
import { IProps as ModalType } from 'screens/SignIn/components/Form/components/ModalConfirmShareInfoKIS';
import { IKisVerifyAndSaveOTPRequest } from '../../interfaces/common';
import config from 'config';
import { kisVerifyAndSaveOTPFrom } from '../../interfaces/authentication';
import { onCloseModalOTPKIS } from '../../reduxs/global-actions/Authentication';
import Modal from 'components/Modal';
import ModalOTPKIS from 'components/ModalOTPKIS';
import useModalOTPKis from 'hooks/useModalOTPKis';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';

const LoginRealAccount = (props: StackScreenProps<'LoginRealAccount'>) => {
  const { sec, flow } = props.route.params;
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountNumberError] = useState<boolean>(false);
  const [accountNumberErrorContent] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError] = useState<boolean>(false);
  const [passwordErrorContent] = useState<string>('');

  const dispatch = useDispatch();
  const kisSocketStatus = useSelector((state: IState) => state.socketStatus.KIS);

  const linkAccountsSuccessTrigger: boolean = useSelector((state: IState) => state.linkAccountsSuccessTrigger);

  const loginData = useSelector((state: IState) => state.loginData);
  const [showConfirmKIS, setShowConfirmKIS] = useState<boolean>(false);
  const ModalConfirmShareInfoKIS = useRef<FunctionComponent<ModalType>>();

  const generateKisCardResult = useSelector((state: IState) => state.generateKisCardResult);
  const onModalOTPKIS = useSelector((state: IState) => state.onModalOTPKIS);

  const { valueOTPErrorContent, valueOTPError, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS } =
    useModalOTPKis();

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  useUpdateEffect(() => {
    switch (flow) {
      case CONNECT_SEC_FLOW.AUTH:
        props.navigation.navigate(ScreenNames.AccountTrading);
        break;
      case CONNECT_SEC_FLOW.SIGNUP:
        props.navigation.navigate(ScreenNames.SignupCongratulation);
        break;
      case CONNECT_SEC_FLOW.LEADERBOARD:
        props.navigation.navigate(ScreenNames.LeaderBoard);
        break;
    }
  }, [linkAccountsSuccessTrigger, flow]);

  // Prevent go back after signUp success
  usePreventGoBack(props.navigation, flow === CONNECT_SEC_FLOW.SIGNUP);

  const submitForm = async () => {
    switch (sec) {
      case RealAccountSec.KIS:
        {
          if (Global.sockets[RealAccountSec.KIS] == null || kisSocketStatus !== SocketStatusEnum.CONNECTED) {
            await socketUtils.connectKisSocket();
          }
          const params: ILoginRealAccountRequest = {
            username: reduceKisUsername(accountNumber),
            password,
            sec: RealAccountSec.KIS,
          };
          dispatch(loginRealAccount(params));
        }
        break;
    }
  };

  const onChangeAccountNumber = (value: string) => {
    setAccountNumber(value);
  };

  const onChangeAPassword = (value: string) => {
    setPassword(value);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goBackCancel = () => {
    props.navigation.navigate(ScreenNames.AccountTrading);
  };

  const goCongratScreen = () => {
    props.navigation.navigate(ScreenNames.SignupCongratulation);
  };

  const onPressConfirmSendOtpValue = () => {
    if (generateKisCardResult == null) return;
    const params: IKisVerifyAndSaveOTPRequest = {
      expireTime: config.kisOTPTokenExpireTime,
      verifyType: 'MATRIX_CARD',
      wordMatrixId: generateKisCardResult?.wordMatrixId,
      wordMatrixValue: otpKisValue,
    };
    switch (sec) {
      case RealAccountSec.KIS:
        dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.LOGIN_REAL_ACCOUNT));
        break;
      default:
        break;
    }
  };

  const onPressCancelOtp = () => {
    dispatch(onCloseModalOTPKIS({}));
    resetFormModalOTPKIS();
  };

  const goToEKYCFirstStep = () => {
    loginData &&
      loginData.userInfo &&
      props.navigation.navigate(ScreenNames.KisEKYCAbout, {
        email: loginData.userInfo.email,
        flow,
        sec: AuthType.PAAVE,
      });
  };

  const hideConfirmKIS = () => {
    ModalConfirmShareInfoKIS.current = undefined;
    setShowConfirmKIS(false);
    props.navigation.goBack();
  };

  const onConfirmKIS = () => {
    ModalConfirmShareInfoKIS.current = undefined;
    setShowConfirmKIS(false);
  };

  useEffect(() => {
    if (ModalConfirmShareInfoKIS) {
      ModalConfirmShareInfoKIS.current =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('screens/SignIn/components/Form/components/ModalConfirmShareInfoKIS').default;
    }
    setShowConfirmKIS(true);
  }, []);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      title: '',
      headerRight: () =>
        flow === CONNECT_SEC_FLOW.AUTH ? (
          <TouchableOpacity onPress={goBackCancel}>
            <Text style={[styles.textCancel]}>{t('Cancel')}</Text>
          </TouchableOpacity>
        ) : flow === CONNECT_SEC_FLOW.SIGNUP ? (
          <TouchableOpacity onPress={goCongratScreen}>
            <Text style={[styles.textCancel]}>{t('Skip')}</Text>
          </TouchableOpacity>
        ) : null,
      headerBackTitleVisible: false,
      headerLeft: () =>
        flow === CONNECT_SEC_FLOW.AUTH || flow === CONNECT_SEC_FLOW.LEADERBOARD ? (
          <TouchableOpacity onPress={goBack}>
            <BackIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        ) : (
          <></>
        ),
      headerShadowVisible: false,
    });
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[globalStyles.alignCenter, styles.logoContainer]}>
        <Text style={[styles.textTitle]}>{t('Enter your \nsecurities account information')}</Text>
        <View style={[styles.logoTitle]}>{CompaniesLogo[sec]}</View>
      </View>

      <TextInputComponent
        value={accountNumber}
        onChangeText={onChangeAccountNumber}
        wholeContainerStyle={styles.wholeContainerStyle}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Account Number'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          {
            ...(accountNumberError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
          },
        ]}
        placeholder={'Enter your account number'}
        placeholderTextColor={Colors.LIGHTTextDisable}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        error={accountNumberError}
        errorContent={accountNumberErrorContent}
      />

      <TextInputComponent
        value={password}
        onChangeText={onChangeAPassword}
        wholeContainerStyle={styles.wholeContainerStyle}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Password'}
        secureTextEntry={true}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          {
            ...(passwordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
          },
        ]}
        placeholder={'Enter your account password'}
        placeholderTextColor={Colors.LIGHTTextDisable}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        eyeIconHeight={scaleSize(14)}
        eyeIconWidth={scaleSize(19)}
        eyeIconStyle={styles.eyeIconStyle}
        error={passwordError}
        errorContent={passwordErrorContent}
      />

      <TouchableOpacity
        disabled={accountNumberError === true || passwordError === true || accountNumber === '' || password === ''}
        style={[
          globalStyles.centered,
          styles.executeFormButton,
          {
            ...((accountNumberError === true || passwordError === true || accountNumber === '' || password === '') &&
              styles.disabledButton),
          },
        ]}
        onPress={submitForm}
      >
        <Text
          style={[
            styles.executeFormButtonText,
            {
              ...((accountNumberError === true || passwordError === true || accountNumber === '' || password === '') &&
                styles.disabledButtonText),
            },
          ]}
        >
          {t('Sign In')}
        </Text>
      </TouchableOpacity>
      <View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter, styles.optionalSwitchStateContainer]}>
        <Text allowFontScaling={false} style={styles.optionalSwitchStateText}>
          {t('Do not have an account yet?')}
        </Text>
        <TouchableOpacity onPress={goToEKYCFirstStep}>
          <Text allowFontScaling={false} style={styles.optionalSwitchState}>
            {t('Open an account')}
          </Text>
        </TouchableOpacity>
      </View>
      {ModalConfirmShareInfoKIS.current && (
        <ModalConfirmShareInfoKIS.current
          isVisible={showConfirmKIS}
          onConfirm={onConfirmKIS}
          onCancel={hideConfirmKIS}
        />
      )}
      <Modal
        visible={onModalOTPKIS}
        childrenContent={
          <View style={[globalStyles.container, styles.modalBackground, globalStyles.centered]}>
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'position' : undefined}>
              <View style={[styles.modalContainer, globalStyles.overflowHidden]}>
                <View style={[styles.modalTitleContainer, globalStyles.centered]}>
                  <Text style={[styles.modalTitleText]}>{t('Please enter OTP code to confirm')}</Text>
                </View>
                <View style={[styles.marginTop17, styles.marginBottom16]}>
                  <ModalOTPKIS
                    valueOTP={otpKisValue}
                    onChangeValueOTP={onChangeOtpKisValue}
                    generateKisCardResult={generateKisCardResult}
                    ListContentModal={true}
                    valueOTPError={valueOTPError}
                    valueOTPErrorContent={valueOTPErrorContent}
                    linkAccount={true}
                  />
                  <View style={[globalStyles.fillWidth, styles.marginTop17, styles.marginBottom10]}>
                    <TouchableOpacity
                      onPress={onPressConfirmSendOtpValue}
                      style={[
                        globalStyles.centered,
                        kisOTPAvailable ? styles.executeFormButton3 : styles.executeFormButton2,
                      ]}
                      disabled={!kisOTPAvailable}
                    >
                      <Text
                        allowFontScaling={false}
                        style={kisOTPAvailable ? styles.executeFormButtonText : styles.executeFormButtonTextDisable}
                      >
                        {t('Confirm')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[globalStyles.fillWidth]}>
                    <TouchableOpacity
                      onPress={onPressCancelOtp}
                      style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                    >
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default LoginRealAccount;
