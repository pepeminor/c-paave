import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Linking } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useDispatch } from 'react-redux';
import globalStyles from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { updateCurrentUserSetting, getCurrentUserSetting } from 'reduxs/global-actions/UserInfo';
import useUpdateEffect from 'hooks/useUpdateEffect';
import Modal from 'components/Modal';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { onCloseModalOTPKIS, generateKisCardFrom, generateNewKisCard } from 'reduxs/global-actions/Authentication';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { kisVerifyAndSaveOTP } from '../LoginRealAccount/actions';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { ReducerStatus } from 'interfaces/reducer';
import { checkNotifications } from 'react-native-permissions';
import useConstructor from 'hooks/useConstructor';
import useModalOTPKis from 'hooks/useModalOTPKis';
import config from 'config';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';
import { useAppSelector } from 'hooks/useAppSelector';
import ToggleRow from './components/ToggleRow';
import { updateOneSignalTags } from './helper';
import useAppStateChange from 'hooks/useAppStateChange';
import useRefState from 'hooks/useRefState';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import NotificationGroup from './components/NotificationGroup';
import { OneSignalUtils } from 'utils';
import { SettingActions } from 'reduxs';

export enum PermissionStatus {
  UNAVAILABLE = 'unavailable',
  DENIED = 'denied',
  LIMITED = 'limited',
  GRANTED = 'granted',
  BLOCKED = 'blocked',
}

