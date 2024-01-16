import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetAllRightListParams, IGetAllRightListResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_ALL_RIGHT_LIST } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetAllRightList(action: IAction<IGetAllRightListParams>) {
  try {
    const response: IGetAllRightListResponse[] = yield callQueryKis(APIList.getAllRightList, action.payload);

    yield put({
      type: action.response?.success,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetAllRightList() {
  yield takeLeading(EQUITY_GET_ALL_RIGHT_LIST, doGetAllRightList);
}
