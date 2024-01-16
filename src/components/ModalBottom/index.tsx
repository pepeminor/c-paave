import {
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  ViewStyle,
  ModalProps,
  StyleProp,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import Modal from 'components/Modal';
import { useAppSelector } from 'hooks';
import useUpdateEffect from 'hooks/useUpdateEffect';
import withMemo from 'HOC/withMemo';
import CloseIcon from 'assets/icon/btn_close.svg';
import { HitSlop } from 'constants/enum';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export interface BaseModalBottomProps {
  closeModal: () => void;
}

interface ModalBottomProps extends ModalProps {
  setVisible: (visible: boolean) => void;
  disableUnderlay?: boolean;
  closeButtonStyle?: StyleProp<ViewStyle>;
  headerComponent?: React.ReactNode;
  underlayStyle?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
  onModalHide?: () => void;
}

const ModalBottom = ({
  visible,
  setVisible,
  disableUnderlay,
  children,
  closeButtonStyle,
  headerComponent,
  underlayStyle,
  showCloseButton = true,
  onModalHide,
  ...modalProps
}: ModalBottomProps) => {
  const { height: WINDOW_HEIGHT } = Dimensions.get('window');
  const offset = useRef(new Animated.Value(WINDOW_HEIGHT * 2)).current;
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);
  const [closeAnimationDone, setCloseAnimationDone] = useState(true);

  const { styles } = useStyles();

  useEffect(() => {
    if (!visible) {
      Animated.timing(offset, {
        toValue: WINDOW_HEIGHT * 2,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setCloseAnimationDone(true));
    } else {
      setCloseAnimationDone(false);
      Animated.timing(offset, {
        toValue: WINDOW_HEIGHT - scaleSize(48),
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    return onModalHide;
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    Animated.timing(offset, {
      toValue: WINDOW_HEIGHT * 2,
      duration: 200,
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

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY > 100) {
        runOnJS(closeModal)();
      }
    })
    .hitSlop(HitSlop);

  return (
    <Modal visible={visible || !closeAnimationDone} onRequestClose={closeModal} {...modalProps}>
      <View style={styles.modalBackground}>
        {headerComponent}
        <GestureDetector gesture={panGesture}>
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
            {showCloseButton && (
              <TouchableOpacity style={[styles.closeBtn, closeButtonStyle]} onPress={closeModal}>
                <CloseIcon />
              </TouchableOpacity>
            )}
            {children}
            <View style={styles.dummyModal} />
          </Animated.View>
        </GestureDetector>
        <TouchableWithoutFeedback onPress={closeModal} disabled={disableUnderlay}>
          <View style={[globalStyles.invisibleBackground, styles.background, underlayStyle]} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default withMemo(ModalBottom);
