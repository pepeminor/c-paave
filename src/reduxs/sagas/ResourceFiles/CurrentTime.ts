// 1890 - contest
import config from 'config';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_CURRENT_TIME } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'currentTime';

function* fetchCurrentTime() {
  try {
    const currentTimeFile: string = yield call(
      fetchFileAndStore,
      fileName,
      `${config.apiUrl.domainURI}rest/${fileName}`
    );

    yield put({
      type: SUCCESS(GET_CURRENT_TIME),
      payload: currentTimeFile,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetch currentTime error', err);
  }
}

export default function* watchFetchCurrentTime() {
  yield takeLeading(GET_CURRENT_TIME, fetchCurrentTime);
}
