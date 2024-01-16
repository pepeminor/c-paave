import { Action } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import { IPostNewFeedbackResponse, FeedBackActions, IPostNewFeedbackRequest } from '..';

export function* watchFeedBackSaga(action: Action<IPostNewFeedbackRequest>) {
  if (!FeedBackActions.feedBackRequest.match(action)) return;

  const {
    payload: { userId, callback, ...payload },
  } = action;

  try {
    const feedBackResponse: IResponse<IPostNewFeedbackResponse> = yield call(query, APIList.postNewFeedback, payload);

    yield put(FeedBackActions.feedBackSuccess({ userId, ...feedBackResponse.data }));
    yield callback.handleSuccess?.();
  } catch (error) {
    yield put(FeedBackActions.feedBackFailed());
    yield callback.handleFail?.();
  }
}
