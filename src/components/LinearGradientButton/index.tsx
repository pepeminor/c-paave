import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { GradientColors } from 'styles';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface LinearGradientButtonProps {
  children: React.ReactNode;
  linearGradientStyle?: StyleProp<ViewStyle>;
  linearGradientColors?: string[];
  touchableOpacityProps?: TouchableOpacityProps;
  linearGradientProps?: LinearGradientProps;
}

const LinearGradientButton = ({ children, touchableOpacityProps, linearGradientProps }: LinearGradientButtonProps) => {
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <LinearGradient colors={GradientColors.GradientYellow2} {...linearGradientProps}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearGradientButton;
