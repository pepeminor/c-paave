/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { ILoginParams, ILoginSECParams } from 'interfaces/authentication';
import { login, loginBiometric, loginSEC } from 'reduxs/global-actions/Authentication';

import { useTranslation } from 'react-i18next';
import { Animated, Easing, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CheckBox from '../../../../components/CheckBox';
import FaceIDIcon from 'assets/icon/FaceID.svg';
import TouchIDIcon from 'assets/icon/TouchIDIcon.svg';
import PasswordIcon from 'assets/icon/Lock.svg';
import UserIcon from 'assets/icon/User.svg';
import LoadingKIS from 'assets/icon/loading-kis.svg';
import DiagonalGradientButton from 'components/DiagonalGradientButton';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import { CHANNEL, storageKey } from 'constants/enum';
import { Global, IS_IOS } from 'constants/main';
import { useFormik } from 'formik';
import { BIOMETRIC_TYPE } from 'global';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import {
  getKey,
  handleErrors,
  navigate,
  getKisClientData,
  insertObjectIf,
  insertObjectIfElse,
  FulfilledRequestError,
} from 'utils';
import globalStyles, { GradientColors, scaleSize } from 'styles';
import signInSchema from './schemas';
import useStyles, { localColors } from './styles';
import { reduceKisUsername } from 'reduxs/sagas/LoginRealAccount/LoginRealAccount';
import Modal from 'components/Modal';
import { rnBiometrics, store } from 'screens/App';
import { track, setUserId } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { IProps as ModalType } from './components/ModalConfirmShareInfoKIS';
import { ERROR } from 'constants/error';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { sendLogEventAppFlyers } from 'utils/appFlyers';
import { AuthType } from 'constants/AuthType';
import { SelectKisSessionTimeout } from 'reduxs/global-reducers/KisSessionTimeout';

interface SignInFormProps {
  authType: AuthType;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

type SavedUsername = {
  paave: string;
  kis: string;
};

const SignInForm = ({ authType, loading, setLoading }: SignInFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const passwordTextInput = useRef<TextInput>(null);
  const onModalOTPKIS = useAppSelector(state => state.onModalOTPKIS);
  const [rememberMe, setRememberMe] = useState(true);
  const [lastedUsername, setLastUsername] = useState<SavedUsername>({
    paave: '',
    kis: '',
  });
  const [showConfirmKIS, setShowConfirmKIS] = useState(false);
  const ModalConfirmShareInfoKIS = useRef<FunctionComponent<ModalType>>();

  const [errorBiometricModalVisible, setErrorBiometricModalVisible] = useState<boolean>(false);
  const [errorBiometricModalContent, setErrorBiometricModalContent] = useState<ReactElement>(<View />);
  const [modalTitle, setModalTitle] = useState('');
  const offset = useRef(new Animated.Value(0)).current;
  const usersSetting = useAppSelector(state => state.usersSetting);
  const temporarilyBiometricStatus = useAppSelector(state => state.temporarilyBiometricStatus);

  const initValue = {
    username: authType === AuthType.KIS ? lastedUsername.kis : lastedUsername.paave,
    password: '',
  };

  const loopAnimation = Animated.loop(
    Animated.timing(offset, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    { resetBeforeIteration: true }
  );

  useEffect(() => {
    getKey(storageKey.LASTED_USER_NAME).then(username => {
      if (username) {
        setLastUsername(old => {
          return { ...old, paave: username as string };
        });
        handleFieldChange('username')(username as string);
      }
    });
    getKey(storageKey.LASTED_KIS_NAME).then(username => {
      if (username) {
        setLastUsername(old => {
          return { ...old, kis: username as string };
        });
      }
    });
  }, []);

  useEffect(() => {
    formik.resetForm({ values: initValue });
  }, [authType]);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading) {
      loopAnimation.reset();
      loopAnimation.start();
    }
  }, [loading]);

  useEffect(hideLoading, [onModalOTPKIS]);

  const formik = useFormik({
    initialValues: initValue,
    validate: values =>
      signInSchema
        .validate(values, {
          abortEarly: false,
        })
        .then(() => true, handleErrors),
    onSubmit: values => {
      const { username, password } = values;
      switch (authType) {
        case AuthType.KIS:
          submitConfirmKIS(username, password)();

          break;
        default:
          submitPAAVE(username, password);
      }

      track(AMPLITUDE_EVENT.LOGIN, {
        email: formik.values.username,
        accountType: authType,
      });
      sendLogEventAppFlyers('af_login', {
        af_account_type: authType,
        af_account_name: username,
      });
    },
  });

  const loginSuccess = useCallback(
    (isBiometric?: boolean) => () => {
      setUserId(formik.values.username);
      if (isBiometric) {
        track(AMPLITUDE_EVENT.LOGIN_BIOMETRIC_SUCCESS, {
          email: formik.values.username,
          accountType: authType,
        });
      } else {
        track(AMPLITUDE_EVENT.LOGIN_SUCCESS, {
          email: formik.values.username,
          accountType: authType,
        });
      }
      sendLogEventAppFlyers('af_login_succeed', {
        af_account_type: authType,
        af_account_name: formik.values.username,
      });

      hideLoading();
    },
    [authType, formik.values.username]
  );

  const submitPAAVE = useCallback(
    (username: string, password: string) => {
      showLoading();
      const params: ILoginParams = {
        // platform: IS_IOS ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
        platform: 'm.paave.os',
        grant_type: config.authentication.grantType,
        client_id: config.authentication.clientId,
        client_secret: config.authentication.clientSecret,
        username,
        password,
        device_id: config.uniqueId,
        rememberMe,
        appVersion: config.appVersion,
        session_time_in_minute: SelectKisSessionTimeout(store.getState(), username),
      };
      dispatch(
        login(params, undefined, undefined, true, undefined, {
          handleSuccess: loginSuccess(),
          handleFail: () => {
            hideLoading();
            track(AMPLITUDE_EVENT.LOGIN_FAIL, {
              email: formik.values.username,
              accountType: authType,
            });
          },
        })
      );
    },
    [formik.values.username, authType, rememberMe]
  );

  const submitConfirmKIS = useCallback(
    (username: string, password: string, infoAccessGranted?: boolean) => async () => {
      hideConfirmKIS();
      showLoading();

      const kisClientData = await getKisClientData();
      const params: ILoginSECParams = {
        platform: IS_IOS ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
        partnerId: 'kis',
        partner: {
          ...kisClientData,
          grantType: 'password',
          username: reduceKisUsername(username),
          password,
        },
        paave: {
          ...config.authentication,
        },
        session_time_in_minute: SelectKisSessionTimeout(store.getState(), undefined, username),
        rememberMe,
        appVersion: config.appVersion,
        ...insertObjectIf(infoAccessGranted, { infoAccessGranted }),
      };
      dispatch(
        loginSEC(params, undefined, undefined, true, undefined, {
          handleSuccess: loginSuccess(),
          handleFail: (err: any) => {
            if (err instanceof FulfilledRequestError) {
              if (err.data.code === ERROR.INFO_ACCESS_NOT_GRANTED) {
                if (ModalConfirmShareInfoKIS) {
                  ModalConfirmShareInfoKIS.current = require('./components/ModalConfirmShareInfoKIS.tsx').default;
                }
                setShowConfirmKIS(true);
              }
            }
            hideLoading();
            track(AMPLITUDE_EVENT.LOGIN_FAIL, {
              email: formik.values.username,
              accountType: authType,
            });
          },
        })
      );
    },
    [authType, formik.values.username, rememberMe]
  );

  const hideConfirmKIS = useCallback(() => {
    ModalConfirmShareInfoKIS.current = undefined;
    if (showConfirmKIS) {
      setShowConfirmKIS(false);
    }
  }, [showConfirmKIS]);

  const handleFieldChange = (type: string) => (value: string) => {
    formik.setFieldValue(type, value);
    type === 'username' &&
      (authType === AuthType.KIS
        ? setLastUsername({ ...lastedUsername, kis: value })
        : setLastUsername({ ...lastedUsername, paave: value }));
  };

  const onPressRememberMe = useCallback(() => {
    setRememberMe(prev => !prev);
  }, []);

  const goToForgotPassword = useCallback(() => {
    switch (authType) {
      case AuthType.KIS:
        navigate({ key: ScreenNames.ForgotKisPassword });
        break;
      default:
        navigate({ key: ScreenNames.ForgotPassword });
        break;
    }
  }, [authType]);

  const currentUser = useMemo(
    () =>
      usersSetting.listUsers.find(item =>
        authType === AuthType.KIS
          ? item?.kisUsername != null &&
            item.kisUsername !== '' &&
            item.kisUsername === lastedUsername.kis.toUpperCase()
          : lastedUsername.paave.includes('@')
          ? item?.email != null && item.email !== '' && item.email === lastedUsername.paave
          : item?.paaveUsername != null && item.paaveUsername !== '' && item.paaveUsername === lastedUsername.paave
      ),
    [usersSetting.listUsers, lastedUsername.kis, lastedUsername.paave, authType]
  );

  const usernameOfCurrentUser =
    authType === AuthType.PAAVE ? currentUser?.paaveUsername ?? '' : currentUser?.kisUsername ?? '';
  // check case login with kis - find username paave with kis username
  const username = useMemo(() => {
    if (authType === AuthType.PAAVE) {
      return formik.values.username.includes('@')
        ? usersSetting.currentBiometricUsername.email
        : usersSetting.currentBiometricUsername.paaveUsername;
    } else if (authType === AuthType.KIS) {
      return usersSetting.currentBiometricUsername.kisUsername;
    }
    return '';
  }, [usersSetting.currentBiometricUsername, authType, formik.values.username]);

  const modalBioError = useCallback(() => {
    return (
      <View style={globalStyles.alignCenter}>
        {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
          <TouchIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
        ) : (
          Global.biometricType === BIOMETRIC_TYPE.FaceID && (
            <FaceIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
          )
        )}
        <Text allowFontScaling={false} style={styles.modalContentText}>
          {t('Please log in and set up fingerprint/face recognition in Setting to activate this function')}
        </Text>
      </View>
    );
  }, []);

  const handleLoginBiometric = useCallback(async () => {
    if (Global.biometricType === BIOMETRIC_TYPE.None) {
      setErrorBiometricModalVisible(true);
      return;
    }
    if (formik.values.username === '') {
      setErrorBiometricModalContent(
        <View style={globalStyles.alignCenter}>
          {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
            <TouchIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
          ) : (
            Global.biometricType === BIOMETRIC_TYPE.FaceID && (
              <FaceIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
            )
          )}
          <Text allowFontScaling={false} style={styles.modalContentText}>
            {t('Please enter your username to keep processing in Fingerprint/Face signin')}
          </Text>
        </View>
      );
      setErrorBiometricModalVisible(true);
      setModalTitle('Warning');
      return;
    }
    if (temporarilyBiometricStatus) {
      setErrorBiometricModalContent(
        <View style={globalStyles.alignCenter}>
          {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
            <TouchIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
          ) : (
            Global.biometricType === BIOMETRIC_TYPE.FaceID && (
              <FaceIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
            )
          )}
          <Text allowFontScaling={false} style={styles.modalContentText}>
            {t('biometric.login_required')}
          </Text>
        </View>
      );
      setErrorBiometricModalVisible(true);
      setModalTitle('Warning');
      return;
    }
    rnBiometrics.biometricKeysExist().then(resultObject => {
      const { keysExist } = resultObject;
      if (!keysExist) {
        __DEV__ && console.log('Keys do not exist or were deleted');
        setErrorBiometricModalContent(modalBioError);
        setErrorBiometricModalVisible(true);
        setModalTitle(t('Biometric Authentication'));
        return;
      }
      if (
        // username can be different with username in currentUser
        formik.values.username.toUpperCase() === `${username}`.toUpperCase() &&
        currentUser != null &&
        currentUser.isBiometric
      ) {
        rnBiometrics
          .createSignature({
            promptMessage: 'Sign in',
            payload: currentUser.paaveUsername.toUpperCase(),
          })
          .then(resultObject => {
            const { success, signature } = resultObject;
            if (success && signature != null) {
              showLoading();
              const params = {
                signatureValue: signature,
                username: currentUser.paaveUsername,
                rememberMe,
              };
              dispatch(
                loginBiometric(params, undefined, undefined, true, undefined, {
                  handleSuccess: loginSuccess(true),
                  handleFail: hideLoading,
                })
              );
            }
          })
          .catch(async error => {
            __DEV__ && console.log('handleLoginBiometricError', error);
            track(AMPLITUDE_EVENT.LOGIN_BIOMETRIC_FAIL, {
              email: formik.values.username,
              accountType: authType,
            });
            if (`${error.code}`.includes('Error')) {
              setErrorBiometricModalContent(modalBioError);
              setErrorBiometricModalVisible(true);
              setModalTitle(t('Biometric Authentication'));
            }
          });
      } else if (username !== usernameOfCurrentUser && username !== '' && usernameOfCurrentUser !== '') {
        setErrorBiometricModalContent(
          <View style={globalStyles.alignCenter}>
            {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
              <TouchIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
            ) : (
              Global.biometricType === BIOMETRIC_TYPE.FaceID && (
                <FaceIDIcon height={scaleSize(64)} width={scaleSize(64)} style={styles.biometricIconInModal} />
              )
            )}
            <Text allowFontScaling={false} style={styles.modalContentText}>
              {t('BIOMETRIC_ACTIVE_ON_ANOTHER_ACCOUNT')} {username}
            </Text>
          </View>
        );
        setErrorBiometricModalVisible(true);
        setModalTitle('Biometric Authentication');
      } else {
        setErrorBiometricModalContent(modalBioError);
        setErrorBiometricModalVisible(true);
        setModalTitle(t('Biometric Authentication'));
      }
    });
  }, [
    username,
    usernameOfCurrentUser,
    authType,
    currentUser,
    formik.values.username,
    modalBioError,
    loginSuccess,
    rememberMe,
  ]);

  const closeModal = useCallback(() => {
    setErrorBiometricModalVisible(false);
  }, []);

  return (
    <View>
      <TextInputComponent
        onSubmitEditing={passwordTextInput.current?.focus}
        value={formik.values.username}
        onChangeText={handleFieldChange('username')}
        labelTextStyle={styles.labelTextStyle}
        labelText={authType === AuthType.PAAVE ? 'Username or Email' : 'Account Number'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          insertObjectIfElse(
            !formik.errors.username,
            styles.textInputContainerStyle,
            styles.textInputContainerStyleError
          ),
        ]}
        returnKeyType={'next'}
        icon={<UserIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
        placeholder={authType === AuthType.PAAVE ? 'Username or Email' : 'Account Number'}
        placeholderTextColor={localColors.DARKTextBigTitle}
        textInputStyle={styles.textInputStyle}
        error={Boolean(formik.errors.username)}
        errorContent={formik.errors.username}
        autoCapitalize={'none'}
      />
      <TextInputComponent
        ref1={passwordTextInput}
        value={formik.values.password}
        onChangeText={handleFieldChange('password')}
        wholeContainerStyle={styles.wholeContainerVerticalStyle}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Password'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          insertObjectIfElse(
            !(Boolean(formik.errors.password) && formik.touched.password),
            styles.textInputContainerStyle,
            styles.textInputContainerStyleError
          ),
        ]}
        icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
        placeholderTextColor={localColors.DARKTextBigTitle}
        placeholder={'Password'}
        textInputStyle={styles.textInputStyle}
        secureTextEntry={true}
        eyeIconHeight={scaleSize(14)}
        eyeIconWidth={scaleSize(19)}
        eyeIconStyle={styles.eyeIconStyle}
        error={Boolean(formik.errors.password) && formik.touched.password}
        errorContent={formik.errors.password}
        autoCapitalize={'none'}
      />

      <View style={styles.rememberMeSection}>
        <CheckBox
          value={rememberMe}
          onPress={onPressRememberMe}
          label={t('Remember me')}
          textStyles={styles.WhiteText}
        />
        <TouchableOpacity onPress={goToForgotPassword} style={styles.forgotContainer}>
          <Text allowFontScaling={false} style={styles.forgotText}>
            {t('Forgot Password')}?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.executeFormContainerLogin}>
        <View
          style={insertObjectIfElse(
            Global.biometricType !== BIOMETRIC_TYPE.None,
            styles.executeForm,
            globalStyles.container
          )}
        >
          <DiagonalGradientButton
            onPress={formik.submitForm}
            btnText={t('Sign In')}
            colors={GradientColors.GradientBlue}
            // isDisable={!formik.dirty || !formik.isValid}
          />
        </View>
        {Global.biometricType !== BIOMETRIC_TYPE.None && (
          <TouchableOpacity onPress={handleLoginBiometric}>
            {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
              <TouchIDIcon height={scaleSize(36)} width={scaleSize(36)} />
            ) : (
              Global.biometricType === BIOMETRIC_TYPE.FaceID && (
                <FaceIDIcon height={scaleSize(36)} width={scaleSize(36)} />
              )
            )}
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={loading && !onModalOTPKIS}
        onRequestClose={hideLoading}
        childrenContent={
          <TouchableWithoutFeedback onPress={hideLoading}>
            <View style={styles.modalBackground}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotateZ: offset.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }}
              >
                <LoadingKIS />
              </Animated.View>
              <Text style={styles.loadingTextStyle}>
                {t(`Please wait while we verify your account.\nIt'll just take a moment`)}
              </Text>
              <View style={styles.dummyBlock} />
            </View>
          </TouchableWithoutFeedback>
        }
      />

      <Modal
        visible={errorBiometricModalVisible}
        onRequestClose={hideLoading}
        childrenContent={
          <View style={styles.modalErrorBioBackground}>
            <View style={styles.modalContentContainer}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>{t(modalTitle)}</Text>
              </View>
              {errorBiometricModalContent}
              <TouchableOpacity onPress={closeModal} style={styles.modalOKButton}>
                <Text style={styles.modalOKButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        }
      />

      {ModalConfirmShareInfoKIS.current && (
        <ModalConfirmShareInfoKIS.current
          isVisible={showConfirmKIS}
          onConfirm={submitConfirmKIS(formik.values.username, formik.values.password, true)}
          onCancel={hideConfirmKIS}
        />
      )}
    </View>
  );
};
export default withMemo(SignInForm);
