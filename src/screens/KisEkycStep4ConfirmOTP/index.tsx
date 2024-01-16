import React, { memo, useEffect, useState, useRef } from 'react';
import { AppState, LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import ErrorAlertIcon from 'assets/icon/ErrorAlertIcon.svg';
import { StackScreenProps } from 'screens/RootNavigation';
import { CodeField, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { IState } from 'reduxs/global-reducers';
import KisEKYCStep4 from 'assets/icon/KisEKYCStep4.svg';
import PhoneIcon from 'assets/icon/PhoneIcon.svg';
import globalStyles, { scaleSize } from '../../styles';
import useStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from '../../hooks/useUpdateEffect/index';
import config from '../../config/index';
import {
  alertMessage,
  createRequestId,
  maskingNumber,
  IVNPTEKYCResultAndroidConverted,
  IVNPTEKYCResultIOS,
  formatDateToString,
  formatStringToDate,
} from 'utils';
import { RealAccountSec } from 'screens/AccountTrading';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import Modal from 'components/Modal';
import { AppStateStatus } from '../../constants/enum';
import { METHOD } from 'constants/method';
import { EkycActions, EkycSelectors } from 'reduxs/Ekyc';

export interface IEkycKisParams {
  identifierId?: string;
  fullName?: string;
  phoneNo?: string;
  gender?: string;
  type?: string; // CMND, CC, PASSPORT
  birthDay: string | null; //YYYYMMDD
  expiredDate: string | null; //YYYYMMDD
  issueDate: string | null; //YYYYMMDD
  issuePlace?: string; //YYYYMMDD
  address?: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  portraitImageUrl?: string;
  signatureImageUrl?: string;
  isMargin?: boolean;
  matchingRate?: number;
  occupation?: string;
  homeTown?: string;
  permanentProvince?: string;
  permanentDistrict?: string;
  permanentAddress?: string;
  contactProvince?: string;
  contactDistrict?: string;
  contactAddress?: string;
  email?: string;
  referrerIdName?: string;
  referrerBranch?: string;
  bankAccount?: string;
  accountName?: string;
  bankName?: string;
  branch?: string;
  branchId?: string;
  bankId?: string;
  nationality?: string;
  tradingCodeImageUrl?: string;
}

const NUMBER_OF_OTP_FIELD = 6;

const KisEkycStep4ConfirmOTP = (props: StackScreenProps<'KisEkycStep4ConfirmOTP'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const dataEkyc = useSelector(EkycSelectors.selectDataEkyc);

  const [otpValue, setOTPValue] = useState('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorContent, setOtpErrorContent] = useState<string>('');
  const [timer, setTimer] = useState<number>(config.countDownOTP);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorModalContent, setErrorModalContent] = useState<string>('');

  const otpId = useRef<string>('');

  const [getTimeBackground, setGetTimeBackground] = useState<number>(0);
  const [currentMoment, setCurrentMoment] = useState<number>(0);

  const authToken = useSelector((state: IState) => state.authToken.accessToken);
  const autoSignupOTP = useSelector((state: IState) => state.autoSignupOTP.data);
  const autoSignupOTPToken = autoSignupOTP != null ? autoSignupOTP.loginResult.accessToken : '';

  const goBack = () => {
    props.navigation.replace(ScreenNames.KisEkycStep4UploadSignature);
    setOtpError(false);
    setOtpErrorContent('');
  };

  useEffect(() => {
    otpId.current = '';
    sendOTP({ id: dataEkyc.phoneNumber, idType: 'PHONE_NO', txType: 'E_KYC' }).then((res: any) => {
      otpId.current = res.otpId;
      alertMessage('success', `${t('Send OTP')}`, `${t('Success')}`);
    });
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

  const finishRegisterAccount = (data: IEkycKisParams) => {
    const uri = config.apiUrl.baseURI + '/ekycs';

    const rid = createRequestId();
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: METHOD.POST,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          authorization: `jwt ${authToken != null && authToken !== '' ? authToken : autoSignupOTPToken}`,
          Pragma: 'no-cache',
          Expires: '0',
          rid,
        },
        body: JSON.stringify(data),
      })
        .then(async result => {
          resolve(JSON.parse(await result.text()));
        })
        .catch(error => {
          alertMessage('danger', 'Ekyc', error.code ?? error.message, rid);
          reject(error);
        });
    });
  };

  const sendOTP = (params: { id?: string; idType: string; txType: string }) => {
    const uri = config[RealAccountSec.KIS].baseURI + '/api/v1/ekyc-admin/sendOtp';
    let phoneNumber = params.id;
    if (params.id?.[0] === '0') {
      phoneNumber = params.id.replace('0', '+84');
    } else {
      phoneNumber = '+84' + phoneNumber;
    }
    const payload = { ...params, id: phoneNumber };
    const rid = createRequestId();
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: METHOD.POST,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          authorization: `jwt ${authToken != null && authToken !== '' ? authToken : autoSignupOTPToken}`,
          Pragma: 'no-cache',
          Expires: '0',
          rid,
        },
        body: JSON.stringify(payload),
      })
        .then(async result => {
          resolve(JSON.parse(await result.text()));
        })
        .catch(error => {
          alertMessage('danger', `${t('Send OTP')}`, `${t('Failed')} ${error}`, rid);
          reject(error);
        });
    });
  };

  const verifyOTP = (params: { otpId?: string; otpValue: string }) => {
    const uri = config[RealAccountSec.KIS].baseURI + '/api/v1/ekyc-admin/verifyOtp';

    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: METHOD.POST,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          authorization: `jwt ${authToken != null && authToken !== '' ? authToken : autoSignupOTPToken}`,
          Pragma: 'no-cache',
          Expires: '0',
        },
        body: JSON.stringify(params),
      })
        .then(async result => {
          resolve(JSON.parse(await result.text()));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const resendOTP = () => {
    otpId.current = '';
    sendOTP({ id: dataEkyc.phoneNumber, idType: 'PHONE_NO', txType: 'E_KYC' }).then((res: any) => {
      setTimer(config.countDownOTP);
      interval.current = setInterval(() => {
        setTimer((prevTime: number) => {
          if (prevTime <= 0 && interval.current != null) {
            clearInterval(interval.current);
          }
          return prevTime - 1;
        });
      }, 1000);
      otpId.current = res.otpId;
      alertMessage('success', `${t('Send OTP')}`, `${t('Success')}`);
    });
  };

  const onChangeOTPValue = (value: string) => {
    setOTPValue(value);
    setOtpError(false);
    setOtpErrorContent('');
  };

  const submitForm = () => {
    if (otpValue.length === NUMBER_OF_OTP_FIELD) {
      formatDateToString(
        formatStringToDate((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.valid_date, 'dd/MM/yyyy')
      );
      verifyOTP({ otpId: otpId.current, otpValue })
        .then((res: any) => {
          if (res.otpKey) {
            const paramss = {
              matchingRate:
                Platform.OS === 'android'
                  ? (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).COMPARE_RESULT.object.prob
                  : (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).COMPARE_RESULT.object.prob,
              birthDay: formatDateToString(dataEkyc.birthDay, 'yyyyMMdd'),
              issueDate: formatDateToString(dataEkyc.issueDate, 'yyyyMMdd'),
              address: `${dataEkyc.address}, ${dataEkyc.permanentDistrict}, ${dataEkyc.permanentProvince}`,
              expiredDate:
                Platform.OS === 'android'
                  ? formatDateToString(
                      formatStringToDate(
                        (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.valid_date,
                        'dd/MM/yyyy'
                      )
                    )
                  : formatDateToString(
                      formatStringToDate(
                        (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.valid_date,
                        'dd/MM/yyyy'
                      )
                    ),
            };
            finishRegisterAccount(paramss).then((data: any) => {
              if (data.eKycId) {
                dispatch(EkycActions.clearDataEkycStep());
                props.navigation.navigate(ScreenNames.KisEKYCFinalStep, {
                  flow: dataEkyc.flow,
                  sec: dataEkyc.sec,
                });
              } else {
                alertMessage('danger', 'Ekyc', data.code);
              }
            });
          } else {
            setErrorModalVisible(true);
            setErrorModalContent('Wrong OTP, please try again!');
          }
        })
        // Catch err OTP api
        .catch(err => {
          // this.setState({ otpResult: false });
          setErrorModalVisible(true);
          setErrorModalContent('Wrong OTP, please try again!');
          throw err;
        });
    }
    setOTPValue('');
  };

  const [props2] = useClearByFocusCell({
    value: otpValue,
    setValue: onChangeOTPValue,
  });

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
          <View style={[globalStyles.fillWidth, globalStyles.alignCenter, styles.paddingTop25]}>
            <PhoneIcon height={scaleSize(72)} width={scaleSize(72)} />
          </View>
          <Text allowFontScaling={false} style={styles.title}>
            {t('Confirm OTP')}
          </Text>
          <Text allowFontScaling={false} style={styles.title2}>
            {t('Please typing the 6 character OTP that was sent to your phone', {
              maskedPhone: maskingNumber(dataEkyc.phoneNumber),
            })}
          </Text>
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
        </View>
      </ScrollView>
    );
  };

  const onSubmitForm2 = () => {
    setErrorModalVisible(false);
    setErrorModalContent('');
  };

  const renderScreenIOS = (screenHeight2: number | null) => {
    return (
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="always">
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <View style={[globalStyles.fillWidth, globalStyles.alignCenter, styles.paddingTop25]}>
            <PhoneIcon height={scaleSize(72)} width={scaleSize(72)} />
          </View>
          <Text allowFontScaling={false} style={styles.title}>
            {t('Confirm OTP')}
          </Text>
          <Text allowFontScaling={false} style={styles.title2}>
            {t('Please typing the 6 character OTP that was sent to your phone', {
              maskedPhone: maskingNumber(dataEkyc.phoneNumber),
            })}
          </Text>

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
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStep4 height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
        goBackAction={goBack}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
      <Modal
        visible={errorModalVisible}
        childrenContent={
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <View style={[globalStyles.alignCenter, styles.modalContentContainer]}>
              <ErrorAlertIcon height={scaleSize(72)} width={scaleSize(72)} />
              <Text style={styles.errorTextModal}>{t(errorModalContent)}</Text>
              <View style={[globalStyles.centered, styles.executeButtonContainer, globalStyles.fillWidth]}>
                <TouchableOpacity
                  style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
                  onPress={onSubmitForm2}
                >
                  <Text style={styles.executeButtonText} allowFontScaling={false}>
                    {t('Accept')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const mapStateToProps = (state: IState) => ({
  registerParams: state.registerParams,
  resetPasswordParams: state.resetPasswordParams,
});

export default memo(connect(mapStateToProps, null)(KisEkycStep4ConfirmOTP));
