import React, { useCallback, useEffect, useState } from 'react';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { Platform, TouchableOpacity, Text, KeyboardAvoidingView, View, Keyboard } from 'react-native';
import globalStyles from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { useAppSelector } from 'hooks/useAppSelector';
import { lightColors } from 'styles';
import { useTranslation } from 'react-i18next';
import ModalOTP from 'components/ModalOTPKIS';
import useModalOTPKis from 'hooks/useModalOTPKis';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import config from 'config';
import { useDispatch } from 'react-redux';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { showedOTPModalKis } from 'reduxs/global-actions/LinkAccounts';
import { generateNewKisCard, generateKisCardFrom, onCloseModalOTPKIS } from 'reduxs/global-actions/Authentication';
import { useIsFocused } from '@react-navigation/native';
import CheckBox from 'components/CheckBox';
import { SettingActions, SettingSelectors } from 'reduxs';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';

const ModalOtpKis = () => {
  const dispatch = useDispatch();
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const kisAuthToken = useAppSelector(state => state.kisAuthToken.accessToken);
  const isShowModalOTPKIS = useAppSelector(state => state.displayModalOTPPortfolio);
  const showModalUpdate = useAppSelector(state => state.showModalUpdate);
  const accountList = useAppSelector(state => state.accountList);
  const isLoginWithBiometric = useAppSelector(state => state.isLoginWithBiometric);
  const notRemindOTPModalKis = useAppSelector(SettingSelectors.selectNotShowAginKisOTP);
  const [showModalOtpKis, setShowModalOtpKis] = useState(false);
  const [isNotRemind, setIsNotRemind] = useState(notRemindOTPModalKis);
  const { styles } = useStyles();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const { valueOTPErrorContent, valueOTPError, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS } =
    useModalOTPKis();
  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const onPressConfirmSendOtpKisValue = useCallback(() => {
    const params: IKisVerifyAndSaveOTPRequest = {
      expireTime: config.kisOTPTokenExpireTime,
      verifyType: 'MATRIX_CARD',
      wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
      wordMatrixValue: otpKisValue,
    };
    Keyboard.dismiss();
    dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.LOGIN));
  }, [generateKisCardResult, otpKisValue]);

  const onPressCancelOtpKis = useCallback(() => {
    // not show modal otp kis again in that session
    dispatch(showedOTPModalKis());
    // clear generateKisCardResult
    dispatch(onCloseModalOTPKIS({}));

    resetFormModalOTPKIS();
    setShowModalOtpKis(false);

    if (isNotRemind) {
      dispatch(SettingActions.setNotShowAgainKisOTP(isNotRemind));
    }
  }, [isNotRemind]);

  const onPressCheckBox = useCallback(() => {
    setIsNotRemind(prev => !prev);
  }, []);

  // handle show modal otp kis
  useEffect(() => {
    if (isLoginWithBiometric) return; // wont show if login with biometric
    if (notRemindOTPModalKis) return; // wont show if user choose not show again
    if (!isFocused) {
      setShowModalOtpKis(false);
      return;
    }
    // show every time user logout then login again
    if (!showModalUpdate && accountList.KIS != null) {
      if (kisAuthToken !== '' && kisOTPToken == null && isShowModalOTPKIS) {
        setTimeout(() => {
          if (!showModalOtpKis) {
            resetFormModalOTPKIS();
            setShowModalOtpKis(true);
            accountList?.KIS?.username != null &&
              generateKisCardResult == null &&
              dispatch(generateNewKisCard({ username: accountList.KIS.username, from: generateKisCardFrom.TRADE }));
          }
        }, 500);
      } else {
        setShowModalOtpKis(false);
      }
    } else {
      dispatch(onCloseModalOTPKIS({}));
      setShowModalOtpKis(false);
      resetFormModalOTPKIS();
    }
  }, [
    kisAuthToken,
    kisOTPToken,
    isShowModalOTPKIS,
    generateKisCardResult,
    accountList.KIS,
    showModalUpdate,
    showModalOtpKis,
  ]);

  if (!showModalOtpKis) return null;

  return (
    <Modal
      visible={showModalOtpKis}
      childrenContent={
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitleText2}>{t('Please enter OTP code to confirm')}</Text>
              </View>
              <View style={styles.containerBody}>
                <ModalOTP
                  valueOTP={otpKisValue}
                  onChangeValueOTP={onChangeOtpKisValue}
                  generateKisCardResult={generateKisCardResult}
                  ListContentModal={true}
                  valueOTPError={valueOTPError}
                  valueOTPErrorContent={valueOTPErrorContent}
                />
                <CheckBox
                  activeOpacity={1}
                  value={isNotRemind}
                  onPress={onPressCheckBox}
                  label={t('do_not_remind_me_in_24_hours')}
                  style={styles.checkBox}
                />
                <TouchableOpacity
                  onPress={onPressConfirmSendOtpKisValue}
                  style={[styles.button, kisOTPAvailable ? styles.enableButton : styles.disableButton]}
                  disabled={!kisOTPAvailable}
                >
                  <Text allowFontScaling={false} style={kisOTPAvailable ? styles.enableText : styles.disableText}>
                    {t('Confirm')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressCancelOtpKis} style={styles.cancelExecuteFormButton}>
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText}>
                    {t('Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  container: {
    ...globalStyles.container,
    ...globalStyles.centered,
    paddingHorizontal: 16,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
  modalContainer: {
    ...globalStyles.overflowHidden,
    backgroundColor: lightColors.WHITE,
    borderRadius: 21,
    width: 343,
    paddingHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
  modalTitleContainer: {
    ...globalStyles.centered,
    height: 52,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },

  modalTitleText2: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: lightColors.BlueNewColor,
  },
  containerBody: {
    marginTop: 17,
    marginBottom: 16,
  },
  button: {
    ...globalStyles.centered,
    ...globalStyles.fillWidth,
    marginTop: 12,
    marginBottom: 10,
    height: 44,
    borderRadius: 10,
  },
  enableButton: {
    backgroundColor: lightColors.BlueNewColor,
  },
  disableButton: {
    backgroundColor: lightColors.LIGHTBackground,
  },
  enableText: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.WHITE,
  },
  disableText: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton: {
    ...globalStyles.centered,
    ...globalStyles.fillWidth,
    backgroundColor: lightColors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  checkBox: {
    marginTop: 12,
  },
});

export default withMemo(ModalOtpKis);
