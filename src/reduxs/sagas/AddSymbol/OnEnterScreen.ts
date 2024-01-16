import { put, select, takeLeading } from 'redux-saga/effects';
import { ADD_SYMBOL_ENTER_SCREEN } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { WatchListActions } from 'reduxs/WatchList';

function* handleOnEnterScreen() {
  const currentSymbolCode: string = yield select((state: IState) => state.SymbolData.currentSymbolCode);
  yield put(WatchListActions.getSymbolIncludeWatchList({ code: currentSymbolCode }));
}

export default function* watchOnEnterScreen() {
  yield takeLeading(ADD_SYMBOL_ENTER_SCREEN, handleOnEnterScreen);
}
