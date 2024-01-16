import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, View, ActivityIndicator } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles, { Colors } from 'styles';

import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  onPress: () => void;
  text: string;
  colorText?: string;
  backgroundButton?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  isShowLoading?: boolean;
  disabled?: boolean;
};

const BottomButton = ({
  disabled = false,
  onPress,
  text,
  colorText,
  backgroundButton,
  containerStyle,
  isShowLoading,
}: ButtonProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <View style={[globalStyles.containerBackground, styles.defaultStyle, containerStyle ? containerStyle : null]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <LinearGradient
          colors={backgroundButton ?? [Colors.BlueNewColor, Colors.BlueNewColor]}
          style={[globalStyles.centered, styles.executeFormButton]}
          angle={179}
          useAngle={true}
          angleCenter={{ x: 0.5, y: 0.5 }}
        >
          {isShowLoading ? (
            <ActivityIndicator size={'small'} color={Colors.WHITE} />
          ) : (
            <Text allowFontScaling={false} style={[styles.buttonText, colorText ? { color: colorText } : {}]}>
              {t(text)}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default memo(BottomButton);
