import { IGetAllSymbolFavoriteResponse, IGetAllWatchlistResponse } from 'interfaces/favorite';
import { ILoadingReducer } from 'interfaces/reducer';

export interface ISelectedWatchlistSymbolList extends ILoadingReducer<IGetAllSymbolFavoriteResponse[]> {
  hasMore: boolean;
  hasMoreLoading: boolean;
}

export interface IWatchListModule {
  watchListList: ILoadingReducer<IGetAllWatchlistResponse[] | undefined>;
  watchlistIncludeItem: ILoadingReducer<number[]>;
  isShowWatchListModal: boolean;
  isShowAddWatchListModal: boolean;
  selectedWatchList?: IGetAllWatchlistResponse;
  selectedWatchlistSymbolList: ISelectedWatchlistSymbolList;
}
