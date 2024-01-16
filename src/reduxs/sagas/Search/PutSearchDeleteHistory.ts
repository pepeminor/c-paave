import { SEARCH_PUT_DELETE_HISTORY, SEARCH_GET_RECENT_VIEWED, NON_LOGIN_RECENT_VIEWED } from 'reduxs/actions';
import { IAction } from 'interfaces/common';
import { IDeleteRecentSearchHistoryParams } from 'interfaces/search';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { RESET, SUCCESS } from '../../action-type-utils';
import { query } from 'utils';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';

function* putSearchDeleteHistory(action: IAction<IDeleteRecentSearchHistoryParams>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: RESET(NON_LOGIN_RECENT_VIEWED),
    });
    return;
  }

  try {
    yield call(query, APIList.putDeleteUpdateHistory, { deleteType: action.payload.deleteType });
    yield put({
      type: SUCCESS(SEARCH_GET_RECENT_VIEWED),
      payload: { recentlySearches: [] },
    });
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchPutSearchDeleteHistory() {
  yield takeLeading(SEARCH_PUT_DELETE_HISTORY, putSearchDeleteHistory);
}
