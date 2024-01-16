import { PayloadAction } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import { ICreatePasswordParams } from '..';
import { SUCCESS } from 'reduxs/action-type-utils';
import { USER_ACCOUNT_INFO } from 'reduxs/actions';

export function* createPassword(action: PayloadAction<ICreatePasswordParams>) {
  try {
    const res: IResponse<{ status: boolean }> = yield call(query, APIList.createPassword, action.payload.params);

    if (res.data.status) {
      yield put({
        type: SUCCESS(USER_ACCOUNT_INFO),
        payload: {
          isPasswordCreated: true,
        },
      });
      yield action.payload.callback?.(null, res.data.status);
    }
  } catch (error) {
    yield action.payload.callback?.(error);
  }
}
