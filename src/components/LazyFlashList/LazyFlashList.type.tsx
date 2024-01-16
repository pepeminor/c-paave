/* eslint-disable @typescript-eslint/no-empty-interface */
import { FlashListProps } from '@shopify/flash-list';

export interface IProps extends FlashListProps<any> {
  limit?: number;
  lazy?: boolean;
}
