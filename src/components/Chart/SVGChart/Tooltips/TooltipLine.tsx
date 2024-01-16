import React from 'react';
import { FontWeight, Text as SvgText } from 'react-native-svg';
import { SVGChartData } from '../type';
import { ColorValue } from 'react-native';
import { AccessorFunction } from 'react-native-svg-charts';

type TooltipLineProps = {
  paddingLeft?: number;
  distanceFromTop?: number;
  fontSize?: number;
  fontWeight?: FontWeight;
  color?: ColorValue;
  opacity?: number;
  listData?: number | unknown[]; // number for data from chart, number[] for custom data
  formatter?: (value: unknown) => string;
  getColor?: (value: unknown) => ColorValue;
};

export const TooltipLine = React.memo(
  withTooltipChildrenProps(
    ({
      paddingLeft = 5,
      distanceFromTop = 10,
      fontSize = 12,
      fontWeight = 'bold',
      color = 'black',
      opacity = 1,
      listData = 0,
      formatter = val => val as string,
      // Extra props
      index,
      data = [],
      getColor,
      yAccessor,
    }: TooltipLineProps & ExtraTooltipLineProps) => {
      const value = (() => {
        if (typeof listData !== 'number') {
          return listData[index];
        }
        return yAccessor({ item: data[listData]?.data?.[index], index });
      })();
      return (
        <SvgText
          x={paddingLeft}
          y={distanceFromTop}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fill={getColor ? getColor(value) : color}
          opacity={opacity}
        >
          {formatter(value)}
        </SvgText>
      );
    }
  )
);

type ExtraTooltipLineProps = {
  index: number;
  data: SVGChartData<unknown>[];
  yAccessor: AccessorFunction<unknown, number>;
};

function withTooltipChildrenProps<T>(Component: React.ComponentType<T & ExtraTooltipLineProps>) {
  return (props: T) => {
    return <Component {...(props as T & ExtraTooltipLineProps)} />;
  };
}
