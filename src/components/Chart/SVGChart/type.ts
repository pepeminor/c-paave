import { AccessorFunction } from 'react-native-svg-charts';

export type SVGChartData<T = unknown> = {
  data: T[];
  svg?: {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
  };
};

export type SVGChartItem<T = number> = {
  data: T;
  svg?: {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
  };
};

export type ChartContentInset = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export interface SVGChartChildrenProps<DataType = unknown, TickType = number> {
  x: (t: TickType) => number;
  y: (t: TickType) => number;
  width: number;
  height: number;
  data: SVGChartData<DataType>[];
  ticks: TickType[];
  positionX: number;
  contentInset: ChartContentInset;
  yAccessor?: AccessorFunction<DataType, number>;
  xPosOffset?: number;
}
