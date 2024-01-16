import React, { memo, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import { useHeaderHeight } from '@react-navigation/elements';
import TextInputComponent from 'components/TextInput';
import { isBlank } from '../../utils';
import { IState } from 'reduxs/global-reducers';
import { resetPassword } from 'reduxs/global-actions/Authentication';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import PasswordIcon from 'assets/icon/Lock.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderScreen from 'components/HeaderScreen';
import config from 'config';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const validateData = [
  `Must be at least 6 characters long`,
  `Must include both uppercase and lowercase letters`,
  `Must include numbers and special characters`,
];

const NewPassword = (props: StackScreenProps<'NewPassword'>) => {
  const basicHeaderHeight = useHeaderHeight();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorContent, setPasswordErrorContent] = useState('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorContent, setConfirmPasswordErrorContent] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const otpKey = useSelector((state: IState) => state.otpKey);
  const resetPasswordParams = useSelector((state: IState) => state.resetPasswordParams);

  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.goBack();
  };

  const onChangePassword = (value: string) => {
    setPasswordError(false);
    setPassword(value);
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPasswordError(false);
    setConfirmPassword(value);
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword && !isBlank(confirmPassword)) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorContent('');
    }
    return true;
  };

  const validatePassword = () => {
    if (!isBlank(password) && !config.regex.passWord.test(password)) {
      setPasswordError(true);
      setPasswordErrorContent('INVALID_PASSWORD');
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
  };

  const disableSubmit = () => {
    return isBlank(password) || isBlank(confirmPassword) || passwordError === true || confirmPasswordError === true;
  };

  const submitForm = () => {
    if (!disableSubmit() && otpKey.data != null) {
      dispatch(
        resetPassword(
          {
            ...resetPasswordParams,
            newPassword: password,
            otpKey: otpKey.data.keyToken,
            navigation: { key: ScreenNames.SignIn },
          },
          {
            message: 'RESET_PW_SUCCESS',
          }
        )
      );
    }
  };

  const renderScreenAndroid = (screenHeight2: number | null) => {
    return (
      <ScrollView keyboardDismissMode={'interactive'}>
        <View style={[screenHeight2 == null ? globalStyles.container : { height: scaleSize(screenHeight2) }]}>
          <View style={[globalStyles.alignCenter, styles.logoContainer]}>
            <Text allowFontScaling={false} style={styles.title}>
              {t('New Password')}
            </Text>
          </View>
          <TextInputComponent
            value={password}
            onChangeText={onChangePassword}
            onBlur={validatePassword}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Create New Password'}
            secureTextEntry={true}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              { ...(passwordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
            ]}
            placeholder={'Enter new password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={passwordError}
            errorContent={passwordErrorContent}
            icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />
          <TextInputComponent
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            onBlur={validateConfirmPassword}
            wholeContainerStyle={[styles.wholeContainerStyle, styles.secondTextInput]}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Confirm Your New Password'}
            secureTextEntry={true}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(confirmPasswordError === false
                  ? styles.textInputContainerStyle
                  : styles.textInputContainerStyleError),
              },
            ]}
            placeholder={'Enter new password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={confirmPasswordError}
            errorContent={confirmPasswordErrorContent}
            icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />
          <TouchableOpacity
            disabled={disableSubmit()}
            style={[globalStyles.centered, styles.executeFormButton, { ...(disableSubmit() && styles.disabledButton) }]}
            onPress={submitForm}
          >
            <Text style={[styles.executeFormButtonText, { ...(disableSubmit() && styles.disabledButtonText) }]}>
              {t('Submit')}
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.alignCenter, styles.executeFormContainer]}>
            <View
              style={[
                globalStyles.centered,
                styles.executeFormTitle,
                globalStyles.disableBackground,
                globalStyles.enableBackground,
              ]}
            >
              {validateData.map((el, idx) => (
                <View key={idx} style={[globalStyles.flexDirectionRow, styles.validateExItemContainer]}>
                  <View>
                    <Text style={styles.executeFormTitleText}>{'\u2022' + ' '}</Text>
                  </View>
                  <View style={globalStyles.container}>
                    <Text style={styles.executeFormTitleText}>{t(el)}</Text>
                  </View>
                </View>
              ))}
            </View>
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
            <Text allowFontScaling={false} style={styles.title}>
              {t('New Password')}
            </Text>
          </View>
          <TextInputComponent
            value={password}
            onChangeText={onChangePassword}
            onBlur={validatePassword}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Create New Password'}
            secureTextEntry={true}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              { ...(passwordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
            ]}
            placeholder={'Enter new password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={passwordError}
            errorContent={passwordErrorContent}
            icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />
          <TextInputComponent
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            onBlur={validateConfirmPassword}
            wholeContainerStyle={[styles.wholeContainerStyle, styles.secondTextInput]}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Confirm Your New Password'}
            secureTextEntry={true}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(confirmPasswordError === false
                  ? styles.textInputContainerStyle
                  : styles.textInputContainerStyleError),
              },
            ]}
            placeholder={'Enter new password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={confirmPasswordError}
            errorContent={confirmPasswordErrorContent}
            icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />
          <TouchableOpacity
            disabled={disableSubmit()}
            style={[globalStyles.centered, styles.executeFormButton, { ...(disableSubmit() && styles.disabledButton) }]}
            onPress={submitForm}
          >
            <Text style={[styles.executeFormButtonText, { ...(disableSubmit() && styles.disabledButtonText) }]}>
              {t('Submit')}
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.alignCenter, styles.executeFormContainer]}>
            <View
              style={[
                globalStyles.centered,
                styles.executeFormTitle,
                globalStyles.disableBackground,
                globalStyles.enableBackground,
              ]}
            >
              {validateData.map((el, idx) => (
                <View key={idx} style={[globalStyles.flexDirectionRow, styles.validateExItemContainer]}>
                  <View>
                    <Text style={styles.executeFormTitleText}>{'\u2022' + ' '}</Text>
                  </View>
                  <View style={globalStyles.container}>
                    <Text style={styles.executeFormTitleText}>{t(el)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - basicHeaderHeight);
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={props.navigation.canGoBack()}
        goBackAction={props.navigation.canGoBack() ? goBack : undefined}
        headerTitle={''}
        background={true}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(NewPassword);
