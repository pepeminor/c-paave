import { Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useAppSelector } from 'hooks';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import { hideRestartSubDisableModal } from 'reduxs/global-actions';
import CodePush from 'react-native-code-push';

const ModalSubAccountDisable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const restartSubDisableModal = useAppSelector(state => state.restartSubDisableModal);

  const onPressRestartApp = useCallback(() => {
    dispatch(hideRestartSubDisableModal());
    CodePush.restartApp();
  }, []);

  if (!restartSubDisableModal) return null;

  return (
    <Modal visible={restartSubDisableModal}>
      <View style={styles.modalBackground}>
        <View style={styles.containerBackground}>
          <View style={styles.modalTitle}>
            <Text style={styles.titleText}>{t('Notify')}</Text>
          </View>
          <View style={styles.paddingContent}>
            <Text allowFontScaling={false} style={styles.infoText}>
              {t('The contest is ended. Your account will be restored to its pre-join contest state')}
            </Text>
            <TouchableOpacity onPress={onPressRestartApp} style={styles.buttonModal}>
              <Text allowFontScaling={false} style={styles.buttonModalText}>
                {t('OK')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalSubAccountDisable);
