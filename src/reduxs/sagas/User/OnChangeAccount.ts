import { put, select, takeLeading } from 'redux-saga/effects';
import { IAccount, IAction } from 'interfaces/common';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { IState } from 'reduxs/global-reducers';
import { handleCommonSagaEffect } from 'utils';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { setCurrentSymbol } from 'reduxs/SymbolData';
import { WatchListActions } from 'reduxs/WatchList';
import { ILoadingReducer } from 'interfaces/reducer';
import { ISearchRecentViewedResponse } from 'interfaces/search';

function* changeCurrentSymbolDependOnSubAccount(action: IAction<IAccount>) {
  const { type: newType, selectedSubAccount: newSubAccount, oldSelectedSubAccount: oldSubAccount } = action.payload;

  const firstFuturesCode: string | undefined = yield select(
    (state: IState) =>
      state.SymbolData.marketData.futuresList
        .filter(item => item.underlyingType === 'INDEX')
        .map(item => item.symbolCode)[0]
  );

  const recentViewed: ILoadingReducer<ISearchRecentViewedResponse | null> = yield select(
    (state: IState) => state.getRecentViewed
  );
  if (newType === ACCOUNT_TYPE.VIRTUAL && oldSubAccount?.accountSubs[0].type === SYSTEM_TYPE.EQUITY) {
    return;
  }

  if (newSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES && firstFuturesCode != null) {
    yield put(setCurrentSymbol(firstFuturesCode!, false));
    return;
  }

  if (oldSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES) {
    if (recentViewed?.data?.recentlySearches?.length! > 0) {
      yield put(setCurrentSymbol(recentViewed.data?.recentlySearches?.[0].code!, false));
    } else {
      yield put(setCurrentSymbol('AAA', false));
    }
  }
}

function* onChangeAccount(action: IAction<IAccount>) {
  try {
    if (
      action.payload.type !== ACCOUNT_TYPE.DEMO &&
      (action.differentParams == null || action.differentParams.notSetCurrentSymbol === false)
    ) {
      yield changeCurrentSymbolDependOnSubAccount(action);
    }

    const { type, oldType = type } = action.payload;
    const newWatchListId: number = yield select(
      (state: IState) => state.userBasedReducer.data.favoriteWatchlist?.[type] ?? -1
    );
    yield put(
      WatchListActions.onChangeAccount({
        oldType,
        newType: type,
        newWatchListId,
      })
    );
    handleCommonSagaEffect(action);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fail to reset watchList after changing account', e);
  }
}

export default function* watchOnChangeAccount() {
  yield takeLeading(SELECTED_ACCOUNT, onChangeAccount);
}
