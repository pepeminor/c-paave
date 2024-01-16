import { NewsActions } from 'reduxs/News';
import { PayloadAction } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put, select } from 'redux-saga/effects';
import { query } from 'utils';
import { IGetNewsResponse, PAGE_SIZE_NEWS } from '../News.type';
import { formatDataNews } from '../News.helper';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE, LANG } from 'global';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';

export function* watchGetNewsLanguageSaga(action: PayloadAction<LANG>) {
  try {
    const isDemoAccount: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);

    if (isDemoAccount) return;

    const authToken: IAuthTokenReducer = yield select((state: IState) => state.authToken);
    if (authToken.accessToken == null || authToken.accessToken === '') {
      return;
    }

    yield put(NewsActions.clearData());

    const res: IResponse<IGetNewsResponse> = yield call(query, APIList.getNews, {
      pageNumber: 0,
      pageSize: PAGE_SIZE_NEWS,
      withPinned: true,
      lang: action.payload === LANG.VI ? 'vi' : 'en',
    });

    yield put(NewsActions.getNewsSuccess({ ...formatDataNews(res.data), isRefresh: true }));
  } catch (error) {
    // to do error
  }
}
