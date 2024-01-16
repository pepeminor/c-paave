import { takeLatest, put } from 'redux-saga/effects';
import { CURRENT_USERS_INFO_SUB_ACCOUNT } from 'reduxs/actions';
import { IAction } from '../../../interfaces/common';
import { SUCCESS } from '../../action-type-utils';

function* handleSetCurrentContestSubUser(action: IAction<string>) {
  if (action.payload != null) {
    yield put({
      type: SUCCESS(CURRENT_USERS_INFO_SUB_ACCOUNT),
      payload: action.payload,
    });
  }
}

export default function* setCurrentContestSubUser() {
  yield takeLatest(CURRENT_USERS_INFO_SUB_ACCOUNT, handleSetCurrentContestSubUser);
}
