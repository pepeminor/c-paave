import { PayloadAction } from '@reduxjs/toolkit';
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put } from 'redux-saga/effects';
import { alertMessage, query } from 'utils';
import { ILinkSocialParams } from '..';
import { AuthenticationActions } from '../Authentication.redux';

export function* linkSocialAccount(action: PayloadAction<ILinkSocialParams>) {
  try {
    const res: IResponse<any> = yield call(query, APIList.linkSocial, action.payload.params);
    if (res) {
      yield put(AuthenticationActions.linkSocialSuccess({ socialType: action.payload.params.socialType }));
      alertMessage('success', 'link.social.account.success');
    }
  } catch (error) {
    alertMessage('danger', 'link.social.account.failed');
    yield put(AuthenticationActions.linkSocialFailed({ socialType: action.payload.params.socialType }));
  }
}
