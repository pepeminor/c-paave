import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetLocalAdvanceCreationParams, IGetLocalAdvanceCreationResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_LOCAL_ADVANCE_CREATION } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetLocalAdvanceCreation(action: IAction<IGetLocalAdvanceCreationParams>) {
  try {
    const response: IGetLocalAdvanceCreationResponse = yield callQueryKis(
      APIList.getLocalAdvanceCreation,
      action.payload
    );
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

export default function* watchGetLocalAdvanceCreation() {
  yield takeLeading(EQUITY_GET_LOCAL_ADVANCE_CREATION, doGetLocalAdvanceCreation);
}
