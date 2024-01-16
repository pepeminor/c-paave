import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetAdditionIssueShareInfoParams, IGetAdditionIssueShareInfoResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_ADDITION_ISSUE_SHARE_INFO } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetAdditionIssueShareInfo(action: IAction<IGetAdditionIssueShareInfoParams>) {
  try {
    const response: IGetAdditionIssueShareInfoResponse[] = yield callQueryKis(
      APIList.getAdditionIssueShareInfo,
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

export default function* watchGetAdditionIssueShareInfo() {
  yield takeLeading(EQUITY_ADDITION_ISSUE_SHARE_INFO, doGetAdditionIssueShareInfo);
}
