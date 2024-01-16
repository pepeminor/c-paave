import { getStylesHook } from 'hooks/useStyles';
import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { lightColors } from 'styles';
import withMemo from 'HOC/withMemo';
import { IconName } from '../type';
import Icon from './Icon';
import { isNil } from 'ramda';

interface IProps {
  name: IconName;
  size?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  onPress?: () => void;
}
const IconWithBackground = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const {
    iconColor = dynamicColors.BaliHai,
    size: iconSize = 16,
    name: nameIcon,
    containerStyle,
    backgroundColor = dynamicColors.WHITE,
    onPress,
  } = props;
  const finalStyle = useMemo(
    () => [styles.container, containerStyle, { backgroundColor: backgroundColor }],
    [containerStyle, backgroundColor]
  );
  return (
    <TouchableOpacity style={finalStyle} onPress={onPress} disabled={isNil(onPress)}>
      <Icon color={iconColor} name={nameIcon} size={iconSize} />
    </TouchableOpacity>
  );
};
const useStyles = getStylesHook({
  container: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: lightColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default withMemo(IconWithBackground);
