import React, { memo, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import TextInputComponent from 'components/TextInput';
import { isBlank } from '../../utils';
import CrossIcon from 'assets/icon/CrossIcon.svg';
import { changeResetPasswordParams, checkUserExist } from 'reduxs/global-actions/Authentication';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import config from 'config';
import { GetOTPIdType, GetOTPTxType } from 'interfaces/authentication';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckUserExistType } from 'constants/enum';
import HeaderScreen from 'components/HeaderScreen';
import { AuthType } from 'constants/AuthType';
// import LanguagePicker from '../../components/LanguagePicker'; // Ẩn PAAVE-675

const ForgotPassword = (props: StackScreenProps<'ForgotPassword'>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorContent, setUsernameErrorContent] = useState('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);

  const goBack = () => {
    props.navigation.goBack();
  };

  const onChangeUsername = (value: string) => {
    setUsername(value);
  };

  const resetInput = () => {
    setUsername('');
    setUsernameError(true);
    setUsernameErrorContent('Email cannot be blank');
  };

  const { t } = useTranslation();
  const validateUsername = () => {
    if (isBlank(username)) {
      setUsernameError(true);
      setUsernameErrorContent('Email cannot be blank');
      return false;
    } else if (config.regex.email.test(username) !== true) {
      setUsernameError(true);
      setUsernameErrorContent('Email is not valid');
      return false;
    } else {
      setUsernameError(false);
      setUsernameErrorContent('');
    }
    return true;
  };

  const submitForm = () => {
    dispatch(
      checkUserExist({
        value: username,
        type: CheckUserExistType.EMAIL,
        getOTPParams: {
          id: username,
          idType: GetOTPIdType.EMAIL,
          txType: GetOTPTxType.RESET_PASSWORD,
          navigation: { key: 'SignupOTP', params: { isSignup: false, sec: AuthType.PAAVE } },
        },
      })
    );
    dispatch(changeResetPasswordParams({ username }));
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
      <ScrollView keyboardDismissMode={'interactive'}>
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <View style={[globalStyles.alignCenter, styles.logoContainer]}>
            <Text allowFontScaling={false} style={styles.title}>
              {t('Forgot Password')}
            </Text>
          </View>
          <View style={[globalStyles.alignCenter, styles.contentContainer]}>
            <Text allowFontScaling={false} style={styles.content}>
              {t('Enter your registered email address')}
            </Text>
          </View>
          <TextInputComponent
            value={username}
            onChangeText={onChangeUsername}
            onBlur={validateUsername}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Email'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              { ...(usernameError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
            ]}
            placeholder={'Enter your email'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={usernameError}
            errorContent={usernameErrorContent}
            autoCapitalize={'none'}
            crossRightIcon={
              <TouchableOpacity onPress={resetInput}>
                <CrossIcon width={scaleSize(24)} height={scaleSize(24)} style={{ marginRight: scaleSize(10) }} />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity
            disabled={usernameError === true || username.trim() === ''}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...((usernameError === true || username.trim() === '') && styles.disabledButton) },
            ]}
            onPress={submitForm}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...((usernameError === true || username.trim() === '') && styles.disabledButtonText) },
              ]}
            >
              {t('Submit')}
            </Text>
          </TouchableOpacity>
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
              {t('Forgot Password')}
            </Text>
          </View>
          <View style={[globalStyles.alignCenter, styles.contentContainer]}>
            <Text allowFontScaling={false} style={styles.content}>
              {t('Enter your registered email address')}
            </Text>
          </View>
          <TextInputComponent
            value={username}
            onChangeText={onChangeUsername}
            onBlur={validateUsername}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Email'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              { ...(usernameError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
            ]}
            placeholder={'Enter your email'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            error={usernameError}
            errorContent={usernameErrorContent}
            autoCapitalize={'none'}
            crossRightIcon={
              <TouchableOpacity onPress={resetInput}>
                <CrossIcon width={scaleSize(24)} height={scaleSize(24)} style={{ marginRight: scaleSize(10) }} />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity
            disabled={usernameError === true || username.trim() === ''}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              { ...((usernameError === true || username.trim() === '') && styles.disabledButton) },
            ]}
            onPress={submitForm}
          >
            <Text
              style={[
                styles.executeFormButtonText,
                { ...((usernameError === true || username.trim() === '') && styles.disabledButtonText) },
              ]}
            >
              {t('Submit')}
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
        // rightButtonListIcon={[<LanguagePicker />]} // Ẩn PAAVE-675
        background={true}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(ForgotPassword);
