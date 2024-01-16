import Modal from 'components/Modal';
import PlatformWrapperScrollView from 'components/PlatformWrapperScrollView';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import { CheckUserExistType } from 'constants/enum';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { IUserUpdateUserNameParams } from 'interfaces/user';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { checkUserExist, updateUsernameParams } from 'reduxs/global-actions';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import { EditModalProps } from '../ButtonWithEditModal';
import useStyles from './styles';
import { bannedNames } from 'screens/AccountInformation/bannedNames';
import { IResponse } from 'interfaces/common';
import { ICheckUserExistResponse } from 'interfaces/authentication';
import { useKeyboard } from 'hooks/useKeyboard/useKeyboard';

const validateData = [
  `Username can only contain letters (a-z), number (0-9), and periods (.)`,
  `Username can't begin or end with period (.) character, special character`,
  `Username can't contain more than 20 characters`,
];

const ModalUsername: React.FC<EditModalProps> = ({ initValue, visible, setVisible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const [username, setUsername] = useState<string>(initValue);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorContent, setUsernameErrorContent] = useState<string>('');

  const inputRef = React.useRef<TextInput>(null);
  const isDisable = username === '' || username === initValue || usernameError;
  const [keyboardHeight] = useKeyboard();

  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const onCloseModal = () => {
    setVisible(false);
    setUsernameError(false);
    setUsernameErrorContent('');
    setUsername(initValue);
  };

  const onChangeUserName = (value: string) => {
    if (value != '') {
      setUsernameError(false);
      setUsername(value);
    } else {
      setUsername('');
    }
  };

  const onPressConfirmEditUserName = () => {
    if (validateUsername() === true) {
      dispatch(
        checkUserExist(
          {
            value: username,
            type: CheckUserExistType.USERNAME,
          },
          undefined,
          undefined,
          true,
          undefined,
          {
            handleSuccess(response: IResponse<ICheckUserExistResponse>) {
              if (response.data != null && response.data.exist) {
                setUsernameError(true);
                setUsernameErrorContent('USERNAME_EXISTS');
              } else {
                const paramsUserName: IUserUpdateUserNameParams = {
                  username: username,
                };
                dispatch(updateUsernameParams(paramsUserName));
                onCloseModal();
              }
            },
          }
        )
      );
    }
  };

  const validateUsername = () => {
    const invalidNames = bannedNames.some(name => username.includes(name));
    if (username.length > config.UsernameAccountInformation) {
      setUsernameError(true);
      setUsernameErrorContent('USERNAME_INVALID');
      return false;
    } else if (config.regex.username.test(username) !== true) {
      setUsernameError(true);
      setUsernameErrorContent('USERNAME_INVALID');
      return false;
    } else if (invalidNames) {
      setUsernameError(true);
      setUsernameErrorContent('INVALID_VALUE username');
      return false;
    } else {
      setUsernameError(false);
      setUsernameErrorContent('');
    }
    return true;
  };

  useUpdateEffect(() => {
    setUsername(initValue);
  }, [initValue]);

  return (
    <Modal visible={visible} onRequestClose={onCloseModal}>
      <PlatformWrapperScrollView style={[styles.modalContainer]}>
        <View
          style={[
            globalStyles.justifyCenter,
            styles.modalEditUsernameContainer,
            Platform.OS === 'ios' && keyboardHeight > 0 && { marginBottom: scaleSize(150) },
          ]}
        >
          <View style={[globalStyles.centered, styles.modalTitleCon]}>
            <Text allowFontScaling={false} style={styles.modalTitleText}>
              {t('Edit Username')}
            </Text>
          </View>
          <View style={styles.modalContent}>
            <View>
              <TextInputComponent
                value={username}
                onChangeText={onChangeUserName}
                labelTextStyle={styles.wlNameText}
                labelText={'User name'}
                textInputContainerStyle={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.textInputContainerStyle,
                ]}
                placeholder={'Enter your new username'}
                placeholderTextColor={Colors.LIGHTTextDisable}
                textInputStyle={styles.textInputStyle}
                autoFocus
                ref1={inputRef}
                onLayout={showKeyboard}
                error={usernameError}
                errorContent={usernameErrorContent}
              />
            </View>
            <View style={[styles.containerTextUserName]}>
              {validateData.map((el, idx) => (
                <View key={idx} style={[globalStyles.flexDirectionRow, styles.validateExItemContainer]}>
                  <View>
                    <Text style={styles.normalText}>{'\u2022' + ' '}</Text>
                  </View>
                  <View style={globalStyles.container}>
                    <Text>
                      <Text style={styles.normalText}>{t(el)}</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={[globalStyles.fillWidth, styles.marginBottom]}>
              <TouchableOpacity
                onPress={onPressConfirmEditUserName}
                style={[globalStyles.centered, styles.executeFormButton, isDisable && styles.executeFormButtonDisable]}
                disabled={isDisable}
              >
                <Text
                  allowFontScaling={false}
                  style={[styles.executeFormButtonText, isDisable && styles.executeFormButtonTextDisable]}
                >
                  {t('Update')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.fillWidth]}>
              <TouchableOpacity onPress={onCloseModal} style={[globalStyles.centered, styles.cancelExecuteFormButton2]}>
                <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PlatformWrapperScrollView>
    </Modal>
  );
};

export default memo(ModalUsername);
