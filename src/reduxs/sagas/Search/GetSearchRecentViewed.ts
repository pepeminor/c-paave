import { SEARCH_GET_RECENT_VIEWED } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IRecentlySearches } from 'interfaces/search';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { query } from 'utils';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';

function* getSearchRecentViewed(action: IAction<null>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: action.response?.success,
      hideLoading: true,
    });
    return;
  }

  try {
    const response: IResponse<IRecentlySearches[]> = yield call(query, APIList.getSearchRecentViewed, action.payload);
    yield put({
      type: action.response?.success,
      payload: response.data,
      hideLoading: true,
    });
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGetSearchRecentViewed() {
  yield takeLeading(SEARCH_GET_RECENT_VIEWED, getSearchRecentViewed);
}
