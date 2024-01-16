import { ReactElement } from 'react';
import { IActionCallBack } from './common';
export interface IDevices {
  readonly deviceId: number;
  readonly deviceName: string;
  readonly isThisDevice: boolean;
  readonly icon: ReactElement;
  readonly time: string;
  readonly isLogin: boolean;
}

export interface ICreateWatchlistParams {
  readonly watchListName: string;
}

export interface ICreateWatchlistResponse {
  readonly message: string;
  readonly watchListId: number;
}

export interface IModifyWatchlistParams {
  readonly watchListId: number;
  readonly watchListName: string;
}

export interface IModifyWatchlistResponse {
  readonly message: string;
  readonly watchListId: number;
}

export interface IDeleteWatchlistParams {
  readonly watchListId: number;
}

export interface IDeleteWatchlistResponse {
  readonly message: string;
  readonly watchListId: number;
}

export interface IAddSymbolParams {
  readonly code: string[];
  readonly watchListId: number[];
  callback?: IActionCallBack;
}

export interface IAddSymbolResponse {
  readonly message: string;
  readonly watchListId: number[];
  readonly code: string[];
}

export interface IDeleteSymbolParams {
  readonly code: string;
  readonly watchListIds: number[];
  callback?: IActionCallBack;
}

export interface IDeleteSymbolResponse {
  readonly message: string;
  readonly watchListIds: number[];
  readonly nameWatchListFail: string[];
  readonly code: string;
}

export interface IGetAllSymbolFavoriteParams extends IGetAllSymbolFavoritePaginationParams {
  readonly watchListId: number;
}

export interface IGetAllSymbolFavoritePaginationParams {
  readonly pageNumber?: number;
  readonly pageSize?: number;
}

export interface IGetAllSymbolFavoriteResponse {
  readonly code: string;
  readonly name: string;
}

export interface IGetAllWatchlistResponse {
  readonly watchListId: number;
  readonly watchListName: string;
  numberOfStocks: number;
}

export interface IDeleteUncheckWatchlistParams {
  readonly code: string;
  readonly currentWatchlistId: number[];
}

export interface IInitWatchListParams {
  readonly screenId: string;
  readonly refresh?: boolean;
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly watchListListOnly?: boolean;
}

export interface IChangeSelectedWatchListParams {
  readonly selectedWatchList: IGetAllWatchlistResponse;
  readonly getAllSymbolFavorite?: IGetAllSymbolFavoritePaginationParams;
}

export interface IGetSymbolIncludeWatchlistParams {
  readonly code: string;
  callback?: IActionCallBack;
}

export interface ILoadMoreWatchlistSymbol {
  pageNumber: number;
  pageSize: number;
  ignoreHasMore?: boolean;
}

// KIS

export interface IKisWatchListResponse {
  id: number;
  name: string;
  count: number;
  order: number;
  itemList: IKisSymbol[];
  maxCount: number;
}

export interface IKisSymbol {
  data: string;
  isNote: boolean;
}

export interface IKisEditFavoriteParams {
  items: IKisEditFavoriteItem[];
}

export interface IKisEditFavoriteItem {
  id: number;
  name: string;
}

export interface IKisAddSymbolsFavoriteParams {
  items: IKisWatchListDetail[];
}

export interface IKisWatchListDetail {
  id: number;
  itemList: IKisSymbol[];
}

export interface IKisDeleteWatchListParams {
  items: number[];
}
