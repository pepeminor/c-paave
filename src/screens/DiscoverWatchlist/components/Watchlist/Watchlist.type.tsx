/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  showButtonAddSymbols?: boolean;
  showEmptySymbol?: boolean;
  numberRenderItem?: number;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface ILoadMoreParams extends IPagination {
  ignoreHasMore?: boolean;
}

export type IProps = IInner & IOutter;
