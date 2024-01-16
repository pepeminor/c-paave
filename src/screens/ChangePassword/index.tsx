import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import useStyles from './styles';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import { clearHistoryAndNavigate, isBlank } from 'utils';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { changePassword, changePasswordForKis } from 'reduxs/global-actions/Authentication';
import config from 'config';
import { ACCOUNT_TYPE } from 'global';
import useUpdateEffect from 'hooks/useUpdateEffect';
import Modal from 'components/Modal';
import PaaveButton from 'components/PaaveButton';
import { temporarilyBiometricStatus } from 'screens/Security/actions';
import { ERROR } from 'constants/error';

const validateData = [
  `Must be at least 6 characters long`,
  `Must include both uppercase and lowercase letters`,
  `Must include numbers and special characters`,
];

const validateDataForKis = [
  `Must be at least 8 characters long`,
  `Contain at least 1 uppercase character and no space`,
];

const ChangePassword = (props: StackScreenProps<'ChangePassword'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordErrorContent, setCurrentPasswordErrorContent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorContent, setNewPasswordErrorContent] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [confirmNewPasswordErrorContent, setConfirmNewPasswordErrorContent] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const dispatch = useDispatch();
  const passwordTextInput = useRef<TextInput>(null);
  const confirmPasswordTextInput = useRef<TextInput>(null);

  const validateConfirmPassword = () => {
    if (confirmNewPassword !== newPassword && !isBlank(confirmNewPassword)) {
      setConfirmNewPasswordError(true);
      setConfirmNewPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmNewPasswordError(false);
      setConfirmNewPasswordErrorContent('');
    }
    return true;
  };

  const validateNewPassword = () => {
    if (!isBlank(newPassword) && !config.regex.passWord.test(newPassword)) {
      setNewPasswordError(true);
      setNewPasswordErrorContent('INVALID_PASSWORD');
      return false;
    } else if (confirmNewPassword !== newPassword && !isBlank(confirmNewPassword)) {
      setConfirmNewPasswordError(true);
      setConfirmNewPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmNewPasswordError(false);
      setConfirmNewPasswordErrorContent('');
      setNewPasswordError(false);
      setNewPasswordErrorContent('');
    }
    return true;
  };

  const validateNewPasswordForKis = () => {
    if (!isBlank(newPassword) && !config.regex.passWordForKis.test(newPassword)) {
      setNewPasswordError(true);
      setNewPasswordErrorContent('INVALID_KIS_PASSWORD');
      return false;
    } else if (confirmNewPassword !== newPassword && !isBlank(confirmNewPassword)) {
      setConfirmNewPasswordError(true);
      setConfirmNewPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmNewPasswordError(false);
      setConfirmNewPasswordErrorContent('');
      setNewPasswordError(false);
      setNewPasswordErrorContent('');
    }
    return true;
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmNewPassword(value);
    setConfirmNewPasswordError(false);
    setConfirmNewPasswordErrorContent('');
  };

  const onChangeNewPassword = (value: string) => {
    setNewPassword(value);
    setNewPasswordError(false);
    setNewPasswordErrorContent('');
  };

  const onChangePassword = (value: string) => {
    setCurrentPassword(value);
    setCurrentPasswordError(false);
    setCurrentPasswordErrorContent('');
  };

  const onSubmitFormSuccess = () => {
    setShowLogoutModal(true);
    dispatch(temporarilyBiometricStatus({ payload: true }));
  };

  const submitForm = () => {
    if (
      selectedAccount.type === ACCOUNT_TYPE.VIRTUAL &&
      validateNewPassword() === true &&
      validateConfirmPassword() === true
    ) {
      dispatch(
        changePassword(
          {
            oldPassword: currentPassword,
            newPassword: confirmNewPassword,
          },
          undefined,
          undefined,
          undefined,
          undefined,
          {
            handleSuccess: onSubmitFormSuccess,
            handleFail: (error: unknown) => {
              if (error === ERROR.WRONG_PASSWORD_PAAVE) {
                setCurrentPasswordError(true);
                setCurrentPasswordErrorContent(ERROR.WRONG_PASSWORD_PAAVE);
              }
            },
          }
        )
      );
    } else if (
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.username != null &&
      validateNewPasswordForKis() === true &&
      validateConfirmPassword() === true
    ) {
      dispatch(
        changePasswordForKis(
          {
            clientID: selectedAccount.username,
            oldPassword: currentPassword,
            newPassword: confirmNewPassword,
          },
          undefined,
          undefined,
          undefined,
          undefined,
          {
            handleSuccess: onSubmitFormSuccess,
            handleFail: (error: unknown) => {
              if (error === ERROR.WRONG_PASSWORD_KIS) {
                setCurrentPasswordError(true);
                setCurrentPasswordErrorContent(ERROR.WRONG_PASSWORD_KIS);
              }
            },
          }
        )
      );
    }
  };

  const onPressSignOut = useCallback(() => {
    setShowLogoutModal(pre => !pre);
    clearHistoryAndNavigate({
      key: 'SignIn',
    });
  }, []);

  const providerName = (() => {
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.KIS:
        return 'Kis';
      case ACCOUNT_TYPE.VIRTUAL:
        return 'Paave';
      default:
        return '';
    }
  })();

  useUpdateEffect(() => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setConfirmNewPasswordError(false);
    setConfirmNewPasswordErrorContent('');
    setNewPasswordError(false);
    setNewPasswordErrorContent('');
  }, [selectedAccount.type]);

  const formDisabled =
    newPassword === '' ||
    currentPassword === '' ||
    confirmNewPassword === '' ||
    newPasswordError ||
    confirmNewPasswordError;

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Change Password'}
        subAccountVisible={true}
        kisAccountNoSub={true}
      />
      <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'handled'}>
        <View style={globalStyles.container}>
          <Text allowFontScaling={false} style={styles.changePasswordNote}>
            (*) {t('change_password.provider_note', { provider: providerName })}
          </Text>
          <TextInputComponent
            onSubmitEditing={passwordTextInput.current?.focus}
            autoFocus={true}
            value={currentPassword}
            onChangeText={onChangePassword}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={t('change_password.current_password', { provider: providerName })}
            textInputContainerStyle={
              currentPasswordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError
            }
            returnKeyType={'next'}
            placeholder={'Enter your current password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={styles.textInputStyle}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={currentPasswordError}
            errorContent={currentPasswordErrorContent}
          />

          <TextInputComponent
            ref1={passwordTextInput}
            onSubmitEditing={confirmPasswordTextInput.current?.focus}
            value={newPassword}
            onChangeText={onChangeNewPassword}
            onBlur={selectedAccount.type === ACCOUNT_TYPE.VIRTUAL ? validateNewPassword : validateNewPasswordForKis}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={t('change_password.new_password', { provider: providerName })}
            textInputContainerStyle={
              newPasswordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError
            }
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Enter your new password'}
            textInputStyle={styles.textInputStyle}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={newPasswordError}
            errorContent={newPasswordErrorContent}
          />

          <TextInputComponent
            ref1={confirmPasswordTextInput}
            value={confirmNewPassword}
            onChangeText={onChangeConfirmPassword}
            onBlur={validateConfirmPassword}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={t('change_password.confirm_new_password', { provider: providerName })}
            textInputContainerStyle={
              confirmNewPasswordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError
            }
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Confirm Your New Password'}
            textInputStyle={styles.textInputStyle}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={confirmNewPasswordError}
            errorContent={confirmNewPasswordErrorContent}
          />

          <View style={styles.executeFormContainer}>
            <TouchableOpacity
              onPress={submitForm}
              disabled={formDisabled}
              style={formDisabled ? styles.executeFormDisableButton : styles.executeFormButton}
            >
              <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                {t('Save Change')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.executeFormContainer}>
            <View style={styles.executeFormTitle}>
              {(selectedAccount.type === ACCOUNT_TYPE.VIRTUAL ? validateData : validateDataForKis).map((el, idx) => (
                <View key={idx} style={styles.validateExItemContainer}>
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
      <Modal visible={showLogoutModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text allowFontScaling={false} style={styles.modalTitle}>
              {t('change_password.sign_in_modal_title')}
            </Text>
            <Text allowFontScaling={false} style={styles.modalContent}>
              {t('change_password.sign_in_modal_content')}
            </Text>
            <PaaveButton type={'SOLID'} color={dynamicColors.BlueNewColor} onPress={onPressSignOut}>
              <Text allowFontScaling={false}>{t('Sign in')}</Text>
            </PaaveButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(ChangePassword);
