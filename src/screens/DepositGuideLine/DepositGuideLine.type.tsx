/* eslint-disable @typescript-eslint/no-empty-interface */
import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<ScreenNames.DepositGuideLine> {}

export type IProps = IInner;
