import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { navigate } from 'utils';
import CandleStickChart from 'components/Chart/CandleStickChart';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import UserIcon from 'assets/icon/UserIcon.svg';
import BellIcon from 'assets/icon/BellIcon.svg';
import UpWhite from 'assets/icon/UpWhite.svg';
import AdsBanner from 'components/AdsBanner';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const PortfolioNonLogin = (props: StackScreenProps<'PortfolioNonLogin'>) => {
  const { styles } = useStyles();
  const goToUserInfo = () => {
    navigate({ key: 'UserInfo' });
  };

  const goSignUp = () => {
    props.navigation.navigate(ScreenNames.SignUp);
  };

  const goSignIn = () => {
    props.navigation.navigate(ScreenNames.SignIn);
  };

  return (
    <View style={globalStyles.container}>
      <HeaderScreen
        leftButtonIcon={
          <TouchableOpacity onPress={goToUserInfo}>
            <UserIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        }
        headerTitle={'Portfolio'}
        rightButtonListIcon={[
          <TouchableOpacity disabled={true} style={globalStyles.disableBackground}>
            <BellIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>,
        ]}
        subAccountVisible={false}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <View
              style={[
                globalStyles.positionAbsolute,
                globalStyles.container2,
                globalStyles.disableBackground2,
                globalStyles.centered,
                styles.zid9999,
              ]}
            >
              <Text style={styles.requireLoginText}>Please register your accountfor Virtual trading</Text>
            </View>
            <View style={[globalStyles.flexDirectionRow, styles.priceContainer]}>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
                <Text allowFontScaling={false} style={styles.navReturnValueText}>
                  0
                </Text>
              </View>

              <View style={[globalStyles.container, globalStyles.alignEnd, styles.paddingRight8]}>
                <View style={[globalStyles.centered, globalStyles.flexDirectionRow, styles.grayArea]}>
                  <UpWhite width={scaleSize(24)} height={scaleSize(24)} />
                  <Text allowFontScaling={false} style={styles.navRateText}>
                    0
                  </Text>
                </View>
              </View>
            </View>
            <CandleStickChart containerStyle={[styles.chartContainer]} />
          </View>
          <View style={styles.bannerContainer}>
            <AdsBanner />
          </View>
          <View style={styles.stockInfoContainer}>
            <View style={[globalStyles.flexDirectionRow, styles.stockInfoTitleContainer]}>
              <View style={[globalStyles.container, globalStyles.justifyCenter]}>
                <Text allowFontScaling={false} style={styles.investmentText}>
                  Investment
                </Text>
              </View>
              <View style={[globalStyles.container, globalStyles.justifyCenter, styles.profitLossReportContainer]}>
                <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
                  <Text allowFontScaling={false} style={styles.reportText}>
                    Profit & Loss Report
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[globalStyles.alignCenter, styles.executeFormContainer]}>
            <Text style={styles.signUpText}>Please register your account for Virtual trading</Text>
            <TouchableOpacity
              onPress={goSignUp}
              style={[
                globalStyles.centered,
                styles.executeFormButton,
                globalStyles.disableBackground,
                globalStyles.enableBackground,
              ]}
            >
              <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                Platform.OS === 'android' ? styles.marginTop21 : styles.marginTop10,
              ]}
            >
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity onPress={goSignIn} style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(PortfolioNonLogin);
