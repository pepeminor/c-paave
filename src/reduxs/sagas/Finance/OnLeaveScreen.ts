import { put, takeLatest } from 'redux-saga/effects';
import { RESET } from 'reduxs/action-type-utils';
import { OVERVIEW_FOREIGN_TRADE, OVERVIEW_LEAVE_SCREEN } from 'reduxs/actions';

function* handleOnLeaveScreen() {
  yield put({ type: RESET(OVERVIEW_FOREIGN_TRADE) });
}

export default function* watchOnLeaveScreen() {
  yield takeLatest(OVERVIEW_LEAVE_SCREEN, handleOnLeaveScreen);
}
