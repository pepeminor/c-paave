import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { IconWithBackground } from 'components/Icon';

interface ICheckBoxProps extends React.ComponentProps<typeof TouchableOpacity> {
  readonly label?: string;
  readonly value: boolean;
  readonly textStyles?: StyleProp<TextStyle>;
  handleOnPress?: () => void;
  disabled?: boolean;
  size?: number;
}

const CheckBox = ({
  label,
  value,
  textStyles,
  disabled = false,
  children,
  style: customizeContainerStyle,
  size = 24,
  handleOnPress,
  ...touchableProps
}: ICheckBoxProps) => {
  const { styles, dynamicColors } = useStyles();

  const containerStyle = useMemo(
    () => [globalStyles.flexDirectionRow, customizeContainerStyle],
    [customizeContainerStyle]
  );
  const labelStyle = useMemo(() => [styles.labelText, textStyles], [textStyles]);
  const checkboxContainerStyle = useMemo(
    () => [
      styles.checkboxContainer,
      { width: scaleSize(size), height: scaleSize(size), borderRadius: scaleSize(size / 4) },
    ],
    [size]
  );

  return (
    <TouchableOpacity onPress={handleOnPress} style={containerStyle} {...touchableProps} disabled={disabled}>
      {value ? (
        <IconWithBackground
          size={size * 0.8}
          iconColor={dynamicColors.WHITE}
          backgroundColor={dynamicColors.BlueNewColor}
          containerStyle={{
            width: scaleSize(size),
            height: scaleSize(size),
            borderRadius: scaleSize(size / 4),
          }}
          name={'check'}
        />
      ) : (
        <View style={checkboxContainerStyle} />
      )}

      <View style={styles.label}>
        {children != null
          ? children
          : label != null && (
              <Text allowFontScaling={false} style={labelStyle} suppressHighlighting={false}>
                {label}
              </Text>
            )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CheckBox);
