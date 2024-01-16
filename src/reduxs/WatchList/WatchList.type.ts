import { IGetAllSymbolFavoriteResponse, IGetAllWatchlistResponse } from 'interfaces/favorite';
import { ILoadingReducer } from 'interfaces/reducer';
import { listType } from 'screens/DiscoverWatchlist/components/WatchListType/WatchListType.logic';

export interface ISelectedWatchlistSymbolList extends ILoadingReducer<IGetAllSymbolFavoriteResponse[]> {
  hasMore: boolean;
  hasMoreLoading: boolean;
}

export interface IRemoveSymbol {
  watchListId: number[];
  code: string[];
  success: boolean;
}

export interface IWatchListModule {
  watchListList: ILoadingReducer<IGetAllWatchlistResponse[]>;
  watchlistIncludeItem: ILoadingReducer<number[]>;
  selectedWatchList: IGetAllWatchlistResponse;
  selectedWatchlistSymbolList: ISelectedWatchlistSymbolList;

  watchListNonLogin: {
    index: number;
    name: string;
    stocks: string[];
  };
  watchListType: (typeof listType)[0];

  isAddingSymbol: boolean;
}
