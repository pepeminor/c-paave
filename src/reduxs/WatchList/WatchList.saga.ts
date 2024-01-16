import { WatchListActions } from './WatchList.redux';
import {
  initWatchList,
  onAddSymbolsMultiSymbols,
  onAddSymbol,
  changeSelectedWatchList,
  onCreateNew,
  onDelete,
  onDeleteSymbol,
  onDeleteSymbolMultiKis,
  onModify,
  onGetSymbolIncludeWatchlist,
} from './sagas';
import OnDeleteSymbolMulti from './sagas/OnDeleteSymbolMulti';
import { takeLeading } from 'redux-saga/effects';

export function* WatchListSagas() {
  yield takeLeading(WatchListActions.getSymbolIncludeWatchList.type, onGetSymbolIncludeWatchlist);
  yield takeLeading(WatchListActions.onModifyWatchList.type, onModify);
  yield takeLeading(WatchListActions.onDeleteSymbolMultiKIS.type, onDeleteSymbolMultiKis);
  yield takeLeading(WatchListActions.onDeleteSymbol.type, onDeleteSymbol);
  yield takeLeading(WatchListActions.onDeleteWatchList.type, onDelete);
  yield takeLeading(WatchListActions.onCreateWatchList.type, onCreateNew);
  yield takeLeading(WatchListActions.onChangeSelectedWatchList.type, changeSelectedWatchList);
  yield takeLeading(WatchListActions.onAddSymbol.type, onAddSymbol);
  yield takeLeading(WatchListActions.onAddMultiSymbols.type, onAddSymbolsMultiSymbols);
  yield takeLeading(WatchListActions.initWatchList.type, initWatchList);
  yield OnDeleteSymbolMulti();
}
