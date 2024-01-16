import { call, put } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPayloadGetLikedListRequest, IAccountCore } from '../SocialPost.type';
import { formatAccountList } from '../SocialPost.helper';

export function* getLikedList(action: PayloadAction<IPayloadGetLikedListRequest>) {
  try {
    const response: { data: IAccountCore[] } = yield call(query, APIList.getLikedList, {
      ...action.payload.params,
      t: new Date().toISOString(),
    });

    const data = formatAccountList(response.data);
    yield put(
      SocialPostActions.getLikedListSuccess({
        data,
      })
    );
  } catch (err) {
    yield action.payload.callback?.(err);
    yield put(SocialPostActions.getLikedListFailure());
  }
}
