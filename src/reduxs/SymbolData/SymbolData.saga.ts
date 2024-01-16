import watchGetLatestOnAppActive from './sagas/GetLatestOnAppActive.saga';
import watchGetQuoteList from './sagas/GetQuoteList.saga';
import watchGetSymbolLatest from './sagas/GetSymbolLatest.saga';
import watchSetCurrentSymbol from './sagas/SetCurrentSymbol.saga';
import watchGetCurrentSymbolStatistic from './sagas/GetSymbolStatistic.saga';
import watchRefreshSubscribedSymbols from './sagas/RefreshSubscribeSymbols.saga';

export {
  watchGetSymbolLatest,
  watchGetQuoteList,
  watchSetCurrentSymbol,
  watchGetLatestOnAppActive,
  watchGetCurrentSymbolStatistic,
  watchRefreshSubscribedSymbols,
};
