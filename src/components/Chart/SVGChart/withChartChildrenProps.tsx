import React from 'react';
import { SVGChartChildrenProps } from './type';

export function withChartChildrenProps<T, K = unknown>(Component: React.ComponentType<T & SVGChartChildrenProps<K>>) {
  return (props: T) => {
    return <Component {...(props as T & SVGChartChildrenProps<K>)} />;
  };
}
