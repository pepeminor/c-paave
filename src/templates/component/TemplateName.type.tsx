// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {
  userName: number;
}

export interface IOutter {
  templeProps: string;
}

export type IProps = IInner & IOutter;
