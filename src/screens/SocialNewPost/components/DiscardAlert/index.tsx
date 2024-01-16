import { View, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { useStyles } from './styles';
import Modal from 'components/Modal';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';
import PaaveButton from 'components/PaaveButton';

type Props = {
  navigation: any;
};

export type DiscardAlert = {
  disable: () => void;
  enable: () => void;
};

export const DiscardAlert = memo(
  forwardRef<DiscardAlert, Props>(({ navigation }, ref) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    const onDismiss = () => {
      setModalVisible(false);
    };

    useEffect(
      () =>
        navigation.addListener('beforeRemove', (e: any) => {
          if (isDisable) {
            navigation.dispatch(e.data.action);
            return;
          }
          if (!isModalVisible) {
            e.preventDefault();
            setModalVisible(true);
            return;
          }
          setModalVisible(false);
          navigation.dispatch(e.data.action);
        }),
      [navigation, isModalVisible, isDisable]
    );

    useImperativeHandle(ref, () => ({
      disable: () => {
        setIsDisable(true);
      },
      enable: () => {
        setIsDisable(false);
      },
    }));

    return (
      <Modal visible={isModalVisible} onDismiss={onDismiss}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle} style={styles.modalTitle}>
                {t('new_post_screen.discard_modal.title')}
              </PaaveText>
              <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextContent} style={styles.modalContent}>
                {t('new_post_screen.discard_modal.content')}
              </PaaveText>
              <View style={styles.actionBtnContainer}>
                <PaaveButton
                  type="SOLID"
                  color={dynamicColors.LIGHTBackground}
                  style={styles.btnLeft}
                  onPress={onDismiss}
                >
                  <PaaveText
                    type={TEXT_TYPE.REGULAR_14}
                    color={dynamicColors.LIGHTTextContent}
                    style={styles.modalContent}
                  >
                    {t('Cancel')}
                  </PaaveText>
                </PaaveButton>
                <PaaveButton
                  type="SOLID"
                  color={dynamicColors.LIGHTRed}
                  style={styles.btnRight}
                  onPress={navigation.goBack}
                >
                  <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.WHITE} style={styles.modalContent}>
                    {t('Discard')}
                  </PaaveText>
                </PaaveButton>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  })
);
