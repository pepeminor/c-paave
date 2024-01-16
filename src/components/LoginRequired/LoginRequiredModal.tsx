import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useAppSelector } from 'hooks';
import globalStyles, { lightColors, textStyles } from 'styles';
import { navigate } from 'utils';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { hideNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { getStylesHook } from 'hooks/useStyles';

const LoginRequiredModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const nonLoginModal = useAppSelector(state => state.nonLoginModal);

  const goToSignIn = useCallback(() => {
    navigate({ key: 'SignIn' });
    dispatch(hideNonLoginModal());
  }, []);

  const goToSignUp = useCallback(() => {
    navigate({ key: 'SignUp' });
    dispatch(hideNonLoginModal());
  }, []);

  const hideModal = useCallback(() => {
    dispatch(hideNonLoginModal());
  }, []);

  if (!nonLoginModal) return null;

  return (
    <Modal visible={nonLoginModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text allowFontScaling={false} style={styles.headerText}>
            {t('Sign In Required')}
          </Text>
          <View style={globalStyles.centered}>
            <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />
          </View>
          <Text allowFontScaling={false} style={styles.infoText}>
            {t('You must sign in to Paave to use this feature.')}
          </Text>
          <TouchableOpacity onPress={goToSignIn} style={styles.avaActionLogin}>
            <Text allowFontScaling={false} style={styles.avaActionLoginText}>
              {t('Sign In')}
            </Text>
          </TouchableOpacity>
          <View style={styles.containerButton}>
            <Text allowFontScaling={false} style={styles.infoText}>
              {t('Not a member?')}
              {'   '}
            </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text allowFontScaling={false} style={styles.registerText}>
                {t('Sign Up')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 343,
    height: 380,
    backgroundColor: lightColors.WHITE,
    borderRadius: 20,
    padding: 16,
  },
  headerText: {
    ...textStyles.fontSize24,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
    paddingVertical: 16,
  },
  paaveLogo: {
    width: 177,
    height: 82,
  },
  infoText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: lightColors.BLACK,
    textAlign: 'center',
    padding: 16,
  },
  avaActionLogin: {
    backgroundColor: lightColors.BlueNewColor,
    margin: 16,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
  },
  avaActionLoginText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
    width: 140,
    textAlign: 'center',
  },
  registerText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
  },
  modalBackground: {
    ...globalStyles.invisibleBackground,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
  containerButton: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifyCenter,
    ...globalStyles.padding16,
    alignItems: 'center',
  },
});

export default memo(LoginRequiredModal);
