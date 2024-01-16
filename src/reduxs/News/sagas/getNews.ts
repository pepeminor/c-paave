import { NewsActions } from 'reduxs/News';
import { PayloadAction } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put, select } from 'redux-saga/effects';
import { query } from 'utils';
import { IGetNewsRequest, IGetNewsResponse } from '../News.type';
import { MAX_NEWS_PINNED, formatDataNews } from '../News.helper';
import { isNilOrEmpty } from 'ramda-adjunct';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE, LANG } from 'global';

export function* watchNewsSaga(action: PayloadAction<IGetNewsRequest>) {
  try {
    const isDemoAccount: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    const lang: LANG = yield select((state: IState) => state.lang);
    const isMaxNewsPinned: boolean = yield select(
      (state: IState) => state.NewsReducer.listNewsPinned.length > MAX_NEWS_PINNED
    );

    if (isDemoAccount) return;
    const res: IResponse<IGetNewsResponse> = yield call(query, APIList.getNews, {
      ...action.payload,
      withPinned: true,
      lang: lang === LANG.VI ? 'vi' : 'en',
    });
    if (isNilOrEmpty(action.payload.keyword)) {
      yield put(
        NewsActions.getNewsSuccess({
          ...formatDataNews(res.data, isMaxNewsPinned),
          isRefresh: !!action.payload.isRefresh,
        })
      );
    } else {
      yield put(
        NewsActions.getNewsSearchSuccess({ ...formatDataNews(res.data), isRefresh: !!action.payload.isRefresh })
      );
    }
    action.payload.callback?.();
  } catch (error) {
    action.payload.callback?.(error);
    // to do error
  }
}
