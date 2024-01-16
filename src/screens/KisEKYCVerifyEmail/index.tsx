import React, { useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { lightColors as Colors } from '../../styles';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import TextInputComponent from 'components/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from 'config';
import { isBlank } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { IState } from 'reduxs/global-reducers';
import { checkUserExist } from 'reduxs/global-actions/Authentication';
import { GetOTPIdType, GetOTPTxType, ICheckUserExistParams } from 'interfaces/authentication';
import { CheckUserExistType } from 'constants/enum';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import Modal from 'components/Modal';
import { CONNECT_SEC_FLOW } from 'global';

const KisEKYCFirstStep = (props: StackScreenProps<'KisEKYCVerifyEmail'>) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [emailValueError, setEmailValueError] = useState<boolean>(false);
  const [emailValueErrorContent, setEmailValueErrorContent] = useState<string>('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [isVisibleModal, setIsVisibeModal] = useState<boolean>(false);
  const checkEmailExist = useSelector((state: IState) => state.checkExistUserEmail);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { styles } = useStyles();

  useUpdateEffect(() => {
    if (checkEmailExist.data && checkEmailExist.data.exist) {
      setIsVisibeModal(true);
    } else {
      props.navigation.navigate(ScreenNames.SignupOTP, {
        isEKYCVerifyEmail: true,
        email: emailValue,
        sec: props.route.params.sec,
        flow: CONNECT_SEC_FLOW.SIGNUP,
      });
    }
  }, [checkEmailExist]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const onChangeEmailValue = (value: string) => {
    setEmailValue(value);
    if (emailValueError) {
      setEmailValueError(false);
      setEmailValueErrorContent('');
    }
  };

  const validateEmailValue = () => {
    if (isBlank(emailValue)) {
      setEmailValueError(true);
      setEmailValueErrorContent('Email cannot be blank');
      return false;
    } else if (config.regex.email.test(emailValue) !== true) {
      setEmailValueError(true);
      setEmailValueErrorContent('Email is not valid');
      return false;
    } else {
      setEmailValueError(false);
      setEmailValueErrorContent('');
    }
    return true;
  };

  const submitForm = () => {
    if (validateEmailValue()) {
      const params: ICheckUserExistParams = {
        type: CheckUserExistType.EMAIL,
        value: emailValue,
        getOTPParams: {
          id: emailValue,
          idType: GetOTPIdType.EMAIL,
          txType: GetOTPTxType.REGISTER,
        },
      };
      dispatch(checkUserExist(params, undefined, undefined, true, undefined));
    }
  };

  const onConfirmExistEmail = () => {
    props.navigation.navigate(ScreenNames.SignIn);
    onCancelExistEmail();
  };

  const onCancelExistEmail = () => {
    setIsVisibeModal(false);
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderScreen = (screenHeight2: number | null) => {
    return (
      <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
        <View style={[globalStyles.alignCenter, styles.logoContainer]}>
          <Text allowFontScaling={false} style={styles.title}>
            {t('open account')}
          </Text>
        </View>
        <View style={[globalStyles.alignCenter, styles.contentContainer]}>
          <Text allowFontScaling={false} style={styles.content}>
            {t('Please provide your email for supporting')}
          </Text>
        </View>
        <TextInputComponent
          value={emailValue}
          onChangeText={onChangeEmailValue}
          wholeContainerStyle={styles.wholeContainerStyle}
          labelTextStyle={styles.labelTextStyle}
          labelText={'Email'}
          textInputContainerStyle={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            { ...(emailValueError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError) },
          ]}
          placeholder={'Enter your email'}
          placeholderTextColor={Colors.LIGHTTextDisable}
          textInputStyle={[globalStyles.container, styles.textInputStyle]}
          error={emailValueError}
          errorContent={emailValueErrorContent}
          autoCapitalize={'none'}
        />
        <TouchableOpacity
          disabled={emailValueError === true || emailValue.trim() === ''}
          style={[
            globalStyles.centered,
            styles.executeFormButton,
            { ...((emailValueError === true || emailValue.trim() === '') && styles.disabledButton) },
          ]}
          onPress={submitForm}
        >
          <Text
            style={[
              styles.executeFormButtonText,
              { ...((emailValueError === true || emailValue.trim() === '') && styles.disabledButtonText) },
            ]}
          >
            {t('Next')}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={isVisibleModal}
          onRequestClose={onCancelExistEmail}
          childrenContent={
            <TouchableWithoutFeedback onPress={hideKeyboard}>
              <View
                style={[
                  globalStyles.container,
                  globalStyles.centered,
                  globalStyles.flexDirectionRow,
                  styles.modalBackground,
                ]}
              >
                <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
                  <View style={styles.modalContent}>
                    <Text style={styles.content1}>{t('Email is already registered')}.</Text>
                    <Text style={[styles.content, styles.marginTop16]}>
                      {t('Please sign in, or try another email to continue')}.
                    </Text>
                    <View style={[globalStyles.fillWidth, styles.marginBottom10]}>
                      <TouchableOpacity
                        onPress={onConfirmExistEmail}
                        style={[globalStyles.centered, styles.executeFormButton2, styles.marginTop30]}
                      >
                        <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                          {t('Sign In')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.fillWidth]}>
                      <TouchableOpacity
                        onPress={onCancelExistEmail}
                        style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                      >
                        <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                          {t('Cancel')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.canGoBack() ? goBack : undefined}
        headerTitle={''}
        background={true}
      />
      {Platform.OS === 'android' ? (
        <ScrollView keyboardDismissMode={'interactive'}>{renderScreen(screenHeight)}</ScrollView>
      ) : (
        <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>
          {renderScreen(screenHeight)}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default KisEKYCFirstStep;
