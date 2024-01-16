import { View } from 'react-native';
import React, { memo } from 'react';
import { getStylesHook } from 'hooks';
import Modal from 'components/Modal';
import { TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { lightColors } from 'styles';
import PaaveButton from 'components/PaaveButton';

type Props = {
  content: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmActionModal = memo(({ content, visible, setVisible, onConfirm }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle} style={styles.modalTitle}>
              {t(content)}
            </PaaveText>
            <View style={styles.actionBtnContainer}>
              <PaaveButton
                type="SOLID"
                color={dynamicColors.LIGHTBackground}
                style={styles.btnLeft}
                onPress={closeModal}
              >
                <PaaveText
                  type={TEXT_TYPE.REGULAR_14}
                  color={dynamicColors.LIGHTTextContent}
                  style={styles.modalContent}
                >
                  {t('Cancel')}
                </PaaveText>
              </PaaveButton>
              <PaaveButton type="SOLID" color={dynamicColors.LIGHTRed} style={styles.btnRight} onPress={onConfirm}>
                <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.WHITE} style={styles.modalContent}>
                  {t('OK')}
                </PaaveText>
              </PaaveButton>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: 343,
    borderRadius: 20,
    paddingVertical: 16,
    backgroundColor: lightColors.WHITE,
  },
  modalTitle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  modalContent: {
    padding: 16,
  },
  actionBtnContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLeft: {
    flex: 1,
    marginRight: 8,
  },
  btnRight: {
    flex: 1,
    marginLeft: 8,
  },
});
