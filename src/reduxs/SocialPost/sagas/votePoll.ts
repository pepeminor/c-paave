import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadVotePollRequest, IPollCore } from '../SocialPost.type';
import { formatPoll } from '../SocialPost.helper';
import { SocialPostActions } from '../SocialPost.redux';

export function* votePoll(action: PayloadAction<IPayloadVotePollRequest>) {
  try {
    const response: { data: IPollCore } = yield call(query, APIList.votePoll, action.payload.params);

    const dataPoll = formatPoll(response.data);

    yield put(
      SocialPostActions.votePollSuccess({
        dataPoll,
        postId: action.payload.postId,
      })
    );

    yield action.payload.callback?.();
  } catch (err) {
    yield action.payload.callback?.(err);
  }
}
