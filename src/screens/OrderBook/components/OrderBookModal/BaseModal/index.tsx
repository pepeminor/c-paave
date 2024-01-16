import Modal from 'components/Modal';
import { useAppSelector } from 'hooks';
import React, { memo, ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, LayoutChangeEvent, Platform, ScrollView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { setOrderBookSymbol } from 'reduxs/global-actions';
import globalStyles from 'styles';
import { ModalType } from '..';
import useStyles from './styles';

interface TPropsModalOrder {
  title: string;
  ListContentModal?: Element;
  isVisible: boolean;
}

const IOS_STATUS_BAR_HEIGHT = 24;
const IOS_WINDOW_HEIGHT = Dimensions.get('window').height - IOS_STATUS_BAR_HEIGHT;

const BaseModal = ({ title, ListContentModal, isVisible }: TPropsModalOrder) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);
  const formHeight = useRef(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const kasvRef = useRef<KeyboardAwareScrollView>(null);

  const platformWrapperScroll = (content: ReactElement) => {
    if (Platform.OS === 'android') {
      return (
        <ScrollView contentContainerStyle={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      );
    } else {
      return (
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.scrollView]}
          scrollEnabled={scrollEnabled}
          ref={kasvRef}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </KeyboardAwareScrollView>
      );
    }
  };
  const closeModal = () => {
    dispatch(setOrderBookSymbol({ symbol: null, type: ModalType.MODIFY }));
  };

  const handleLayoutEvent = (e: LayoutChangeEvent) => {
    formHeight.current = e.nativeEvent.layout.height;
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (IOS_WINDOW_HEIGHT - formHeight.current - keyboardHeight > 0) {
        setScrollEnabled(false);
      } else {
        setScrollEnabled(true);
      }
      kasvRef.current?.scrollToPosition(0, keyboardHeight / 2 - 24, true);
    }
  }, [keyboardHeight]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={closeModal}
      childrenContent={
        <View style={[globalStyles.container, styles.modalBackground]}>
          {platformWrapperScroll(
            <View style={styles.modalContentContainer} onLayout={handleLayoutEvent}>
              <View style={[globalStyles.centered, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                  {t(title)}
                </Text>
              </View>
              <View style={styles.modalContent}>{ListContentModal}</View>
            </View>
          )}
        </View>
      }
    />
  );
};

export default memo(BaseModal);
