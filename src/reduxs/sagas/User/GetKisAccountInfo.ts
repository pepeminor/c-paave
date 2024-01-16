import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IGetKisAccountInfoRequest, IGetKisAccountInfoResponse } from 'interfaces/user';
import { call, put, takeLeading } from 'redux-saga/effects';
import { USER_KIS_ACCOUNT_INFO } from 'reduxs/actions';
import { queryKis } from 'utils';

const getKisUserInfo = (params: IGetKisAccountInfoRequest) => {
  return queryKis(APIList.getKisUserInfo, params);
};

function* doGetKisUserInfo(request: IAction<IGetKisAccountInfoRequest>) {
  try {
    const response: IResponse<IGetKisAccountInfoResponse> = yield call(getKisUserInfo, request.payload);
    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'get kis user account', error.code ?? error.message);
  }
}

export default function* watchGetKisUserInfo() {
  yield takeLeading(USER_KIS_ACCOUNT_INFO, doGetKisUserInfo);
}
