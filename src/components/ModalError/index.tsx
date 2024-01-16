import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import useStyles from './styles';
import Modal from '../Modal';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';

export interface TPropsModalError {
  title?: string;
  subTitle?: string;
  confirmText?: string;
  isVisible: boolean;
  onCloseModal: () => void;
}

const ModalError = ({ title, confirmText = 'Confirm', isVisible, onCloseModal, subTitle }: TPropsModalError) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContentContainer}>
              {title && (
                <PaaveText style={styles.modalTitle} color={dynamicColors.BlueNewColor} type={TEXT_TYPE.BOLD_18}>
                  {t(title)}
                </PaaveText>
              )}
              {subTitle && (
                <PaaveText style={styles.subTitle} color={dynamicColors.BLACK} type={TEXT_TYPE.REGULAR_14}>
                  {t(subTitle)}
                </PaaveText>
              )}
              <TouchableOpacity onPress={onCloseModal} style={styles.executeFormButton2}>
                <PaaveText color={dynamicColors.WHITE} type={TEXT_TYPE.BOLD_16}>
                  {t(confirmText)}
                </PaaveText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      }
    />
  );
};

export default memo(ModalError);
