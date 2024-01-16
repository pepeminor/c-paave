/* eslint-disable @typescript-eslint/no-empty-interface */
import { ChartStyle } from 'constants/enum';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  chartStyle: ChartStyle;
  onChangeEnableScroll?: (enable: boolean) => void;
  notOnEnterScreen?: boolean;
}

export type IProps = IInner & IOutter;
