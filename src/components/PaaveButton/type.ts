import { IconName } from 'components/Icon/type';
import { ImageStyle, StyleProp, TextStyle, TouchableOpacityProps, ViewProps, ViewStyle } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';

export const BUTTON_TYPE = {
  /**
   * Button      : has backgroundColor
   * Text & Icon : 14px, semi-bold 600
   */
  SOLID_SMALL: 'SOLID_SMALL',
  /**
   * Button      : no backgroundColor, has border
   * Text & Icon : 14px, semi-bold 600
   */
  OUTLINE_SMALL: 'OUTLINE_SMALL',
  /**
   * Button      : no backgroundColor, no border
   * Text & Icon : 14px, semi-bold 600
   */
  ONLY_TEXT_SMALL: 'ONLY_TEXT_SMALL',
  /**
   * Button      : has backgroundColor
   * Text & Icon : 16px, bold 700
   */
  SOLID: 'SOLID',
  /**
   * Button      : no backgroundColor, has border
   * Text & Icon : 16px, bold 700
   */
  OUTLINE: 'OUTLINE',
  /**
   * Button      : no backgroundColor, no border
   * Text & Icon : 16px, bold 700
   */
  ONLY_TEXT: 'ONLY_TEXT',
  /**
   * Button      : no backgroundColor, no border, no text
   */
  ONLY_ICON: 'ONLY_ICON',
  DEFAULT: 'DEFAULT',
} as const;
export type BUTTON_TYPE = keyof typeof BUTTON_TYPE;

export interface IUtoButton
  extends TouchableOpacityProps,
    Pick<AnimateProps<ViewProps>, 'entering' | 'exiting' | 'layout'> {
  style?: StyleProp<ViewStyle> | undefined;
  /**
   *  Has 3 base types : SOLID, OUTLINE, ONLY_TEXT
   *  And 3 sub size types: SOLID_SMALL, OUTLINE_SMALL, ONLY_TEXT_SMALL
   */
  type?: BUTTON_TYPE;

  /**
   *  Primary color of button
   */
  color?: string;

  /**
   *  Disable color of button
   */
  disableColor?: string;

  /**
   *  fullRounded: borderRadius 50%
   *  if not : borderRadius 12
   */
  fullRounded?: boolean;

  /**
   *  Text color of button
   */
  textColor?: string;

  /**
   *  Text style of button
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   *  Icon name or Icon image
   */
  icon?: number | IconName;

  /**
   *  Icon style of button
   */
  iconStyle?: StyleProp<ImageStyle> & StyleProp<TextStyle>;

  /**
   *  Icon size
   */
  iconSize?: number;
  /**
   *  Check if only use Icon
   */
  isOnlyIcon?: boolean;

  /**
   *  Animation Scale
   */
  isScaleButton?: boolean;

  /**
   *  Show loading icon
   */
  loading?: boolean;
}
