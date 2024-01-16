import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { alertMessage, insertObjectIf, query } from 'utils';
import APIList from 'config/api';
import { IPostCoreData, SocialPostActions } from 'reduxs/SocialPost';
import { editPost } from '../SocialNewPost.action';
import { ExtraData, EditPostParams, PickedImage } from '../SocialNewPost.type';
import { ToolkitAction } from 'interfaces/common';
import { IState } from 'reduxs/global-reducers';
import { formatSocialPostList } from 'reduxs/SocialPost/SocialPost.helper';
import { uploadImage } from '../SocialNewPost.helpers';
import { isNotNilOrEmpty } from 'ramda-adjunct';

function* doEditPost(action: ToolkitAction<EditPostParams>) {
  try {
    const extraData: ExtraData = yield select((state: IState) => state.SocialNewPost.extraData);
    const images: PickedImage[] | undefined = yield select((state: IState) => state.SocialNewPost.images);
    let mediaIds: string[] | undefined = undefined;
    if (extraData === 'image' && images != null) {
      const uploadResult: string[] = yield all(
        images.map(async image => {
          if (image.id != null) return image.id;
          if (image.fileName == null || image.uri == null || image.type == null) return null;
          const response = await uploadImage(image.fileName, image.uri, image.type);
          if (response?.id != null) {
            try {
              query(APIList.editMedia, {
                id: response.id,
                description: image.description,
              });
            } finally {
              //
            }
          }
          return response?.id;
        })
      );
      if (uploadResult.length > 0) mediaIds = uploadResult.filter(id => id != null) as string[];
    }
    const response: { data: IPostCoreData } = yield call(query, APIList.editPost, {
      ...action.payload,
      ...insertObjectIf(mediaIds != null, { media_ids: mediaIds }),
    });

    if (response.data) {
      if (isNotNilOrEmpty(response.data.in_reply_to_id)) {
        alertMessage('success', 'edit_comment_success');
      } else {
        alertMessage('success', 'new_post_screen.edit_post_success');
      }
      const { postJson } = formatSocialPostList([response.data]);
      yield put(SocialPostActions.importDataPostJson(postJson));
      yield action.meta.callBack?.handleSuccess?.();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error in editPost', err);
    yield action.meta.callBack?.handleFail?.();
    if (action.payload.isComment) {
      alertMessage('danger', 'edit_comment_failed');
    } else {
      alertMessage('danger', 'new_post_screen.edit_post_fail');
    }
  }
}

export function* watchEditPost() {
  yield takeLatest(editPost.type, doEditPost);
}
