import React, { memo } from 'react';
import { Circle, Svg, Text } from 'react-native-svg';
import { lightColors as Colors, textStyles } from 'styles';

export interface ScoreCircleProps {
  size: number;
  strokeWidth: number;
  point?: number;
  text?: string;
  color: string;
}

const middleTextStyle = {
  ...textStyles.fontSize16,
  ...textStyles.dinOt500,
};

const ScoreCircle = ({ size, strokeWidth, text, point = 0, color }: ScoreCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius - 1}
        fill="none"
        stroke={Colors.LIGHTBackground}
        strokeWidth={strokeWidth}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius - 1}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={[circumference, circumference]}
        strokeDashoffset={circumference * (1 - point)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <Text
        fill="black"
        fontSize={middleTextStyle.fontSize}
        fontFamily={middleTextStyle.fontFamily}
        x={size / 2}
        y={size / 2 + middleTextStyle.lineHeight / 4}
        textAnchor="middle"
      >
        {text}
      </Text>
    </Svg>
  );
};

export default memo(ScoreCircle);
