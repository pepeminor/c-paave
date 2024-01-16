import React, { memo, useEffect, useRef, useState } from 'react';
import { AppState, LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import globalStyles from 'styles';
import useStyles from './styles';
import config from 'config';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderScreen from 'components/HeaderScreen';
import { CodeField, useClearByFocusCell } from 'react-native-confirmation-code-field';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { AppStateStatus } from 'constants/enum';
import { resetKisPassword, verifyKisForgotPw } from 'reduxs/global-actions/KisVerifyForgotPassword';
import { IState } from 'reduxs/global-reducers';
import { ReducerStatus } from 'interfaces/reducer';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { StackScreenProps } from 'screens/RootNavigation';

import { navigate } from 'utils';

type IForgotKisPasswordBaseProps = {};

type IForgotPasswordProps = StackScreenProps<'ForgotKisPasswordOTP'> & IForgotKisPasswordBaseProps;

const NUMBER_OF_OTP_FIELD = 4;

const ForgotKisPasswordOTP = (props: IForgotPasswordProps) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [otpValue, setOTPValue] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');
  const [timer, setTimer] = useState<number>(config.countDownOTP);
  const [getTimeBackground, setGetTimeBackground] = useState<number>(0);
  const [currentMoment, setCurrentMoment] = useState<number>(0);
  const resetpass = useSelector((state: IState) => state.resetKisPassword);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const { t } = useTranslation();

  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer((prevTime: number) => {
        if (prevTime - 1 <= 0 && interval.current != null) {
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

  const onChangeOTPValue = (value: string) => {
    setOTPValue(value);
    setOtpError(false);
    setOtpErrorContent('');
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const [props2] = useClearByFocusCell({
    value: otpValue,
    setValue: onChangeOTPValue,
  });

  const resendOTP = () => {
    setTimer(config.countDownOTP);
    interval.current = setInterval(() => {
      setTimer((prevTime: number) => {
        if (prevTime - 1 <= 0 && interval.current != null) {
          clearInterval(interval.current);
        }
        return prevTime - 1;
      });
    }, 1000);

    const params = {
      clientID: props.route.params.username,
      idCardNo: props.route.params.passportID,
      isResendOTP: true,
    };
    dispatch(verifyKisForgotPw(params));
  };

  useUpdateEffect(() => {
    if (resetpass.data && resetpass.status === ReducerStatus.SUCCESS) {
      setOtpError(false);
      setOtpErrorContent('');
      navigate({ key: ScreenNames.SignIn });
    } else if (resetpass.status === ReducerStatus.FAILED) {
      setOtpError(true);
      setOtpErrorContent('INCORRECT_OTP');
    }
  }, [resetpass]);

  const submitForm = () => {
    const params = {
      newPassword: props.route.params?.password,
      otpValue: otpValue,
      clientID: props.route.params.username,
    };
    dispatch(resetKisPassword(params));
  };

  const renderScreenAndroid = (screenHeight2: number | null) => {
    return (
      <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="always">
        <View
          style={[
            globalStyles.alignCenter,
            styles.logoContainer,
            screenHeight2 == null ? globalStyles.container : { height: screenHeight2 },
          ]}
        >
          <Text allowFontScaling={false} style={[styles.title]}>
            {t('OTP Verification')}
          </Text>
          <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
            <Text>{t('Please enter the verification code sent to your phone')}</Text>
          </View>
        </View>
        <CodeField
          {...props2}
          value={otpValue}
          onChangeText={onChangeOTPValue}
          cellCount={NUMBER_OF_OTP_FIELD}
          rootStyle={styles.codeFieldRoot}
          autoFocus={true}
          keyboardType="number-pad"
          textContentType="none"
          renderCell={({ index, symbol, isFocused }) => (
            <Text key={index} style={[styles.cell, isFocused && styles.focusCell, otpError && styles.errorCell]}>
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
      </ScrollView>
    );
  };

  const renderScreenIOS = (screenHeight2: number | null) => {
    return (
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="always">
        <View
          style={[
            globalStyles.alignCenter,
            styles.logoContainer,
            screenHeight2 == null ? globalStyles.container : { height: screenHeight2 },
          ]}
        >
          <Text allowFontScaling={false} style={[styles.title]}>
            {t('OTP Verification')}
          </Text>
          <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
            <Text>{t('Please enter the verification code sent to your phone')}</Text>
          </View>
        </View>
        <CodeField
          {...props2}
          value={otpValue}
          onChangeText={onChangeOTPValue}
          cellCount={NUMBER_OF_OTP_FIELD}
          rootStyle={styles.codeFieldRoot}
          autoFocus={true}
          keyboardType="number-pad"
          textContentType="none"
          renderCell={({ index, symbol, isFocused }) => (
            <Text key={index} style={[styles.cell, isFocused && styles.focusCell, otpError && styles.errorCell]}>
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
      {Platform.OS === 'android' ? renderScreenAndroid(null) : renderScreenIOS(null)}
    </View>
  );
};

export default memo(ForgotKisPasswordOTP);
