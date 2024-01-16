import { put, takeLatest } from 'redux-saga/effects';
import { blockUser } from '../SocialAccount.action';
import { BlockUserParams, BlockUserResponse } from '../SocialAccount.type';
import APIList from 'config/api';
import { alertMessage, query } from 'utils';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { SocialPostActions } from 'reduxs/SocialPost';

function* doBlockUser(action: ToolkitAction<BlockUserParams>) {
  try {
    const { data }: IResponse<BlockUserResponse> = yield query(APIList.blockSocialUser, action.payload);
    if (data?.id != null) {
      alertMessage('success', 'new_feed.block_user_success');
      yield put(
        SocialPostActions.deletePostByAccountId({
          accountId: data.id,
        })
      );
    }
  } catch (err) {
    alertMessage('danger', 'new_feed.block_user_fail');
  }
}

export function* watchBlockUser() {
  yield takeLatest(blockUser.type, doBlockUser);
}
