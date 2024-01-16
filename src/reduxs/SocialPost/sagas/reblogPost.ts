import { call, put } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
// import { IState } from 'reduxs/global-reducers';

export function* reblogPost(action: PayloadAction<{ postId: string }>) {
  try {
    yield call(query, APIList.reblogPost, action.payload);
  } catch (err) {
    yield put(SocialPostActions.favouritesPostFailed({ postId: action.payload.postId }));
  }
}
