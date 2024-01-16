import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { alertMessage, insertObjectIf, query } from 'utils';
import APIList from 'config/api';
import { IPostCoreData, SocialPostActions } from 'reduxs/SocialPost';
import { createPost } from '../SocialNewPost.action';
import { ExtraData, NewPostParams, PickedImage } from '../SocialNewPost.type';
import { ToolkitAction } from 'interfaces/common';
import { IState } from 'reduxs/global-reducers';
import { formatSocialPostList } from 'reduxs/SocialPost/SocialPost.helper';
import { uploadImage } from '../SocialNewPost.helpers';
import { isNotNilOrEmpty } from 'ramda-adjunct';

function* doCreatePost(action: ToolkitAction<NewPostParams>) {
  try {
    const extraData: ExtraData = yield select((state: IState) => state.SocialNewPost.extraData);
    const images: PickedImage[] | undefined = yield select((state: IState) => state.SocialNewPost.images);
    let mediaIds: string[] | undefined = undefined;
    if (extraData === 'image' && images != null) {
      const uploadResult: string[] = yield all(
        images.map(async image => {
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
    const response: { data: IPostCoreData } = yield call(query, APIList.createPost, {
      ...action.payload,
      ...insertObjectIf(mediaIds != null, { media_ids: mediaIds }),
    });

    if (response.data.error != null) {
      throw response.data.error;
    }

    if (response.data) {
      const isComment = isNotNilOrEmpty(action.payload.in_reply_to_id);
      const { postJson, arrayId } = formatSocialPostList([response.data], isComment);
      yield put(SocialPostActions.importDataPostJson(postJson));
      if (isComment) {
        yield put(
          SocialPostActions.insertCommentToPost({
            postId: action.payload.in_reply_to_id!,
            dataComment: arrayId,
          })
        );
        alertMessage('success', 'comment_success');
      } else {
        yield put(SocialPostActions.createPostSuccess(arrayId?.[0]));
        alertMessage('success', 'new_post_screen.create_post_success');
      }
      yield action.meta.callBack?.handleSuccess?.();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    yield action.meta.callBack?.handleFail?.();
    if (isNotNilOrEmpty(action.payload.in_reply_to_id)) {
      alertMessage('danger', 'comment_fail', typeof err === 'string' ? err : undefined);
    } else {
      alertMessage('danger', 'new_post_screen.create_post_fail', typeof err === 'string' ? err : undefined);
    }
  }
}

export function* watchCreatePost() {
  yield takeLatest(createPost.type, doCreatePost);
}
