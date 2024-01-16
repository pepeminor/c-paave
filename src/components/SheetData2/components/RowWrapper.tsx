import React, { Children, memo, PropsWithChildren } from 'react';
import { Animated, ViewProps } from 'react-native';
import globalStyles from 'styles';
import useStyles from '../styles';

type AnimatedViewStyle =
  | false
  | {
      transform: {
        translateX: Animated.AnimatedInterpolation;
      }[];
    };

interface RowProps extends ViewProps {
  scrollStyle: AnimatedViewStyle;
  frozenStyle: AnimatedViewStyle;
  frozenColumn?: number;
}

const Row = memo(
  ({ scrollStyle, frozenStyle, children, frozenColumn = 0, style, ...viewProps }: PropsWithChildren<RowProps>) => {
    const childArray = Children.toArray(children);
    const { styles } = useStyles();
    return (
      <Animated.View style={[styles.rowContainer, globalStyles.flexDirectionRow, scrollStyle, style]} {...viewProps}>
        {childArray.map((child, index) => (
          <Animated.View key={index} style={[frozenColumn > index && frozenStyle]}>
            {child}
          </Animated.View>
        ))}
      </Animated.View>
    );
  }
);

export default function RowWrapper(wrapperProps: RowProps) {
  return (hocProps: PropsWithChildren<ViewProps>) => {
    return (
      <Row {...wrapperProps} {...hocProps}>
        {hocProps.children}
      </Row>
    );
  };
}
