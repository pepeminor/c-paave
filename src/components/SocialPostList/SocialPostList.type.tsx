import { FlashListProps } from '@shopify/flash-list';
import { IListId } from 'reduxs';

export type IProps = Omit<FlashListProps<IListId>, 'renderItem'> & {
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};
