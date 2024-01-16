import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import useStyles from './styles';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import { insertObjectIf, isBlank } from '../../utils';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import config from 'config';
import { AuthenticationActions } from 'reduxs';

const validateData = [
  `Must be at least 6 characters long`,
  `Must include both uppercase and lowercase letters`,
  `Must include numbers and special characters`,
];

const CreatePassword = (props: StackScreenProps<'CreatePassword'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [newPasswordErrorContent, setNewPasswordErrorContent] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<boolean>(false);
  const [confirmNewPasswordErrorContent, setConfirmNewPasswordErrorContent] = useState<string>('');

  const dispatch = useDispatch();
  let passwordTextInput: TextInput | null;
  let confirmPasswordTextInput: TextInput | null;
  const submitPasswordTextInput = () => {
    confirmPasswordTextInput?.focus();
  };

  useEffect(() => {
    passwordTextInput?.focus();
  }, []);

  const validateConfirmPassword = useCallback(() => {
    if (confirmNewPassword !== newPassword && !isBlank(confirmNewPassword)) {
      setConfirmNewPasswordError(true);
      setConfirmNewPasswordErrorContent('Confirm password and password must be same');
      return false;
    } else {
      setConfirmNewPasswordError(false);
      setConfirmNewPasswordErrorContent('');
    }
    return true;
  }, [confirmNewPassword, newPassword]);

  const validateNewPassword = useCallback(() => {
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
  }, [newPassword, confirmNewPassword]);

  const onChangeConfirmPassword = useCallback((value: string) => {
    setConfirmNewPassword(value);
    setConfirmNewPasswordError(false);
    setConfirmNewPasswordErrorContent('');
  }, []);

  const onChangeNewPassword = useCallback((value: string) => {
    setNewPassword(value);
    setNewPasswordError(false);
    setNewPasswordErrorContent('');
  }, []);

  const submitForm = useCallback(() => {
    if (validateNewPassword() && validateConfirmPassword()) {
      dispatch(
        AuthenticationActions.createPassword({
          params: {
            password: newPassword,
          },
          callback: (error: any) => {
            if (error) {
              return;
            }

            props.navigation.goBack();
          },
        })
      );
    }
  }, [newPassword, validateNewPassword, validateConfirmPassword]);

  const disableSubmitForm =
    newPassword === '' || confirmNewPassword === '' || confirmNewPasswordError || newPasswordError;

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Create Password'} />
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'handled'}>
        <View style={globalStyles.container}>
          <TextInputComponent
            ref1={input => {
              passwordTextInput = input;
            }}
            onSubmitEditing={submitPasswordTextInput}
            value={newPassword}
            onChangeText={onChangeNewPassword}
            onBlur={validateNewPassword}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'New Password'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(newPasswordError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
              },
            ]}
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
            ref1={input => {
              confirmPasswordTextInput = input;
            }}
            value={confirmNewPassword}
            onChangeText={onChangeConfirmPassword}
            onBlur={validateConfirmPassword}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Confirm New Password'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(confirmNewPasswordError === false
                  ? styles.textInputContainerStyle
                  : styles.textInputContainerStyleError),
              },
            ]}
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

          <TouchableOpacity
            onPress={submitForm}
            disabled={disableSubmitForm}
            style={[styles.executeFormButton, insertObjectIf(disableSubmitForm, styles.executeFormDisableButton)]}
          >
            <Text allowFontScaling={false} style={styles.executeFormButtonText}>
              {t('Save Change')}
            </Text>
          </TouchableOpacity>
          <View style={styles.executeFormTitle}>
            {validateData.map((el, idx) => (
              <View key={idx} style={styles.validateExItemContainer}>
                <Text style={styles.executeFormTitleText}>{'\u2022' + ' '}</Text>
                <Text style={styles.executeFormTitleText}>{t(el)}</Text>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(CreatePassword);
