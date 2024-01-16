import { TEXT_TYPE } from 'components/PaaveText/type';
import { StyleProp, TextProps, TextStyle } from 'react-native';
import { Part } from 'react-native-controlled-mentions';
import { ParseShape } from 'react-native-parsed-text';
import { AnimateProps } from 'react-native-reanimated';

export interface IProps extends TextProps, Pick<AnimateProps<TextProps>, 'entering' | 'exiting' | 'layout'> {
  style?: StyleProp<TextStyle>;
  type?: TEXT_TYPE;
  color?: string;
  parse?: ParseShape[];
  lineHeight?: number;
  content: string;
  parts?: Part[];
  colorTextSeeMore?: string;
  onPressText?: () => void;
}
