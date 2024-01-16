import { SEARCH_GET_USER_SUB_ACCOUNT } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { IFollowingSubAccountParams, IFollowingSubAccountResponse } from '../../../interfaces/search';
import { RESET, SUCCESS } from '../../action-type-utils';
import { CURRENT_USERS_INFO_SUB_ACCOUNT } from '../../actions';

function* handleSuccess(
  response: IResponse<IFollowingSubAccountResponse>,
  action: IAction<IFollowingSubAccountParams>
) {
  if (action.response != null) {
    if (response.data.followingSubAccounts.length > 1) {
      yield put({
        type: SUCCESS(SEARCH_GET_USER_SUB_ACCOUNT),
        payload: response.data.followingSubAccounts[1],
      });
    } else if (response.data.followingSubAccounts.length === 1) {
      yield put({
        type: SUCCESS(SEARCH_GET_USER_SUB_ACCOUNT),
        payload: response.data.followingSubAccounts[0],
      });
    }
  }
}

function* handleFailed(action: IAction<IFollowingSubAccountParams>) {
  if (action.response != null) {
    yield put({
      type: RESET(CURRENT_USERS_INFO_SUB_ACCOUNT),
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IFollowingSubAccountParams, IFollowingSubAccountResponse>(
  APIList.getSubAccountOfSearchUser,
  SEARCH_GET_USER_SUB_ACCOUNT,
  handleSuccess,
  handleFailed
);
