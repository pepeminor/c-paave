// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ISocialPostItem } from 'reduxs';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  postId: string;
  dataPoll: ISocialPostItem['poll'];
}

export type IProps = IInner & IOutter;
