import { ComponentType } from 'react';
import { FlatList, FlatListProps, ScrollView, ViewProps } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

export type RowComponentProps<T> = {
  data: T;
  index: number;
  frozenStyle?: StyleProps;
};

export type HeaderComponentProps = {
  frozenStyle?: StyleProps;
};

export interface HeaderCellProps extends ViewProps {
  content: string | React.ReactNode | (() => React.ReactNode);
  width: number;
  frozen?: boolean;
}

export interface HeaderConfig {
  data: (HeaderCellProps | HeaderCellProps[])[];
  height: number;
}

export interface SheetDataProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  HeaderComponent?: ComponentType<HeaderComponentProps>;
  RowComponent: ComponentType<RowComponentProps<T>>;
  columnWidth?: number;
  horizontalScroll?: boolean;
  useFlatList?: boolean;
  scrollViewRef?: React.RefObject<ScrollView>;
  flatListRef?: React.RefObject<FlatList<T>>;
}
