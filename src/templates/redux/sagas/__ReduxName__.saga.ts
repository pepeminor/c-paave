/* eslint-disable no-console */
import { Action } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { call, put } from 'redux-saga/effects';
import { query, deepMapFields } from 'utils';
import { ExampleResponseSchema, MapFieldExampleResponse, __ReduxName__Actions } from '..';

export function* watch__ReduxName__Saga(action: Action) {
  try {
    if (!__ReduxName__Actions.__ReduxName__Request.match(action)) return;
    const unformatted__ReduxName__Response: unknown = yield call(
      query,
      APIList.NotificationNumberGetOfUnread,
      action.payload
    );

    const __ReduxName__Response = deepMapFields(unformatted__ReduxName__Response, MapFieldExampleResponse);
    const isExampleResponse = ExampleResponseSchema.safeParse(__ReduxName__Response);

    if (!isExampleResponse.success) {
      if (__DEV__) {
        console.log(__ReduxName__Actions.__ReduxName__Failed.type, isExampleResponse.error.errors);
      }
      throw new Error('Invalid response');
    }

    yield put(__ReduxName__Actions.__ReduxName__Success(__ReduxName__Response));
  } catch (error) {
    if (__DEV__) {
      console.log(__ReduxName__Actions.__ReduxName__Failed.type, error);
    }
    yield put(__ReduxName__Actions.__ReduxName__Failed());
  }
}
