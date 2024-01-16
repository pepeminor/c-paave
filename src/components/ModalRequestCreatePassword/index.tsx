import React, { useCallback } from 'react';
import Modal from '../Modal';
import withMemo from 'HOC/withMemo';
import { Text, TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';
import useStyles from './styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { AuthenticationActions, AuthenticationSelectors } from 'reduxs';
import { useDispatch } from 'react-redux';
import { navigate } from 'utils';

const ModalRequestCreatePassword = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const isShowModal = useAppSelector(AuthenticationSelectors.selectedShowModalRequestPassword);

  const closeModal = useCallback(() => {
    dispatch(AuthenticationActions.hideModalRequestPassword());
  }, []);

  const submit = useCallback(() => {
    closeModal();

    navigate({ key: 'CreatePassword' });
  }, []);

  if (!isShowModal) {
    return null;
  }

  return (
    <Modal
      visible={isShowModal}
      onRequestClose={closeModal}
      childrenContent={
        <View style={styles.modalBackground2}>
          <View style={styles.modalContainerSetting}>
            <View style={styles.headerModalSetting}>
              <Text style={styles.headerModalSettingTitle}>{t('Notification')}</Text>
            </View>
            <View style={styles.sectionModalSetting}>
              <Text style={styles.textSection}>
                {t('You have not yet set password to login with registered email/username.')}
              </Text>
              <Text style={styles.textSection}>{t('Please set password.')}</Text>
            </View>
            <TouchableOpacity onPress={submit} style={styles.goToSettingButton}>
              <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                {t('OK')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default withMemo(ModalRequestCreatePassword);
