import { call, put, select } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IState } from 'reduxs/global-reducers';

export function* favouritesPost(action: PayloadAction<{ postId: string }>) {
  try {
    const isFavourite: boolean = yield select(
      (state: IState) => state.SocialPostReducer.postJson[action.payload.postId].favourited
    );

    yield call(query, isFavourite ? APIList.favouritesNews : APIList.unfavouritesNews, action.payload);
  } catch (err) {
    yield put(SocialPostActions.favouritesPostFailed({ postId: action.payload.postId }));
  }
}
