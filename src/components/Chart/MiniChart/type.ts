import { ViewStyle, StyleProp } from 'react-native';

export type IChartProps = {
  readonly reload?: boolean;
  readonly symbolCode: string;
  readonly resolution?: string;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly chartStyle?: {
    readonly height?: number; // default 300
    readonly width?: number;
    readonly padding?: // default 10
    | {
          readonly top?: number;
          readonly bottom?: number;
          readonly left?: number;
          readonly right?: number;
        }
      | number;
  };
  readonly placeHolderStyle?: {
    readonly height?: number; // default 300
    readonly width?: number;
    readonly padding?: // default 10
    | {
          readonly top?: number;
          readonly bottom?: number;
          readonly left?: number;
          readonly right?: number;
        }
      | number;
  };
  readonly chartConfig?: {
    readonly hideXAxis?: boolean;
    readonly hideYAxis?: boolean;
    readonly data?: any[];
  };
  readonly ignoreLunchTime?: boolean;
  // readonly noRealTimeAxisX?: boolean;
};

export interface Wrapper<V> {
  v?: V;
}
