import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles, { GradientColors } from 'styles';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  onPress: () => void;
  btnText: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const YellowButton = ({ onPress, btnText, containerStyle }: ButtonProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <LinearGradient
        colors={GradientColors.GradientYellow}
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

export default memo(YellowButton);
