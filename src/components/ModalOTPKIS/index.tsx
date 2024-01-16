import React, { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, View, StyleProp, ViewStyle, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'react-native-paper';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import { IGenerateNewKisCardResponse } from 'interfaces/common';
import { generateNewKisCard, generateKisCardFrom } from '../../reduxs/global-actions/Authentication';
import useTimer from 'hooks/useTimer';
import { updateCurrentUserSetting } from '../../reduxs/global-actions/UserInfo';
import Tooltip from 'react-native-walkthrough-tooltip';
import useDebounceCallback from 'hooks/useDebounceCallback';
import { OneSignalUtils, ReceiveOTPEventHandler } from 'utils';
import { reduceKisUsername } from '../../reduxs/sagas/LoginRealAccount/LoginRealAccount';
import { useAppSelector } from 'hooks/useAppSelector';

export enum VIA_OPTION {
  VIA_SMS = `SMS`,
  VIA_NOTIFICATION = `Notification`,
}

// enum TIME_OPTION {
//   EIGHT_HOUR = `8h`,
//   FOUR_HOUR = `4h`,
//   TWO_HOUR = `2h`,
//   ONE_HOUR = `1h`,
//   THIRTY_MINUTE = `30m`,
// }

// interface ITimeOptions {
//   value: TIME_OPTION;
//   label: TIME_OPTION;
// }

// const timeOptions: ITimeOptions[] = [
//   { value: TIME_OPTION.EIGHT_HOUR, label: TIME_OPTION.EIGHT_HOUR },
//   { value: TIME_OPTION.FOUR_HOUR, label: TIME_OPTION.FOUR_HOUR },
//   { value: TIME_OPTION.TWO_HOUR, label: TIME_OPTION.TWO_HOUR },
//   { value: TIME_OPTION.ONE_HOUR, label: TIME_OPTION.ONE_HOUR },
//   { value: TIME_OPTION.THIRTY_MINUTE, label: TIME_OPTION.THIRTY_MINUTE },
// ];

interface TPropsModalOrder {
  ListContentModal: boolean;
  backgroundStyle?: StyleProp<ViewStyle>;
  valueOTP: string;
  generateKisCardResult: IGenerateNewKisCardResponse | null;
  valueOTPError?: boolean;
  autoFocus?: boolean;
  valueOTPErrorContent?: string;
  onChangeValueOTP(text: string): void;
  linkAccount?: boolean;
}

const ModalOTPKIS = (props: TPropsModalOrder) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const accountList = useAppSelector(state => state.accountList);
  const currentUserSetting = useAppSelector(state => state.currentUserSetting);
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);
  const loginRealAccountKISresult = useAppSelector(state => state.loginRealAccountKISresult);

  const [timer, setTimer] = useState(0);
  const [checkboxValue, setCheckboxValue] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  useTimer(setTimer, config.countDownOTP / 2, [props.generateKisCardResult], props.linkAccount ? true : false);

  const [tooltipDebounced, cancelTooltipDebounced] = useDebounceCallback((input: boolean) => {
    setShowTooltip(input);
  }, 3000);

  const disableMobileNotification = useMemo(() => {
    return currentUserSetting?.alreadyDoneSmsOTP == null || currentUserSetting?.mobileOTP == null
      ? true
      : currentUserSetting.alreadyDoneSmsOTP && currentUserSetting.mobileOTP && timer < 1
      ? false
      : true;
  }, [currentUserSetting?.alreadyDoneSmsOTP, timer, currentUserSetting?.mobileOTP]);

  const handleOpenTooltip = () => {
    if (currentUserSetting?.alreadyDoneSmsOTP === false || currentUserSetting?.mobileOTP === false) {
      Keyboard.dismiss();
      setShowTooltip(true);
      tooltipDebounced(showTooltip);
    }
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    cancelTooltipDebounced();
  };

  const sendOTP = () => {
    accountList.KIS != null &&
      accountList.KIS.username != null &&
      dispatch(generateNewKisCard({ username: accountList.KIS.username, from: generateKisCardFrom.TRADE }));
  };

  const sendOTPLinkAccount = () => {
    loginRealAccountKISresult != null &&
      dispatch(
        generateNewKisCard({
          username: reduceKisUsername(loginRealAccountKISresult.userInfo.username),
          from: generateKisCardFrom.CONNECT_ACCOUNT,
        })
      );
  };

  const onCheckboxValueChange = useCallback(
    (newValue: string) => {
      setCheckboxValue(newValue);
      dispatch(updateCurrentUserSetting({ isSms: newValue === VIA_OPTION.VIA_SMS ? true : false }));
    },
    [currentUserSetting]
  );

  useEffect(() => {
    if (currentUserSetting != null && currentUserSetting.isSms != null) {
      setCheckboxValue(!currentUserSetting.isSms ? VIA_OPTION.VIA_NOTIFICATION : VIA_OPTION.VIA_SMS);
      OneSignalUtils.updateTagMobileOTP(!currentUserSetting.isSms);
    }
  }, [currentUserSetting]);

  // Handle auto input OTP from Notification in both Android & IOS
  ReceiveOTPEventHandler.useSubscribeReceiveOTP(value => {
    props.onChangeValueOTP(value as string);
  });

  return (
    <View style={styles.modalContentContainer} pointerEvents={props.generateKisCardResult == null ? 'none' : 'auto'}>
      {props.ListContentModal && (
        <>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              props.valueOTPError ? styles.executeModalEachItemError : styles.executeModalEachItem,
            ]}
          >
            <Text allowFontScaling={false} style={[globalStyles.container, styles.executeLabelText]}>
              OTP
            </Text>
            <TextInputComponent
              value={props.valueOTP}
              onChangeText={props.onChangeValueOTP}
              wholeContainerStyle={styles.wholeContainerStyle}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                styles.textInputContainerStyle,
                props.valueOTPError ? styles.textInputContainerStyleError : styles.textInputContainerStyle,
              ]}
              placeholderTextColor={Colors.LIGHTTextDisable}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.paddingHorizontal16}
              autoCapitalize={'none'}
              secureTextEntry={true}
              autoFocus={props.autoFocus != null ? props.autoFocus : true}
              icon={
                <View style={[styles.numberSideInputStyle, globalStyles.centered]}>
                  <Text style={styles.numberSideInputText}>
                    {props.generateKisCardResult != null ? props.generateKisCardResult.wordMatrixKey : ''}
                  </Text>
                </View>
              }
              error={props.valueOTPError}
              errorContent={props.valueOTPErrorContent}
              keyboardType={'number-pad'}
              styleTextError={styles.errorContent}
            />
          </View>
          <View style={globalStyles.centered}>
            {checkboxValue != null && props.linkAccount == null && (
              <RadioButton.Group onValueChange={onCheckboxValueChange} value={checkboxValue}>
                <View style={[globalStyles.flexDirectionRow, styles.radioButtonContainer]}>
                  <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
                    <RadioButton.Android
                      value={VIA_OPTION.VIA_SMS}
                      color={Colors.BlueNewColor}
                      disabled={timer < 1 ? false : true}
                    />
                    <Text style={styles.textOption}>{t(VIA_OPTION.VIA_SMS)}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleOpenTooltip}
                    style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}
                  >
                    <RadioButton.Android
                      value={VIA_OPTION.VIA_NOTIFICATION}
                      color={Colors.BlueNewColor}
                      disabled={disableMobileNotification}
                    />
                    <Tooltip
                      isVisible={keyboardHeight > 0 ? false : showTooltip}
                      content={
                        <Text style={styles.tooltipContent}>
                          {t('Mobile OTP via Notification is OFF. You can turn ON in Setting')}
                        </Text>
                      }
                      placement="bottom"
                      onClose={handleCloseTooltip}
                      backgroundColor={Colors.Transparent}
                      contentStyle={styles.tooltip}
                      tooltipStyle={styles.tooltipContainer}
                      disableShadow={true}
                    >
                      <Text style={styles.textOption}>{t(VIA_OPTION.VIA_NOTIFICATION)}</Text>
                    </Tooltip>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
            )}
          </View>
          {
            <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
              {timer > 0 &&
                props.generateKisCardResult != null &&
                (checkboxValue === VIA_OPTION.VIA_SMS ? (
                  <>
                    <Text allowFontScaling={false} style={styles.textResend}>
                      {`${t('OTP code is sent to your phone via')} SMS`}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text allowFontScaling={false} style={styles.textResend}>
                      {`${t('OTP code is sent to your phone via')} ${t('Notificaition')}`}
                    </Text>
                  </>
                ))}
            </View>
          }
          <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
            <TouchableOpacity
              style={timer < 1 ? styles.enableButtonResendOTP : styles.disableButtonResendOTP}
              onPress={props.linkAccount == null ? sendOTP : sendOTPLinkAccount}
              disabled={timer < 1 ? false : true}
            >
              <Text style={styles.textSendOTP}>{t('Resend OTP')}</Text>
            </TouchableOpacity>
            {timer > 0 && props.generateKisCardResult != null && (
              <Text allowFontScaling={false} style={styles.timer}>{` ${timer}s `}</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default memo(ModalOTPKIS);
