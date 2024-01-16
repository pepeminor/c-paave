import React, { memo, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import useStyles from './styles';
import Modal from 'components/Modal';
import PlatformWrapperScrollView from 'components/PlatformWrapperScrollView';
import { useTranslation } from 'react-i18next';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import { IUserUpdateFullNameParams } from 'interfaces/user';
import { useDispatch } from 'react-redux';
import { updateFullNameParams } from 'reduxs/global-actions';
import { EditModalProps } from '../ButtonWithEditModal';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { bannedNames } from 'screens/AccountInformation/bannedNames';

const ModalFullName: React.FC<EditModalProps> = ({ initValue, visible, setVisible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const [fullName, setFullName] = useState(initValue);
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameErrorContent, setFullNameErrorContent] = useState('');
  const inputRef = React.useRef<TextInput>(null);
  const isDisable = fullName === '' || fullName === initValue || fullNameError;

  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };

  const onCloseModal = () => {
    setVisible(false);
    setFullName(initValue);
    setFullNameError(false);
    setFullNameErrorContent('');
  };

  const onChangeFullName = (value: string) => {
    if (value != '') {
      setFullName(value);
      setFullNameError(false);
    } else {
      setFullName('');
    }
  };

  const onPressConfirmEditFullName = () => {
    if (validateFullName() === true) {
      const paramsFullName: IUserUpdateFullNameParams = {
        fullname: fullName.trim(),
      };
      dispatch(updateFullNameParams(paramsFullName));
      onCloseModal();
    }
  };

  const validateFullName = () => {
    const invalidNames = bannedNames.some(name => fullName.toLowerCase().includes(name));
    if (fullName.length > config.FullNameAccountInformation || !config.regex.fullname.test(fullName)) {
      setFullNameError(true);
      setFullNameErrorContent('FULLNAME_INVALID');
      return false;
    } else if (invalidNames) {
      setFullNameError(true);
      setFullNameErrorContent('INVALID_VALUE fullname');
      return false;
    } else {
      setFullNameError(false);
      setFullNameErrorContent('');
    }

    return true;
  };

  useUpdateEffect(() => {
    setFullName(initValue);
  }, [initValue]);

  return (
    <Modal visible={visible} onRequestClose={onCloseModal}>
      <PlatformWrapperScrollView style={[styles.modalContainer]}>
        <View style={[globalStyles.justifyCenter, styles.modalEditFullNameContainer]}>
          <View style={[globalStyles.centered, styles.modalTitleCon]}>
            <Text allowFontScaling={false} style={styles.modalTitleText}>
              {t('Edit Fullname')}
            </Text>
          </View>
          <View style={styles.modalContent}>
            <View>
              <TextInputComponent
                value={fullName}
                onChangeText={onChangeFullName}
                wholeContainerStyle={styles.wholeContainerStyle}
                labelTextStyle={styles.wlNameText}
                labelText={'Full Name'}
                textInputContainerStyle={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.textInputContainerStyle,
                ]}
                placeholder={'Enter your new full name'}
                placeholderTextColor={Colors.LIGHTTextDisable}
                textInputStyle={styles.textInputStyle}
                autoFocus
                ref1={inputRef}
                onLayout={showKeyboard}
                error={fullNameError}
                errorContent={fullNameErrorContent}
              />
            </View>
            <View style={[globalStyles.fillWidth, styles.marginBottom]}>
              <TouchableOpacity
                onPress={onPressConfirmEditFullName}
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

export default memo(ModalFullName);
