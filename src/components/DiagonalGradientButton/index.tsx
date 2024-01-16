import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  onPress: () => void;
  btnText: string;
  colors: string[];
  containerStyle?: StyleProp<ViewStyle>;
  isDisable?: boolean;
};

const DiagonalGradientButton = ({ onPress, btnText, colors, containerStyle, isDisable }: ButtonProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle, isDisable && globalStyles.disableBackground]}
      disabled={isDisable}
    >
      <LinearGradient
        colors={colors}
        style={[globalStyles.centered, styles.executeFormButton]}
        angle={179}
        useAngle={true}
        angleCenter={{ x: 0.5, y: 0.5 }}
      >
        <Text allowFontScaling={false} style={styles.buttonText}>
          {t(btnText)}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(DiagonalGradientButton);
