import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, LayoutChangeEvent, Platform, ScrollView } from 'react-native';
import useStyles from './styles';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import { isBlank } from '../../utils';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IChangePINParams } from 'interfaces/authentication';
import { changePIN } from 'reduxs/global-actions/Authentication';
// import { NativeStackNavigationEventMap } from '@react-navigation/native-stack/lib/typescript/src/types';
import { IState } from 'reduxs/global-reducers';
import useUpdateEffect from 'hooks/useUpdateEffect';

const ChangePIN = (props: StackScreenProps<'ChangePIN'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [currentPin, setCurrentPin] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [newPinError, setNewPinError] = useState<boolean>(false);
  const [newPinErrorContent, setNewPinErrorContent] = useState<string>('');
  const [confirmNewPin, setConfirmNewPin] = useState<string>('');
  const [confirmNewPinError, setConfirmNewPinError] = useState<boolean>(false);
  const [confirmNewPinErrorContent, setConfirmNewPinErrorContent] = useState<string>('');
  const [screenHeight, setScreenHeight] = React.useState<number | null>(null);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);

  const dispatch = useDispatch();
  let pinTextInput: TextInput | null;
  let confirmPinTextInput: TextInput | null;

  const submitPinTextInput = () => {
    confirmPinTextInput?.focus();
  };

  const submitChangePinTextInput = () => {
    pinTextInput?.focus();
  };

  const validateConfirmPin = () => {
    if (confirmNewPin !== newPin && !isBlank(confirmNewPin)) {
      setConfirmNewPinError(true);
      setConfirmNewPinErrorContent('Confirm PIN and PIN must be same');
      return false;
    } else {
      setConfirmNewPinError(false);
      setConfirmNewPinErrorContent('');
    }
    return true;
  };

  const validateNewPin = () => {
    if (newPin === '') {
      setNewPinError(true);
      setNewPinErrorContent('INVALID_PIN');
      return false;
    } else if (confirmNewPin !== newPin && !isBlank(confirmNewPin)) {
      setConfirmNewPinError(true);
      setConfirmNewPinErrorContent('Confirm PIN and PIN must be same');
      return false;
    } else if (newPin.length > 4) {
      setNewPinError(true);
      setNewPinErrorContent('PIN_MAX_LENGTH');
    } else {
      setConfirmNewPinError(false);
      setConfirmNewPinErrorContent('');
      setNewPinError(false);
      setNewPinErrorContent('');
    }
    return true;
  };

  const onChangeConfirmPin = (value: string) => {
    if (!isNaN(Number(value))) {
      setConfirmNewPin(value.trim());
      setConfirmNewPinError(false);
      setConfirmNewPinErrorContent('');
    } else {
      setConfirmNewPin('');
    }
  };

  const onChangeNewPin = (value: string) => {
    if (!isNaN(Number(value))) {
      setNewPin(value.trim());
      setNewPinError(false);
      setNewPinErrorContent('');
    } else {
      setNewPin('');
    }
  };

  const onChangePin = (value: string) => {
    if (!isNaN(Number(value))) {
      setCurrentPin(value.trim());
    } else {
      setCurrentPin('');
    }
  };

  const submitForm = () => {
    if (selectedAccount.username != null && validateNewPin() === true && validateConfirmPin() === true) {
      const params: IChangePINParams = {
        currentPassword: currentPin,
        newPassword: newPin,
      };
      dispatch(changePIN(params));
    }
  };

  useUpdateEffect(() => {
    setCurrentPin('');
    setNewPin('');
    setConfirmNewPin('');
    setConfirmNewPinError(false);
    setConfirmNewPinErrorContent('');
    setNewPinError(false);
    setNewPinErrorContent('');
  }, [selectedAccount.selectedSubAccount]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height);
  };

  const renderScreenAndroid = (screenHeight2: number | null) => {
    return (
      <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'handled'}>
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <TextInputComponent
            keyboardType={'numeric'}
            onSubmitEditing={submitChangePinTextInput}
            autoFocus={true}
            value={currentPin}
            onChangeText={onChangePin}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Current PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.textInputContainerStyle,
            ]}
            returnKeyType={'next'}
            placeholder={'Enter your current PIN'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />

          <TextInputComponent
            ref1={input => {
              pinTextInput = input;
            }}
            keyboardType={'numeric'}
            onSubmitEditing={submitPinTextInput}
            value={newPin}
            onChangeText={onChangeNewPin}
            onBlur={validateNewPin}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'New PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(newPinError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
              },
            ]}
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Enter your new PIN'}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={newPinError}
            errorContent={newPinErrorContent}
          />

          <TextInputComponent
            ref1={input => {
              confirmPinTextInput = input;
            }}
            keyboardType={'numeric'}
            value={confirmNewPin}
            onChangeText={onChangeConfirmPin}
            onBlur={validateConfirmPin}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Confirm New PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(confirmNewPinError === false
                  ? styles.textInputContainerStyle
                  : styles.textInputContainerStyleError),
              },
            ]}
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Confirm Your New PIN'}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={confirmNewPinError}
            errorContent={confirmNewPinErrorContent}
          />

          <View style={[globalStyles.alignCenter, styles.executeFormContainer]}>
            <TouchableOpacity
              onPress={submitForm}
              disabled={newPin === '' || currentPin === '' || confirmNewPin === '' || newPinError || confirmNewPinError}
              style={[
                globalStyles.centered,
                styles.executeFormButton,
                newPin === '' || currentPin === '' || confirmNewPin === '' || newPinError || confirmNewPinError
                  ? styles.executeFormDisableButton
                  : {},
              ]}
            >
              <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                {t('Save Change')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderScreenIOS = (screenHeight2: number | null) => {
    return (
      <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'handled'}>
        <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
          <TextInputComponent
            onSubmitEditing={submitChangePinTextInput}
            autoFocus={true}
            value={currentPin}
            onChangeText={onChangePin}
            wholeContainerStyle={styles.wholeContainerStyle}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Current PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.textInputContainerStyle,
            ]}
            returnKeyType={'next'}
            placeholder={'Enter your current password'}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
          />

          <TextInputComponent
            ref1={input => {
              pinTextInput = input;
            }}
            onSubmitEditing={submitPinTextInput}
            value={newPin}
            onChangeText={onChangeNewPin}
            onBlur={validateNewPin}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'New PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(newPinError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError),
              },
            ]}
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Enter your new PIN'}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={newPinError}
            errorContent={newPinErrorContent}
          />

          <TextInputComponent
            ref1={input => {
              confirmPinTextInput = input;
            }}
            value={confirmNewPin}
            onChangeText={onChangeConfirmPin}
            onBlur={validateConfirmPin}
            wholeContainerStyle={{
              marginHorizontal: scaleSize(16),
            }}
            labelTextStyle={styles.labelTextStyle}
            labelText={'Confirm New PIN'}
            textInputContainerStyle={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              {
                ...(confirmNewPinError === false
                  ? styles.textInputContainerStyle
                  : styles.textInputContainerStyleError),
              },
            ]}
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Confirm Your New PIN'}
            textInputStyle={[globalStyles.container, styles.textInputStyle]}
            secureTextEntry={true}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            eyeIconStyle={styles.eyeIconStyle}
            error={confirmNewPinError}
            errorContent={confirmNewPinErrorContent}
          />

          <View style={[globalStyles.alignCenter, styles.executeFormContainer]}>
            <TouchableOpacity
              onPress={submitForm}
              disabled={newPin === '' || currentPin === '' || confirmNewPin === '' || confirmNewPinError || newPinError}
              style={[
                globalStyles.centered,
                styles.executeFormButton,
                newPin === '' || currentPin === '' || confirmNewPin === '' || confirmNewPinError || newPinError
                  ? styles.executeFormDisableButton
                  : {},
              ]}
            >
              <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                {t('Save Change')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Change PIN'}
        subAccountVisible={true}
        kisAccountNoSub={true}
        disableVirtualAccount={true}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default ChangePIN;
