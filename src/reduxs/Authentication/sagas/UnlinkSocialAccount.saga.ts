import { PayloadAction } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put } from 'redux-saga/effects';
import { alertMessage, query } from 'utils';
import { IUnlinkSocialParams } from '..';
import { AuthenticationActions } from '../Authentication.redux';

export function* unlinkSocialAccount(action: PayloadAction<IUnlinkSocialParams>) {
  try {
    const res: IResponse<any> = yield call(query, APIList.unlinkSocial, action.payload.params);
    if (res) {
      yield put(AuthenticationActions.unlinkSocialSuccess({ socialType: action.payload.params.socialType }));
      alertMessage('success', 'unlink.social.account.success');
    }
  } catch (error) {
    alertMessage('danger', 'unlink.social.account.failed');

    yield put(AuthenticationActions.unlinkSocialFailed({ socialType: action.payload.params.socialType }));
  }
}
