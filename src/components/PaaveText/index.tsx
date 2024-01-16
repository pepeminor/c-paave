import { isNotNilOrEmpty } from 'ramda-adjunct';
import React, { useMemo } from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native';
import { default as ParsedText, ParseShape } from 'react-native-parsed-text';
import Animated, { AnimateProps } from 'react-native-reanimated';
import { TEXT_TYPE } from './type';
import { useColors } from 'hooks/useStyles';
import withMemo from 'HOC/withMemo';
import textStyle from './styles';

export interface IPaaveTextProps extends TextProps, Pick<AnimateProps<TextProps>, 'entering' | 'exiting' | 'layout'> {
  style?: StyleProp<TextStyle>;
  type?: TEXT_TYPE;
  color?: string;
  parse?: ParseShape[];
  lineHeight?: number;
}

const PaaveText = (props: IPaaveTextProps) => {
  const colors = useColors();
  const { styles } = textStyle();
  const {
    children,
    type = TEXT_TYPE.REGULAR_14,
    color = colors.BLACK,
    style,
    exiting,
    entering,
    layout,
    parse,
    ...rest
  } = props;

  const isParse = isNotNilOrEmpty(parse);

  const TextComponent: any = isParse ? ParsedText : Animated.Text;

  const finalStyle = useMemo(() => {
    return {
      ...styles[type],
      color,
      ...(style as TextStyle),
    };
  }, [styles, type, color, style]);

  return (
    <TextComponent
      allowFontScaling={false}
      {...rest}
      style={finalStyle}
      parse={parse}
      {...{ exiting, entering, layout }}
    >
      {children}
    </TextComponent>
  );
};

export default withMemo(PaaveText);
