import { ILoadMoreWatchlistSymbol } from 'interfaces/favorite';
import { DISCOVER_WATCHLIST_ENTER_SCREEN, DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterScreen = generateAction(DISCOVER_WATCHLIST_ENTER_SCREEN);

export const onLoadMoreWatchlistSymbol = generateAction<ILoadMoreWatchlistSymbol>(
  DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION
);
