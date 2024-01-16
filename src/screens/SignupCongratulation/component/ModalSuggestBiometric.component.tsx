import React from 'react';
import withMemo from 'HOC/withMemo';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors, lightColors, scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import { navigateClean } from 'utils';
import { RESET } from 'reduxs/action-type-utils';
import { SUGGEST_BIOMETRIC } from 'reduxs/actions';
import { getStylesHook } from 'hooks/useStyles';
import { useAppSelector } from 'hooks/useAppSelector';
import { INavigationAction } from 'interfaces/common';
import { Global } from 'constants/main';
import { BIOMETRIC_TYPE } from 'global';
import FaceIDIcon from 'assets/icon/FaceID.svg';
import TouchIDIcon from 'assets/icon/TouchIDIcon.svg';
import { store } from 'screens/App';

const closeModal = () => {
  store.dispatch({ type: RESET(SUGGEST_BIOMETRIC) });
  navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
};

interface ModalSuggestType {
  handleBio: () => void;
}

const ModalSuggestBiometric = ({ handleBio }: ModalSuggestType) => {
  const { t } = useTranslation();
  const suggestBiometric = useAppSelector(state => state.suggestBiometric);
  const { styles } = useStyles();

  return (
    <Modal
      visible={suggestBiometric}
      onRequestClose={closeModal}
      childrenContent={
        <View style={styles.container}>
          <View style={styles.modalContainerSetting}>
            <View style={styles.headerModalSetting}>
              <Text style={styles.headerModalSettingTitle}>{t('Enable Biometric')}</Text>
            </View>
            <View style={styles.sectionModalSetting}>
              <Text style={styles.textSection}>{t('Biometric suggestion')}</Text>
            </View>
            <View style={styles.buttonBio}>
              {Global.biometricType !== BIOMETRIC_TYPE.None && (
                <TouchableOpacity onPress={handleBio}>
                  {Global.biometricType === BIOMETRIC_TYPE.TouchID ? (
                    <TouchIDIcon height={scaleSize(36)} width={scaleSize(36)} />
                  ) : (
                    Global.biometricType === BIOMETRIC_TYPE.FaceID && (
                      <FaceIDIcon height={scaleSize(36)} width={scaleSize(36)} />
                    )
                  )}
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
              <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText}>
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainerSetting: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: 343,
    overflow: 'hidden',
  },
  headerModalSetting: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  headerModalSettingTitle: {
    fontSize: 18,
    color: Colors.BlueNewColor,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  sectionModalSetting: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cancelExecuteFormButtonText: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  buttonBio: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default withMemo(ModalSuggestBiometric);
