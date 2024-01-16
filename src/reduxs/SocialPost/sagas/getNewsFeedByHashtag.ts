import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { IPostCoreData, SearchStatusByHashtagParams } from '../SocialPost.type';
import { formatSocialPostList } from '../SocialPost.helper';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
import { ToolkitAction } from 'interfaces/common';

function* doGetNewsFeed(action: ToolkitAction<SearchStatusByHashtagParams>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const response: { data: IPostCoreData[] } = yield call(query, APIList.getNewsFeedByHashtag, {
      ...action.payload,
      t: new Date().toISOString(),
    });
    const { postJson, arrayId } = formatSocialPostList(response.data);
    yield put(SocialPostActions.importDataPostJson(postJson));
    yield action.meta.callBack?.handleSuccess?.(arrayId);
  } catch (err) {
    yield action.meta.callBack?.handleFail?.();
  }
}

export function* getNewsFeedByHashtag() {
  yield takeLatest(SocialPostActions.getNewsFeedByHashtag.type, doGetNewsFeed);
}
