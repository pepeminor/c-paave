import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInputComponent from 'components/TextInput';
import { isBlank } from '../../utils';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import config from 'config';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderScreen from 'components/HeaderScreen';
import PasswordIcon from 'assets/icon/Lock.svg';
import UserIcon from 'assets/icon/User.svg';
import IDCard from 'assets/icon/IDCardFP.svg';

import LogoKisFullName from 'assets/logo/LogoKisFullName.svg';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { IState } from 'reduxs/global-reducers';
import { verifyKisForgotPw } from 'reduxs/global-actions/KisVerifyForgotPassword';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { StackScreenProps } from 'screens/RootNavigation';

type IForgotPasswordBaseProps = {};

type IForgotPasswordProps = StackScreenProps<ScreenNames.ForgotKisPassword> & IForgotPasswordBaseProps;

const ForgotKisPassword = (props: IForgotPasswordProps) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorContent, setUsernameErrorContent] = useState('');
  const [passportID, setPassportID] = useState('');
  const [passportIDError, setPassportIDError] = useState(false);
  const [passportIDErrorContent, setPassportIDErrorContent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorContent, setPasswordErrorContent] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorContent, setConfirmPasswordErrorContent] = useState('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const matrixKey = useSelector((state: IState) => state.kisVerifyForgotPw);

  const { t } = useTranslation();

  const onChangeUsername = useCallback((value: string) => {
    setUsername(value);
  }, []);

  const validateUsername = useCallback(() => {
    if (isBlank(username)) {
      setUsernameError(true);
      setUsernameErrorContent('Account No. cannot be blank');
      return false;
    } else {
      setUsername(username.toUpperCase());
      setUsernameError(false);
      setUsernameErrorContent('');
    }
    return true;
  }, [username]);

  const onChangePassportID = useCallback((value: string) => {
    setPassportID(value);
  }, []);

  const validatepassPortID = useCallback(() => {
    if (isBlank(passportID)) {
      setPassportIDError(true);
      setPassportIDErrorContent('ID/ Passport cannot be blank');
      return false;
    } else {
      setPassportIDError(false);
      setPassportIDErrorContent('');
    }
    return true;
  }, [passportID]);

  const onChangePassword = useCallback((value: string) => {
    setPasswordError(false);
    setPassword(value);
  }, []);

  const onChangeConfirmPassword = useCallback((value: string) => {
    setConfirmPasswordError(false);
    setConfirmPassword(value);
  }, []);

  const validateConfirmPassword = useCallback(() => {
    if (password !== confirmPassword && !isBlank(confirmPassword)) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorContent('');
    }
    return true;
  }, [confirmPassword, password]);

  const validatePassword = useCallback(() => {
    if (!isBlank(password) && !config.regex.passWordForKis.test(password)) {
      setPasswordError(true);
      setPasswordErrorContent('INVALID_KIS_PASSWORD');
      return false;
    } else {
      setPasswordError(false);
      setPasswordErrorContent('');
      setConfirmPasswordError(false);
      setConfirmPasswordErrorContent(t(''));
    }

    if (password !== confirmPassword && !isBlank(confirmPassword)) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorContent('Confirm password and password must be same');
      return false;
    }

    return true;
  }, [password, confirmPassword]);

  const validateDisableBtnVerify = useCallback(() => {
    if (
      usernameError === true ||
      username.trim() === '' ||
      passportIDError ||
      passportID.trim() === '' ||
      passwordError ||
      password.trim() === '' ||
      confirmPasswordError ||
      confirmPassword.trim() === ''
    ) {
      return true;
    }
    return false;
  }, [
    usernameError,
    username,
    confirmPasswordError,
    confirmPassword,
    passportIDError,
    passportID,
    passwordError,
    password,
  ]);

  useUpdateEffect(() => {
    if (matrixKey?.data?.matrixKey) {
      navigate({
        key: ScreenNames.ForgotKisPasswordOTP,
        params: { password, username: username.includes('057') ? username.replace('057', '') : username, passportID },
      });
    }
  }, [matrixKey.data]);

  const submitForm = useCallback(() => {
    const params = {
      clientID: username.includes('057') ? username.replace('057', '') : username,
      idCardNo: passportID,
      isResendOTP: false,
    };
    dispatch(verifyKisForgotPw(params));
  }, [username, passportID]);

  const getScreenHeight = useCallback(
    (event: LayoutChangeEvent) => {
      if (screenHeight != null) {
        return;
      }
      const { height } = event.nativeEvent.layout;
      setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
    },
    [screenHeight]
  );

  const renderScreenAndroid = (screenHeight2: number | null) => {
    return (
      <ScrollView keyboardDismissMode={'interactive'}>
        <View>
          <View
            style={[
              globalStyles.alignCenter,
              styles.logoContainer,
              screenHeight2 == null ? globalStyles.container : { height: screenHeight2 },
            ]}
          >
            <Text allowFontScaling={false} style={[styles.title]}>
              {t('Forgot Password')}
            </Text>
            <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
              <LogoKisFullName height={scaleSize(30)} width={scaleSize(230)} />
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={username}
              onChangeText={onChangeUsername}
              onBlur={validateUsername}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'Account No.'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                { ...(usernameError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
              ]}
              icon={<UserIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              placeholder={'Enter your Account No.'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={usernameError}
              errorContent={usernameErrorContent}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={passportID}
              onChangeText={onChangePassportID}
              onBlur={validatepassPortID}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'ID/ Passport No.'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                {
                  ...(passportIDError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
                },
              ]}
              icon={<IDCard height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              placeholder={'Enter your ID/ Passport No.'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={passportIDError}
              errorContent={passportIDErrorContent}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={password}
              onChangeText={onChangePassword}
              onBlur={validatePassword}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'New Password'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                { ...(passwordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
              ]}
              placeholder={'Enter new password'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={passwordError}
              errorContent={passwordErrorContent}
              icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.eyeIconStyle}
              autoCapitalize={'none'}
              // crossRightIcon={
              //   <TouchableOpacity onPress={resetInput}>
              //     <CrossIcon
              //       width={wp(`${getPercentWidth(24)}%`)}
              //       height={hp(`${getPercentHeight(24)}%`)}
              //       style={{ marginRight: wp(`${getPercentWidth(10)}%`) }}
              //     />
              //   </TouchableOpacity>
              // }
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              onBlur={validateConfirmPassword}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'Confirm New Password'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                {
                  ...(confirmPasswordError === false
                    ? styles.textInputContainerStyle
                    : styles.textInputContainerStyleError),
                },
              ]}
              placeholder={'Confirm Your New Password'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={confirmPasswordError}
              errorContent={confirmPasswordErrorContent}
              autoCapitalize={'none'}
              icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.eyeIconStyle}
              // crossRightIcon={
              //   <TouchableOpacity onPress={resetInput}>
              //     <CrossIcon
              //       width={wp(`${getPercentWidth(24)}%`)}
              //       height={hp(`${getPercentHeight(24)}%`)}
              //       style={{ marginRight: wp(`${getPercentWidth(10)}%`) }}
              //     />
              //   </TouchableOpacity>
              // }
            />
          </View>

          <TouchableOpacity
            disabled={validateDisableBtnVerify()}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...(validateDisableBtnVerify() && styles.disabledButton) },
            ]}
            onPress={submitForm}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...((usernameError === true || username.trim() === '') && styles.disabledButtonText) },
              ]}
            >
              {t('Verify')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.conditionsContainer]}>
            <Text style={[styles.conditionsText]}>
              {'\u2022'} {t('Must be at least 8 characters long')}
            </Text>
            <Text style={[styles.conditionsText]}>
              {'\u2022'} {t('Contain at least 1 uppercase character and no space')}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderScreenIOS = (screenHeight2: number | null) => {
    return (
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <View style={[globalStyles.alignCenter, styles.logoContainer]}>
            <Text allowFontScaling={false} style={[styles.title]}>
              {t('Forgot Password')}
            </Text>
            <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
              <LogoKisFullName height={scaleSize(30)} width={scaleSize(230)} />
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={username}
              onChangeText={onChangeUsername}
              onBlur={validateUsername}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'Account No.'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                { ...(usernameError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
              ]}
              icon={<UserIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              placeholder={'Enter your Account No.'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={usernameError}
              errorContent={usernameErrorContent}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={passportID}
              onChangeText={onChangePassportID}
              onBlur={validatepassPortID}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'ID/ Passport No.'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                {
                  ...(passportIDError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
                },
              ]}
              icon={<IDCard height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              placeholder={'Enter your ID/ Passport No.'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={passportIDError}
              errorContent={passportIDErrorContent}
              autoCapitalize={'none'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={password}
              onChangeText={onChangePassword}
              onBlur={validatePassword}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'New Password'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                { ...(passwordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
              ]}
              placeholder={'Enter new password'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={passwordError}
              errorContent={passwordErrorContent}
              icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.eyeIconStyle}
              autoCapitalize={'none'}
              // crossRightIcon={
              //   <TouchableOpacity onPress={resetInput}>
              //     <CrossIcon
              //       width={wp(`${getPercentWidth(24)}%`)}
              //       height={hp(`${getPercentHeight(24)}%`)}
              //       style={{ marginRight: wp(`${getPercentWidth(10)}%`) }}
              //     />
              //   </TouchableOpacity>
              // }
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInputComponent
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              onBlur={validateConfirmPassword}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.labelTextStyle}
              labelText={'Confirm New Password'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                { marginBottom: 5 },
                {
                  ...(confirmPasswordError === false
                    ? styles.textInputContainerStyle
                    : styles.textInputContainerStyleError),
                },
              ]}
              placeholder={'Confirm Your New Password'}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              error={confirmPasswordError}
              errorContent={confirmPasswordErrorContent}
              autoCapitalize={'none'}
              icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.eyeIconStyle}
              // crossRightIcon={
              //   <TouchableOpacity onPress={resetInput}>
              //     <CrossIcon
              //       width={wp(`${getPercentWidth(24)}%`)}
              //       height={hp(`${getPercentHeight(24)}%`)}
              //       style={{ marginRight: wp(`${getPercentWidth(10)}%`) }}
              //     />
              //   </TouchableOpacity>
              // }
            />
          </View>

          <TouchableOpacity
            disabled={validateDisableBtnVerify()}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...(validateDisableBtnVerify() && styles.disabledButton) },
            ]}
            onPress={submitForm}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...((usernameError === true || username.trim() === '') && styles.disabledButtonText) },
              ]}
            >
              {t('Verify')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.conditionsContainer]}>
            <Text style={[styles.conditionsText]}>
              {'\u2022'} {t('Must be at least 8 characters long')}
            </Text>
            <Text style={[styles.conditionsText]}>
              {'\u2022'} {t('Contain at least 1 uppercase character and no space')}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.canGoBack() ? props.navigation.goBack : undefined}
        headerTitle={''}
        background={true}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(null) : renderScreenIOS(null)}
    </View>
  );
};

export default memo(ForgotKisPassword);
