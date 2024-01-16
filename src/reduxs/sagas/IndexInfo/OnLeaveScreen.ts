import { put, takeLeading } from 'redux-saga/effects';
import { INDEX_INFO_LEAVE_SCREEN, INDEX_INFO_CLEAN_SCREEN_DATA } from 'reduxs/actions';

function* handleOnLeaveScreen() {
  yield put({
    type: INDEX_INFO_CLEAN_SCREEN_DATA,
  });
}

export default function* watchOnLeaveScreen() {
  yield takeLeading(INDEX_INFO_LEAVE_SCREEN, handleOnLeaveScreen);
}
