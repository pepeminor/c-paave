import { call, put, select } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadGetSocialPostListRequest, IPostCoreData } from '../SocialPost.type';
import { formatSocialPostList } from '../SocialPost.helper';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

export function* getNewsFeed(action: PayloadAction<IPayloadGetSocialPostListRequest>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const response: { data: IPostCoreData[] } = yield call(query, APIList.getNewsFeed, {
      ...action.payload.params,
      t: new Date().toISOString(),
    });
    const { postJson, arrayId, originalList } = formatSocialPostList(response.data);
    yield put(SocialPostActions.importDataPostJson(postJson));
    yield put(
      SocialPostActions.getSocialPostListSuccess({
        originalList,
        data: arrayId,
        isRefresh: !!action.payload.params.isRefresh,
      })
    );
  } catch (err) {
    yield action.payload.callback?.(err);
    yield put(SocialPostActions.getSocialPostListFailure());
  }
}
