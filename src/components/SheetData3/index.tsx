import React, { memo } from 'react';
import {
  FlatListNoHorizontalScroll,
  FlatListWithHorizontalScroll,
  ScrollViewNoHorizontalScroll,
  SheetDataWithHorizontalScroll,
} from './components';
import { SheetDataProps } from './type';

function SheetData<T>({ horizontalScroll = false, useFlatList = false, ...props }: SheetDataProps<T>) {
  const Component = horizontalScroll
    ? useFlatList
      ? FlatListWithHorizontalScroll
      : SheetDataWithHorizontalScroll
    : useFlatList
    ? FlatListNoHorizontalScroll
    : ScrollViewNoHorizontalScroll;

  return <Component {...props} />;
}

export default memo(SheetData) as typeof SheetData;

export * from './type';
