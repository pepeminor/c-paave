import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadCreatePostRequest, IPostCoreData } from '../SocialPost.type';
import { formatSocialPostList } from '../SocialPost.helper';
import { SocialPostActions } from '../SocialPost.redux';
import { isNotNilOrEmpty } from 'ramda-adjunct';

export function* createPost(action: PayloadAction<IPayloadCreatePostRequest>) {
  try {
    const response: { data: IPostCoreData } = yield call(query, APIList.createPost, action.payload.params);
    const { postJson, arrayId } = formatSocialPostList([response.data], true);
    yield put(SocialPostActions.importDataPostJson(postJson));

    yield isNotNilOrEmpty(action.payload.params.in_reply_to_id) &&
      put(
        SocialPostActions.insertCommentToPost({
          postId: action.payload.params.in_reply_to_id!,
          dataComment: arrayId,
        })
      );
    yield action.payload.callback?.();
  } catch (err) {
    yield action.payload.callback?.(err);
  }
}
