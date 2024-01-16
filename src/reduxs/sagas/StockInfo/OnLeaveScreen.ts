import { takeLatest } from 'redux-saga/effects';
import { STOCK_INFO_LEAVE_SCREEN } from 'reduxs/actions';

function* handleOnLeaveScreen() {}

export default function* watchOnEnterScreen() {
  yield takeLatest(STOCK_INFO_LEAVE_SCREEN, handleOnLeaveScreen);
}