// usersSetting flow
const Setting = (props: StackScreenProps<'SettingNotification'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const [mobileOTPSwitch, _setMobileOTPSwitch] = useRefState<boolean | null>(null);
  const [notificationSwitch, _setNotificationSwitch] = useRefState<boolean | null>(null);
  const currentUserSetting = useAppSelector(state => state.currentUserSetting);
  const [openModalOTPKIS, setOpenModalOTPKIS] = useState(false);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisCheckOTP = useAppSelector(state => state.kisCheckOTP);
  const accountList = useAppSelector(state => state.accountList);
  const [isEnableDeviceNotification, setIsEnableDeviceNotification] = useState<boolean | null>();
  const [openModalSetting, setOpenModalSetting] = useState<boolean | null>();
  const userId = useAppSelector(state => state.getUserAccountInfo.data?.id);
  const [isUserTurnOffNotification, setIsUserTurnOffNotification] = useState<boolean | null>(
    notificationSwitch.current != null ? (notificationSwitch.current ? false : true) : null
  );

  const setMobileOTPSwitch = useCallback((value: boolean | null) => {
    _setMobileOTPSwitch(value);
    updateOneSignalTags(notificationSwitch.current, value);
  }, []);

  const setNotificationSwitch = useCallback((value: boolean | null) => {
    _setNotificationSwitch(value);
    updateOneSignalTags(value, mobileOTPSwitch.current);
  }, []);

  const { valueOTPErrorContent, valueOTPError, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS } =
    useModalOTPKis();

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const onPressCancelModalSetting = useCallback(() => {
    setOpenModalSetting(false);
  }, []);

  const handleUpdateCurrentUserSetting = useCallback(() => {
    if (currentUserSetting == null) return;
    dispatch(
      updateCurrentUserSetting({
        mobileOTP: mobileOTPSwitch.current != null ? mobileOTPSwitch.current : currentUserSetting.mobileOTP,
        notification: notificationSwitch.current != null ? notificationSwitch.current : currentUserSetting.notification,
      })
    );
  }, [currentUserSetting]);

  const goBack = () => {
    handleUpdateCurrentUserSetting();
    props.navigation.goBack();
  };

  const onChangeNotificationSwitch = useCallback(
    (value: boolean) => {
      setIsUserTurnOffNotification(value);
      OneSignalUtils.sendNotificationTag({
        aiRating: value,
        theme: value,
        vnindexReturns: value,
        pinnedNews: value,
      });
      dispatch(SettingActions.updateAllNotifications(value));
      if (!value) {
        setNotificationSwitch(false);
        setIsUserTurnOffNotification(true);
        setMobileOTPSwitch(false);
        return;
      }
      if (!isEnableDeviceNotification) {
        setOpenModalSetting(true);
      } else {
        setNotificationSwitch(true);
        setIsUserTurnOffNotification(false);
      }
    },
    [isEnableDeviceNotification, userId]
  );

  const handleOpenModalOTP = () => {
    resetFormModalOTPKIS();
    setOpenModalOTPKIS(true);
    accountList != null &&
      accountList.KIS != null &&
      accountList.KIS.username != null &&
      dispatch(generateNewKisCard({ username: accountList.KIS.username, from: generateKisCardFrom.NOT_LOGIN }));
  };

  const onChangeMobileOTPSwitch = useCallback(
    (value: boolean) => {
      if (!value) {
        setMobileOTPSwitch(false);
        return;
      }
      // switch on case
      if (!isEnableDeviceNotification) {
        // check device is allow notification if not then force open setting
        setOpenModalSetting(true);
        return;
      }
      if (currentUserSetting?.alreadyDoneSmsOTP === false) {
        // check user already used smsOTP before and device is allow notification if not then force OTP mobile first
        handleOpenModalOTP();
        return;
      }
      if (!notificationSwitch.current) {
        setNotificationSwitch(true);
        setIsUserTurnOffNotification(false);
      }
      setMobileOTPSwitch(true);
    },
    [isEnableDeviceNotification, currentUserSetting?.alreadyDoneSmsOTP, setNotificationSwitch]
  );

  const onPressCancelOtpKis = () => {
    // clear generateKisCardResult
    dispatch(onCloseModalOTPKIS({}));
    setOpenModalOTPKIS(false);
    resetFormModalOTPKIS();
    setMobileOTPSwitch(false);
  };

  const onPressConfirmSendOtpKisValue = () => {
    const params: IKisVerifyAndSaveOTPRequest = {
      expireTime: config.kisOTPTokenExpireTime,
      verifyType: 'MATRIX_CARD',
      wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
      wordMatrixValue: otpKisValue,
    };
    Keyboard.dismiss();
    dispatch(onCloseModalOTPKIS({}));
    dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.NOT_LOGIN));
    setOpenModalOTPKIS(false);
  };

  useConstructor(() => {
    checkNotifications().then(({ status }) => {
      // check device is allow notification if not then force open setting
      if (status === PermissionStatus.GRANTED) {
        setIsEnableDeviceNotification(true);
        if (currentUserSetting?.notification != null && currentUserSetting.notification === true) {
          setNotificationSwitch(true);
          setIsUserTurnOffNotification(false);
        } else {
          setNotificationSwitch(false);
          setIsUserTurnOffNotification(true);
        }
        setOpenModalSetting(false);
      } else {
        setIsEnableDeviceNotification(false);
        setNotificationSwitch(false);
        setIsUserTurnOffNotification(true);
        setOpenModalSetting(true);
        setMobileOTPSwitch(false);
      }
    });
  });

  // handle after finish sms otp
  useUpdateEffect(() => {
    if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
      setMobileOTPSwitch(true);
    }
  }, [kisCheckOTP.status]);

  useEffect(() => {
    if (currentUserSetting == null) {
      dispatch(getCurrentUserSetting({}));
    }
    setMobileOTPSwitch(
      currentUserSetting != null &&
        currentUserSetting.notification === true &&
        currentUserSetting.mobileOTP === true &&
        currentUserSetting.alreadyDoneSmsOTP === true &&
        isEnableDeviceNotification
        ? true
        : false
    );
  }, [currentUserSetting, isEnableDeviceNotification]);

  useAppStateChange(
    useCallback(
      (_, nextAppState) => {
        if (nextAppState !== 'active') return;
        checkNotifications().then(({ status }) => {
          // check device is allow notification if not then force open setting
          if (status === PermissionStatus.GRANTED) {
            setIsEnableDeviceNotification(true);
            if (isUserTurnOffNotification === true) {
              // prevent auto turn on notification when user turn off notification while app setting is turn on (app in background)
              return;
            } else {
              setNotificationSwitch(true);
              setIsUserTurnOffNotification(false);
              setOpenModalSetting(false);
            }
          } else {
            setIsEnableDeviceNotification(false);
            setNotificationSwitch(false);
            setIsUserTurnOffNotification(null);
            setMobileOTPSwitch(false);
            setOpenModalSetting(false);
          }
        });
      },
      [isUserTurnOffNotification]
    )
  );

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Notifications'} />
      <ToggleRow
        value={notificationSwitch.current}
        onValueChanged={onChangeNotificationSwitch}
        title={'Push Notifications'}
        description={'You will be notified when there is news, upcoming events'}
      />

      {Object.keys(accountList).length > 1 && (
        <>
          <View style={styles.titleGroup}>
            <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.BlueNewColor}>
              {t('mobile_notifications')}
            </PaaveText>
          </View>
          <ToggleRow
            value={mobileOTPSwitch.current}
            onValueChanged={onChangeMobileOTPSwitch}
            title={'Mobile OTP'}
            description={
              'You will receive an OTP code for any activity that needs OTP verification in your Real Account'
            }
          />
        </>
      )}
      <View style={styles.titleGroup}>
        <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.BlueNewColor}>
          {t('notifications_group')}
        </PaaveText>
      </View>
      <NotificationGroup />

      {openModalOTPKIS && (
        <Modal visible={openModalOTPKIS}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
              <View style={styles.modalContentContainer}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitleText2}>{t('Please enter OTP code to confirm')}</Text>
                </View>
                <View style={styles.otpKisContainer}>
                  <ModalOTPKIS
                    valueOTP={otpKisValue}
                    onChangeValueOTP={onChangeOtpKisValue}
                    generateKisCardResult={generateKisCardResult}
                    ListContentModal={true}
                    valueOTPError={valueOTPError}
                    valueOTPErrorContent={valueOTPErrorContent}
                  />
                  <TouchableOpacity
                    onPress={onPressConfirmSendOtpKisValue}
                    style={kisOTPAvailable ? styles.executeFormButton3 : styles.executeFormButton2}
                    disabled={!kisOTPAvailable}
                  >
                    <Text
                      allowFontScaling={false}
                      style={kisOTPAvailable ? styles.executeFormButtonText2 : styles.executeFormButtonTextDisable}
                    >
                      {t('Confirm')}
                    </Text>
                  </TouchableOpacity>
                  <View style={globalStyles.fillWidth}>
                    <TouchableOpacity onPress={onPressCancelOtpKis} style={styles.cancelExecuteFormButton2}>
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )}
      {openModalSetting != null && openModalSetting && (
        <Modal visible={openModalSetting != null ? openModalSetting : false}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerSetting}>
              <View style={styles.headerModalSetting}>
                <Text style={styles.headerModalSettingTitle}>{t('Enable Notifications')}</Text>
              </View>
              <View style={styles.sectionModalSetting}>
                <Text style={styles.textSection}>
                  {t('Your notification system settings are currently turned off')}
                </Text>
              </View>
              <View style={styles.sectionModalSetting}>
                <Text style={styles.textSection}>
                  {t('You can enable Notifications in Setting/ Notifications/ Paave')}
                </Text>
              </View>
              <TouchableOpacity onPress={Linking.openSettings} style={styles.goToSettingButton}>
                <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                  {t('Go to setting')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressCancelModalSetting} style={styles.cancelButton}>
                <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default memo(Setting);
