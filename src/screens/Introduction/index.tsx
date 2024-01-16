import React, { memo } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigate } from 'utils';
import LanguagePicker from 'components/LanguagePicker';
// Icons
import Logo from 'assets/logo-paave.svg';

// Styles
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import OnboardingBanner from 'components/OnboardingBanner';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginNonUser } from 'reduxs/global-actions';

const Introduction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const goToLogin = () => {
    navigate({ key: ScreenNames.SignIn });
  };
  const goToSignUp = () => {
    navigate({ key: ScreenNames.SignUp });
  };

  const continueWithDemoAccount = () => {
    dispatch(loginNonUser(null));
  };
  // const goToHome = () => {
  //   navigate({ key: 'HomeTab' });
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.languagePickerContainer]}>
        <View style={[globalStyles.container, globalStyles.justifyCenter, styles.languagePickerContainerInner]}>
          <LanguagePicker />
        </View>
      </View>
      <ScrollView>
        <View style={[globalStyles.alignCenter, globalStyles.flexDirectionCol]}>
          <Logo width={scaleSize(144)} height={scaleSize(62)} />
          {/* <Text allowFontScaling={false} style={[styles.instructionText]}>
          {t('Get inspired and learn about investment from market leaders')}
        </Text> */}
          {/* // Ẩn PAAVE-675
        <Image
          style={styles.mainImage}
          source={require('assets/SNS-Screen-1.png')}
          resizeMethod={'resize'}
          resizeMode={'stretch'}
        /> */}
          <OnboardingBanner />
        </View>
        <View style={[globalStyles.container, styles.navigationSection]}>
          {/* // Ẩn PAAVE-675
        <View style={[globalStyles.container]}>
          <TouchableOpacity onPress={goToHome} style={[globalStyles.centered, styles.getStartedButton]}>
            <Text allowFontScaling={false} style={[styles.getStartedButtonText]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View> */}
          <View style={[globalStyles.flexDirectionRow, styles.wrapButton]}>
            <View style={[globalStyles.container, styles.signUpButtonContainer]}>
              <TouchableOpacity onPress={goToSignUp} style={[globalStyles.centered, styles.signUpButton]}>
                <Text allowFontScaling={false} style={[styles.signUpButtonText]}>
                  {t('Sign Up')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, styles.signInButtonContainer]}>
              <TouchableOpacity
                accessibilityLabel="Test-Btn-SignIn-Intro" //works for android & iOS content-description
                accessible={true}
                onPress={goToLogin}
                style={[globalStyles.centered, styles.signInButton]}
              >
                <Text allowFontScaling={false} style={[styles.signInButtonText]}>
                  {t('Sign In')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text allowFontScaling={false} style={[styles.nonLoginText]}>
            {t('Try Paave without signing up?')}
          </Text>
          <TouchableOpacity onPress={continueWithDemoAccount} style={[globalStyles.centered, styles.borderRadius]}>
            <Text allowFontScaling={false} style={[styles.signInButtonText]}>
              {t('Get Started Now')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Introduction);
