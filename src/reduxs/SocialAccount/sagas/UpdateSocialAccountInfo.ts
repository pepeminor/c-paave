import { put, takeLatest } from 'redux-saga/effects';
import { getSocialAccountInfo, updateSocialAccountInfo } from '../SocialAccount.action';
import { SocialInfoResponse, UpdateSocialAccountInfoParams } from '../SocialAccount.type';
import APIList from 'config/api';
import { alertMessage, query } from 'utils';
import { IResponse, ToolkitAction } from 'interfaces/common';

function* doUpdateInfo(action: ToolkitAction<UpdateSocialAccountInfoParams>) {
  try {
    const { display_name, avatar } = action.payload;
    let isError = false;
    if (display_name) {
      const { data }: IResponse<SocialInfoResponse> = yield query(
        {
          ...APIList.updateSocialAccountInfo,
          useFormData: false,
        },
        { display_name }
      );
      if (data.error) {
        isError = true;
        alertMessage('danger', data.error);
      } else {
        yield put({
          type: getSocialAccountInfo.fulfilled,
          payload: data,
        });
      }
    }
    if (avatar) {
      const { data }: IResponse<SocialInfoResponse> = yield query(
        {
          ...APIList.updateSocialAccountInfo,
          useFormData: true,
        },
        { avatar }
      );
      if (data.error) {
        isError = true;
        alertMessage('danger', data.error);
      } else {
        yield put({
          type: getSocialAccountInfo.fulfilled,
          payload: data,
        });
      }
    }
    !isError && alertMessage('success', 'Edit Profile Success');
  } catch (err) {
    // console.log(err);
  }
}

export function* watchUpdateSocialAccountInfo() {
  yield takeLatest(updateSocialAccountInfo.type, doUpdateInfo);
}
