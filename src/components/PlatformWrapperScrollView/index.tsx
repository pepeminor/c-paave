import { useAppSelector } from 'hooks';
import React, { memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import globalStyles from 'styles';
import useStyles from './styles';

type PlatformWrapperScrollViewProps = {
  style?: StyleProp<ViewStyle>;
};

const PlatformWrapperScrollView: React.FC<PropsWithChildren<PlatformWrapperScrollViewProps>> = ({
  children,
  style,
}) => {
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);
  const safeScreenHeight = useAppSelector(state => state.safeScreenHeight);
  const formHeight = useRef(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const iosScrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { styles } = useStyles();

  const handleLayoutEvent = (e: LayoutChangeEvent) => {
    formHeight.current = e.nativeEvent.layout.height;
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (safeScreenHeight - formHeight.current - keyboardHeight > 0) {
        setScrollEnabled(false);
      } else {
        setScrollEnabled(true);
      }
      iosScrollViewRef.current?.scrollToPosition(0, keyboardHeight / 2, true);
    }
  }, [keyboardHeight]);

  return (
    <View style={style}>
      {Platform.OS === 'android' ? (
        <ScrollView contentContainerStyle={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          <View style={[globalStyles.fillWidth]} onLayout={handleLayoutEvent}>
            {children}
          </View>
        </ScrollView>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.scrollView]}
          scrollEnabled={scrollEnabled}
          ref={iosScrollViewRef}
          showsVerticalScrollIndicator={false}
        >
          <View style={[globalStyles.fillWidth]} onLayout={handleLayoutEvent}>
            {children}
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default memo(PlatformWrapperScrollView);
