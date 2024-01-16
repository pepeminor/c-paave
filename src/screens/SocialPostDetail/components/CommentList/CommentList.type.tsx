// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  commentId: string;
  onPressComment: (data: { commentId: string; userName: string }) => void;
  postId: string;
}

export type IProps = IInner & IOutter;
