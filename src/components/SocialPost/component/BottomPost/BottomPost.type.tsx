// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StyleProp, ViewStyle } from 'react-native';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { TEXT_TYPE } from 'components/PaaveText/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  favouritesCount: number;
  repliesCount: number;
  reblogsCount?: number;
  isFavourited: boolean;
  postId: string;
  userName: string;
  containerStyle?: StyleProp<ViewStyle>;
  containerItemStyle?: StyleProp<ViewStyle>;
  sizeIcon?: number;
  typeText?: TEXT_TYPE;
  onPressComment?: () => void;
  showNumber?: boolean;
}

export type IProps = IInner & IOutter;
