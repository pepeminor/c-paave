/* eslint-disable no-console */
import { Action } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import { deepMapFields } from 'utils';
import { ExampleResponseSchema, MapFieldExampleResponse, __ReduxName__Actions } from '..';

export function* watch__ReduxName__2(action: Action) {
  if (!__ReduxName__Actions.__reduxName__Action.match(action)) return;
  try {
    const unformatted__ReduxName__Response: unknown = yield call(
      query,
      APIList.NotificationNumberGetOfUnread,
      action.payload
    );

    const __ReduxName__Response = deepMapFields(unformatted__ReduxName__Response, MapFieldExampleResponse);
    const isExampleResponse = ExampleResponseSchema.safeParse(__ReduxName__Response);

    if (!isExampleResponse.success) {
      if (__DEV__) {
        console.log(action.meta.response.fail, isExampleResponse.error.errors);
      }
      throw new Error('Invalid response');
    }

    yield put({
      type: action.meta.response.success,
      payload: __ReduxName__Response,
    });
  } catch (error) {
    if (__DEV__) {
      console.log(action.meta.response.fail, error);
    }
    yield put({
      type: action.meta.response?.fail,
    });
  }
}
