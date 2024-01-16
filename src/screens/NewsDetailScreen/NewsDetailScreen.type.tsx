import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

export type IProps = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps> & IOutter;

export type IOutter = {
  newsId: number;
  postId: string;
  onPressComment: ({ commentId, userName }: { commentId: string; userName: string }) => void;
};
