import { call, put, select } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPostCoreData } from '../SocialPost.type';
import { formatSocialPostList } from '../SocialPost.helper';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

export function* getPostDetail(action: PayloadAction<{ postId: string }>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const response: { data: IPostCoreData } = yield call(query, APIList.getPostDetail, {
      ...action.payload,
      t: new Date().toISOString(),
    });
    if (response?.data?.error) throw response.data.error;
    const { postJson } = formatSocialPostList([response.data]);
    yield put(SocialPostActions.importDataPostJson(postJson));
  } catch (error) {
    // yield put(SocialPostActions.getPostDetailFailure(err));
  }
}
