import React from 'react';
import { Circle, G } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';
import withMemo from 'HOC/withMemo';

type PointWhenTouch = {
  pointSizes?: number[];
  pointColors?: string[];
  getPointColors?: (value: number, listDataIndex: number) => string;
};

export const PointWhenTouch = withMemo(
  withChartChildrenProps<PointWhenTouch>(
    ({
      x,
      y,
      data,
      positionX,
      xPosOffset = 0,
      yAccessor = d => d.item as number,
      pointSizes = [],
      pointColors = [],
      getPointColors,
    }) => {
      if (positionX < 0 || x == null || y == null || data[0]?.data?.length === 0) {
        return null;
      }
      return (
        <G x={x(positionX) + xPosOffset} key="pointWhenTouch">
          {data.map((item, index) => (
            <Circle
              cy={y(yAccessor({ item: item.data[positionX], index: index }))}
              r={pointSizes[index] ?? 5}
              stroke="#fff"
              strokeWidth={1}
              fill={
                getPointColors?.(yAccessor({ item: item.data[positionX], index: index }), index) ??
                pointColors[index] ??
                '#000'
              }
              key={`PointWhenTouch-${index}`}
            />
          ))}
        </G>
      );
    }
  )
);
