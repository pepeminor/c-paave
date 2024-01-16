import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';

type VerticalAxisProps = {
  tickLength?: number;
  gridColor?: string;
};

export const VerticalAxis = React.memo(
  withChartChildrenProps<VerticalAxisProps, number>(({ tickLength = 2, gridColor = '#EEF3F6' }) => (
    <Defs>
      <LinearGradient id={'gradient2'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={gridColor} stopOpacity={1} />
        <Stop offset={`${100 - tickLength}%`} stopColor={gridColor} stopOpacity={1} />
        <Stop offset={`${100 - tickLength}%`} stopColor={'#000000'} stopOpacity={1} />
        <Stop offset={'100%'} stopColor={'#000000'} stopOpacity={1} />
      </LinearGradient>
    </Defs>
  ))
);
