import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import useStyles from './styles';

interface ActionSheetProps {
  visible: boolean;
  onRequestClose?: () => void;
  children: any;
  style?: StyleProp<ViewStyle>;
}

function ActionSheet(props: ActionSheetProps, ref: Ref<any>) {
  const { visible, children, style } = props;
  const { styles } = useStyles();

  const [transformY] = useState(new Animated.Value(300));

  useImperativeHandle(ref, () => ({
    closeWithFunc: (func: any) => {
      Animated.timing(transformY, {
        toValue: 300,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(func);
    },
  }));

  useEffect(() => {
    if (visible) {
      Animated.spring(transformY, {
        toValue: 0,
        friction: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, transformY]);

  return (
    <Animated.View style={[{ transform: [{ translateY: transformY }] }, styles.modalStyle, styles.container, style]}>
      {children}
    </Animated.View>
  );
}

export default forwardRef(ActionSheet);
