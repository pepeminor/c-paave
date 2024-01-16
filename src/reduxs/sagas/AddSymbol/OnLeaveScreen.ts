import { takeLeading } from 'redux-saga/effects';
import { ADD_SYMBOL_LEAVE_SCREEN } from 'reduxs/actions';

function* handleOnLeaveScreen() {}

export default function* watchOnEnterScreen() {
  yield takeLeading(ADD_SYMBOL_LEAVE_SCREEN, handleOnLeaveScreen);
}
