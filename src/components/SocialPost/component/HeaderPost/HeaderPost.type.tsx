// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ViewStyle } from 'react-native';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  avatar: string;
  displayName: string;
  userName: string;
  createdAt: string;
  onChangeContent: (lang: string) => void;
  postId: string;
  containerStyle?: ViewStyle;
  containerImage?: ViewStyle;
  isComment?: boolean;
  postParentId?: string;
}

export type IProps = IInner & IOutter;
