import Modal from 'components/Modal';
import ModalOTP from 'components/ModalOTP';
import PlatformWrapperScrollView from 'components/PlatformWrapperScrollView';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import { AppStateStatus, CheckUserExistType } from 'constants/enum';
import { useAppSelector } from 'hooks';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { GetOTPIdType, GetOTPTxType, ICheckUserExistParams, IVerifyOTPParams } from 'interfaces/authentication';
import { ReducerStatus } from 'interfaces/reducer';
import React, { memo, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { checkUserExist, getOTP, updateEmailParams, verifyOTP } from 'reduxs/global-actions';
import globalStyles, { lightColors as Colors } from 'styles';
import { isBlank } from 'utils';
import { EditModalProps } from '../ButtonWithEditModal';
import useStyles from './styles';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUserUpdateEmailParams } from 'interfaces/user';

const NUMBER_OF_OTP_FIELD = 6;

const ModalUsername: React.FC<EditModalProps> = ({ initValue, visible, setVisible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const checkEmailExit = useAppSelector(state => state.checkExistUserEmail);
  const otpId = useAppSelector(state => state.otpId);
  const otpKey = useAppSelector(state => state.otpKey);

  const [email, setEmail] = useState<string>(initValue);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorContent, setEmailErrorContent] = useState<string>('');

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [otpValue, setOTPValue] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');

  const [getTimeBackground, setGetTimeBackground] = useState<number>(0);
  const [currentMoment, setCurrentMoment] = useState<number>(0);
  const [timer, setTimer] = useState<number>(config.countDownOTP);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<TextInput>(null);
  const codeFieldRef = useBlurOnFulfill({ value: otpValue, cellCount: NUMBER_OF_OTP_FIELD });
  const isDisable = email === '' || email === initValue || emailError;

  // Edit Email Handler
  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const onCloseModal = () => {
    setVisible(false);
    setEmailError(false);
    setEmailErrorContent('');
    setEmail(initValue);
  };

  const onPressConfirmEditEmail = () => {
    if (validateEmail() === true) {
      const params: ICheckUserExistParams = {
        type: CheckUserExistType.EMAIL,
        value: email,
        getOTPParams: {
          id: email,
          idType: GetOTPIdType.EMAIL,
          txType: GetOTPTxType.UPDATE_PROFILE,
        },
      };
      setOtpError(false);
      setOtpErrorContent('');
      setTimer(config.countDownOTP);
      dispatch(checkUserExist(params, undefined, undefined, true));
      interval.current = setInterval(() => {
        setTimer((prevTime: number) => {
          if (prevTime - 1 <= 0 && interval.current) {
            clearInterval(interval.current);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const onChangeEmail = (value: string) => {
    if (value != '') {
      setEmail(value);
      setEmailError(false);
    } else {
      setEmail('');
    }
  };

  const validateEmail = () => {
    if (isBlank(email)) {
      setEmailError(true);
      setEmailErrorContent('EMAIL_INVALID');
      return false;
    } else if (config.regex.email.test(email) !== true) {
      setEmailError(true);
      setEmailErrorContent('EMAIL_INVALID');
      return false;
    } else {
      setEmailError(false);
      setEmailErrorContent('');
    }
    return true;
  };

  useEffect(() => {
    setEmail(initValue);
  }, [initValue]);

  useUpdateEffect(() => {
    if (checkEmailExit.data != null && !checkEmailExit.data.exist) {
      setIsVisible(true);
      setOTPValue('');
      setVisible(false);
    } else {
      setEmailError(true);
      setEmailErrorContent('EMAIL_EXISTS');
    }
  }, [checkEmailExit]);

  // OTP Handler
  const showKeyboardCodeField = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const handleOTP = () => {
    const params: IVerifyOTPParams = {
      otpId: otpId,
      otpValue: otpValue,
      txType: GetOTPTxType.UPDATE_PROFILE,
    };
    dispatch(verifyOTP(params, undefined));
    setOTPValue('');
  };

  const onChangeOTPValue = (value: string) => {
    setOTPValue(value);
    setOtpError(false);
    setOtpErrorContent('');
  };

  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: onChangeOTPValue,
  });

  const handleCancel = () => {
    //maybe reset list again
    setIsVisible(false);
    setOTPValue('');
    setOtpError(false);
    setOtpErrorContent('');
    // resend OTP Api call
    // todo
    setEmail(initValue);
    interval != null && interval.current != null && clearInterval(interval.current);
  };

  const resendOTP = () => {
    setTimer(config.countDownOTP);
    interval.current = setInterval(() => {
      setTimer((prevTime: number) => {
        if (prevTime - 1 <= 0 && interval.current) {
          clearInterval(interval.current);
        }
        return prevTime - 1;
      });
    }, 1000);
    // if (otpParams) {
    //   dispatch(getOTP(otpParams));
    // }
    dispatch(getOTP({ id: email, idType: GetOTPIdType.EMAIL, txType: GetOTPTxType.UPDATE_PROFILE }));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // get the moment app is running in background
      if (nextAppState === AppStateStatus.BACKGROUND || nextAppState === AppStateStatus.INACTIVE) {
        const time = new Date();
        setGetTimeBackground(time.getTime());
      }
      // get the moment app is active
      if (nextAppState === AppStateStatus.ACTIVE) {
        const time = new Date();
        setCurrentMoment(time.getTime());
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useUpdateEffect(() => {
    const gap = Math.round((currentMoment - getTimeBackground) / 1000);
    gap >= 0 && timer < config.countDownOTP && setTimer(timer - gap);
  }, [currentMoment, getTimeBackground]);

  useUpdateEffect(() => {
    if (otpKey.data != null && otpKey.status === ReducerStatus.SUCCESS) {
      const paramsEmail: IUserUpdateEmailParams = {
        email: email,
        otpKey: otpKey.data.keyToken,
      };
      dispatch(updateEmailParams(paramsEmail));
      setIsVisible(false);
      setOtpError(false);
      setOtpErrorContent('');
    } else if (otpKey.status === ReducerStatus.FAILED) {
      setOtpError(true);
      setOtpErrorContent('INCORRECT_OTP');
    }
  }, [otpKey]);

  return (
    <>
      <Modal visible={visible} onRequestClose={onCloseModal}>
        <PlatformWrapperScrollView style={[styles.modalContainer]}>
          <View style={[globalStyles.justifyCenter, styles.modalEditFullNameContainer]}>
            <View style={[globalStyles.centered, styles.modalTitleCon]}>
              <Text allowFontScaling={false} style={styles.modalTitleText}>
                {t('Edit Email')}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <View>
                <TextInputComponent
                  value={email}
                  onChangeText={onChangeEmail}
                  wholeContainerStyle={styles.wholeContainerStyle}
                  labelTextStyle={styles.wlNameText}
                  labelText={'Email'}
                  textInputContainerStyle={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.textInputContainerStyle,
                  ]}
                  placeholder={'Enter your new email'}
                  placeholderTextColor={Colors.LIGHTTextDisable}
                  textInputStyle={styles.textInputStyle}
                  autoFocus
                  ref1={inputRef}
                  onLayout={showKeyboard}
                  error={emailError}
                  errorContent={emailErrorContent}
                />
              </View>
              <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                <TouchableOpacity
                  onPress={onPressConfirmEditEmail}
                  style={[
                    globalStyles.centered,
                    styles.executeFormButton,
                    isDisable && styles.executeFormButtonDisable,
                  ]}
                  disabled={isDisable}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.executeFormButtonText, isDisable && styles.executeFormButtonTextDisable]}
                  >
                    {t('Update')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.fillWidth]}>
                <TouchableOpacity
                  onPress={onCloseModal}
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
      </Modal>
      <ModalOTP
        textButton="Verify"
        backgroundStyle={styles.opacityBackground}
        onConfirm={handleOTP}
        onCancel={handleCancel}
        isVisible={isVisible}
        onDisabled={otpValue.length < NUMBER_OF_OTP_FIELD}
        errorDisabled={otpValue.length < NUMBER_OF_OTP_FIELD}
        errorDisabledText={otpValue.length < NUMBER_OF_OTP_FIELD}
        ListContentModal={
          <SafeAreaView style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>
              {t('OTP Verification')}
            </Text>
            <Text allowFontScaling={false} style={styles.content}>
              {t('Please enter the verification code sent to your email')}: <Text style={styles.email}>{email}</Text>
            </Text>
            <Text allowFontScaling={false} style={[styles.content, styles.lastText]}>
              {t('If you did not see it in your Inbox, please also check Promotions, Updates and Spam')}
            </Text>
            <CodeField
              autoFocus={true}
              ref={codeFieldRef}
              {...props2}
              value={otpValue}
              onChangeText={onChangeOTPValue}
              cellCount={NUMBER_OF_OTP_FIELD}
              rootStyle={styles.codeFieldRoot}
              onLayout={showKeyboardCodeField}
              keyboardType="number-pad"
              textContentType="none"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell, otpError && styles.errorCell]}
                >
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
              <Text allowFontScaling={false} style={styles.contentUp}>
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
          </SafeAreaView>
        }
        keyboardHeight={0}
      />
    </>
  );
};

export default memo(ModalUsername);
