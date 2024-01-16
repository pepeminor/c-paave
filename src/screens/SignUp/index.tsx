import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from 'assets/logo-paave-light.svg';
import LanguagePicker from '../../components/LanguagePicker';
import globalStyles, { scaleSize } from '../../styles';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import SignInForm from './components/Form';
import config from 'config';
import GoogleAuthentication from 'screens/SignIn/components/GoogleAuthentication';
import FacebookAuthentication from 'screens/SignIn/components/FacebookAuthentication';
import AppleAuthentication from 'screens/SignIn/components/AppleAuthentication';
import Modal from 'react-native-modal';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import LoadingKIS from 'assets/icon/loading-kis.svg';
import withMemo from 'HOC/withMemo';
import { TPropsModalOrder } from 'components/ModalOrder';
import { IResponse } from 'interfaces/common';
import { ILoginResponse } from 'interfaces/authentication';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationActions, ILoginParams } from 'reduxs';
import { useDispatch } from 'react-redux';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useAppSelector } from 'hooks';

const SignUp = (props: StackScreenProps<'SignUp'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const offset = useSharedValue(0);
  const ModalUserExist = useRef<FunctionComponent<TPropsModalOrder>>();
  const responseData = useRef<IResponse<ILoginResponse>>();
  const action = useRef<PayloadAction<ILoginParams>>();
  const [isShowModal, setIsShowModal] = useState(false);
  const onModalOTPKIS = useAppSelector(state => state.onModalOTPKIS);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withRepeat(withTiming(`${offset.value}deg`, { duration: 15000 }), -1),
        },
      ],
    };
  });

  useEffect(() => {
    if (loading) {
      offset.value = withTiming(360 * 10);

      return;
    }
    if (ModalUserExist) {
      setIsShowModal(true);
    }
  }, [loading]);

  const goToSignIn = useCallback(() => {
    props.navigation.navigate(ScreenNames.SignIn);
  }, []);

  const renderScreen = () => {
    return (
      <View style={globalStyles.container}>
        <Image source={require('assets/component/SignInBG.png')} style={styles.bgImageStyle} resizeMode="cover" />
        <View style={styles.logoContainer}>
          <Logo width={scaleSize(144)} height={scaleSize(62)} />
        </View>
        <View style={styles.signUpForm}>
          <SignInForm />
          {/* // Ẩn PAAVE-752 */}
          <Text allowFontScaling={false} style={styles.optionalExecuteFormText}>
            {t('or sign up with')}
          </Text>

          {/* // Ẩn PAAVE-675 */}
          <View style={styles.optionalExecuteFormContainer}>
            <GoogleAuthentication
              setLoading={setLoading}
              isSignIn={false}
              onShowModalUserExist={onShowModalUserExist}
            />

            <FacebookAuthentication
              setLoading={setLoading}
              isSignIn={false}
              onShowModalUserExist={onShowModalUserExist}
            />

            {Platform.OS === 'ios' && (
              <AppleAuthentication
                setLoading={setLoading}
                isSignIn={false}
                onShowModalUserExist={onShowModalUserExist}
              />
            )}
          </View>
          <View style={styles.optionalSwitchStateContainer}>
            <Text allowFontScaling={false} style={styles.optionalSwitchStateText}>
              {t('Already have an account?')}
            </Text>
            <TouchableOpacity onPress={goToSignIn}>
              <Text allowFontScaling={false} style={styles.optionalSwitchState}>
                {t('Sign In')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const hideModal = useCallback(() => {
    setIsShowModal(false);
    ModalUserExist.current = undefined;
  }, []);
  const onConfirm = useCallback(() => {
    hideModal();
    setLoading(true);

    dispatch(
      AuthenticationActions.continueLoginSocialRequest({
        data: {
          responseData: responseData.current!,
          action: action.current!,
        },
      })
    );
  }, []);
  const onShowModalUserExist = useCallback(
    (data: { responseData: IResponse<ILoginResponse>; action: PayloadAction<ILoginParams> }) => {
      if (ModalUserExist) {
        ModalUserExist.current = require('components/ModalOrder/index.tsx').default;
      }

      responseData.current = data?.responseData;
      action.current = data?.action;
    },
    []
  );

  useEffect(hideLoading, [onModalOTPKIS]);

  return (
    <View style={styles.backgroundColorDeepBlue}>
      <HeaderScreen
        headerTitle={''}
        rightButtonListIcon={[<LanguagePicker textStyles={styles.langPicker} />]}
        background={true}
        backgroundStyle={styles.backgroundColorDeepBlue}
      />
      {Platform.OS === 'android' ? (
        <ScrollView keyboardDismissMode={'interactive'}>{renderScreen()}</ScrollView>
      ) : (
        <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>{renderScreen()}</KeyboardAwareScrollView>
      )}
      <View style={styles.versionContainer}>
        <Text allowFontScaling={false} style={styles.versionText}>
          {t('Version')} {`${config.appVersion} (${config.appBuildNo})`}
        </Text>
      </View>
      {ModalUserExist.current && (
        <ModalUserExist.current
          confirmText={'Confirm'}
          keyboardHeight={0}
          isVisible={isShowModal}
          onConfirm={onConfirm}
          onCancel={hideModal}
          ListContentModal={
            <View style={globalStyles.centered}>
              <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />
              <PaaveText type={TEXT_TYPE.REGULAR_16} style={styles.contentModalUserExist}>
                {'You have an existing account linked to this social account? \n Do you want to login?'}{' '}
              </PaaveText>
            </View>
          }
        />
      )}
      {loading && (
        <Modal
          isVisible={loading && !onModalOTPKIS}
          onModalHide={() => {
            if (ModalUserExist) {
              setIsShowModal(true);
            }
          }}
          animationIn={'fadeIn'}
          backdropOpacity={0.7}
          onBackdropPress={hideLoading}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={animatedStyles}>
              <LoadingKIS />
            </Animated.View>
            <Text style={styles.loadingTextStyle}>
              {t(`Please wait while we verify your account.\nIt'll just take a moment`)}
            </Text>
            <View style={styles.dummyBlock} />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default withMemo(SignUp);
