// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export type withOutReduxType = StackScreenProps<ScreenNames.PostDetailScreen>;

export interface IInner extends IReduxType, withOutReduxType {}

export interface IOutter {}

export type IProps = IInner & IOutter;
