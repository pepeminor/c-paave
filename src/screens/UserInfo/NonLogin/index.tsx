// CORES
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

//STYLES
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

// ICONS
import IconUser from 'assets/icon/IconUser.svg';
import IconSetting from 'assets/icon/Setting.svg';
import IconHeadPhone from 'assets/icon/Support.svg';
import IconOutlineRight from 'assets/icon/OutlineRight.svg';
import { navigate } from 'utils';
import LoginBanner from 'components/LoginBanner/LoginBanner';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const actionNameStyle = [globalStyles.flexDirectionRow, globalStyles.alignCenter];
const iconSize = { height: scaleSize(24), width: scaleSize(24) };

const NonLogin = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const avaActionStyle = [globalStyles.container, globalStyles.centered, styles.avaAction];
  const actionButtonStyle = [
    globalStyles.flexDirectionRow,
    globalStyles.justifySpaceBetween,
    globalStyles.alignCenter,
    styles.btnAction,
  ];
  const goToSignIn = () => {
    navigate({ key: ScreenNames.SignIn });
  };

  const goToSignUp = () => {
    navigate({ key: ScreenNames.SignUp });
  };

  const goToSettingScreen = () => {
    navigate({ key: 'Setting' });
  };

  const goToSupport = () => {
    navigate({ key: 'HelpAndSupport' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[globalStyles.container]}>
        <View style={[styles.avaNameContainer]}>
          <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            <View style={[globalStyles.centered, styles.avaNameBlock]}>
              <IconUser style={[styles.avaNameIcon]} />
            </View>
            <Text style={[styles.avaNameText]}>{t('Trade with Paave!')}</Text>
          </TouchableOpacity>
          <View style={[globalStyles.flexDirectionRow, styles.avaActionContainer]}>
            <TouchableOpacity onPress={goToSignUp} style={[...avaActionStyle, styles.avaActionRegister]}>
              <Text style={[styles.avaActionText, styles.avaActionRegisterText]}>{t('Register')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToSignIn} style={[...avaActionStyle, styles.avaActionLogin]}>
              <Text style={[styles.avaActionText, styles.avaActionLoginText]}>{t('Sign in')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <LoginBanner containerStyle={styles.bannerContainer} showTitle={true} />
        </View>
        <TouchableOpacity style={actionButtonStyle} onPress={goToSettingScreen}>
          <View style={actionNameStyle}>
            <IconSetting {...iconSize} />
            <Text style={[styles.btnActionNameText]}>{t('Setting')}</Text>
          </View>
          <IconOutlineRight />
        </TouchableOpacity>
        <TouchableOpacity style={actionButtonStyle} onPress={goToSupport}>
          <View style={actionNameStyle}>
            <IconHeadPhone {...iconSize} />
            <Text style={[styles.btnActionNameText]}>{t('Help & Support')}</Text>
          </View>
          <IconOutlineRight />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NonLogin;
