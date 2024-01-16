import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { withChartChildrenProps } from '../withChartChildrenProps';

type HorizontalAxisProps = {
  tickLength?: number;
  gridColor?: string;
};

export const HorizontalAxis = React.memo(
  withChartChildrenProps<HorizontalAxisProps, number>(({ tickLength = 1, gridColor = '#EEF3F6' }) => (
    <Defs>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#000000'} stopOpacity={1} />
        <Stop offset={`${tickLength}%`} stopColor={'#000000'} stopOpacity={1} />
        <Stop offset={`${tickLength}%`} stopColor={gridColor} stopOpacity={1} />
        <Stop offset={'100%'} stopColor={gridColor} stopOpacity={1} />
      </LinearGradient>
    </Defs>
  ))
);
