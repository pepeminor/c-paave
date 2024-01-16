// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { IVideoItem, VideoTab } from 'reduxs';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { ListRenderItemInfo } from 'react-native';

export type IProps = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export type VideoTabConfig = {
  [key in VideoTab]: {
    renderItem: ({ item }: ListRenderItemInfo<IVideoItem>) => JSX.Element;
    data: IVideoItem[];
  };
};
