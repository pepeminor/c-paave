import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import withMemo from 'HOC/withMemo';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const SettingCommunity = (props: StackScreenProps<'SettingCommunity'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const goToEditProfiles = useCallback(() => {
    props.navigation.navigate(ScreenNames.SocialEditProfiles);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Community Settings'} />
      <TouchableOpacity onPress={goToEditProfiles} style={styles.settingContainer}>
        <Text allowFontScaling={false} style={styles.settingItemText}>
          {t('Edit Profile')}
        </Text>
        <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.settingContainer}>
        <Text allowFontScaling={false} style={styles.settingItemText}>
          {t('Blocked Accounts')}
        </Text>
        <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Text allowFontScaling={false} style={styles.settingItemText}>
          {t('Muted Accounts')}
        </Text>
        <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
      </TouchableOpacity> */}
    </View>
  );
};

export default withMemo(SettingCommunity);
