// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StyleProp, ViewStyle } from 'react-native';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  containerStyle?: StyleProp<ViewStyle>;
  disablePress?: boolean;
  postId: string;
  indexAnimation: number;
  onPressComment?: (commentId: { commentId: string; userName: string }) => void;
  showLabelBottom?: boolean;
}

export type IProps = IInner & IOutter;
