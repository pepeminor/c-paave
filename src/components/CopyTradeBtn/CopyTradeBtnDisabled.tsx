import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors, textStyles } from 'styles';
import Modal from 'components/Modal';
import UnderConstruction from 'assets/icon/UnderConstruction.svg';

const CopyTradeBtnDisabled = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleModal = useCallback(() => {
    setIsShowModal(pre => !pre);
  }, []);

  return (
    <View style={styles.copyTradeBtnContainer}>
      <TouchableOpacity style={styles.copyTradeBtnWrapper} onPress={handleModal}>
        <Text allowFontScaling={false} style={styles.copyTradeBtnText}>
          {t('This feature is being maintained')} !
        </Text>
      </TouchableOpacity>
      <Modal visible={isShowModal} onRequestClose={handleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.underConstructionIcon}>
              <UnderConstruction />
            </View>
            <Text allowFontScaling={false} style={styles.modalHeader}>
              {t('This feature is being maintained')} !
            </Text>
            <Text allowFontScaling={false} style={styles.modalText}>
              {t('CopyTradeMaintainedNote')}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={[globalStyles.invisibleBackground, styles.modalBackground]} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default memo(CopyTradeBtnDisabled);

const useStyles = getStylesHook({
  copyTradeBtnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },
  copyTradeBtnWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: lightColors.Blue2,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  copyTradeBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.WHITE,
    paddingRight: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: lightColors.ModalBackgroundColor,
  },
  modalSpace: {
    paddingHorizontal: 24,
  },
  modalHeader: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  underConstructionIcon: {
    height: 100,
    width: 200,
    marginVertical: 16,
  },
  modalText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.BLACK,
    textAlign: 'center',
  },
});
