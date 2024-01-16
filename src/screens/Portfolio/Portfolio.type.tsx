/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<ScreenNames.HomeTab> {}

export type IProps = IInner;
