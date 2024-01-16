import { TouchableWithoutFeedback, Animated, StyleProp, ViewStyle } from 'react-native';
import globalStyles from 'styles';
import React, { memo, ReactElement, useState } from 'react';
import useStyles from './styles';
import useUpdateEffect from 'hooks/useUpdateEffect';

type ISwitchProps = {
  value: boolean;
  disabled: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  backgroundInactive: string;
  backgroundActive: string;
  circleSize: number;
  switchLeftPx: number;
  switchRightPx: number;
  switchWidthMultiplier: number;
  barHeight?: number;
  switchBorderRadius?: number;
  circleBorderWidth?: number;
  circleBorderActiveColor: string;
  circleBorderInactiveColor: string;
  circleInActiveColor: string;
  circleActiveColor: string;
  innerCircleStyle: StyleProp<ViewStyle>;

  onValueChange(value: boolean): void;
  renderInsideCircle?(): ReactElement;
  renderOutsideCircle?(): ReactElement;
};

// circleSize: 30,
// switchLeftPx: 2,
// switchRightPx: 2,
// switchWidthMultiplier: 2,

const Switch = (props: ISwitchProps) => {
  // const [value, setValue] = useState<boolean>(props.value);
  const { styles } = useStyles();
  const [transformSwitch, setTransformSwitch] = useState<Animated.Value>(
    new Animated.Value(props.value ? props.circleSize / props.switchLeftPx : -props.circleSize / props.switchRightPx)
  );
  const [backgroundColor, setBackgroundColor] = useState<Animated.Value>(new Animated.Value(props.value ? 75 : -75));
  const [circleColor, setCircleColor] = useState<Animated.Value>(new Animated.Value(props.value ? 75 : -75));
  const [circleBorderColor, setCircleBorderColor] = useState<Animated.Value>(
    new Animated.Value(props.value ? 75 : -75)
  );

  const handleSwitch = () => {
    const { onValueChange, disabled } = props;
    if (disabled) {
      return;
    }
    // if (props.value === value) {
    //   onValueChange(!value);
    //   return;
    // }

    // if (changeValueImmediately) {
    animateSwitch(props.value);
    onValueChange(!props.value);

    // setValue(!props.value);
    // } else {
    // animateSwitch(!value, () => {
    //   setValue(!value);
    //   onValueChange(value);
    // });
    // }
  };

  const animateSwitch = (value: boolean, cb = () => true) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: value ? props.circleSize / props.switchLeftPx : -props.circleSize / props.switchRightPx,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(cb);
  };

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [props.backgroundInactive, props.backgroundActive],
  });

  const interpolatedCircleBorderColor = circleBorderColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [props.circleBorderInactiveColor, props.circleBorderActiveColor],
  });

  const interpolatedCircleColor = circleColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [props.circleInActiveColor, props.circleActiveColor],
  });

  useUpdateEffect(() => {
    setTransformSwitch(
      new Animated.Value(props.value ? props.circleSize / props.switchLeftPx : -props.circleSize / props.switchRightPx)
    );
    setBackgroundColor(new Animated.Value(props.value ? 75 : -75));
    setCircleColor(new Animated.Value(props.value ? 75 : -75));
    setCircleBorderColor(new Animated.Value(props.value ? 75 : -75));
  }, [props.value]);

  return (
    <TouchableWithoutFeedback
      onPress={handleSwitch}
      // {...restProps}
    >
      <Animated.View
        style={[
          globalStyles.justifyCenter,
          styles.container,
          props.containerStyle,
          {
            backgroundColor: interpolatedColorAnimation,
            width: props.circleSize * props.switchWidthMultiplier,
            height: props.barHeight || props.circleSize,
            borderRadius: props.switchBorderRadius || props.circleSize,
          },
        ]}
      >
        {props.renderOutsideCircle != null && props.renderOutsideCircle()}
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              left: transformSwitch,
              width: props.circleSize * props.switchWidthMultiplier,
            },
            props.outerCircleStyle,
          ]}
        >
          {/* {props.value && props.renderInsideCircle != null && (
            <View style={{ backgroundColor: 'red', width: 15, height: 15, paddingRight: 5 }}></View>
          )} */}

          <Animated.View
            style={[
              styles.circle,
              {
                borderWidth: props.circleBorderWidth,
                borderColor: interpolatedCircleBorderColor,
                backgroundColor: interpolatedCircleColor,
                width: props.circleSize,
                height: props.circleSize,
                borderRadius: props.circleSize / 2,
              },
              props.innerCircleStyle,
            ]}
          >
            {props.renderInsideCircle != null && props.renderInsideCircle()}
          </Animated.View>
          {/* {!value && renderInActiveText && (
            <Text allowFontScaling={false} style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>{inActiveText}</Text>
          )} */}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default memo(Switch);
