// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StackScreenProps } from 'screens/RootNavigation';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<'SocialScreen'> {}

export interface IOutter {}

export type IProps = IInner & IOutter;
