import { call, put, takeLatest } from 'redux-saga/effects';
import { alertMessage, query } from 'utils';
import APIList from 'config/api';
import { IPostCoreData, SocialPostActions } from 'reduxs/SocialPost';
import { deletePost } from '../SocialNewPost.action';
import { DeletePostParams } from '../SocialNewPost.type';
import { ToolkitAction } from 'interfaces/common';

function* doDeletePost(action: ToolkitAction<DeletePostParams>) {
  try {
    const response: { data: IPostCoreData } = yield call(query, APIList.deletePost, action.payload.params);
    if (response.data) {
      if (action.payload.postParentId) {
        alertMessage('success', 'delete_comment_success');
      } else {
        alertMessage('success', 'new_post_screen.delete_post_success');
      }
      yield put(
        SocialPostActions.deletePostSuccess({
          postId: action.payload.params.statusID,
          postParentId: action.payload.postParentId,
        })
      );
      yield action.meta.callBack?.handleSuccess?.();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in deletePost', err);
    yield action.meta.callBack?.handleFail?.();
    if (action.payload.postParentId) {
      alertMessage('danger', 'delete_comment_failed');
    } else {
      alertMessage('danger', 'new_post_screen.delete_post_fail');
    }
  }
}

export function* watchDeletePost() {
  yield takeLatest(deletePost.type, doDeletePost);
}
