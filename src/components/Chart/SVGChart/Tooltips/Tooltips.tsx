import React, { PropsWithChildren } from 'react';
import { G, Rect } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';
import { scaleSize } from 'styles';
import { ColorValue } from 'react-native';

type TooltipProps = {
  tooltipWidth: number;
  tooltipHeight: number;
  borderRadius?: number;
  borderColor?: ColorValue;
  backgroundColor?: ColorValue;
};

export const Tooltip = React.memo(
  withChartChildrenProps<PropsWithChildren<TooltipProps>>(
    ({
      x,
      data,
      positionX,
      tooltipWidth,
      tooltipHeight,
      borderRadius = 10,
      borderColor = 'black',
      backgroundColor = 'white',
      children,
      yAccessor = d => d.item as number,
    }) => {
      const chartData = data[0].data;
      if (positionX < 0 || (x == null && data.length === 0)) {
        return null;
      }
      return (
        <G
          x={positionX < chartData.length / 2 ? x(chartData.length - 1) - tooltipWidth : x(0) + 2}
          y={scaleSize(tooltipHeight) / 2 + 2}
          key="tooltip"
        >
          <Rect
            y={-scaleSize(tooltipHeight) / 2}
            rx={scaleSize(borderRadius)}
            ry={scaleSize(borderRadius)}
            width={scaleSize(tooltipWidth)}
            height={scaleSize(tooltipHeight)}
            stroke={borderColor}
            fill={backgroundColor}
          />

          {React.Children.map(children, child => {
            if (child && typeof child !== 'string' && typeof child !== 'number' && typeof child !== 'boolean') {
              return React.cloneElement(child as React.ReactElement, {
                index: positionX,
                data: data,
                yAccessor,
              });
            }
            return null;
          })}
        </G>
      );
    }
  )
);
