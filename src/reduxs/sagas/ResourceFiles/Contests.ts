import config from 'config';
import { ContestFile } from 'interfaces/File';
import { IAction } from 'interfaces/common';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_CONTEST_LIST } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'contests-v2';

function* fetchContest(action: IAction<null>) {
  try {
    const contestFile: ContestFile | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    yield put({
      type: SUCCESS(GET_CONTEST_LIST),
      payload: contestFile,
    });
    if (action.callBack != null && action.callBack.handleSuccess != null) {
      action.callBack.handleSuccess();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchContest error', err);
  }
}

export default function* watchFetchContest() {
  yield takeLeading(GET_CONTEST_LIST, fetchContest);
}
