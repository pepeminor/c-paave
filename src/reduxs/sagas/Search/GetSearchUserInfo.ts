import { SEARCH_GET_USER_INFO } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import APIList from 'config/api';
import { query } from 'utils';
import { ISearchUserResponse, ISearchUserParams } from '../../../interfaces/user';

function* doGetSearchUserInfo(action: IAction<ISearchUserParams>) {
  try {
    const response: IResponse<ISearchUserResponse> = yield query(APIList.getSearchUserInfo, action.payload);
    yield put({
      type: action.response?.success,
      payload: response.data,
    });
    yield action.callBack?.handleSuccess?.(response.data);
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGetSearchUserInfo() {
  yield takeLatest(SEARCH_GET_USER_INFO, doGetSearchUserInfo);
}
