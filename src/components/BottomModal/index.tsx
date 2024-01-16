import { View, Dimensions, Animated, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import Modal from 'components/Modal';
import { useAppSelector } from 'hooks';
import useUpdateEffect from 'hooks/useUpdateEffect';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export interface BaseBottomModalProps {
  closeModal: () => void;
}

export interface TPropsBottomModal<T> {
  ModalContent: React.ComponentType<T & BaseBottomModalProps>;
  modalContentProps?: T;
  disableUnderlay?: boolean;
}

/**
 * @deprecated
 */
export default function BottomModal<T>({
  ModalContent,
  modalContentProps,
  disableUnderlay = false,
}: TPropsBottomModal<T>): [JSX.Element, () => void] {
  const [visible, setVisible] = useState(false);
  const offset = useRef(new Animated.Value(WINDOW_HEIGHT * 2)).current;
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);

  const { styles } = useStyles();

  const closeModal = useCallback(() => {
    Animated.timing(offset, {
      toValue: WINDOW_HEIGHT * 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
    Animated.timing(offset, {
      toValue: WINDOW_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useUpdateEffect(() => {
    if (Platform.OS !== 'ios') return;
    Animated.timing(offset, {
      toValue: -keyboardHeight + WINDOW_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [keyboardHeight]);

  const modal = useMemo(
    () => (
      <Modal visible={visible} onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: offset,
                  },
                ],
              },
            ]}
          >
            <ModalContent
              {...({
                ...modalContentProps,
                closeModal,
              } as T & BaseBottomModalProps)}
            />
            <View style={styles.dummyModal} />
          </Animated.View>
          <TouchableWithoutFeedback onPress={closeModal} disabled={disableUnderlay}>
            <View style={[globalStyles.invisibleBackground, styles.background]} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    ),
    [visible, modalContentProps, disableUnderlay]
  );

  return [modal, openModal];
}
