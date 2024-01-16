import { NON_LOGIN_RECENT_VIEWED, SEARCH_PUT_UPDATE_HISTORY } from 'reduxs/actions';
import { IAction } from 'interfaces/common';
import { IUpdateHistorySearchParams } from 'interfaces/search';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { ISearchRecentViewedResponse } from '../../../interfaces/search';
import { IState } from '../../global-reducers/index';
import { SUCCESS } from '../../action-type-utils';
import { SEARCH_GET_RECENT_VIEWED } from '../../actions';
import { query } from 'utils';
import { ACCOUNT_TYPE } from 'global';

function* putUpdateHistory(action: IAction<IUpdateHistorySearchParams>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: NON_LOGIN_RECENT_VIEWED,
      payload: action.payload.code,
    });
    return;
  }

  try {
    yield call(query, APIList.putSearchUpdateHistory, action.payload);
    const recentView: ISearchRecentViewedResponse = yield select((state: IState) => state.getRecentViewed.data);
    if (recentView != null) {
      const updateSymbolIndex = recentView.recentlySearches.findIndex(x => x.code === action.payload.code);
      // symbol index === 0 => do nothing
      if (updateSymbolIndex > 0) {
        // symbol exist => remove exist => update rank => add symbol at first
        recentView.recentlySearches.splice(updateSymbolIndex, 1);
        recentView.recentlySearches.forEach((x, index) => (x.rank = index + 2));
        recentView.recentlySearches.unshift({ code: action.payload.code, rank: 1 });
        yield put({
          type: SUCCESS(SEARCH_GET_RECENT_VIEWED),
          payload: recentView,
        });
      } else if (updateSymbolIndex === -1) {
        // symbol not exist
        if (recentView.recentlySearches.length === 10) {
          // length === 10 => remove last one => update rank => add symbol at first
          recentView.recentlySearches.pop();
          recentView.recentlySearches.forEach((x, index) => (x.rank = index + 2));
          recentView.recentlySearches.unshift({ code: action.payload.code, rank: 1 });
          yield put({
            type: SUCCESS(SEARCH_GET_RECENT_VIEWED),
            payload: recentView,
          });
        } else {
          // length < 10 => update rank => add symbol at first
          recentView.recentlySearches.forEach((x, index) => (x.rank = index + 2));
          recentView.recentlySearches.unshift({ code: action.payload.code, rank: 1 });
          yield put({
            type: SUCCESS(SEARCH_GET_RECENT_VIEWED),
            payload: recentView,
          });
        }
      }
    }
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchPutUpdateHistory() {
  yield takeLeading(SEARCH_PUT_UPDATE_HISTORY, putUpdateHistory);
}
