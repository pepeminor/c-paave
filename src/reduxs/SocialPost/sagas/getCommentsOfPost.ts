import { call, put } from 'redux-saga/effects';
import { alertMessage, query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGetCommentsPostResponse, IPayloadGetSocialCommentsPostListRequest } from '../SocialPost.type';
import { formatSocialPostList } from '../SocialPost.helper';
import { SocialPostActions } from '../SocialPost.redux';

export function* getCommentsOfPost(action: PayloadAction<IPayloadGetSocialCommentsPostListRequest>) {
  try {
    const response: IGetCommentsPostResponse = yield call(query, APIList.getCommentsOfPost, {
      postId: action.payload.postId,
      t: new Date().toISOString(),
    });
    if (response?.data?.error) throw response.data.error;
    const { postJson, arrayId } = formatSocialPostList(response.data.descendants, true);

    yield put(SocialPostActions.importDataPostJson(postJson));
    yield put(SocialPostActions.getCommentsOfPostSuccess({ data: arrayId, postId: action.payload.postId }));
    yield action.payload.callback?.();
  } catch (error) {
    // yield put(SocialPostActions.getPostDetailFailure(err));
    if (typeof error === 'string' && error === 'Record not found') {
      alertMessage('danger', 'social.record_not_found');
    }
  }
}
