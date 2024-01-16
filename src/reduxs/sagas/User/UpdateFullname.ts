import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IGetAccountInfoResponse, IUserUpdateFullNameParams, IUserUpdateResponse } from 'interfaces/user';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { USER_ACCOUNT_INFO, USER_UPDATE_FULLNAME } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query, alertMessage, FulfilledRequestError } from 'utils';

const updateFullname = (params: IUserUpdateFullNameParams) => {
  return query(APIList.updateFullname, params);
};

function* doUpdateFullname(request: IAction<IUserUpdateFullNameParams>) {
  try {
    const response: IResponse<IUserUpdateResponse> = yield call(updateFullname, request.payload);
    const userInfo: IGetAccountInfoResponse = yield select((state: IState) => state.getUserAccountInfo.data);
    const newUserInfo = { ...userInfo, fullname: request.payload.fullname };
    yield put({
      type: SUCCESS(USER_ACCOUNT_INFO),
      payload: newUserInfo,
    });
    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
      });
    }
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    if (error instanceof FulfilledRequestError) {
      // Error handling if wrong params are entered on BE's side
      const invalidValue = error.data.params?.filter((item: any) => item.param === 'fulname');
      if (invalidValue) {
        alertMessage('danger', 'INVALID_VALUE fullname', '', error.requester.rid);
      }
    }
  }
}

export default function* watchUpdateFullname() {
  yield takeLeading(USER_UPDATE_FULLNAME, doUpdateFullname);
}
