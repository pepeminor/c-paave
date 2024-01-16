import React, { memo, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, Platform, LayoutChangeEvent } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// components & screens
import TextInputComponent from 'components/TextInput';
import HeaderScreen from 'components/HeaderScreen';

// styles
import useStyles from './styles';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';

import { useTranslation } from 'react-i18next';
import { query, alertMessage, FulfilledRequestError } from 'utils';
import { IConfirmUserResponse, IConfirmUser, IDisableUserResponse, IDisableUser } from 'interfaces/user';
import APIList from 'config/api';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE } from 'global';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { store } from 'screens/App';

const DeleteAccount = (props: StackScreenProps<'DeleteAccount'>) => {
  const [value, setValue] = useState<string>('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const accountList = useAppSelector(state => state.accountList);
  const sessionVersion: number | undefined = useAppSelector(state => state.authToken.version);
  const isSubToCopyTrade = useAppSelector(state => {
    const subAccountNumber = state.selectedAccount.selectedSubAccount?.accountNumber;
    if (subAccountNumber == null) return false;
    return state.copyTrade.subscription[subAccountNumber] != null;
  });

  const { t } = useTranslation();

  const { styles } = useStyles();
  const DELETE_ACCOUNT_CONTAINER = [styles.container];

  const DELETE_ACCOUNT_TEXT_CONTENT = [styles.textContent, styles.marginTop10];

  const DELETE_ACCOUNT_TEXT_CONTENT1 = [styles.textContent, styles.marginTop10, styles.paddingLeft8];

  const DELETE_ACCOUNT_TEXT_WRAPPER = [globalStyles.flexDirectionRow, styles.paddingLeft8];

  const DELETE_ACCOUNT_BUTTON_STYLES = [globalStyles.centered, styles.executeFormButton];

  const DELETE_ACCOUNT_INPUT_CONTAINER = [styles.wholeContainerStyle, styles.wholeContainerVerticalStyle];

  const DELETE_ACCOUNT_TEXT_INPUT_CONTAINER = [
    globalStyles.flexDirectionRow,
    globalStyles.centered,
    styles.textInputContainerStyle,
  ];

  const DELETE_ACCOUNT_TEXT_INPUT = [globalStyles.container, styles.textInputStyle];
  const onChangeText = (value: string) => {
    setValue(value);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onDeleteAccount = async () => {
    try {
      const userConfirmResponse = await query<IConfirmUserResponse, IConfirmUser>(APIList.confirmUser, {
        password: value,
      });
      if (!userConfirmResponse.data.value) throw userConfirmResponse.data.message; // Wrong password

      const disableUserResponse = await query<IDisableUserResponse, IDisableUser>(APIList.disableUser, {
        reason: props.route.params.reason,
      });
      if (disableUserResponse.data.status) {
        alertMessage('success', 'Disabled_Acc_Success', 'Disabled_Acc_Success_Note');
        store.dispatch(
          logOutAction({
            version: sessionVersion || 0,
            userLogout: true,
          })
        );
      }
    } catch (error: any) {
      if (error instanceof FulfilledRequestError) {
        error.data.message != null && alertMessage('danger', error.data.message);
      }
    }
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const renderContent = (screenHeight2: number | null) => (
    <View style={[screenHeight2 == null ? globalStyles.container : styles.heightContain]}>
      <View style={DELETE_ACCOUNT_CONTAINER}>
        <View style={styles.textContainer}>
          <Text allowFontScaling={false} style={styles.textTitle}>
            {t('Before deleting account, please notice')}:
          </Text>
          {accountList.KIS != null && accountList.KIS.type === ACCOUNT_TYPE.KIS && (
            <View style={DELETE_ACCOUNT_TEXT_WRAPPER}>
              <Text allowFontScaling={false} style={styles.dotContent}>
                {'\u2022'}
              </Text>
              <Text allowFontScaling={false} style={DELETE_ACCOUNT_TEXT_CONTENT1}>
                {t(
                  'In case you have connected to your Real Trading Account, it will be disconnected when your Paave account is deleted from our system'
                )}
                .
              </Text>
            </View>
          )}
          {isSubToCopyTrade && (
            <View style={DELETE_ACCOUNT_TEXT_WRAPPER}>
              <Text allowFontScaling={false} style={styles.dotContent}>
                {'\u2022'}
              </Text>
              <Text allowFontScaling={false} style={DELETE_ACCOUNT_TEXT_CONTENT1}>
                {t(
                  'You would not be able to use the Copy Trade feature if you delete your Paave account. Any current subscription to Copy Trade will be unsubscribed'
                )}
                .
              </Text>
            </View>
          )}
          <View
            style={accountList.KIS != null && accountList.KIS.type === ACCOUNT_TYPE.KIS && DELETE_ACCOUNT_TEXT_WRAPPER}
          >
            {accountList.KIS != null && accountList.KIS.type === ACCOUNT_TYPE.KIS && (
              <Text allowFontScaling={false} style={styles.dotContent}>
                {'\u2022'}
              </Text>
            )}
            <Text
              style={
                accountList.KIS != null && accountList.KIS.type === ACCOUNT_TYPE.KIS
                  ? DELETE_ACCOUNT_TEXT_CONTENT1
                  : DELETE_ACCOUNT_TEXT_CONTENT
              }
            >
              {t('You can reactivate your account at any points within 5 business days by logging back in')}.
            </Text>
          </View>

          <Text allowFontScaling={false} style={DELETE_ACCOUNT_TEXT_CONTENT}>
            ({t('If you failed to reactivate your account, please contact our customer service')})
          </Text>
          <Text allowFontScaling={false} style={[styles.textTitle, styles.marginTop16]}>
            {t('Enter your password')}
          </Text>
          <Text allowFontScaling={false} style={DELETE_ACCOUNT_TEXT_CONTENT}>
            {t('Complete the account deletion process by entering your password')}
          </Text>
          <TextInputComponent
            value={value}
            onChangeText={onChangeText}
            wholeContainerStyle={DELETE_ACCOUNT_INPUT_CONTAINER}
            textInputContainerStyle={DELETE_ACCOUNT_TEXT_INPUT_CONTAINER}
            placeholderTextColor={Colors.LIGHTTextDisable}
            placeholder={'Enter your password'}
            textInputStyle={DELETE_ACCOUNT_TEXT_INPUT}
            eyeIconHeight={scaleSize(14)}
            eyeIconWidth={scaleSize(19)}
            autoCapitalize={'none'}
            secureTextEntry={true}
            textAlignVertical="center"
          />
          <Text allowFontScaling={false} style={DELETE_ACCOUNT_TEXT_CONTENT}>
            {t(
              'We will send you an email about your account deletion request. Please check your mail inbox after finishing this process'
            )}
            .
          </Text>
        </View>
        <View style={[globalStyles.container, globalStyles.justifyEnd]}>
          <TouchableOpacity
            style={[
              DELETE_ACCOUNT_BUTTON_STYLES,
              value === '' ? styles.executeFormDisableButton : styles.executeFormEnableButton,
            ]}
            onPress={onDeleteAccount}
            disabled={value === '' ? true : false}
          >
            <Text allowFontScaling={false} style={styles.executeFormButtonText}>
              {t('Delete Account')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderScreenAndroid = (screenHeight2: number | null) => (
    <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="handled">
      {renderContent(screenHeight2)}
    </ScrollView>
  );

  const renderScreenIOS = (screenHeight2: number | null) => (
    <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="handled">
      {renderContent(screenHeight2)}
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Delete Account'} />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(DeleteAccount);
