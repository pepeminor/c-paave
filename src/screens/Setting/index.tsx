import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useDispatch } from 'react-redux';
// import SunDisable from 'assets/icon/SunDisable.svg';
// import MoonDisable from 'assets/icon/MoonDisable.svg';
// import Sun from 'assets/icon/Sun.svg';
// import Moon from 'assets/icon/Moon.svg';
import { ACCOUNT_TYPE, languageList } from 'global';
import globalStyles, { lightColors as Colors } from 'styles';
import useStyles from './styles';
// import IconSupport from 'assets/icon/IconSupport.svg';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { updateCurrentUserSetting } from '../../reduxs/global-actions/UserInfo';
import { scaleSize } from '../../styles/index';
import ScreenNames from '../RootNavigation/ScreenNames';
import Switch from 'components/Switch';
import config from 'config';
import withMemo from 'HOC/withMemo';
import Icon from 'components/Icon';
import { IProps as ModalSelectAccount } from './components/ModalChooseDefaultAccount';
import { SettingSelectors } from 'reduxs';
import GlobalDomain from 'config/globalDomain';
import { useAppSelector } from 'hooks';

// usersSetting flow
const Setting = (props: StackScreenProps<'Setting'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const dispatch = useDispatch();
  const selectedLanguage = useAppSelector(state => state.lang);
  const currentUserSetting = useAppSelector(state => state.currentUserSetting);
  const isHaveKISAccount = useAppSelector(state => state.accountList.KIS != null);
  const userName = useAppSelector(state => state.accountList?.KIS?.username ?? '');
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const selectedAccountDefault = useAppSelector(SettingSelectors.selectedAccountDefault(userName!));
  const lang = languageList.find(l => l.value === selectedLanguage);

  const ModalSelectAccount = useRef<FunctionComponent<ModalSelectAccount>>();

  const [showModalSelectAccountDefault, setShowModalSelectAccountDefault] = useState(false);

  const handleUpdateCurrentUserSetting = useCallback(() => {
    if (currentUserSetting == null) return;
    dispatch(
      updateCurrentUserSetting({
        language: selectedLanguage,
      })
    );
  }, [currentUserSetting, selectedLanguage]);

  const goBack = useCallback(() => {
    handleUpdateCurrentUserSetting();
    props.navigation.goBack();
  }, []);

  // const onChangeThemeSwitch = () => {
  //   dispatch(
  //     updateCurrentUserSetting({
  //       ...currentUserSetting,
  //       darkMode: !currentUserSetting?.darkMode,
  //     })
  //   );
  // };

  const onChangeVibrateSwitch = useCallback(() => {
    dispatch(
      updateCurrentUserSetting({
        vibrate: !currentUserSetting?.vibrate,
      })
    );
  }, [currentUserSetting?.vibrate]);

  const gotoLanguagePicker = useCallback(() => {
    props.navigation.navigate('LanguagePicker');
  }, []);

  const gotoHomeScreenPicker = useCallback(() => {
    props.navigation.navigate('HomeScreenPicker');
  }, []);

  const goToSettingNotification = useCallback(() => {
    props.navigation.navigate(ScreenNames.SettingNotification);
  }, []);

  const goToCommunitySetting = useCallback(() => {
    props.navigation.navigate(ScreenNames.SettingCommunity);
  }, []);

  const showModalSelectAccountDefaultAction = useCallback(() => {
    if (ModalSelectAccount) {
      ModalSelectAccount.current = require('./components/ModalChooseDefaultAccount.tsx').default;
    }
    setShowModalSelectAccountDefault(true);
  }, []);

  const closeModalSelectAccount = useCallback(() => {
    setShowModalSelectAccountDefault(false);
  }, []);

  return (
    <View style={globalStyles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Setting'} />
      <View style={styles.container}>
        <View style={styles.container}>
          {selectedAccountType !== ACCOUNT_TYPE.DEMO && (
            <TouchableOpacity onPress={goToSettingNotification} style={styles.settingContainer}>
              <Text allowFontScaling={false} style={styles.settingItemText}>
                {t('Notifications')}
              </Text>
              <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
            </TouchableOpacity>
          )}
          {selectedAccountType !== ACCOUNT_TYPE.DEMO && (
            <TouchableOpacity onPress={goToCommunitySetting} style={styles.settingContainer}>
              <Text allowFontScaling={false} style={styles.settingItemText}>
                {t('Community Settings')}
              </Text>
              <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={gotoLanguagePicker} style={styles.settingContainer}>
            <Text allowFontScaling={false} style={styles.settingItemText}>
              {t('Language')}
            </Text>
            <Text allowFontScaling={false} style={styles.notificationText3}>
              {lang?.label}
            </Text>
            <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoHomeScreenPicker} style={styles.settingContainer}>
            <Text allowFontScaling={false} style={styles.settingItemText}>
              {t('Default home screen')}
            </Text>
            <Text allowFontScaling={false} style={styles.notificationText3}>
              {t(currentUserSetting?.homeScreen ?? GlobalDomain[selectedAccountType].defaultHomeScreenTab)}
            </Text>
            <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
          </TouchableOpacity>
          {isHaveKISAccount && (
            <TouchableOpacity onPress={showModalSelectAccountDefaultAction} style={styles.settingContainer}>
              <Text allowFontScaling={false} style={styles.settingItemText}>
                {t('Default sub account')}
              </Text>
              <Text allowFontScaling={false} style={styles.notificationText3}>
                {selectedAccountDefault}
              </Text>
              <Icon name={'arrow-right-3'} size={24} color={dynamicColors.LIGHTGRAY} />
            </TouchableOpacity>
          )}
          <View style={styles.settingContainer}>
            <Text allowFontScaling={false} style={styles.settingItemText}>
              {t('Vibrate')}
            </Text>
            <View style={styles.switchContainer}>
              <Switch
                value={Boolean(currentUserSetting?.vibrate)}
                onValueChange={onChangeVibrateSwitch}
                disabled={false}
                circleSize={scaleSize(16)}
                barHeight={scaleSize(22)}
                circleBorderWidth={0}
                backgroundActive={Colors.BlueNewColor}
                backgroundInactive={Colors.LIGHTBGTab}
                circleActiveColor={Colors.WHITE}
                circleInActiveColor={Colors.WHITE}
                circleBorderActiveColor={Colors.WHITE}
                circleBorderInactiveColor={Colors.WHITE}
                innerCircleStyle={globalStyles.centered} // style for inner animated circle for what you (may) be rendering inside the circle
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
              />
            </View>
          </View>

          {/* <View
            // onPress={() => currentUserSetting(item.label)}
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.settingContainer,
              styles.borderBottom1,
            ]}
          >
            <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
              Theme
            </Text>
            <View style={[styles.switchContainer]}>
              <Switch
                value={Boolean(currentUserSetting?.darkMode)}
                onValueChange={onChangeThemeSwitch}
                disabled={false}
                // activeText={''}
                // inActiveText={''}
                circleSize={scaleSize(16)}
                barHeight={scaleSize(22)}
                circleBorderWidth={0}
                backgroundActive={Colors.DARKiconDisable}
                backgroundInactive={Colors.LIGHTBGTab}
                circleActiveColor={Colors.WHITE}
                circleInActiveColor={Colors.WHITE}
                circleBorderActiveColor={Colors.WHITE}
                circleBorderInactiveColor={Colors.WHITE}
                renderInsideCircle={() =>
                  currentUserSetting?.darkMode === false ? (
                    <Sun height={scaleSize(16)} width={scaleSize(16)} />
                  ) : (
                    <Moon height={scaleSize(16)} width={scaleSize(16)} />
                  )
                } // custom component to render inside the Switch circle (Text, Image, etc.)
                renderOutsideCircle={() =>
                  currentUserSetting?.darkMode === false ? (
                    <MoonDisable
                      height={scaleSize(16)}
                      width={scaleSize(16)}
                      style={[
                        globalStyles.positionAbsolute,
                        { right: (scaleSize(16) * 2.5 * 9) / 100 },
                      ]}
                    />
                  ) : (
                    <SunDisable
                      height={scaleSize(16)}
                      width={scaleSize(16)}
                      style={[
                        globalStyles.positionAbsolute,
                        { left: (scaleSize(16) * 2.5 * 9) / 100 },
                      ]}
                    />
                  )
                } // padding left or right: (props.circleSize * props.switchWidthMultiplier * 9) / 100
                // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={globalStyles.centered} // style for inner animated circle for what you (may) be rendering inside the circle
                // outerCircleStyle={{}} // style for outer animated circle
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
              // switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View> */}
          <View style={styles.settingContainer}>
            <Text allowFontScaling={false} style={styles.settingItemText}>
              {t('Version')}
            </Text>
            <Text allowFontScaling={false} style={styles.notificationText3}>
              {`${config.appVersion} (${config.appBuildNo}) (${config.isAnEmulator ? 'Emulator' : 'Device'})`}
            </Text>
          </View>
        </View>

        {/* // Ẩn các phần chưa launch PAAVE-527
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport]}>
        <IconSupport width={scaleSize(106)} height={scaleSize(106)} />
      </TouchableOpacity> */}
        {ModalSelectAccount.current && (
          <ModalSelectAccount.current isVisible={showModalSelectAccountDefault} closeModal={closeModalSelectAccount} />
        )}
      </View>
    </View>
  );
};

export default withMemo(Setting);
