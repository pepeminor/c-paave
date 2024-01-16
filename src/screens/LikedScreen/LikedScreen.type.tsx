// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StackScreenProps } from 'screens/RootNavigation';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<ScreenNames.LikedScreen> {}

export interface IOutter {}

export type IProps = IInner & IOutter;
