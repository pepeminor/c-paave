import React, { useEffect, useState } from 'react';
import { Platform, Keyboard, KeyboardEvent } from 'react-native';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { setKeyboardHeight } from 'reduxs/global-actions/SetKeyboardHeight';

type ICustomBottomTabBarBaseProps = {
  setKeyboardHeight(height: number): void;
};

type ICustomBottomTabBarProps = ICustomBottomTabBarBaseProps & BottomTabBarProps;

const CustomBottomTabBar = (props: ICustomBottomTabBarProps) => {
  const [visible, setVisible] = useState(true);

  const onKeyboardShow = (event: KeyboardEvent): void => {
    props.setKeyboardHeight(event.endCoordinates.height);
    if (Platform.OS === 'android') {
      setVisible(false);
    }
  };

  const onKeyboardHide = (): void => {
    props.setKeyboardHeight(0);
    if (Platform.OS === 'android') {
      setVisible(true);
    }
  };

  useEffect(() => {
    const keyboardEventListeners = [
      Keyboard.addListener('keyboardDidShow', onKeyboardShow),
      Keyboard.addListener('keyboardDidHide', onKeyboardHide),
    ];
    return () => {
      keyboardEventListeners.forEach(eventListener => eventListener.remove());
    };
  }, []);

  if (Platform.OS === 'ios') {
    return <BottomTabBar {...props} />;
  }
  if (!visible) return null;
  return <BottomTabBar {...props} />;
};

export default connect(null, {
  setKeyboardHeight,
})(CustomBottomTabBar);
