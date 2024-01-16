import { takeLatest } from 'redux-saga/effects';
import { reportUser } from '../SocialAccount.action';
import { ReportUserParams, ReportUserResponse } from '../SocialAccount.type';
import APIList from 'config/api';
import { alertMessage, query } from 'utils';
import { IResponse, ToolkitAction } from 'interfaces/common';

function* doReportUser(action: ToolkitAction<ReportUserParams>) {
  try {
    const { data }: IResponse<ReportUserResponse> = yield query(APIList.reportSocialUser, action.payload);
    if (data?.target_account?.id != null) {
      alertMessage('success', 'new_feed.report_user_success');
    }
  } catch (err) {
    alertMessage('danger', 'new_feed.report_user_fail');
  }
}

export function* watchReportUser() {
  yield takeLatest(reportUser.type, doReportUser);
}
