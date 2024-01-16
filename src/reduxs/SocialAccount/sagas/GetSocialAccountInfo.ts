import { put, takeLatest } from 'redux-saga/effects';
import { getSocialAccountInfo } from '../SocialAccount.action';
import { SocialInfoResponse } from '../SocialAccount.type';
import APIList from 'config/api';
import { query } from 'utils';
import { IResponse } from 'interfaces/common';

function* doGetInfo() {
  try {
    const { data }: IResponse<SocialInfoResponse> = yield query(APIList.getSocialAccountInfo);
    yield put({
      type: getSocialAccountInfo.fulfilled,
      payload: data,
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* watchGetSocialAccountInfo() {
  yield takeLatest(getSocialAccountInfo.type, doGetInfo);
}
