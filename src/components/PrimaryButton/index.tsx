import React, { memo } from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors, scaleSize } from 'styles';
import globalStyles from 'styles';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import { getStylesHook } from 'hooks/useStyles';

interface ButtonProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentBtnStyle?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  loading?: boolean;
  numberOfLines?: number;
  svg?: React.FC<SvgProps>;
  disabled?: boolean;

  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const PrimaryButton = ({
  onPress,
  title,
  svg: Svg,
  containerStyle = {},
  contentBtnStyle = {},
  styleText = {},
  numberOfLines = 1,
  disabled = false,
}: ButtonProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.flexDirectionRow,
        globalStyles.centered,
        styles.container,
        containerStyle,
        disabled && globalStyles.disableBackground,
      ]}
      disabled={disabled}
    >
      {Svg != null ? <Svg height={scaleSize(24)} width={scaleSize(24)} /> : null}
      <View style={[globalStyles.centered, contentBtnStyle]}>
        <Text allowFontScaling={false} numberOfLines={numberOfLines} style={[styles.textBtn, styleText]}>
          {t(title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = getStylesHook({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.DARK_GREEN,
  },
  textBtn: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});

export default memo(PrimaryButton);
