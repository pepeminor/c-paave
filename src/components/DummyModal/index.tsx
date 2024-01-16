import { useAppSelector } from 'hooks';
import React, { memo, PropsWithChildren, useCallback } from 'react';
import { TouchableWithoutFeedback, View, Modal, TouchableOpacity } from 'react-native';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IconWithBackground } from 'components/Icon';
import BottomButton from 'components/BottomButton';
import { Colors } from 'styles';

interface TPropsDummyModal {
  dummyText?: string;
  dummyTitle?: string;
  isShowCloseButton?: boolean;
}

const DummyModal: React.FC<PropsWithChildren<TPropsDummyModal>> = ({ dummyText, dummyTitle, isShowCloseButton }) => {
  const isShowDummyModal = useAppSelector(state => state.showDummyModal);
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onPressCancel = useCallback(() => {
    dispatch({ type: 'CLOSE_DUMMY_MODAL' });
  }, [dispatch]);

  return (
    <Modal animationType="fade" visible={isShowDummyModal} transparent={true}>
      <TouchableWithoutFeedback onPress={onPressCancel}>
        <View style={styles.modalBackground}>
          <View style={styles.insideModal}>
            {isShowCloseButton && (
              <TouchableOpacity style={styles.closeButton} onPress={onPressCancel}>
                <IconWithBackground
                  containerStyle={styles.iconContainer}
                  backgroundColor={Colors.BACKGROUND_MODAL}
                  iconColor={Colors.BLACK}
                  size={12}
                  name="close"
                />
              </TouchableOpacity>
            )}
            {dummyTitle && <Text style={styles.title}>{t(dummyTitle)}</Text>}
            <Text style={styles.text}>{t(dummyText ?? 'This is dummy text')}</Text>
            <BottomButton
              containerStyle={styles.buttonContainer}
              onPress={onPressCancel}
              text={'Ok'}
              backgroundButton={[Colors.Blue5, Colors.Blue5]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(DummyModal);
