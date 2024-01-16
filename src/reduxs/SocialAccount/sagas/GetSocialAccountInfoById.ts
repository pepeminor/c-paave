import { put, select, takeEvery } from 'redux-saga/effects';
import { SocialInfoResponse } from '../SocialAccount.type';
import APIList from 'config/api';
import { query } from 'utils';
import { IResponse } from 'interfaces/common';
import { SocialAccountActions } from '../SocialAccount.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { formatAccountItem } from 'reduxs/SocialPost/SocialPost.helper';
import { IState } from 'reduxs/global-reducers';
import { IAccountData } from 'reduxs/SocialPost';
import { isNilOrEmpty } from 'ramda-adjunct';

function* doGetInfoById(action: PayloadAction<{ userId: string }>) {
  try {
    const userJson: { [key: string]: IAccountData } = yield select((state: IState) => state.SocialAccount.userJson);
    if (isNilOrEmpty(userJson[action.payload.userId])) {
      const { data }: IResponse<SocialInfoResponse> = yield query(APIList.getSocialAccountInfoById, action.payload);

      const accountData = formatAccountItem(data);

      yield put(SocialAccountActions.getAccountInfoByIdSuccess({ data: accountData }));
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* watchGetSocialAccountInfoById() {
  yield takeEvery(SocialAccountActions.getAccountInfoById, doGetInfoById);
}
