import React, { memo, useEffect, useState, useRef } from 'react';
import { AppState, LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import { CodeField } from 'react-native-confirmation-code-field';
import { IState } from 'reduxs/global-reducers';
import globalStyles from '../../styles';
import useStyles from './styles';
import { IVerifyOTPParams } from 'interfaces/authentication';
import { getOTP, verifyOTP } from 'reduxs/global-actions/Authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from '../../hooks/useUpdateEffect/index';
import config from '../../config/index';
import { ReducerStatus } from '../../interfaces/reducer';
import RenderHTML from 'react-native-render-html';
import { AppStateStatus } from '../../constants/enum';
import { useAppSelector } from 'hooks/useAppSelector';
import { AuthType } from 'constants/AuthType';

const NUMBER_OF_OTP_FIELD = 6;

const SignupOTP = (props: StackScreenProps<'SignupOTP'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const otpKey = useSelector((state: IState) => state.otpKey);
  const [otpValue, setOTPValue] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');
  const [timer, setTimer] = useState<number>(config.countDownOTP);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);

  const otpId = useAppSelector(state => state.otpId);
  const otpParams = useAppSelector(state => state.otpParams);
  const registerParams = useAppSelector(state => state.registerParams);
  const resetPasswordParams = useAppSelector(state => state.resetPasswordParams);

  const authEmail = props.route.params.isSignup ? registerParams.email : resetPasswordParams.username;

  const [getTimeBackground, setGetTimeBackground] = useState<number>(0);
  const [currentMoment, setCurrentMoment] = useState<number>(0);

  const goBack = () => {
    props.navigation.goBack();
    setOtpError(false);
    setOtpErrorContent('');
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer((prevTime: number) => {
        if (prevTime <= 0 && interval.current != null) {
          clearInterval(interval.current);
        }
        return prevTime - 1;
      });
    }, 1000);
    const subscription = AppState.addEventListener('change', nextAppState => {
      // get the moment app is running in background
      if (nextAppState === AppStateStatus.BACKGROUND || nextAppState === AppStateStatus.INACTIVE) {
        const time = new Date();
        setGetTimeBackground(time.getTime());
      }
      // get the moment app is active
      if (nextAppState === 'active') {
        const time = new Date();
        setCurrentMoment(time.getTime());
      }
    });
    return () => {
      subscription.remove();
      interval != null && interval.current != null && clearInterval(interval.current);
    };
  }, []);
  useUpdateEffect(() => {
    const gap = Math.round((currentMoment - getTimeBackground) / 1000);
    gap >= 0 && timer < config.countDownOTP && setTimer(timer - gap);
  }, [currentMoment, getTimeBackground]);

  useUpdateEffect(() => {
    if (otpKey.data != null && otpKey.status === ReducerStatus.SUCCESS) {
      setOtpError(false);
      setOtpErrorContent('');
      if (props.route.params.isSignup === true) {
        props.navigation.navigate(ScreenNames.SignupEnterName, {});
      }
    } else if (otpKey.status === ReducerStatus.FAILED) {
      setOtpError(true);
      setOtpErrorContent('INCORRECT_OTP');
    }
  }, [otpKey]);

  const resendOTP = () => {
    setTimer(config.countDownOTP);
    interval.current = setInterval(() => {
      setTimer((prevTime: number) => {
        if (prevTime <= 0 && interval.current != null) {
          clearInterval(interval.current);
        }
        return prevTime - 1;
      });
    }, 1000);
    if (otpParams) {
      dispatch(getOTP(otpParams));
    }
  };

  const onChangeOTPValue = (value: string) => {
    setOTPValue(value);
    setOtpError(false);
    setOtpErrorContent('');
  };

  const submitForm = () => {
    const params: IVerifyOTPParams = {
      otpValue,
      otpId,
    };
    if (props.route.params.isSignup) {
      dispatch(verifyOTP(params));
    } else if (props.route.params.isEKYCVerifyEmail) {
      dispatch(
        verifyOTP(
          params,
          undefined,
          {
            key: ScreenNames.KisEKYCAbout,
            params: props.route.params,
          },
          undefined,
          { email: props.route.params.email, isEKYCVerifyEmail: props.route.params.isEKYCVerifyEmail }
        )
      );
    } else {
      dispatch(
        verifyOTP(params, undefined, {
          key: ScreenNames.NewPassword,
        })
      );
    }

    setOTPValue('');
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const renderScreenAndroid = (screenHeight2: number | null) => {
    return (
      <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="always">
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <Text allowFontScaling={false} style={styles.title}>
            {t('OTP Verification')}
          </Text>
          {/* props.route.params.isSignup */}
          <View style={styles.contentUp}>
            <RenderHTML
              source={{
                html: t('Please enter the verification code sent to your registered email', {
                  email:
                    props.route.params.sec === AuthType.PAAVE
                      ? authEmail != null
                        ? authEmail.toLowerCase()
                        : ''
                      : props.route.params.email != null
                      ? props.route.params.email.toLowerCase()
                      : '',
                }),
              }}
            />
          </View>
          <Text allowFontScaling={false} style={[styles.description, styles.lastText]}>
            {t('Please also check in Promotions, Updates and Spam')}
          </Text>
          <CodeField
            value={otpValue}
            onChangeText={onChangeOTPValue}
            cellCount={NUMBER_OF_OTP_FIELD}
            rootStyle={styles.codeFieldRoot}
            autoFocus={true}
            keyboardType="number-pad"
            textContentType="none"
            renderCell={({ index, symbol, isFocused }) => (
              <Text key={index} style={[styles.cell, isFocused && styles.focusCell, otpError && styles.errorCell]}>
                {/* {symbol && (
                  <MaskSymbol maskSymbol="•" isLastFilledCell={isLastFilledCell({ index, value: otpValue })} delay={0}>
                    {symbol}
                  </MaskSymbol>
                )} */}

                {/* BA đòi chuyển sang chữ */}
                {symbol || ''}
              </Text>
            )}
          />
          <View style={styles.textBelowContainer}>
            {otpError && (
              <Text allowFontScaling={false} style={styles.otpTextError}>
                {t(otpErrorContent)}
              </Text>
            )}
            <Text allowFontScaling={false} style={styles.contentDown}>
              {t("Didn't receive an OTP?")}
            </Text>
            {timer > 0 ? (
              <Text allowFontScaling={false} style={styles.textResend}>
                {t('Resend OTP')} <Text allowFontScaling={false} style={styles.timer}>{`(${timer})`}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={resendOTP}>
                <Text allowFontScaling={false} style={styles.touchable}>
                  {t('Resend OTP')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            disabled={otpValue.length < NUMBER_OF_OTP_FIELD}
            onPress={submitForm}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...(otpValue.length < NUMBER_OF_OTP_FIELD && styles.disabledButton) },
            ]}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...(otpValue.length < NUMBER_OF_OTP_FIELD && styles.disabledButtonText) },
              ]}
            >
              {t('Verify')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderScreenIOS = (screenHeight2: number | null) => {
    return (
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="always">
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <Text allowFontScaling={false} style={styles.title}>
            {t('OTP Verification')}
          </Text>
          <View style={styles.contentUp}>
            <RenderHTML
              source={{
                html: t('Please enter the verification code sent to your registered email', {
                  email:
                    props.route.params.sec === AuthType.PAAVE
                      ? authEmail != null
                        ? authEmail.toLowerCase()
                        : ''
                      : props.route.params.email != null
                      ? props.route.params.email.toLowerCase()
                      : '',
                }),
              }}
            />
          </View>
          <Text allowFontScaling={false} style={[styles.content, styles.lastText]}>
            {t('Please also check in Promotions, Updates and Spam')}
          </Text>
          <CodeField
            value={otpValue}
            onChangeText={onChangeOTPValue}
            cellCount={NUMBER_OF_OTP_FIELD}
            rootStyle={styles.codeFieldRoot}
            autoFocus={true}
            keyboardType="number-pad"
            textContentType="none"
            renderCell={({ index, symbol, isFocused }) => (
              <Text key={index} style={[styles.cell, isFocused && styles.focusCell, otpError && styles.errorCell]}>
                {/* {symbol && (
                  <MaskSymbol maskSymbol="•" isLastFilledCell={isLastFilledCell({ index, value: otpValue })} delay={0}>
                    {symbol}
                  </MaskSymbol>
                )} */}
                {symbol || ''}
              </Text>
            )}
          />
          <View style={styles.textBelowContainer}>
            {otpError && (
              <Text allowFontScaling={false} style={styles.otpTextError}>
                {t(otpErrorContent)}
              </Text>
            )}
            <Text allowFontScaling={false} style={styles.contentDown}>
              {t("Didn't receive an OTP?")}
            </Text>
            {timer > 0 ? (
              <Text allowFontScaling={false} style={styles.textResend}>
                {t('Resend OTP')} <Text allowFontScaling={false} style={styles.timer}>{`(${timer})`}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={resendOTP}>
                <Text allowFontScaling={false} style={styles.touchable}>
                  {t('Resend OTP')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            disabled={otpValue.length < NUMBER_OF_OTP_FIELD}
            onPress={submitForm}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...(otpValue.length < NUMBER_OF_OTP_FIELD && styles.disabledButton) },
            ]}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...(otpValue.length < NUMBER_OF_OTP_FIELD && styles.disabledButtonText) },
              ]}
            >
              {t('Verify')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.canGoBack() ? goBack : undefined}
        headerTitle={''}
        background={true}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(SignupOTP);
