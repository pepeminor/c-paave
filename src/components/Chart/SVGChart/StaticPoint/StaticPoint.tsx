import React from 'react';
import { Circle, G } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';
import withMemo from 'HOC/withMemo';

type StaticPoint = {
  pointSizes?: number[];
  pointColors?: string[];
  getPointColors?: (value: number, listDataIndex: number) => string;
};

export const StaticPoint = withMemo(
  withChartChildrenProps<StaticPoint>(
    ({
      x,
      y,
      data,
      xPosOffset = 0,
      yAccessor = d => d.item as number,
      pointSizes = [],
      pointColors = [],
      getPointColors,
    }) => {
      if (x == null || y == null || data[0]?.data?.length === 0) {
        return null;
      }
      return (
        <G>
          {data.map((dataItem, dataIndex) =>
            dataItem.data.map((item, index) => (
              <G x={x(index) + xPosOffset} key={`staticPoint_${index}`}>
                <Circle
                  cy={y(yAccessor({ item: item, index: index }))}
                  r={pointSizes[index] ?? 4}
                  stroke={pointColors[dataIndex]}
                  strokeWidth={1.5}
                  fill={getPointColors?.(yAccessor({ item: item, index: index }), index) ?? '#fff'}
                  key={`StaticPoint-${index}`}
                />
              </G>
            ))
          )}
        </G>
      );
    }
  )
);
