import { takeLatest } from 'redux-saga/effects';
import { STOCK_INFO_ENTER_SCREEN } from 'reduxs/actions';

function* handleOnEnterScreen() {}

export default function* watchOnEnterScreen() {
  yield takeLatest(STOCK_INFO_ENTER_SCREEN, handleOnEnterScreen);
}
