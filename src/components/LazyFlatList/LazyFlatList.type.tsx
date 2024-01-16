/* eslint-disable @typescript-eslint/no-empty-interface */
import { FlatListProps } from 'react-native';

export interface IProps extends FlatListProps<any> {
  limit?: number;
  lazy?: boolean;
}
